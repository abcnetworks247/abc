const BlogJoiSchema = require('../Utils/BlogJoiSchema');
const CommentJoiSchema = require('../Utils/CommentJoiSchema');
const Client = require('../models/clientAuthSchema');
const cookieParser = require('cookie-parser');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const blog = require('../models/blogSchema');
const Admin = require('../models/adminAuthSchema');
const NewsType = require('../models/newsTypeSchema');
require('dotenv').config();
const mongoose = require('mongoose');
const sendMail = require('../Utils/sendMail');
const slugify = require("slugify");
const path = require('path');
const ejs = require('ejs');
const localurl = process.env.CLIENT_URL;

const clientUrl = process.env.CLIENT_URL;

const {
  UnAuthorizedError,
  NotFoundError,
  ValidationError,
} = require('../errors');
const cloudinary = require('../Utils/CloudinaryFileUpload');


// const getAllBlog = async (req, res) => {
//   try {
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;

//     const totalCount = await blog.countDocuments();
//     const totalPages = Math.ceil(totalCount / perPage);
//     const skip = (page - 1) * perPage;

//     const fetchBlogsByType = async (slug) => {
//       try {
//         const result = await blog
//           .find({ slug: slug })
//           .populate('author', 'fullname username userdp')
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(perPage);
//         return result;
//       } catch (error) {
//         console.error(error);
//         throw error;
//       }
//     };

//     const blogSlugs = [
//       'Africa News Update',
//       'Secretary of State for Communications',
//       'Office of the President',
//       'Socio Cultural',
//       'Archives & Analysis',
//       'Breaking News',
//       'Sports',
//       'World News',
//       'Government Updates',
//       'Business',
//     ];

//     const blogTypePromises = blogSlugs.map(async (slug) => {
//       const blogs = await fetchBlogsByType(slug);
//       return { [slug]: blogs };
//     });

//     const blogTypeResults = await Promise.all(blogTypePromises);

//     const allBlogs = await blog
//       .find()
//       .populate('author', 'fullname username userdp')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(perPage);

//     if (allBlogs.length === 0) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'No Post found' });
//     }

//     return res
//       .status(StatusCodes.OK)
//       .json({ allBlogs, totalPages, totalCount, page, ...blogTypeResults });
//   } catch (error) {
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//   }
// };

// const getSingleBlog = async (req, res) => {
//   const { slug } = req.params; // Get slug from request parameters

//   try {
//     const blogdata = await blog
//       .findOne({ slug }) // Find by slug instead of ID
//       .populate("author", "fullname username userdp")
//       .populate({
//         path: "comment.userid",
//         select: "fullname userdp",
//       });

//     if (!blogdata) {
//       throw new NotFoundError("Blog not found");
//     }

//     return res.status(StatusCodes.OK).json({ blogdata });
//   } catch (error) {
//     console.error("Error in getSingleBlog:", error);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Internal Server Error" });
//   }
// };

const getAllBlog = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    // Get total count of blogs
    const totalCount = await blog.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    // Fetch all unique blog types
    const uniqueTypes = await blog.distinct("type");

    if (!uniqueTypes.length) {
      return res.status(404).json({ message: "No blog types found." });
    }

    // Function to fetch blogs by type
    const fetchBlogsByType = async (type) => {
      try {
        return await blog
          .find({ type })
          .populate("author", "fullname username userdp")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(perPage);
      } catch (error) {
        console.error(`Error fetching blogs for type ${type}:`, error);
        return [];
      }
    };

    // Fetch blogs for each type concurrently
    const blogsByType = Object.fromEntries(
      await Promise.all(
        uniqueTypes.map(async (type) => [type, await fetchBlogsByType(type)])
      )
    );

    // Fetch all blogs (without type filtering)
    const allBlogs = await blog
      .find()
      .populate("author", "fullname username userdp")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    if (!allBlogs.length) {
      return res.status(404).json({ message: "No Posts found" });
    }

    return res.status(200).json({
      allBlogs,
      totalPages,
      totalCount,
      page,
      blogsByType, // Object where each type has an array of blogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const getSingleBlog = async (req, res) => {
  const { slug } = req.params;
  console.log(`Received slug: ${slug}`);

  try {
    const blogdata = await blog
      .findOne({ slug }) // Find blog by slug
      .populate("author", "fullname username userdp")
      .populate({
        path: "comment.userid",
        select: "fullname userdp",
      });

    if (!blogdata) {
      console.log(`No blog found with slug: ${slug}`);
      // throw new NotFoundError("Blog not found");
    }

    return res.status(StatusCodes.OK).json({ blogdata });
  } catch (error) {
    console.error("Error in getSingleBlog:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

const createBlog = async (req, res) => {
  try {
    console.log("Request received to create a new blog");

    const {
      title,
      shortdescription,
      longdescription,
      category,
      type,
      blogimage,
    } = req.body;
    const { user: currentUser } = req;

    if (!currentUser) {
      throw new UnAuthorizedError("User not found");
    }


    if (!["superadmin", "admin", "editor"].includes(currentUser.role)) {
      throw new UnAuthorizedError(
        "You are not authorized to create a new blog"
      );
    }

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    const newBlog = {
      title,
      slug,
      shortdescription,
      longdescription,
      category,
      blogimage,
      type,
      author: currentUser._id,
    };

    const { error, value } = BlogJoiSchema.validate(newBlog);

    if (error) {
      console.log("Validation error:", error.message);
      throw new ValidationError("Invalid blog information", error.details);
    }


    const blogData = await blog.create(value);


    currentUser.mypost.push(blogData._id);

    await currentUser.save();

    const templatePath = path.join(__dirname, "../views/postView.ejs");
    const postlink = `${clientUrl}/blog/${blogData.slug}`;

    // Sending emails in the background using setImmediate
    setImmediate(async () => {
      try {
        const allUsers = await Client.find();
        const userEmails = allUsers.map((user) => user.email).filter(Boolean);

        for (const email of userEmails) {
          const renderHtml = await ejs.renderFile(
            templatePath,
            {
              title: title,
              shortdescription: shortdescription,
              blogimage: blogimage,
              postlink: postlink,
            },
            { async: true }
          );

          await sendMail({
            email: email,
            subject: "New post update on ABC Networks 24",
            html: renderHtml,
          });

        }

        
      } catch (error) {
      
      }
    });

    return res.status(StatusCodes.CREATED).json({
      blogData,
      message: "Blog created successfully",
    });
  } catch (error) {

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, details: error.details });
  }
};


const updateBlog = async (req, res) => {
  try {
    const {
      title,
      shortdescription,
      longdescription,
      category,
      blogid,
      blogimage,
      type,
    } = req.body;

    console.log(
      title,
      shortdescription,
      longdescription,
      category,
      blogid,
      blogimage,
      type
    );

    const currentUser = req.user;
    const blogData = await blog.findById(blogid);

    if (!blogData) {
      throw new NotFoundError("Blog not found");
    }

    if (!["superadmin", "admin", "editor"].includes(currentUser.role)) {
      throw new UnAuthorizedError("You are not authorized to update this blog");
    }

    const slug = slugify(title, { lower: true, strict: true });

    const updatedBlogData = {
      title,
      slug,
      shortdescription,
      longdescription,
      category,
      blogimage,
      type,
    };

    const updatedBlog = await blog.findByIdAndUpdate(blogid, updatedBlogData, {
      new: true,
    });

    res
      .status(StatusCodes.OK)
      .json({ data: updatedBlog, message: "Blog updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};


const deleteBlog = async (req, res) => {
  const { id } = req.body;

  console.log("Request received to delete blog with id:", id);

  // Validate that the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid blog ID");
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid blog ID",
    });
  }

  const blogId = String(id);

  try {
    const currentUser = req.user;

    // Find the blog by ID
    const blogData = await blog.findById(blogId);
    console.log("Blog data found:", blogData);

    // Ensure the blog exists
    if (!blogData) {
      console.log("Blog not found");
      throw new NotFoundError("Blog not found");
    }

    // Check if the user is authorized to delete the blog
    if (
      !["superadmin", "admin", "editor", "owner"].includes(currentUser.role)
    ) {
      console.log("User not authorized to delete blog");
      throw new UnAuthorizedError("You are not authorized to delete this blog");
    }

    // Log user information for debugging
    try {
      // Get user information
      const authorinfo = await Admin.findById(blogData.author);
      console.log("Author info:", authorinfo);

      // Get user's mypost array
      const authorPosts = authorinfo.mypost;
      console.log("Author's mypost array:", authorPosts);

      // Find the index of the blog in the mypost array
      const index = authorPosts.indexOf(blogId);
      console.log("Index of blog in author's mypost array:", index);

      if (index !== -1) {
        // Remove the blog ID from the mypost array
        authorPosts.splice(index, 1);

        // Save the updated mypost array
        await authorinfo.save();
        console.log("Updated author's mypost array:", authorPosts);

        // Delete the blog
        await blog.findByIdAndDelete(blogId);
        console.log("Blog deleted successfully");

        // Respond with success message
        return res
          .status(StatusCodes.OK)
          .json({ message: "Blog deleted successfully" });
      } else {
        // Blog ID not found in the user's mypost array
        console.log("Blog ID not found in user's mypost array");
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Blog ID not found in user's mypost array" });
      }
    } catch (error) {
      console.error("Error while updating user's mypost array:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred while updating user data" });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};



const getUserBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const oldblog = await blog.findById(id).sort({ createdAt: -1 });

    if (!oldblog) {
      throw new NotFoundError('Blog does not exist');
    }

    const getUserId = await req.user._id;

    if (!getUserId && getUserId !== oldblog.authorid) {
      throw new NotFoundError('Unauthorized');
    }

    res.status(StatusCodes.OK).json({ oldblog });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const getBlogsByType = async (req, res) => {
  const { slug } = req.params;

  try {
    console.log("slug:", slug);

    // Find the type by slug instead of using findById
    const checkType = await NewsType.findOne({ slug });

    if (!checkType) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "This category is empty." });
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    // Fetch blogs using the correct type reference
    const allblogs = await blog.find({ type: checkType.slug })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(StatusCodes.OK).json({ data: allblogs, name: checkType.name });
  } catch (error) {
    console.error("Error fetching blogs by type:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};


const searchBlog = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { query, page = 1, perPage = 10 } = req.query;

    // Validate query parameter
    if (!query) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Query parameter is required' });
    }

    // Perform the search based on the query
    const searchResults = await blog
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in the title
          { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in the description
        ],
      })
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Calculate total number of search results (for pagination)
    const totalResults = await blog.countDocuments({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    // Return the search results along with pagination metadata
    return res.status(StatusCodes.OK).json({
      results: searchResults,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalResults / perPage),
      totalResults,
    });
  } catch (error) {
    // Handle errors
    console.error('Error during news search:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

const postReaction = (io) => {
  io.on('connection', (socket) => {
    socket.on('postreact', async (react) => {
      try {
        console.log(react);

        const blogData = await blog.findById(react.blogid);

        if (!blogData) {
          console.log('Blog not found');
          throw new NotFoundError('Blog not found');
        } else if (blogData.like.includes(react.userid)) {
          console.log('true id is already in the list');
          const index = blogData.like.indexOf(react.userid);
          blogData.like.splice(index, 1);

          blogData.save();

          console.log('Like removed with userid: ' + react.userid);

          const blogreact = blogData.like;

          console.log(blogreact);

          socket.emit('alllike', blogreact);
        } else {
          blogData.like.unshift(react.userid);

          blogData.save();

          console.log('Like added with userid: ' + react.userid);

          const blogreact = blogData.like;

          console.log(blogreact);

          socket.emit('alllike', blogreact);
        }
      } catch (error) {}
    });
  });
};

const handleNewComment = (io) => {
  io.on('connection', async (socket) => {
    socket.on('newcomment', async ({ usercomment, blogid, userid }) => {
      try {
        const blogData = await blog.findById(blogid);

        if (!blogData) {
          return socket.emit('commentError', { error: 'Blog not found' });
        }

        const newuser = await user.findById(userid);

        if (!newuser) {
          return socket.emit('commentError', { error: 'User not found' });
        }

        const commentData = {
          usercomment,
          userid,
        };

        const { error, value } = CommentJoiSchema.validate(commentData);

        if (error) {
          return socket.emit('commentError', {
            error: 'Invalid comment information',
          });
        }

        blogData.comment.unshift(value);
        await blogData.save();

        console.log(value);

        // Populate the user information in the comment
        const populatedBlogData = await blog.findById(blogid).populate({
          path: 'comment.userid',
          select: 'fullname userdp',
        });

        socket.emit('allcomment', populatedBlogData.comment);
      } catch (error) {
        console.error('Error handling new comment:', error);
        socket.emit('commentError', {
          error: 'An error occurred while handling the comment',
        });
      }
    });
  });
};

module.exports = {
  getAllBlog,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getUserBlog,
  postReaction,
  handleNewComment,
  getBlogsByType,
  searchBlog,
};

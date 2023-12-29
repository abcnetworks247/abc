const BlogJoiSchema = require("../Utils/BlogJoiSchema");
const CommentJoiSchema = require("../Utils/CommentJoiSchema");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const blog = require("../models/blogSchema");
const Admin = require("../models/adminAuthSchema");
require("dotenv").config();

const clientUrl = process.env.CLIENT_URL;

const {
  UnAuthorizedError,
  NotFoundError,
  ValidationError,
} = require("../errors");
const cloudinary = require("../Utils/CloudinaryFileUpload");

const getAllBlog = async (req, res) => {
  console.log("hit ");

  try {
    const allblog = await blog
      .find()
      .populate("author", "fullname username userdp");

    const highlight = await blog
      .find({ type: "top" })
      .populate("author", "fullname username userdp");

    const popular = await blog
      .find({ type: "popular" })
      .populate("author", "fullname username userdp");

    const top = await blog
      .find({ type: "top" })
      .populate("author", "fullname username userdp");

    const trending = await blog
      .find({ type: "top" })
      .populate("author", "fullname username userdp");

    if (allblog.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No blogs found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ allblog, highlight, popular, top, trending });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error });
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
    // Retrieve the current user from the request
    const { user: currentUser } = req;

    if (!currentUser) {
      throw new UnAuthorizedError("User not found");
    }

    console.log("User authorized to create a new blog");

    // Check user roles for authorization
    if (!["superadmin", "admin", "editor"].includes(currentUser.role)) {
      throw new UnAuthorizedError(
        "You are not authorized to create a new blog"
      );
    }

    // Construct a new blog object
    const newBlog = {
      title,
      shortdescription,
      longdescription,
      category,
      blogimage,
      type,
      author: currentUser._id,
    };

    // Validate the blog data using Joi schema
    const { error, value } = BlogJoiSchema.validate(newBlog);

    if (error) {
      console.log("Validation error:", error.message);
      throw new ValidationError("Invalid blog information", error.details);
    }

    console.log("Blog data validated successfully");

    // Create the new blog
    const blogData = await blog.create(value);

    console.log("Blog created successfully:", blogData);

    // Update the current user's mypost array
    currentUser.mypost.push(blogData._id);
    console.log("Blog ID pushed to user's mypost array");

    // Save the updated user data
    await currentUser.save();

    return res.status(StatusCodes.CREATED).json({
      blogData,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, details: error.details });
  }
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    const blogdata = await blog
      .findById(id)
      .populate("author", "fullname username userdp")
      .populate({
        path: "comment.userid",
        select: "fullname userdp",
      });

    if (!blogdata) {
      throw new NotFoundError("Blog not found");
    }

    return res.status(StatusCodes.OK).json({ blogdata });
  } catch (error) {
    console.error("Error in getSingleBlog:", error); // Log the error for debugging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const updateBlog = async (req, res) => {
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

  try {
    const currentUser = req.user;

    // Find the blog by ID
    const blogData = await blog.findById(blogid);

    // Ensure the blog exists
    if (!blogData) {
      throw new NotFoundError("Blog not found");
    }

    // Check if the user is authorized to update the blog
    if (!["superadmin", "admin", "editor"].includes(currentUser.role)) {
      throw new UnAuthorizedError("You are not authorized to update this blog");
    }

    // Prepare the updated blog data
    const updatedBlogData = {
      title,
      shortdescription,
      longdescription,
      category,
      blogimage, // Make sure blogimage is defined in the request or adjust accordingly
      type,
    };

    // Update the blog and retrieve the updated data
    const updatedBlog = await blog.findByIdAndUpdate(blogid, updatedBlogData, {
      new: true,
    });

    // Return the updated blog data
    res
      .status(StatusCodes.OK)
      .json({ data: updatedBlog, message: "Blog updated successfully" });
  } catch (error) {
    // Handle errors and return an appropriate response
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const currentUser = req.user;

    // Find the blog by ID
    const blogData = await blog.findById(id);

    // Ensure the blog exists
    if (!blogData) {
      throw new NotFoundError("Blog not found");
    }

    // Check if the user is authorized to delete the blog
    if (!["superadmin", "admin", "editor"].includes(currentUser.role)) {
      throw new UnAuthorizedError("You are not authorized to delete this blog");
    }

    // Log user information for debugging

    try {
      // Get user information
      const authorinfo = await Admin.findById(blogData.author);

      // Get user's mypost array
      const authorPosts = authorinfo.mypost;
      console.log("author post", authorPosts);

      // Find the index of the blog in the mypost array
      const index = authorPosts.indexOf(id);

      console.log("index of", index);

      if (index !== -1) {
        // Remove the blog ID from the mypost array
        authorPosts.splice(index, 1);

        // Save the updated mypost array
        await authorinfo.save();

        // Delete the blog
        await blog.findByIdAndDelete(id);

        // Respond with success message
        res
          .status(StatusCodes.OK)
          .json({ message: "Blog deleted successfully" });
        console.log("true");
      } else {
        // Blog ID not found in the user's mypost array
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Blog ID not found in user's mypost array" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred while updating user data" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getUserBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const oldblog = await blog.findById(id);

    if (!oldblog) {
      throw new NotFoundError("Blog does not exist");
    }

    const getUserId = await req.user._id;

    if (!getUserId && getUserId !== oldblog.authorid) {
      throw new NotFoundError("Unauthorized");
    }

    res.status(StatusCodes.OK).json({ oldblog });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

//blog comment controller

const postReaction = (io) => {
  io.on("connection", (socket) => {
    socket.on("postreact", async (react) => {
      try {
        console.log(react);

        const blogData = await blog.findById(react.blogid);

        if (!blogData) {
          console.log("Blog not found");
          throw new NotFoundError("Blog not found");
        } else if (blogData.like.includes(react.userid)) {
          console.log("true id is already in the list");
          const index = blogData.like.indexOf(react.userid);
          blogData.like.splice(index, 1);

          blogData.save();

          console.log("Like removed with userid: " + react.userid);

          const blogreact = blogData.like;

          console.log(blogreact);

          socket.emit("alllike", blogreact);
        } else {
          blogData.like.unshift(react.userid);

          blogData.save();

          console.log("Like added with userid: " + react.userid);

          const blogreact = blogData.like;

          console.log(blogreact);

          socket.emit("alllike", blogreact);
        }
      } catch (error) {}
    });
  });
};

const handleNewComment = (io) => {
  io.on("connection", async (socket) => {
    socket.on("newcomment", async ({ usercomment, blogid, userid }) => {
      try {
        const blogData = await blog.findById(blogid);

        if (!blogData) {
          return socket.emit("commentError", { error: "Blog not found" });
        }

        const newuser = await user.findById(userid);

        if (!newuser) {
          return socket.emit("commentError", { error: "User not found" });
        }

        const commentData = {
          usercomment,
          userid,
        };

        const { error, value } = CommentJoiSchema.validate(commentData);

        if (error) {
          return socket.emit("commentError", {
            error: "Invalid comment information",
          });
        }

        blogData.comment.unshift(value);
        await blogData.save();

        console.log(value);

        // Populate the user information in the comment
        const populatedBlogData = await blog.findById(blogid).populate({
          path: "comment.userid",
          select: "fullname userdp",
        });

        socket.emit("allcomment", populatedBlogData.comment);
      } catch (error) {
        console.error("Error handling new comment:", error);
        socket.emit("commentError", {
          error: "An error occurred while handling the comment",
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
};

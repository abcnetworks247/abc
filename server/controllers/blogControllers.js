const BlogJoiSchema = require("../Utils/BlogJoiSchema");
const CommentJoiSchema = require("../Utils/CommentJoiSchema");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const blog = require("../models/blogSchema");
const user = require("../models/clientAuthSchema");
require("dotenv").config();

const clientUrl = process.env.CLIENT_URL;

const {
  UnAuthorizedError,
  NotFoundError,
  ValidationError,
} = require("../errors");
const cloudinary = require("../Utils/CloudinaryFileUpload");

const getAllBlog = async (req, res) => {

  console.log('hit ');

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

    return res.status(StatusCodes.OK).json({ allblog, highlight, popular, top, trending });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
};

const createBlog = async (req, res) => {
  const { title, shortdescription, longdescription, category, type } = req.body;

  try {
    const currentUser = req.user;

    if (!currentUser) {
      throw new UnAuthorizedError("User not found");
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, size, mimetype, path } = req.file;

    const blogphoto = await cloudinary.uploader.upload(path, {
      use_filename: true,
      folder: "AllBlogsImage",
    });

    if (!blogphoto.secure_url) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    const newBlog = {
      title,
      shortdescription,
      longdescription,
      category,
      blogimage: blogphoto.secure_url,
      type,
      author: currentUser._id,
    };

    const { error, value } = BlogJoiSchema.validate(newBlog);

    if (error) {
      throw new ValidationError("Invalid blog information");
    }

    const blogData = await blog.create(value);

    currentUser.mypost.push(blogData._id);

    await currentUser.save();

    return res.status(StatusCodes.CREATED).json({
      blogData,
      message: "Blog created successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
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
  const { title, shortdescription, longdescription, category, blogid, type } =
    req.body;

  try {
    const blogdata = await blog.findById(blogid);

    const olduser = await req.user._id;

    if (!blogdata) {
      throw new NotFoundError("Blog not found");
    } else if (!olduser && blogdata.author.toString() !== olduser.toString()) {
      throw new UnAuthorizedError("User not authorized");
    }

    if (req.file === undefined) {
      const oldpost = {
        title,
        shortdescription,
        longdescription,
        category,
        type,
      };

      const updatedBlog = await blog.findByIdAndUpdate(blogid, oldpost, {
        new: true,
      });

      return res
        .status(StatusCodes.OK)
        .json({ data: updatedBlog, message: "Blog updated successfully" });
    }

    const { path } = req.file;

    const blogphoto = await cloudinary.uploader.upload(path, {
      use_filename: true,
      folder: "AllBlogsImage",
    });

    const oldpost = {
      title,
      shortdescription,
      longdescription,
      category,
      blogimage: blogphoto.secure_url,
      type,
    };

    const updatedBlog = await blog.findByIdAndUpdate(blogid, oldpost, {
      new: true,
    });

    res
      .status(StatusCodes.OK)
      .json({ data: updatedBlog, message: "Blog updated successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blogdata = await blog.findById(id);

    const olduser = req.user._id;

    if (!blogdata) {
      throw new NotFoundError("Blog not found");
    } else if (blogdata.author.toString() !== olduser.toString()) {
      throw new UnAuthorizedError("User not authorized");
    }

    // const userid = olduser.toString();

    try {
      const getUserinfo = await user.findById(olduser);
      const userpost = getUserinfo.mypost;
      const index = userpost.indexOf(id);

      if (index !== -1) {
        console.log(index);

        // Remove the element from the array and store it in changeid
        await userpost.splice(index, 1);

        await blog.findByIdAndDelete(id);

        // Save the changes to the mypost array
        await getUserinfo.save();

        res
          .status(StatusCodes.OK)
          .json({ message: "Blog deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred while updating user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
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
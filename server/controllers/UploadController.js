const Admin = require("../models/adminAuthSchema");
const io = require("../server");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");
const cloudinary = require("../Utils/CloudinaryFileUpload");
const { StatusCodes } = require("http-status-codes");

const UploadFile = async (req, res) => {
    const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    } else if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized to upload");
    } else if (!file) {
      throw new NotFoundError("The file does not exist");
    }

    const {
      originalname,
      format,
      width,
      height,
      created_at,
      secure_url,
      path,
    } = req.file;

    console.log(path);

    const createfile = await cloudinary.uploader.upload(path, {
      use_filename: true,
      folder: "AllBlogsImage",
    });

    console.log(createfile);

    if (!createfile.secure_url) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    console.log(createfile);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const HandleUpload = (io) => {
  io.on("connection", async (socket) => {
    socket.emit("fileupload", async (file) => {});
  });
};

const DeleteUpload = (io) => {};

module.exports = {
  HandleUpload,
  DeleteUpload,
  UploadFile,
};

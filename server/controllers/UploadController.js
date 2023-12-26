const Admin = require("../models/adminAuthSchema");
const FileManager = require("../models/fileManagerSchema");
const FileJoiSchema = require("../Utils/FileJoiSchema");

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
    } else if (!req.file) {
      throw new NotFoundError("The file does not exist");
    }

    const { path } = req.file;

    const createfile = await cloudinary.uploader.upload(path, {
      use_filename: true,
      folder: "Filemanager",
    });

    const fileinfo = {
      originalname: createfile.original_filename,
      format: createfile.format,
      width: createfile.width,
      height: createfile.height,
      created_at: createfile.created_at.toString(),
      secure_url: createfile.secure_url,
    };

    const { error, value } = FileJoiSchema.validate(fileinfo);

    if (error) {
      throw new ValidationError("Invalid file");
    }

    const newfile = await FileManager.create(value);

    console.log("New file uploaded successfully");

    return res
      .status(StatusCodes.CREATED)
      .json({ data: newfile, message: "file uploaded successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const HandleUpload = (io) => {
  io.on("connection", async (socket) => {
    try {
      const fileBatch = await FileManager.find();
      socket.emit("filemanager", fileBatch);
      console.log(fileBatch);
      // socket.disconnect();
    } catch (error) {
      console.error("Error fetching file batch:", error);
      socket.emit("filemanager_error", { error: "Failed to fetch file batch" });
      socket.disconnect();
    }
  });
};

const DeleteUpload = (io) => {};

module.exports = {
  HandleUpload,
  DeleteUpload,
  UploadFile,
};

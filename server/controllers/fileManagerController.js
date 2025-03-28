const Admin = require("../models/adminAuthSchema");
const FileManager = require("../models/fileManagerSchema");
const FileJoiSchema = require("../Utils/FileJoiSchema");
const cloudinary = require("../Utils/CloudinaryFileUpload");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

// Upload a single file
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

// Setup socket connection for real-time updates
const HandleUpload = (io) => {
  if (!io) {
    console.error("Socket.io instance is not provided to HandleUpload");
    return;
  }

  io.on("connection", async (socket) => {
    try {
      console.log("Client connected to file manager socket");

      // Sort files by 'createdAt' in descending order (most recent first)
      const fileBatch = await FileManager.find().sort({ createdAt: -1 });

      // Emit the files in the latest order
      socket.emit("filemanager", fileBatch);
    } catch (error) {
      console.error("Error fetching file batch:", error);
      socket.emit("filemanager_error", { error: "Failed to fetch file batch" });
    }
  });
};

// Placeholder for delete upload functionality
const DeleteUpload = (io) => {
  if (!io) {
    console.error("Socket.io instance is not provided to DeleteUpload");
    return;
  }

  // This can be implemented if needed
  console.log("DeleteUpload function initialized");
};

// Get files with pagination, sorting, and filtering
const GetFiles = async (req, res) => {

   console.log("hit")
  try {
    const { page = 1, limit = 12, sort = "newest", search = "" } = req.query;

    // Build query
    const query = {};

    // Add search functionality
    if (search) {
      query.originalname = { $regex: search, $options: "i" };
    }

    // Determine sort order
    let sortOptions = {};
    if (sort === "newest") {
      sortOptions = { createdAt: -1 };
    } else if (sort === "oldest") {
      sortOptions = { createdAt: 1 };
    }

    // Execute query with pagination
    const files = await FileManager.find(query)
      .sort(sortOptions)
      .limit(Number.parseInt(limit))
      .skip((Number.parseInt(page) - 1) * Number.parseInt(limit));

    // Get total count for pagination
    const totalFiles = await FileManager.countDocuments(query);

    return res.status(StatusCodes.OK).json({
      files,
      totalPages: Math.ceil(totalFiles / limit),
      currentPage: Number.parseInt(page),
      totalFiles,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Delete a single file
const DeleteFile = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    } else if (user.role !== "superadmin" && user.role !== "admin") {
      throw new UnAuthorizedError("You are not authorized to delete files");
    }

    const file = await FileManager.findById(id);

    if (!file) {
      throw new NotFoundError("File not found");
    }

    // Extract public_id from secure_url
    const urlParts = file.secure_url.split("/");
    const filenameWithExt = urlParts[urlParts.length - 1];
    const filename = filenameWithExt.split(".")[0];
    const public_id = `Filemanager/${filename}`;

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Delete from database
    await FileManager.findByIdAndDelete(id);

    // Emit updated files to all connected clients
    const io = req.app.get("io");
    if (io) {
      const updatedFiles = await FileManager.find().sort({ createdAt: -1 });
      io.emit("filemanager", updatedFiles);
    }

    return res.status(StatusCodes.OK).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Delete multiple files
const DeleteMultipleFiles = async (req, res) => {
  const { user } = req;
  const { fileIds } = req.body;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    } else if (user.role !== "superadmin" && user.role !== "admin") {
      throw new UnAuthorizedError("You are not authorized to delete files");
    }

    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      throw new ValidationError("No file IDs provided");
    }

    // Find all files to delete
    const filesToDelete = await FileManager.find({ _id: { $in: fileIds } });

    if (filesToDelete.length === 0) {
      throw new NotFoundError("No files found with the provided IDs");
    }

    // Delete files from Cloudinary
    for (const file of filesToDelete) {
      const urlParts = file.secure_url.split("/");
      const filenameWithExt = urlParts[urlParts.length - 1];
      const filename = filenameWithExt.split(".")[0];
      const public_id = `Filemanager/${filename}`;

      await cloudinary.uploader.destroy(public_id);
    }

    // Delete files from database
    await FileManager.deleteMany({ _id: { $in: fileIds } });

    // Emit updated files to all connected clients
    const io = req.app.get("io");
    if (io) {
      const updatedFiles = await FileManager.find().sort({ createdAt: -1 });
      io.emit("filemanager", updatedFiles);
    }

    return res.status(StatusCodes.OK).json({
      message: `${filesToDelete.length} files deleted successfully`,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  HandleUpload,
  DeleteUpload,
  UploadFile,
  GetFiles,
  DeleteFile,
  DeleteMultipleFiles,
};

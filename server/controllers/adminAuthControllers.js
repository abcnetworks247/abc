const Admin = require("../models/adminAuthSchema");
const Blog = require("../models/blogSchema");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const cookie = require("cookie-parser");
const sendMail = require("../Utils/sendMail");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const { CreateToken, VerifyToken } = require("../Helper/authToken");
const multer = require("multer");
const cloudinary = require("../Utils/CloudinaryFileUpload");

const upload = multer({ dest: "public/tmp" });
const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const Adminjoi = require("../Utils/AdminJoiSchema");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

const Client = require("../models/clientAuthSchema");

const maxAgeInMilliseconds = 7 * 24 * 60 * 60 * 1000;

const signUp = async (req, res) => {
  const { fullname, email, password, role } = req.body;

  try {
    const findUser = await Admin.findOne({ email });

    if (findUser) {
      throw new UnAuthorizedError("Email already exists");
    }

    const { error, value } = Adminjoi.validate({
      fullname,
      email,
      password,
      role,
    });

    if (error) {
      console.log("error");
      throw new ValidationError("error");
    }

    console.log("this is a valid user ", value);

    const newUser = await Admin.create(value);

    console.log(newUser);

    res.status(StatusCodes.CREATED).json({
      data: newUser,
      message: "Account created successfully",
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const olduser = await Admin.findOne({ email });

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    console.log(olduser);

    const authenticatedUser = await olduser.checkPassword(password);

    if (!authenticatedUser) {
      throw new UnAuthorizedError("Invalid login credentials");
    }

    const MaxAge = 3 * 24 * 60 * 60;

    const token = CreateToken(olduser._id, MaxAge);

    console.log(token);

    res.setHeader("Authorization", "Bearer " + token);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.cookie("authtoken", token, {
      maxAge: maxAgeInMilliseconds,
      httpOnly: false,
    });

    res.status(StatusCodes.OK).json({
      message: "Account signed in successfully.",
      authToken: token,
      olduser,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const singleAdmin = async (req, res) => {
  const id = req.params.id;
  const userblog = await Blog.find({ author: id });

  try {
    const olduser = await Admin.findById(id);

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    if (
      olduser.role !== "superadmin" &&
      olduser.role !== "admin" &&
      olduser.role !== "editor"
    ) {
      throw new UnAuthorizedError("Access denied");
    }

    res.status(StatusCodes.OK).json({ olduser, userblog });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userRecovery = async (req, res) => {
  const { email } = req.body;

  try {
    const userexist = await Admin.findOne({ email });

    if (!userexist) {
      console.log("Couldn't find client");
      throw new NotFoundError("User not found");
    }

    console.log("Found client");

    const MaxAge = 5 * 60;
    const token = CreateToken(userexist._id, MaxAge);

    const passwordUpdateUrl = `${serverUrl}/api/v1/admin/auth/account/updatepassword/${token}`;
    const templatePath = path.join(__dirname, "../views/passwordRecovery.ejs");
    const renderHtml = await ejs.renderFile(
      templatePath,
      {
        userFullname: userexist.fullname,
        userEmail: userexist.email,
        userRecoveryUrl: passwordUpdateUrl,
      },

      { async: true }
    );

    await sendMail({
      email: userexist.email,
      subject: "ABCSTUDIO Password Recovery",
      html: renderHtml,
    });

    return res
      .status(StatusCodes.OK)
      .send({ message: `verification email has been sent to ${email}` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userVerifyPasswordReset = async (req, res) => {
  const { token } = req.params;

  console.log("verify password reset", token);

  try {
    const decodedId = VerifyToken(token);

    if (!decodedId) {
      console.log("Invalid token");
      res.redirect(`${adminUrl}/recovery`);
      throw new UnAuthorizedError("Invalid token");
    }

    console.log("Valid token");
    res.redirect(
      `${adminUrl}/auth/updatepassword?verified=true&reset=${token}`
    );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userUpdatePassword = async (req, res) => {
  const { reset, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      throw new ValidationError("Passwords do not match");
    }

    const decodedId = VerifyToken(reset);

    const checkuser = await Admin.findById(decodedId["id"]);

    if (!checkuser) {
      throw new UnAuthorizedError("User not found");
    }

    const hashedPassword = await checkuser.newHashPassword(password);

    await Admin.findByIdAndUpdate(
      checkuser._id,
      { password: hashedPassword },
      { new: true }
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "password updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { fullname, email, phone, userbio } = req.body;

    // Check if the user is authenticated
    if (!req.user) {
      throw new NotFoundError("User not found");
    }

    const { user } = req;

    // Check if the user has the required role to update
    if (["superadmin", "admin", "editor"].includes(user.role)) {
      const updateFields = { fullname, email, phone, userbio };

      if (!req.file) {
        // Update user without a profile picture
        console.log("No profile picture provided");
        const updatedUser = await Admin.findByIdAndUpdate(
          user._id,
          updateFields,
          { new: true }
        );

        return res.status(StatusCodes.OK).json({
          data: updatedUser,
          message: "Account updated successfully",
        });
      } else {
        // Update user with a new profile picture
        console.log("Profile picture provided");

        const { path } = req.file;

        console.log("User path: " + path);

        try {
          // Upload the profile picture to Cloudinary
          const userPhoto = await cloudinary.uploader.upload(path, {
            use_filename: true,
            folder: "AdminDP",
          });

          const updateFieldsWithPhoto = {
            ...updateFields,
            userdp: userPhoto.secure_url,
          };

          // Update user with the new profile picture URL
          const updatedUser = await Admin.findByIdAndUpdate(
            user._id,
            updateFieldsWithPhoto,
            { new: true }
          );

          return res.status(StatusCodes.OK).json({
            message: "Account updated successfully",
            user: updatedUser,
          });
        } catch (uploadError) {
          console.error("Error uploading file to Cloudinary:", uploadError);
          throw new InternalServerError("Error uploading file to Cloudinary");
        }
      }
    } else {
      throw new UnauthorizedError("Unauthorized to update user information");
    }
  } catch (error) {
    console.error("Error updating user account:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const currentUser = async (req, res) => {
  try {
    if (req.user) {
      const olduser = await Admin.findById(req.user._id);
      const userblog = await Blog.find({ author: req.user._id });

      return res
        .status(200)
        .json({ olduser, userblog, message: "data recieved successfully" });
    }

    throw new NotFoundError("User not found");
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userSignOut = async (req, res) => {
  try {
    if (!req.user) {
      throw new NotFoundError("User not found");
    }

    res.setHeader("Authorization", "Bearer " + "");

    res.status(StatusCodes.OK).json({ message: "Signout successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userDelete = async (req, res) => {
  try {
    const { user, userRole } = req;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Allow super admin to delete both admins and editors
    if (userRole === "superadmin") {
      const deleteUser = await Admin.findByIdAndDelete(user._id);

      if (deleteUser) {
        res
          .status(StatusCodes.OK)
          .json({ message: "User deleted successfully" });
        console.log("User deleted successfully");
      }
    } else if (
      (userRole === "admin" && user.role === "editor") ||
      (userRole === "superadmin" && user.role === "admin")
    ) {
      // Allow admin to delete editors and super admin to delete admins
      const deleteUser = await Admin.findByIdAndDelete(user._id);

      if (deleteUser) {
        res
          .status(StatusCodes.OK)
          .json({ message: "User deleted successfully" });
        console.log("User deleted successfully");
      }
    } else {
      throw new UnAuthorizedError("Unauthorized to delete user");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const allAdmin = async (req, res) => {
  try {
    // Retrieve list of admin
    const admin = await Admin.find();

    // Check if user is authenticated
    const user = req.user;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    if (user.role !== "superadmin" && user.role !== "admin") {
      throw new UnAuthorizedError("Access denied");
    }

    // Return success response with client data
    return res.status(StatusCodes.OK).json({ data: admin });
  } catch (error) {
    // Handle errors and return internal server error response
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const allClient = async (req, res) => {
  try {
    // Retrieve list of clients
    const clients = await Client.find();

    // Check if user is authenticated
    const user = req.user;
    console.log("allClient", user);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    if (user.role !== "superadmin" && user.role !== "admin") {
      throw new UnAuthorizedError("Access denied");
    }

    // Return success response with client data
    return res.status(StatusCodes.OK).json({ data: clients });
  } catch (error) {
    // Handle errors and return internal server error response
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const singleClient = async (req, res) => {
  const id = req.params.id;

  try {
    const olduser = await Client.findById(id);

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    if (user.role !== "superadmin" && user.role !== "admin") {
      throw new UnAuthorizedError("Access denied");
    }

    res.status(StatusCodes.OK).json({ olduser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  const clientid = req.body;

  const user = req.user;
  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    if (user.role !== "superadmin" && user.role !== "admin") {
      throw new UnAuthorizedError("Access denied");
    }

    const deleteUser = await Client.findByIdAndDelete(clientid);

    if (deleteUser) {
      res
        .status(StatusCodes.OK)
        .json({ message: "Client deleted successfully" });
      console.log("User deleted successfully");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  userRecovery,
  userUpdatePassword,
  userVerifyPasswordReset,
  singleAdmin,
  currentUser,
  userUpdate,
  userSignOut,
  userDelete,
  allAdmin,
  allClient,
  singleClient,
  deleteClient,
};

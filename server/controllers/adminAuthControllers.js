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

const maxAgeInMilliseconds = 7 * 24 * 60 * 60 * 1000;

const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const findUser = await Admin.findOne({ email });

    if (findUser) {
      throw new UnAuthorizedError("Email already exists");
    }

    console.log("not found");

    const { error, value } = Adminjoi.validate({
      fullname,
      email,
      password,
    });

    if (error) {
      console.log("error");
      throw new ValidationError("error");
    }

    console.log(value);

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
  
  console.log("hit sign");
  const { email, password } = req.body;

  try {
    const olduser = await Admin.findOne({ email });

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    console.log(olduser);

    const authenticatedUser = await olduser.checkPassword(password);

    if (!authenticatedUser) {
      throw new UnAuthorizedError("Invalid credentials");
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

const singleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const olduser = await Admin.findById(id);

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    res.status(StatusCodes.OK).json({ olduser });
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

    const MaxAge = 3 * 24 * 60 * 60;
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

    console.log("hit");

    if (!decodedId) {
      console.log("Invalid token");
      res.redirect(`${adminUrl}/recovery`);
      throw new UnAuthorizedError("Invalid token");
    }

    console.log("Valid token");
    res.redirect(`${adminUrl}/auth/updatepassword?verified=true&reset=${token}`);
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
  const { fullname, email, userbio } = req.body;

  try {
    if (!req.user) {
      throw new NotFoundError("User not found");
    }

    const { user, userRole } = req;

    // Check if the user has the required role to update
    if ((userRole === "superadmin" || userRole === "admin") && user.role === "editor") {
      const updateFields = { fullname, email, userbio };

      if (req.file) {
        const { path } = req.file;
        try {
          const userphoto = await cloudinary.uploader.upload(path, {
            use_filename: true,
            folder: "UserDP",
          });

          console.log(userphoto.secure_url);
          updateFields.userdp = userphoto.secure_url;
        } catch (uploadError) {
          console.error("Error uploading file to Cloudinary:", uploadError);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Error uploading file to Cloudinary" });
        }
      }

      const updatedUser = await Admin.findByIdAndUpdate(
        user._id,
        updateFields,
        { new: true }
      );

      res.status(StatusCodes.OK).json({
        message: "Account updated successfully",
        user: updatedUser,
      });
    } else {
      throw new UnAuthorizedError("Unauthorized to update user information");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const currentUser = async (req, res) => {
  try {
    if (req.user) {
      const olduser = await Admin.findById(req.user._id);

      return res
        .status(200)
        .json({ olduser, message: "data recieved successfully" });
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
        res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
        console.log("User deleted successfully");
      }
    } else if ((userRole === "admin" && user.role === "editor") || (userRole === "superadmin" && user.role === "admin")) {
      // Allow admin to delete editors and super admin to delete admins
      const deleteUser = await Admin.findByIdAndDelete(user._id);

      if (deleteUser) {
        res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
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


module.exports = {
  signUp,
  signIn,
  userRecovery,
  userUpdatePassword,
  userVerifyPasswordReset,
  singleUser,
  currentUser,
  userUpdate,
  userSignOut,
  userDelete,
};

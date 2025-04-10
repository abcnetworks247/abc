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
const bcrypt = require("bcrypt");

const upload = multer({ dest: "public/tmp" });
const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const Adminjoi = require("../Utils/AdminJoiSchema");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
  InternalServerError,
} = require("../errors/index");

const Client = require("../models/clientAuthSchema");
const Subscription = require("../models/subscriptionSchema");
const Donation = require("../models/donationSchema");

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
      throw new ValidationError(error.message);
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
    console.log("Login attempt for email:", email);

    // Find the user by email
    const olduser = await Admin.findOne({ email });

    // If user not found, throw a NotFoundError
    if (!olduser) {
      console.log("User not found with email:", email);
      throw new NotFoundError("User not found");
    }

    console.log("User found:", olduser.email);
    console.log("Stored password hash:", olduser.password);

    // Authenticate user by checking password
    console.log("Attempting to verify password");
    const authenticatedUser = await bcrypt.compare(password, olduser.password);

    console.log("Password verification result:", authenticatedUser);

    // If password doesn't match, throw an UnAuthorizedError
    if (!authenticatedUser) {
      throw new UnAuthorizedError("Invalid login credentials");
    }

    // If authentication successful, create and send token
    const MaxAge = 90 * 24 * 60 * 60; //90 days in seconds
    const token = CreateToken(olduser._id, MaxAge);

    // Set token in response header and cookie
    res.setHeader("Authorization", "Bearer " + token);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.cookie("authtoken", token, {
      maxAge: MaxAge * 1000, // Convert seconds to milliseconds
      httpOnly: false,
    });

    // Respond with success message and user data
    res.status(StatusCodes.OK).json({
      message: "Account signed in successfully.",
      authToken: token,
      olduser,
    });
  } catch (error) {
    // Handle errors
    console.error("Login error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const singleAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const olduser = await Admin.findById(id);
    const userblog = await Blog.find({ author: id });

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

  console.log("email", email);

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
      subject: "Password Recovery",
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

  console.log("Password reset request received");

  try {
    if (password !== confirmPassword) {
      throw new ValidationError("Passwords do not match");
    }

    // Verify token and get user ID
    const decodedId = VerifyToken(reset);
    console.log("Decoded token:", decodedId);

    if (!decodedId || !decodedId.id) {
      throw new UnAuthorizedError("Invalid or expired token");
    }

    // Find the user by ID
    const userId = decodedId.id;
    console.log("Looking for user with ID:", userId);

    const user = await Admin.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    console.log("User found:", user.email);

    // Hash the password directly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    // Update the user document directly with the hashed password
    const updatedUser = await Admin.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    console.log("Password updated successfully for user:", updatedUser.email);

    // For debugging: verify the new password would work
    const passwordCheck = await bcrypt.compare(password, updatedUser.password);
    console.log("Password verification check:", passwordCheck);

    return res.status(StatusCodes.OK).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      success: false,
    });
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
      throw new UnAuthorizedError("Unauthorized to update user information");
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
    res.clearCookie("authtoken");

    res.status(StatusCodes.OK).json({ message: "Signout successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userDelete = async (req, res) => {
  const { id } = req.body;

  try {
    const { user } = req;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // If user is deleting their own account
    if (user._id.toString() === id) {
      const deleteUser = await Admin.findByIdAndDelete(user._id);

      if (deleteUser) {
        return res
          .status(StatusCodes.OK)
          .json({ message: "User deleted successfully" });
      }
    }

    const olduser = await Admin.findById(id);

    if (!olduser) {
      throw new NotFoundError("User to delete not found");
    }

    // Check permissions based on roles
    if (
      (user.role === "owner" &&
        ["superadmin", "admin", "editor"].includes(olduser.role)) ||
      (user.role === "superadmin" &&
        ["admin", "editor"].includes(olduser.role)) ||
      (user.role === "admin" && olduser.role === "editor")
    ) {
      const deleteUser = await Admin.findByIdAndDelete(id);

      if (deleteUser) {
        return res
          .status(StatusCodes.OK)
          .json({ message: "User deleted successfully" });
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
    const page = req.query.page ? Number.parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? Number.parseInt(req.query.perPage) : 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * perPage;

    // Retrieve list of admin with pagination
    const admin = await Admin.find().skip(skip).limit(perPage);

    // Check if user is authenticated
    const user = req.user;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    if (user.role !== "superadmin" && user.role !== "admin") {
      throw new UnAuthorizedError("Access denied");
    }

    // Return success response with admin data
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
    const page = req.query.page ? Number.parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? Number.parseInt(req.query.perPage) : 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * perPage;

    // Retrieve list of clients with pagination
    const clients = await Client.find().skip(skip).limit(perPage);

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
    const user = req.user;

    if (!user) {
      throw new NotFoundError("Admin user not found");
    }

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

const adminDeleteClient = async (req, res) => {
  const { id } = req.body;

  console.log("id", id);

  const user = req.user;
  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    if (
      user.role !== "owner" &&
      user.role !== "superadmin" &&
      user.role !== "admin"
    ) {
      throw new UnAuthorizedError("Access denied");
    }

    const deleteUser = await Client.findByIdAndDelete(id);

    if (deleteUser) {
      res
        .status(StatusCodes.OK)
        .json({ message: "Client deleted successfully" });
      console.log("User deleted successfully");
    } else {
      throw new NotFoundError("Client not found");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

//Admin manipulation Controller
const adminDeleteAdmin = async (req, res) => {
  const { id } = req.body;

  console.log("this is id", id);

  const user = req.user;
  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    const oldAdmin = await Admin.findById(id);

    if (!oldAdmin) {
      throw new NotFoundError("Admin not found");
    }

    if (
      user.role === "owner" &&
      ["superadmin", "admin", "editor"].includes(oldAdmin.role)
    ) {
      const deleteUser = await Admin.findByIdAndDelete(id);

      if (deleteUser) {
        return res
          .status(StatusCodes.OK)
          .json({ message: "Admin deleted successfully" });
      }
    } else if (
      user.role === "superadmin" &&
      ["admin", "editor"].includes(oldAdmin.role)
    ) {
      const deleteUser = await Admin.findByIdAndDelete(id);

      if (deleteUser) {
        console.log("delete user is successful");
        return res
          .status(StatusCodes.OK)
          .json({ message: "Admin deleted successfully" });
      }
    } else if (user.role === "admin" && oldAdmin.role === "editor") {
      const deleteUser = await Admin.findByIdAndDelete(id);

      if (deleteUser) {
        return res
          .status(StatusCodes.OK)
          .json({ message: "Admin deleted successfully" });
      }
    } else {
      throw new UnAuthorizedError("Access denied");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const adminRoleUpdateAdmin = async (req, res) => {
  const { id, role } = req.body;

  console.log(id, role);

  const user = req.user;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user role for authorization
    const oldAdmin = await Admin.findById(id);

    if (!oldAdmin) {
      throw new NotFoundError("Admin not found");
    }

    if (
      user.role === "owner" &&
      ["superadmin", "admin", "editor"].includes(oldAdmin.role)
    ) {
      const updateUser = await Admin.findByIdAndUpdate(
        id,
        { role: role },
        { new: true }
      );

      return res.status(StatusCodes.OK).json({
        data: updateUser,
        message: "Account updated successfully",
      });
    } else if (
      user.role === "superadmin" &&
      ["admin", "editor"].includes(oldAdmin.role)
    ) {
      console.log("superadmin role in charge");
      const updateUser = await Admin.findByIdAndUpdate(
        id,
        { role: role },
        { new: true }
      );

      return res.status(StatusCodes.OK).json({
        data: updateUser,
        message: "Account updated successfully",
      });
    } else if (user.role === "admin" && oldAdmin.role === "editor") {
      const updateUser = await Admin.findByIdAndUpdate(
        id,
        { role: role },
        { new: true }
      );

      return res.status(StatusCodes.OK).json({
        data: updateUser,
        message: "Account updated successfully",
      });
    } else {
      throw new UnAuthorizedError("Access denied");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const dashboardData = async (req, res) => {
  try {
    // Check if user is authenticated
    const user = req.user;
    if (!user) {
      throw new NotFoundError("User not found");
    }

    console.log("API hit: Fetching dashboard data");

    // Count documents
    const allBlogs = await Blog.countDocuments();
    const allClients = await Client.countDocuments();
    const allDonations = await Donation.countDocuments();
    const allSubscriptions = await Subscription.countDocuments();

    // Return response
    res.status(200).json({
      blogs: allBlogs,
      clients: allClients,
      donations: allDonations,
      subscriptions: allSubscriptions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: error.message });
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
  adminDeleteClient,
  adminDeleteAdmin,
  adminRoleUpdateAdmin,
  dashboardData,
};

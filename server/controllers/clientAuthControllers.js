const Client = require("../models/clientAuthSchema");
const Product = require("../models/productsSchema");
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

const Clientjoi = require("../Utils/ClientJoiSchema");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
  InternalServerError,
} = require("../errors/index");

const maxAgeInMilliseconds = 7 * 24 * 60 * 60 * 1000;

const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const findUser = await Client.findOne({ email });

    if (findUser) {
      throw new UnAuthorizedError("Email already exists");
    }

    const { error, value } = Clientjoi.validate({
      fullname,
      email,
      password,
    });

    if (error) {
      throw new ValidationError(error.message);
    }

    const newUser = await Client.create(value);

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

  console.log("Login attempt for email:", email);

  try {
    const oldUser = await Client.findOne({ email });

    if (!oldUser) {
      console.log("User not found with email:", email);
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    console.log("User found:", oldUser.email);
    console.log("Stored password hash:", oldUser.password);

    // Use await with the async method
    const authenticatedUser = await oldUser.checkPassword(password);
    console.log("Authentication result:", authenticatedUser);

    if (!authenticatedUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }

    const maxAgeInMilliseconds = 90 * 24 * 60 * 60 * 1000; // 90 days
    const token = CreateToken(oldUser._id, maxAgeInMilliseconds / 1000); // Convert to seconds for token creation

    res.setHeader("Authorization", "Bearer " + token);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.cookie("authToken", token, {
      maxAge: maxAgeInMilliseconds,
      httpOnly: false,
    });

    res.status(StatusCodes.OK).json({
      message: "Account signed in successfully.",
      authToken: token,
      oldUser,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const singleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const olduser = await Client.findById(id);
    const userblog = await Blog.find({ author: id });

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    res.status(StatusCodes.OK).json({
      olduser,
      userblog: userblog || [],
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userRecovery = async (req, res) => {
  const { email } = req.body;

  try {
    const userexist = await Client.findOne({ email });

    if (!userexist) {
      throw new NotFoundError("User not found");
    }

    const MaxAge = 5 * 60;
    const token = CreateToken(userexist._id, MaxAge);

    const passwordUpdateUrl = `${serverUrl}/api/v1/client/auth/account/updatepassword/${token}`;
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

  try {
    const decodedId = VerifyToken(token);

    if (!decodedId) {
      res.redirect(`${clientUrl}/recovery`);
      throw new UnAuthorizedError("Invalid token");
    }

    res.redirect(`${clientUrl}/updatepassword?verified=true&reset=${token}`);
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

    const user = await Client.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    console.log("User found:", user.email);

    // Hash the password directly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    // Update the user document directly with the hashed password
    const updatedUser = await Client.findByIdAndUpdate(
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

const activeUserUpdatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  console.log("Active user password update request received");

  const { user } = req;

  try {
    if (newPassword !== confirmNewPassword) {
      throw new ValidationError("New passwords do not match");
    }

    const userid = String(user._id);
    console.log("User ID:", userid);

    const checkuser = await Client.findById(userid);

    if (!checkuser) {
      throw new UnAuthorizedError("User not found");
    }

    console.log("User found:", checkuser.email);

    // Verify old password
    const checkPassword = await checkuser.checkPassword(oldPassword);
    console.log("Old password verification:", checkPassword);

    if (!checkPassword) {
      console.log("Password check failed");
      throw new UnAuthorizedError("Old password is invalid");
    }

    // Hash the new password directly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log("New password hashed successfully");

    // Update the user document directly with the hashed password
    const updatedUser = await Client.findByIdAndUpdate(
      checkuser._id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    console.log("Password updated successfully for user:", updatedUser.email);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userUpdate = async (req, res) => {
  const { fullname, email, userbio, phone, shippingaddress } = req.body;

  try {
    if (!req.user) {
      throw new NotFoundError("User not found");
    }

    if (!req.file) {
      const olduser = {
        fullname,
        email,
        userbio,
        phone,
        shippingaddress,
      };

      const mainuser = await Client.findByIdAndUpdate(
        String(req.user._id),
        olduser,
        {
          new: true,
        }
      );

      res
        .status(StatusCodes.OK)
        .json({ data: mainuser, message: "Account updated successfully" });
    } else {
      const { path } = req.file;

      console.log(path);

      try {
        const userphoto = await cloudinary.uploader.upload(path, {
          use_filename: true,
          folder: "UserDP",
        });

        console.log(userphoto.secure_url);

        const olduser = {
          fullname,
          email,
          userbio,
          phone,
          shippingaddress,
          userdp: userphoto.secure_url,
        };

        const updatedUser = await Client.findByIdAndUpdate(
          String(req.user._id),
          olduser,
          {
            new: true,
          }
        );

        res.status(StatusCodes.OK).json({
          message: "Account updated successfully",
          user: updatedUser,
        });
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Error uploading file to Cloudinary" });
      }
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const currentUser = async (req, res) => {
  try {
    if (req.user) {
      const user = await Client.findById(req.user._id);

      if (!user) {
        throw new NotFoundError("User not found in database");
      }

      const olduser = await Client.populate(user, [
        { path: "cart.product" },
        { path: "orderhistory" },
        { path: "subscriptionhistory" },
        { path: "productpurchasehistory" },
        { path: "orderhistory.cart.product" }, // Populate cart.product in orderhistory
        { path: "productpurchasehistory.cart.product" }, // Populate cart.product in productpurchasehistory
        { path: "donationhistory" },
      ]);

      return res
        .status(200)
        .json({ olduser, message: "data received successfully" });
    }

    throw new NotFoundError("User not found in request");
  } catch (error) {
    console.error("Error fetching current user:", error);
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
    res.clearCookie("authToken");

    res.status(StatusCodes.OK).json({ message: "Signout successfully" });
  } catch (error) {
    console.error("Error signing out:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const userDelete = async (req, res) => {
  const { email, password } = req.body;
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (email !== user.email) {
      throw new UnAuthorizedError("Invalid email address");
    }

    const userid = String(user._id);
    const oldUser = await Client.findById(userid);

    if (!oldUser) {
      throw new NotFoundError("User not found");
    }

    const isAuthenticated = await oldUser.checkPassword(password);

    if (isAuthenticated) {
      await Client.findByIdAndDelete(userid);
      res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
    } else {
      throw new UnAuthorizedError("Incorrect password");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error instanceof NotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    }
    if (error instanceof UnAuthorizedError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: error.message });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const Wishlist = (io) => {
  io.on("connection", (socket) => {
    socket.on("wishadd", async (wish) => {
      try {
        const user = await Client.findById(wish.userId);

        if (!user) {
          throw new NotFoundError("User not found");
        }

        const product = await Product.findById(wish.productId);

        if (!product) {
          throw new NotFoundError("Product not found");
        } else if (user.wishlist.includes(wish.productId)) {
          const index = user.wishlist.indexOf(wish.productId);
          user.wishlist.splice(index, 1);

          await user.save();

          const userwish = await user.populate("wishlist");

          socket.emit("wishlist", userwish.wishlist);
        } else {
          user.wishlist.unshift(wish.productId);

          await user.save();

          const userwish = await user.populate("wishlist");

          socket.emit("wishlist", userwish.wishlist);
        }
      } catch (error) {
        console.error("Wishlist error:", error);
      }
    });
  });
};

const Cart = (io) => {
  io.on("connection", (socket) => {
    socket.on("cartadd", async (cart) => {
      try {
        const user = await Client.findById(cart.userId);

        if (!user) {
          throw new NotFoundError("User not found");
        }

        const product = await Product.findById(cart.productId);

        if (!product) {
          throw new NotFoundError("Product not found");
        }

        const existingProduct = user.cart.find(
          (p) => String(p.product) === cart.productId
        );

        if (!existingProduct) {
          user.cart.unshift({ product: product._id, quantity: 1 });
        } else {
          existingProduct.quantity += 1;
        }

        await user.save();

        const populatedCart = await Client.populate(user, {
          path: "cart.product",
        });

        socket.emit("cart", populatedCart.cart);
      } catch (error) {
        console.error("Cart add error:", error);
      }
    });

    socket.on("cartminus", async (cart) => {
      try {
        const user = await Client.findById(cart.userId);

        if (!user) {
          throw new NotFoundError("User not found");
        }

        const existingProduct = user.cart.find((p) =>
          p.product.equals(cart.productId)
        );

        if (existingProduct && existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        }

        await user.save();

        const populatedCart = await Client.populate(user, {
          path: "cart.product",
        });

        socket.emit("cart", populatedCart.cart);
      } catch (error) {
        console.error("Cart minus error:", error);
      }
    });

    socket.on("cartremove", async (cart) => {
      try {
        const user = await Client.findById(cart.userId);

        if (!user) {
          throw new NotFoundError("User not found");
        }

        // Find the index of the product to remove
        const productIndex = user.cart.findIndex(
          (item) => String(item.product) === cart.productId
        );

        if (productIndex !== -1) {
          // Remove the product at the found index
          user.cart.splice(productIndex, 1);
        }

        await user.save();

        const populatedCart = await Client.populate(user, {
          path: "cart.product",
        });

        socket.emit("cart", populatedCart.cart);
      } catch (error) {
        console.error("Cart remove error:", error);
      }
    });
  });
};

module.exports = {
  signUp,
  signIn,
  userRecovery,
  userUpdatePassword,
  userVerifyPasswordReset,
  activeUserUpdatePassword,
  singleUser,
  currentUser,
  userUpdate,
  userSignOut,
  userDelete,
  Wishlist,
  Cart,
};

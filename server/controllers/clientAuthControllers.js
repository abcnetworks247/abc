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

const upload = multer({ dest: "public/tmp" });
const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const Clientjoi = require("../Utils/ClientJoiSchema");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
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
      throw new ValidationError("error");
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

  console.log(email, password);

  try {
    const olduser = await Client.findOne({ email });

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    const authenticatedUser = await olduser.checkPassword(password);

    console.log("found user", authenticatedUser);

    if (!authenticatedUser) {
      throw new UnAuthorizedError("Invalid email or password");
    }

    console.log("yes", authenticatedUser);

    const MaxAge = 3 * 24 * 60 * 60;

    const token = CreateToken(olduser._id, MaxAge);

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
    const olduser = await Client.findById(id);
    const userblog = await Blog.find({ author: id });

    if (!olduser) {
      throw new NotFoundError("User not found");
    }

    if (!userblog) {
      throw new NotFoundError("No Blog found");
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

  try {
    if (password !== confirmPassword) {
      throw new ValidationError("Passwords do not match");
    }

    const decodedId = VerifyToken(reset);

    const checkuser = await Client.findById(decodedId["id"]);

    if (!checkuser) {
      throw new UnAuthorizedError("User not found");
    }

    const hashedPassword = await checkuser.newHashPassword(password);

    await Client.findByIdAndUpdate(
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

const activeUserUpdatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  console.log(oldPassword, newPassword, confirmNewPassword);

  const { user } = req;

  try {
    if (newPassword !== confirmNewPassword) {
      throw new ValidationError("Passwords do not match");
    }

    let userid = String(user._id);

    const checkuser = await Client.findById(userid);

    if (!checkuser) {
      throw new UnAuthorizedError("User not found");
    }

    const checkPassword = await checkuser.checkPassword(oldPassword);

    if (!checkPassword) {
      console.log("Password check failed");
      throw new UnAuthorizedError("old password is invalid");
    }

    const hashedPassword = await checkuser.newHashPassword(newPassword);

    await Client.findByIdAndUpdate(
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
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Error uploading file to Cloudinary" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const currentUser = async (req, res) => {
  try {
    if (req.user) {
      const user = await Client.findById(req.user._id);

      const olduser = await Client.populate(user, [
        { path: "cart.product" },
        { path: "orderhistory" },
        { path: "subscriptionhistory" },
        { path: "productpurchasehistory" },
        { path: "donationhistory" },
      ]);

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
  const { email, password } = req.body;

  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (email !== user.email) {
      throw new UnAuthorizedError("you are not authorized to delete this user");
    }

    let userid = String(user._id);

    const olduser = await Client.findById(userid);

    const authenticatedUser = await olduser.checkPassword(password);

    if (!authenticatedUser) {
      throw new UnAuthorizedError("you are not authorized to delete this user");
    }

    const deleteUser = await Client.findByIdAndDelete(userid);

    if (deleteUser) {
      res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
    }
  } catch (error) {
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

          user.save();

          // const currentuser = Client.findById(wish.userId).populate("wishlist", )

          const userwish = await user.populate("wishlist");

          socket.emit("wishlist", userwish.wishlist);
        } else {
          user.wishlist.unshift(wish.productId);

          user.save();

          const userwish = await user.populate("wishlist");

          socket.emit("wishlist", userwish.wishlist);
        }
      } catch (error) {}
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
        console.error(error);
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
        console.error(error);
      }
    });

    socket.on("cartremove", async (cart) => {
      try {
        const user = await Client.findById(cart.userId);

        if (!user) {
          throw new NotFoundError("User not found");
        }

        user.cart.pull({ product: cart.productId });

        await user.save();

        const populatedCart = await Client.populate(user, {
          path: "cart.product",
        });

        socket.emit("cart", populatedCart.cart);
      } catch (error) {
        console.error(error);
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

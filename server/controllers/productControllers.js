const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productsSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const ProductJoi = require("../Utils/ProductJoiSchema");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

const localurl = process.env.CLIENT_URL



// Controller for creating a product (accessible only to admin)
const createProduct = async (req, res) => {
  try {
    // Assuming you have middleware to authenticate and authorize users

    if (!req.user) {
      throw new UnAuthorizedError("You must be logged in to access this page");
    }

    if (!["superadmin", "admin"].includes(req.user.role)) {
      throw new UnAuthorizedError(
        "Only super admins or admins can access this page"
      );
    }

    // Extract product data from the request body
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
      color,
      warranty,
      weight,
    } = req.body;

    // Construct an object with the extracted data
    const productData = {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
      color,
      warranty,
      weight,
    };

    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Discount Percentage:", discountPercentage);
    console.log("Rating:", rating);
    console.log("Stock:", stock);
    console.log("Brand:", brand);
    console.log("Category:", category);
    console.log("Thumbnail:", thumbnail);
    console.log("Images:", images);
    console.log("Color:", color);
    console.log("Warranty:", warranty);
    console.log("Weight:", weight);

    // Validate the request body against the Joi schema
    const { error, value } = ProductJoi.validate(productData);

    if (error) {
      throw new ValidationError("Invalid data received");
    }

    // Save the product to the database
    await Product.create(value);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// Controller for fetching a list of products (accessible to all users)
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

//Updating existing product data from the server
const updateProduct = async (req, res) => {
  try {
    // Assuming you have middleware to authenticate and authorize users
    if (
      !req.user ||
      (req.user.role !== "superadmin" && req.user.role !== "admin")
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Only admins can update products" });
    }

    // Extract product data from the request body
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
      color,
      warranty,
      weight,
      productid,
    } = req.body;

    const existingProduct = await Product.findById(productid);

    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    // Construct an object with the extracted data
    const productData = {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
      color,
      warranty,
      weight,
    };

    // Validate the request body against the Joi schema
    const { error, value } = ProductJoi.validate(productData);

    if (error) {
      console.log("");
      throw new ValidationError("Invalid data received");
    }

    console.log("value", value);

    // Find the existing product by ID

    // Update the existing product with the new data
    const updatedProduct = await Product.findByIdAndUpdate(productid, value, {
      new: true,
    });

    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

//delete product from the database
const deleteProduct = async (req, res) => {
  try {
    // Authenticate and authorize the user
    const user = req.user;

    if (!user) {
      throw new UnAuthorizedError("You must be logged in to access this page.");
    }

    if (!["superadmin", "admin"].includes(user.role)) {
      throw new UnAuthorizedError(
        "You are not authorized to access this page."
      );
    }

    const { id } = req.body;

    // Find the product by ID
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    // Remove the product from the database
    await existingProduct.remove();

    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

//getting sinlge products based on the user parameters
const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const StripeCheckout = async (req, res) => {
  console.log("hit check out");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${localurl}/paymentsuccess?success=true`,
    cancel_url: `${localurl}/paymenterror?canceled=true`,
  });

  res.send({ clientSecret: session.client_secret });
};

module.exports = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  StripeCheckout,
};

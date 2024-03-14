const { StatusCodes } = require('http-status-codes');
const Product = require('../models/productsSchema');
const coinbase = require('coinbase-commerce-node');
const PurchaseHistoryModel = require('../models/purchaseSchema');
const OrderHistoryModel = require('../models/orderHistorySchema');
const PurchaseHistoryJoi = require('../Utils/PurchaseHistoryJoi');
const OrderHistoryJoi = require('../Utils/OrderHistoryJoi');
const sendMail = require('../Utils/sendMail');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

var Webhook = coinbase.Webhook;
const dotenv = require('dotenv').config();

const Client = require('../models/clientAuthSchema');
const coinbaseClient = coinbase.Client;
const resources = coinbase.resources;

const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);
const stripeWebhookPurchaseSecret = process.env.STRIPE_PRODUCT_WEBHOOK_SECRETE;
// const clientObj = Client.init(process.env.COINBASE_API_KEY);
// clientObj.setRequestTimeout(3000);

const ProductJoi = require('../Utils/ProductJoiSchema');
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require('../errors/index');

const localurl = process.env.CLIENT_URL;

// Controller for creating a product (accessible only to admin)
const createProduct = async (req, res) => {
  try {
    // Assuming you have middleware to authenticate and authorize users

    if (!req.user) {
      throw new UnAuthorizedError('You must be logged in to access this page');
    }

    if (!['superadmin', 'admin'].includes(req.user.role)) {
      throw new UnAuthorizedError(
        'Only super admins or admins can access this page'
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

    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Price:', price);
    console.log('Discount Percentage:', discountPercentage);
    console.log('Rating:', rating);
    console.log('Stock:', stock);
    console.log('Brand:', brand);
    console.log('Category:', category);
    console.log('Thumbnail:', thumbnail);
    console.log('Images:', images);
    console.log('Color:', color);
    console.log('Warranty:', warranty);
    console.log('Weight:', weight);

    // Validate the request body against the Joi schema
    const { error, value } = ProductJoi.validate(productData);

    if (error) {
      throw new ValidationError('Invalid data received');
    }

    // Save the product to the database
    await Product.create(value);

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

// Controller for fetching a list of products (accessible to all users)
const getAllProducts = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * perPage;

    // Fetch products from the database with pagination
    const products = await Product.find().skip(skip).limit(perPage);

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

//Updating existing product data from the server
const updateProduct = async (req, res) => {
  try {
    // Assuming you have middleware to authenticate and authorize users
    if (
      !req.user ||
      (req.user.role !== 'superadmin' && req.user.role !== 'admin')
    ) {
      return res
        .status(403)
        .json({ error: 'Unauthorized: Only admins can update products' });
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
        .json({ error: 'Product not found' });
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
      console.log('');
      throw new ValidationError('Invalid data received');
    }

    console.log('value', value);

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
      .json({ error: 'Internal Server Error' });
  }
};

//delete product from the database
const deleteProduct = async (req, res) => {
  try {
    // Authenticate and authorize the user
    const user = req.user;

    if (!user) {
      throw new UnAuthorizedError('You must be logged in to access this page.');
    }

    if (!['superadmin', 'admin'].includes(user.role)) {
      throw new UnAuthorizedError(
        'You are not authorized to access this page.'
      );
    }

    const { id } = req.body;

    // Find the product by ID
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }

    // Remove the product from the database
    await existingProduct.remove();

    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
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
        .json({ error: 'Product not found' });
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      // Return a bad request response if query parameter is missing
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Missing query parameter' });
    }

    // Perform search query on the database
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search by title
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive search by description
      ],
    });

    if (products.length === 0) {
      // Return a not found response if no products match the query
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'No products found matching the query' });
    }

    // Return the found products as JSON with a success status code
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    // Return an internal server error response if an unexpected error occurs
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const StripeCheckout = async (req, res) => {
  const {
    product,
    phone,
    shippingAddress,
    postalcode,
    city,
    state,
    country,
    note,
  } = req.body;

  const user = req.user;
  let customer;

  try {
    if (!user) {
      throw new UnAuthorizedError(
        'User must be logged in to purchase a product'
      );
    }

    await Client.findByIdAndUpdate(
      String(user._id),
      {
        phone: phone,
      },
      { new: true }
    );

    const existingCustomer = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (existingCustomer.data.length > 0) {
      // Customer already exists
      customer = existingCustomer.data[0];

      // Check if the customer already has an active subscription
    } else {
      // No customer found, create a new one

      customer = await stripe.customers.create({
        email: user.email,
        name: user.fullname,
        phone: Number(phone),
        address: {
          line1: shippingAddress,
          line2: Number(phone),
          city: city,
          postal_code: postalcode,
          state: state,
          country: country,
        },
        metadata: {
          userId: user._id,
        },
      });
    }

    const lineItems = product.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.product.title,
          images: [product.product.thumbnail],
        },
        unit_amount: product.product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      customer: customer.id,
      mode: 'payment',
      // cart: JSON.stringify(lineItems),
      success_url: `${localurl}/paymentsuccess?success=true`,
      cancel_url: `${localurl}/paymenterror?canceled=true`,
      metadata: {
        // Include product information in metadata
        description: note,
      },
    });

    res.status(StatusCodes.OK).send({ url: session.url });
  } catch (error) {
    console.error('Error in StripeCheckout:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: 'Internal server error' });
  }
};

const stripeProductWebhook = async (req, res) => {
  console.log('stripe webhook for product');

  const templatePath = path.join(__dirname, '../views/purchaseView.ejs');
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookPurchaseSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log('new');
  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      console.log('payment failed', checkoutSessionAsyncPaymentFailed);
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      console.log('Checkout successful', checkoutSessionAsyncPaymentSucceeded);
      break;

    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded

      let email = checkoutSessionCompleted.customer_details.email;

      const olduser = await Client.findOne({ email });

      const donationTime = new Date(); // Instantiate a new Date object for current time
      const hours = donationTime.getHours();
      const minutes = donationTime.getMinutes();
      const seconds = donationTime.getSeconds();

      // Format the time
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const currentDate = new Date(); // Instantiate a new Date object for current date
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(currentDate.getDate()).padStart(2, '0');

      // Format the date
      const formattedDate = `${year}-${month}-${day}`;

      let cartdesc = checkoutSessionCompleted.metadata.description;

      // Assuming your cart contains product IDs

      const productIds = olduser.cart.map((item) => item.product);

      // Retrieve the full product details from MongoDB using product IDs
      const products = await Product.find({ _id: { $in: productIds } });

      // Map each item in the cart to its corresponding product information
      const combinedCart = olduser.cart.map((item) => {
        // Find the product object in the products array that matches the current item's product ID
        const productInfo = products.find(
          (product) => product._id.toString() === item.product.toString()
        );

        // Return an object containing product information, quantity, and other properties from the original cart item
        return {
          product: productInfo,
          quantity: item.quantity,
          _id: item._id,
        };
      });

      console.log(combinedCart);

      const data = {
        email: olduser.email,
        name: olduser.fullname,
        amount: checkoutSessionCompleted.amount_total / 100,
        currency: checkoutSessionCompleted.currency,
        payment_Date: formattedDate, // Current date
        payment_Time: formattedTime, // Current time
        cart: combinedCart,
        note: cartdesc,
        payment_status: checkoutSessionCompleted.payment_status,
        payment_method_types: checkoutSessionCompleted.payment_method_types[0],
        transaction_Id: checkoutSessionCompleted.id,
        phone: olduser.phone,
        address: checkoutSessionCompleted.customer_details.address.line1,
        city: checkoutSessionCompleted.customer_details.address.city,
        postal_code:
          checkoutSessionCompleted.customer_details.address.postal_code,
        state: checkoutSessionCompleted.customer_details.address.state,
        country: checkoutSessionCompleted.customer_details.address.country,
      };

      const data2 = {
        email: olduser.email,
        name: olduser.fullname,
        amount: checkoutSessionCompleted.amount_total / 100,
        currency: checkoutSessionCompleted.currency,
        payment_Date: formattedDate, // Current date
        payment_Time: formattedTime, // Current time
        cart: combinedCart,
        note: cartdesc,
        delivery_Status: 'pending',
        payment_status: checkoutSessionCompleted.payment_status,
        payment_method_types: checkoutSessionCompleted.payment_method_types[0],
        transaction_Id: checkoutSessionCompleted.id,
        phone: olduser.phone,
        address: checkoutSessionCompleted.customer_details.address.line1,
        city: checkoutSessionCompleted.customer_details.address.city,
        postal_code:
          checkoutSessionCompleted.customer_details.address.postal_code,
        state: checkoutSessionCompleted.customer_details.address.state,
        country: checkoutSessionCompleted.customer_details.address.country,
      };

      // const { error, value } = PurchaseHistoryJoi.validate(data);
      // const { error1, value1 } = OrderHistoryJoi.validate(data2);

      // if (error) {
      //   throw new ValidationError("Data recieved is invalid");
      // }

      // if (error1) {
      //   throw new ValidationError("Data recieved is invalid");
      // }

      const newData = await PurchaseHistoryModel.create(data);
      const newData1 = await OrderHistoryModel.create(data2);

      await Client.findByIdAndUpdate(olduser._id, {
        $push: {
          productpurchasehistory: newData._id,
          orderhistory: newData1._id,
        },
        $set: {
          cart: [],
        },
      });

      const renderHtml = await ejs.renderFile(
        templatePath,
        {
          userFullname: olduser.fullname,
          userEmail: olduser.email,
          // donation_data: data,
        },
        { async: true }
      );

      await sendMail({
        email: olduser.email,
        subject: 'Thank you for your order',
        html: renderHtml,
      });

      console.log('sent email product successfully');

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end();
};

// const Crypto = async (req, res) => {
//   const { product } = req.body;

//   const user = req.user;

//   try {
//     if (!user) {
//       throw new UnAuthorizedError(
//         "User must be logged in to purchase a product"
//       );
//     }

//     const lineItems = product.map((product) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.product.title,
//           images: [product.product.thumbnail],
//         },
//         unit_amount: product.product.price * 100,
//       },
//       quantity: product.quantity,
//     }));

//     const chargeData = {
//       name: product.name,
//       description: product.description,
//       pricing_type: "fixed_price",
//       local_price: {
//         amount: product.price,
//         currency: product.currency,
//       },
//       metadata: {
//         product_id: product.id,
//         user_id: user.email,
//       },
//     };

//     const charge = await resources.Charge.create(chargeData);

//     res.status(StatusCodes.OK).json({ data: charge });
//   } catch (e) {
//     res.status(500).send({ error: e });
//   }
// };

// const CryptoWebhook = async (req, res) => {
//   try {
//     const event = Webhook.verifySigHeader(
//       req.rawBody,
//       req.headers["x-cc-webhook-signature"],
//       process.env.COINBASE_API_KEY
//     );

//     console.log("Successfully verified", event);

//     if (event.type === "charge:confirmed") {
//       let amount = event.data.pricing.local.amount;
//       let currency = event.data.pricing.local.amount;
//       let userId = event.data.metadata.user_id;
//     }
//   } catch (error) {
//     console.log("Failed");
//     console.log(error);
//   }
// };

const Crypto = (req, res) => {};

const CryptoWebhook = (req, res) => {};

module.exports = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  StripeCheckout,
  stripeProductWebhook,
  searchProduct,
  Crypto,
  CryptoWebhook,
};

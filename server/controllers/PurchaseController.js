const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productsSchema");
const coinbase = require("coinbase-commerce-node");
const PurchaseHistoryModel = require("../models/purchaseSchema");
const OrderHistoryModel = require("../models/orderHistorySchema");
const DonateModel = require("../models/donationSchema");
const DonationJoi = require("../Utils/DonationJoiSchema");
const PurchaseHistoryJoi = require("../Utils/PurchaseHistoryJoi");
const OrderHistoryJoi = require("../Utils/OrderHistoryJoi");
const sendMail = require("../Utils/sendMail");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

var Webhook = coinbase.Webhook;
const dotenv = require("dotenv").config();

const Client = require("../models/clientAuthSchema");
const coinbaseClient = coinbase.Client;
const resources = coinbase.resources;

const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const stripeWebhookPurchaseSecret = process.env.STRIPE_PRODUCT_WEBHOOK_SECRETE;
// const clientObj = Client.init(process.env.COINBASE_API_KEY);
// clientObj.setRequestTimeout(3000);
const localurl = process.env.CLIENT_URL;

const StripeCheckout = async (req, res) => {
  const data = req.body;

  const user = req.user;
  let customer;

  try {
    if (!user) {
      throw new UnAuthorizedError(
        "User must be logged in to purchase a product"
      );
    }

    if (!data.name && data.name !== "Donation") {
      await Client.findByIdAndUpdate(
        String(user._id),
        {
          phone: data.phone,
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
          phone: Number(data.phone),
          address: {
            line1: data.shippingAddress,
            line2: Number(data.phone),
            city: data.city,
            postal_code: data.postalcode,
            state: data.state,
            country: data.country,
          },
          metadata: {
            userId: user._id,
          },
        });
      }

      const lineItems = data.product.map((product) => ({
        price_data: {
          currency: "usd",
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
        mode: "payment",
        // cart: JSON.stringify(lineItems),
        success_url: `${localurl}/paymentsuccess?success=true`,
        cancel_url: `${localurl}/paymenterror?canceled=true`,
        metadata: {
          // Include product information in metadata
          description: data.note,
          description2: data.paytype,
        },
      });

      res.status(StatusCodes.OK).send({ url: session.url });
    } else {
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
          metadata: {
            userId: user._id, // Replace with actual Auth0 user ID
          },
        });
      }

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: data.name,
              },
              unit_amount: data.amount * 100,
            },
            quantity: 1,
          },
        ],

        metadata: {
          userId: user._id,
          description: data.note,
          description2: "donate",
        },
        customer: customer.id,
        mode: "payment",
        success_url: `${localurl}/paymentsuccess?success=true`,
        cancel_url: `${localurl}/paymenterror?canceled=true`,
      });

      res.status(StatusCodes.OK).send({ url: session.url });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal server error" });
  }
};

const stripeProductWebhook = async (req, res) => {

  const templatePath1 = path.join(__dirname, "../views/purchaseView.ejs");
  const templatePath2 = path.join(__dirname, "../views/donationView.ejs");
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookPurchaseSecret
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        break;

      case "checkout.session.async_payment_succeeded":
        break;

      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        const {
          customer_details,
          metadata,
          payment_status,
          payment_method_types,
          id,
          amount_total,
          currency,
        } = checkoutSessionCompleted;

        if (!customer_details || !customer_details.email) {
          return res.status(400).send("Customer email is required.");
        }

        const email = customer_details.email;
        const olduser = await Client.findOne({ email });

        if (!olduser) {
          return res.status(400).send("User not found.");
        }

        const cartdesc = metadata?.description || "";
        const cartdesc2 = metadata?.description2 || "";

        const formattedDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const formattedTime = new Date().toLocaleTimeString();


        const amount_check = amount_total / 100; // Convert cents to actual amount

        if (cartdesc2 === "Buy") {
          // Fetch products
          const productIds = olduser.cart.map((item) => item.product);
          const products = await Product.find({ _id: { $in: productIds } });

          const combinedCart = olduser.cart.map((item) => {
            const productInfo = products.find(
              (product) => product._id.toString() === item.product.toString()
            );
            return {
              product: productInfo,
              quantity: item.quantity,
              _id: item._id,
            };
          });

          const purchaseData = {
            email,
            name: olduser.fullname,
            amount: amount_check,
            currency,
            payment_Date: formattedDate,
            payment_Time: formattedTime,
            cart: combinedCart,
            note: cartdesc,
            payment_status,
            payment_method_types: payment_method_types[0],
            transaction_Id: id,
            phone: olduser.phone,
            address: customer_details.address?.line1 || "",
            city: customer_details.address?.city || "",
            postal_code: customer_details.address?.postal_code || "",
            state: customer_details.address?.state || "",
            country: customer_details.address?.country || "",
          };

          const orderData = { ...purchaseData, delivery_Status: "pending" };

          const newPurchase = await PurchaseHistoryModel.create(purchaseData);
          const newOrder = await OrderHistoryModel.create(orderData);

          await Client.findByIdAndUpdate(olduser._id, {
            $push: {
              productpurchasehistory: newPurchase._id,
              orderhistory: newOrder._id,
            },
            $set: { cart: [] },
          });

          const renderHtml = await ejs.renderFile(templatePath1, {
            userFullname: olduser.fullname,
            amount: amount_check,
          });

          await sendMail({
            email,
            subject: "Thank you for your order",
            html: renderHtml,
          });

        } else if (cartdesc === "ABCDonatiom") {
          const donationData = {
            email,
            name: olduser.fullname,
            amount: amount_check,
            currency,
            donation_Date: formattedDate,
            donation_Time: formattedTime,
            payment_status,
            payment_method_types: payment_method_types[0],
            transaction_Id: id,
          };

          const { error, value } = DonationJoi.validate(donationData);
          if (error) {
            throw new ValidationError("Invalid donation data received.");
          }

          const newDonation = await DonateModel.create(value);
          olduser.donationhistory.unshift(newDonation._id);
          await olduser.save();

          const renderHtml = await ejs.renderFile(templatePath2, {
            userFullname: olduser.fullname,
            amount: amount_check,
          });

          await sendMail({
            email,
            subject: "Thank You for Your Generous Support!",
            html: renderHtml,
          });

        }
        break;

      default:
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
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


//     if (event.type === "charge:confirmed") {
//       let amount = event.data.pricing.local.amount;
//       let currency = event.data.pricing.local.amount;
//       let userId = event.data.metadata.user_id;
//     }
//   } catch (error) {
//   }
// };

const Crypto = (req, res) => {};

const CryptoWebhook = (req, res) => {};

module.exports = {
  StripeCheckout,
  stripeProductWebhook,
  Crypto,
  CryptoWebhook,
};

const SubscriptionPlan = require('../models/subSchema');
const Auth = require('../models/clientAuthSchema'); // Assuming your user model is named 'Auth'
const subscriptionJoi = require('../Utils/SubJoiSchema');
const { StatusCodes } = require('http-status-codes');
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require('../errors/index');

const createSubscription = async (req, res) => {

  try {
    // Check if user is available in the request header
    if (!req.user || !req.user._id) {
      throw new UnAuthorizedError('User not authenticated');
    }

    const userId = req.user._id;

    // Extract subscription data from the request body
    const { price, subscriptionType, package, paymentType, startDate, renewalDate } = req.body;

    // Validate the request body against the Joi schema
    const { error, value } = subscriptionJoi.validate({
      user: userId,
      price,
      subscriptionType,
      package,
      paymentType,
      startDate,
      renewalDate,
    });

    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    // Create a new subscription plan
    const newSubscription = new SubscriptionPlan(value);

    // Save the subscription plan to the database
    const savedSubscription = await newSubscription.save();

    // Add the subscription to the user's subscription history
    const updatedUser = await Auth.findByIdAndUpdate(
      userId,
      { $push: { subscriptionhistory: savedSubscription._id } },
      { new: true }
    );

    res.status(StatusCodes.CREATED).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

 // Fetch all subscription plans from the database
 const getAllSubscriptionPlans = async (req, res) => {
    try {
      const { userRole } = req;
  
      // Check if the user has the required role to access subscription plans
      if (userRole === "superadmin" || userRole === "admin") {
        // Fetch all subscription plans from the database
        const subscriptionPlans = await SubscriptionPlan.find();
  
        res.status(StatusCodes.OK).json(subscriptionPlans);
      } 
      else {
        throw new UnAuthorizedError("Unauthorized to access subscription plans");
      }

    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

  
  

module.exports = {
    createSubscription,
    getAllSubscriptionPlans
};

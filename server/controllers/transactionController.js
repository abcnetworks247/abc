const DonateModel = require('../models/donationSchema');
const SubscriptionModel = require('../models/subscriptionSchema');
const PurchaseHistoryModel = require('../models/purchaseSchema');
const OrderHistoryModel = require('../models/orderHistorySchema');

const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require('../errors/index');
const { StatusCodes } = require('http-status-codes');

const getAllDonate = async (req, res) => {
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const result = await DonateModel.find();

    if (!result) {
      throw new NotFoundError('No result found');
    }

    return res.status(StatusCodes.OK).json({
      message: 'donation history retrieved successfully',
      data: result,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSingleDonate = async (req, res) => {
  const { id } = req.params;

  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const result = await blog.findById(id);

    if (!result) {
      throw new NotFoundError('Donate dat not found');
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'data retrieved successfully', data: result });
  } catch (error) {
    console.error('Error in getSingleBlog:', error); // Log the error for debugging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

const getAllSubscription = async (req, res) => {
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const result = await SubscriptionModel.find();

    if (!result) {
      throw new NotFoundError('No result found');
    }

    return res.status(StatusCodes.OK).json({
      message: 'subscription history retrieved successfully',
      data: result,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSingleSubscription = async (req, res) => {
  const { id } = req.params;

  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const result = await SubscriptionModel.findById(id);

    if (!result) {
      throw new NotFoundError('Subscription data not found');
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'data retrieved successfully', data: result });
  } catch (error) {
    console.error('Error in getSingleBlog:', error); // Log the error for debugging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

const getAllPurchaseHistory = async (req, res) => {
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const result = await PurchaseHistoryModel.find();

    if (!result) {
      throw new NotFoundError('No result found');
    }

    return res.status(StatusCodes.OK).json({
      message: 'purchase history retrieved successfully',
      data: result,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSinglePurchaseHistory = async (req, res) => {
  const { id } = req.params;

  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const result = await PurchaseHistoryModel.findById(id);

    if (!resullt) {
      throw new NotFoundError('Purchase HIstory data not found');
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'data retrieved successfully', data: result });
  } catch (error) {
    console.error('Error in getSingleBlog:', error); // Log the error for debugging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

const getAllOrderHistory = async (req, res) => {
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const result = await OrderHistoryModel.find();

    if (!result) {
      throw new NotFoundError('No result found');
    }

    return res.status(StatusCodes.OK).json({
      message: 'order history retrieved successfully',
      data: result,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSingleOrderHistory = async (req, res) => {
  const { id } = req.params;

  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const result = await OrderHistoryModel.findById(id);

    if (!result) {
      throw new NotFoundError('order history data not found');
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'data retrieved successfully', data: result });
  } catch (error) {
    console.error('Error in getting data:', error); // Log the error for debugging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

const updateOrderHistory = async (req, res) => {
  const { id, status } = req.body;

  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const result = await OrderHistoryModel.findById(id);

    if (!result) {
      throw new NotFoundError('order history data not found');
    }

    await OrderHistoryModel.findByIdAndUpdate(
      id,
      { delivery_Status: status },
      { new: true }
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: 'data updated successfully' });
  } catch (error) {
    console.error('Error in getting data:', error); // Log the error for debugging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDonate,
  getSingleDonate,
  getAllSubscription,
  getSingleSubscription,
  getAllPurchaseHistory,
  getSinglePurchaseHistory,
  getAllOrderHistory,
  getSingleOrderHistory,
  updateOrderHistory,
};

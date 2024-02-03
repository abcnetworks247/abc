const CategoryJoi = require("../Utils/CategoryJoiSchema");
const Admin = require("../models/adminAuthSchema");
const { StatusCodes } = require("http-status-codes");

const TermsJoi = require("../Utils/TermsJoiSchema");
const PolicyJoi = require("../Utils/PolicyJoiSchema");
const AboutJoi = require("../Utils/AboutJoiSchema");

const Terms = require("../models/termsSchema");
const Policy = require("../models/policySchema");
const About = require("../models/aboutSchema");

const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

const CreateTerms = async (req, res) => {
  const { description } = req.body;

  console.log(description);

  const { user } = req;

  try {
    // Check if user exists
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user authorization roles
    if (!["superadmin", "owner"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to create this page");
    }

    // Check if the category type already exists
    const existingTerms = await Terms.findOne();

    console.log("existingTerms", existingTerms);

    if (existingTerms.length >= 1) {
      console.log("The category type already exists");
      throw new UnAuthorizedError("Terms already exists");
    }

    console.log("The category type is " + existingTerms);

    // Validate the terms description using Joi schema
    const { error, value } = TermsJoi.validate({ description });

    if (error) {
      throw new ValidationError("Invalid terms description");
    }

    // Create a new category using the Terms model
    const createdTerms = await Terms.create({
      description: value.description,
      // Add other necessary fields here
    });

    return res.status(StatusCodes.CREATED).json({
      data: createdTerms,
      message: "Terms created successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const ReadTerms = async (req, res) => {
  try {
    // Assuming Terms is a model with a findById method
    const terms = await Terms.find();

    if (!terms) {
      throw new NotFoundError("Terms is Empty");
    }

    return res
      .status(StatusCodes.OK)
      .json({ data: terms[0], message: "Terms retrieved successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const UpdateTerms = async (req, res) => {
  try {
    const { description, id } = req.body;
    const { user } = req;

    console.log(description, id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!["superadmin", "owner"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to update this page");
    }

    // Assuming ProductCat is a model with a findByIdAndUpdate method
    const updatedTerms = await Terms.findByIdAndUpdate(
      id,
      { description }, // Pass necessary fields to update
      { new: true, runValidators: true } // To get the updated document and run validators
    );

    console.log("successfully updated");

    if (!updatedTerms) {
      throw new NotFoundError("Terms not found");
    }

    return res.status(StatusCodes.OK).json({
      data: updatedTerms,
      message: "Terms updated successfully",
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const CreatePolicy = async (req, res) => {
  const { description } = req.body;

  const { user } = req;

  try {
    // Check if user exists
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user authorization roles
    if (!["superadmin", "owner"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to create this page");
    }

    // Check if the category type already exists
    const existingPolicy = await Policy.findOne();

    if (existingPolicy.length >= 1) {
      throw new UnAuthorizedError("Policy already exists");
    }

    // Validate the policy description using Joi schema
    const { error, value } = PolicyJoi.validate({ description });

    if (error) {
      throw new ValidationError("Invalid policy description");
    }

    // Create a new category using the Policy model
    const createdPolicy = await Policy.create({
      description: value.description,
      // Add other necessary fields here
    });

    return res.status(StatusCodes.CREATED).json({
      data: createdPolicy,
      message: "Policy created successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const ReadPolicy = async (req, res) => {
  try {
    // Assuming Terms is a model with a findById method
    const policy = await Policy.find();

    if (!policy) {
      throw new NotFoundError("Policy is Empty");
    }

    return res
      .status(StatusCodes.OK)
      .json({ data: policy[0], message: "Policy retrieved successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const UpdatePolicy = async (req, res) => {
  try {
    const { description, id } = req.body;
    const { user } = req;

    console.log(description, id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!["superadmin", "owner"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to update this page");
    }

    // Assuming ProductCat is a model with a findByIdAndUpdate method
    const updatedPolicy = await Policy.findByIdAndUpdate(
      id,
      { description }, // Pass necessary fields to update
      { new: true, runValidators: true } // To get the updated document and run validators
    );


    if (!updatedPolicy) {
      throw new NotFoundError("About not found");
    }

    return res.status(StatusCodes.OK).json({
      data: updatedPolicy,
      message: "About updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const CreateAbout = async (req, res) => {
  const { image, description } = req.body;

  const { user } = req;

  try {
    // Check if user exists
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user authorization roles
    if (!["superadmin", "owner"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to create this page");
    }

    // Check if the category type already exists
    const existingAbout = await About.findOne();

    if (existingAbout.length >= 1) {
      throw new UnAuthorizedError("About already exists");
    }

    // Validate the about description using Joi schema
    const { error, value } = AboutJoi.validate({ image, description });

    if (error) {
      throw new ValidationError("Invalid about image and description");
    }

    // Create a new category using the Policy model
    const createdAbout = await About.create({
      image: value.image,
      description: value.description,
      // Add other necessary fields here
    });

    return res.status(StatusCodes.CREATED).json({
      data: createdAbout,
      message: "About created successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const ReadAbout = async (req, res) => {
  try {
    // Assuming Terms is a model with a findById method
    const about = await Policy.find();

    if (!about) {
      throw new NotFoundError("About is Empty");
    }

    return res
      .status(StatusCodes.OK)
      .json({ data: about, message: "About retrieved successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const UpdateAbout = async (req, res) => {
  try {
    const { image, description, id } = req.body;
    const { user } = req;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!["superadmin", "owner"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to update This Page");
    }

    // Assuming ProductCat is a model with a findByIdAndUpdate method
    const updatedAbout = await About.findByIdAndUpdate(
      id,
      { image, description }, // Pass necessary fields to update
      { new: true, runValidators: true } // To get the updated document and run validators
    );

    await About.save();

    if (!updatedAbout) {
      throw new NotFoundError("About not found");
    }

    return res.status(StatusCodes.OK).json({
      data: updatedAbout,
      message: "About updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  CreateTerms,
  ReadTerms,
  UpdateTerms,
  CreatePolicy,
  ReadPolicy,
  UpdatePolicy,
  CreateAbout,
  ReadAbout,
  UpdateAbout,
};

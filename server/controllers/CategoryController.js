const CategoryJoi = require("../Utils/CategoryJoiSchema");
const Admin = require("../models/adminAuthSchema");
const { StatusCodes } = require("http-status-codes");

const NewsType = require("../models/newsTypeSchema");
const NewsCat = require("../models/newsCatSchema");
const ProductCat = require("../models/productCatSchema");

const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

const CreateNewsType = async (req, res) => {
  const { name } = req.body;
  const { user } = req;

  try {
    // Check if user exists
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user authorization roles
    if (!["superadmin", "admin", "editor"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized");
    }

    // Check if the category type already exists
    const existingCategory = await NewsType.findOne({ name });

    if (existingCategory) {
      throw new UnAuthorizedError("Category type already exists");
    }

    // Validate the category name using Joi schema
    const { error, value } = CategoryJoi.validate({ name });

    if (error) {
      throw new ValidationError("Invalid category name");
    }

    // Create a new category using the ProductCat model
    const createdCategory = await NewsType.create({
      name: value.name,
      // Add other necessary fields here
    });

    return res.status(StatusCodes.CREATED).json({
      data: createdCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    return res
      .status(
        error instanceof CustomError
          ? error.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json({ error: error.message });
  }
};

const ReadAllNewsType = async (req, res) => {
  try {
    // Assuming NewsType is a model with a findById method
    const newsType = await NewsType.find();

    if (!newsType) {
      throw new NotFoundError("News Type is Empty");
    }

    return res
      .status(StatusCodes.OK)
      .json({ data: newsType, message: "News Types retrieved successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const UpdateNewsType = async (req, res) => {
  try {
    const { name, id } = req.body;
    const { user } = req;

    console.log(id, name);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!["superadmin", "admin", "editor"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to update News Type");
    }

    // Assuming ProductCat is a model with a findByIdAndUpdate method
    const updatedNewsType = await NewsType.findByIdAndUpdate(
      id,
      { name }, // Pass necessary fields to update
      { new: true, runValidators: true } // To get the updated document and run validators
    );

    await NewsType.save();

    if (!updatedNewsType) {
      throw new NotFoundError("Product Category not found");
    }

    console.log("updatedNewsType");
    return res.status(StatusCodes.CREATED).json({
      data: updatedNewsType,
      message: "Product Category updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const DeleteNewsType = async (req, res) => {
  const { id } = req.body;

  try {
    const { user } = req;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized to delete News Type");
    }

    // Assuming ProductCat is a model with a findByIdAndDelete method
    const deletedNewsType = await NewsType.findByIdAndDelete(id);

    if (!deletedNewsType) {
      throw new NotFoundError("Product Category not found");
    }

    return res.status(StatusCodes.OK).json({
      data: deletedNewsType,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const CreateNewsCat = async (req, res) => {
  const { name } = req.body;
  const { user } = req;

  try {
    // Check if user exists
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user authorization roles
    if (!["superadmin", "admin", "editor"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized");
    }

    // Check if the category type already exists
    const existingCategory = await NewsCat.findOne({ name });

    if (existingCategory) {
      throw new UnAuthorizedError("Category type already exists");
    }

    // Validate the category name using Joi schema
    const { error, value } = CategoryJoi.validate({ name });

    if (error) {
      throw new ValidationError("Invalid category name");
    }

    // Create a new category using the ProductCat model
    const createdCategory = await NewsCat.create({
      name: value.name,
      // Add other necessary fields here
    });

    return res.status(StatusCodes.CREATED).json({
      data: createdCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    return res
      .status(
        error instanceof CustomError
          ? error.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json({ error: error.message });
  }
};

const ReadAllNewsCat = async (req, res) => {
  try {
    // Assuming NewsType is a model with a findById method
    const newsType = await NewsCat.find();

    if (!newsType) {
      throw new NotFoundError("News Type is Empty");
    }

    return res
      .status(StatusCodes.OK)
      .json({ data: newsType, message: "News Types retrieved successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const UpdateNewsCat = async (req, res) => {
  try {
    const { name, id } = req.body;
    const { user } = req;

    console.log(id, name);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!["superadmin", "admin", "editor"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to update News Type");
    }

    // Assuming ProductCat is a model with a findByIdAndUpdate method
    const updatedNewsType = await NewsCat.findByIdAndUpdate(
      id,
      { name }, // Pass necessary fields to update
      { new: true, runValidators: true } // To get the updated document and run validators
    );

    await NewsCat.save();

    if (!updatedNewsType) {
      throw new NotFoundError("Product Category not found");
    }

    console.log("updatedNewsType");
    return res.status(StatusCodes.CREATED).json({
      data: updatedNewsType,
      message: "Product Category updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const DeleteNewsCat = async (req, res) => {
  const { id } = req.body;

  try {
    const { user } = req;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized to delete News Type");
    }

    // Assuming ProductCat is a model with a findByIdAndDelete method
    const deletedNewsType = await NewsCat.findByIdAndDelete(id);

    if (!deletedNewsType) {
      throw new NotFoundError("Product Category not found");
    }

    return res.status(StatusCodes.OK).json({
      data: deletedNewsType,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const CreateProductCat = async (req, res) => {
  const { name } = req.body;
  const { user } = req;

  try {
    // Check if user exists
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Check user authorization roles
    if (!["superadmin", "admin", "editor"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized");
    }

    // Check if the category type already exists
    const existingCategory = await ProductCat.findOne({ name });

    if (existingCategory) {
      throw new UnAuthorizedError("Category type already exists");
    }

    // Validate the category name using Joi schema
    const { error, value } = CategoryJoi.validate({ name });

    if (error) {
      throw new ValidationError("Invalid category name");
    }

    // Create a new category using the ProductCat model
    const createdCategory = await ProductCat.create({
      name: value.name,
      // Add other necessary fields here
    });

    return res.status(StatusCodes.CREATED).json({
      data: createdCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    return res
      .status(
        error instanceof CustomError
          ? error.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json({ error: error.message });
  }
};

const ReadAllProductCat = async (req, res) => {
  try {
    // Assuming NewsType is a model with a findById method
    const newsType = await ProductCat.find();

    if (!newsType) {
      throw new NotFoundError("News Type is Empty");
    }

    return res
      .status(StatusCodes.OK)
      .json({ data: newsType, message: "News Types retrieved successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const UpdateProductCat = async (req, res) => {
  try {
    const { name, id } = req.body;
    const { user } = req;

    console.log(id, name);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!["superadmin", "admin", "editor"].includes(user.role)) {
      throw new UnAuthorizedError("You are not authorized to update News Type");
    }

    // Assuming ProductCat is a model with a findByIdAndUpdate method
    const updatedNewsType = await ProductCat.findByIdAndUpdate(
      id,
      { name }, // Pass necessary fields to update
      { new: true, runValidators: true } // To get the updated document and run validators
    );

    await ProductCat.save();

    if (!updatedNewsType) {
      throw new NotFoundError("Product Category not found");
    }

    console.log("updatedNewsType");
    return res.status(StatusCodes.CREATED).json({
      data: updatedNewsType,
      message: "Product Category updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const DeleteProductCat = async (req, res) => {
  const { id } = req.body;

  try {
    const { user } = req;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized to delete News Type");
    }

    // Assuming ProductCat is a model with a findByIdAndDelete method
    const deletedNewsType = await ProductCat.findByIdAndDelete(id);

    if (!deletedNewsType) {
      throw new NotFoundError("Product Category not found");
    }

    return res.status(StatusCodes.OK).json({
      data: deletedNewsType,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  CreateNewsType,
  ReadAllNewsType,
  UpdateNewsType,
  DeleteNewsType,
  CreateNewsCat,
  ReadAllNewsCat,
  UpdateNewsCat,
  DeleteNewsCat,
  CreateProductCat,
  ReadAllProductCat,
  UpdateProductCat,
  DeleteProductCat,
};

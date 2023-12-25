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

const CreateNewsType = (req, res) => {
  const { name } = req.body;
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized");
    }

    const checkNewsType = NewsType.find({ name });

    if (checkNewsType) {
      throw new UnAuthorizedError("News type already exists");
    }

    const { error, value } = CategoryJoi.validate({ name });

    if (error) {
      throw new ValidationError("Invalid category name");
    }

    // Assuming NewsType is a model with a create method
    const data = NewsType.create({
      name: value.name /* pass necessary fields here */,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ data, message: "News Type created successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
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

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized to update News Type");
    }

    // Assuming NewsType is a model with a findByIdAndUpdate method
    const updatedNewsType = await NewsType.findByIdAndUpdate(
      id,
      { name /* pass necessary fields to update */ },
      { new: true } // to get the updated document
    );

    if (!updatedNewsType) {
      throw new NotFoundError("News Type not found");
    }

    return res.status(StatusCodes.OK).json({
      data: updatedNewsType,
      message: "News Type updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const DeleteNewsType = async (req, res) => {
  try {
    const { id } = req.body;
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

    // Assuming NewsType is a model with a findByIdAndDelete method
    const deletedNewsType = await NewsType.findByIdAndDelete(id);

    if (!deletedNewsType) {
      throw new NotFoundError("News Type not found");
    }

    return res.status(StatusCodes.OK).json({
      data: deletedNewsType,
      message: "News Type deleted successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const CreateNewsCat = (req, res) => {
  const { name } = req.body;
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized");
    }

    const checkNewsType = NewsCat.find({ name });

    if (checkNewsType) {
      throw new UnAuthorizedError("News type already exists");
    }

    const { error, value } = CategoryJoi.validate({ name });

    if (error) {
      throw new ValidationError("Invalid category name");
    }

    // Assuming NewsType is a model with a create method
    const data = NewsCat.create({
      name: value.name /* pass necessary fields here */,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ data, message: "News Type created successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
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

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized to update News Type");
    }

    // Assuming NewsType is a model with a findByIdAndUpdate method
    const updatedNewsType = await NewsCat.findByIdAndUpdate(
      id,
      { name /* pass necessary fields to update */ },
      { new: true } // to get the updated document
    );

    if (!updatedNewsType) {
      throw new NotFoundError("News Type not found");
    }

    return res.status(StatusCodes.OK).json({
      data: updatedNewsType,
      message: "News Type updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const DeleteNewsCat = async (req, res) => {
  try {
    const { id } = req.body;
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

    // Assuming NewsType is a model with a findByIdAndDelete method
    const deletedNewsType = await NewsCat.findByIdAndDelete(id);

    if (!deletedNewsType) {
      throw new NotFoundError("News Type not found");
    }

    return res.status(StatusCodes.OK).json({
      data: deletedNewsType,
      message: "News Type deleted successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const CreateProductCat = (req, res) => {
  const { name } = req.body;
  const { user } = req;

  try {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized");
    }

    const checkNewsType = ProductCat.find({ name });

    if (checkNewsType) {
      throw new UnAuthorizedError("News type already exists");
    }

    const { error, value } = CategoryJoi.validate({ name });

    if (error) {
      throw new ValidationError("Invalid category name");
    }

    // Assuming NewsType is a model with a create method
    const data = ProductCat.create({
      name: value.name /* pass necessary fields here */,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ data, message: "News Type created successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
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

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (
      user.role !== "superadmin" &&
      user.role !== "admin" &&
      user.role !== "editor"
    ) {
      throw new UnAuthorizedError("You are not authorized to update News Type");
    }

    // Assuming NewsType is a model with a findByIdAndUpdate method
    const updatedNewsType = await ProductCat.findByIdAndUpdate(
      id,
      { name /* pass necessary fields to update */ },
      { new: true } // to get the updated document
    );

    if (!updatedNewsType) {
      throw new NotFoundError("News Type not found");
    }

    return res.status(StatusCodes.OK).json({
      data: updatedNewsType,
      message: "News Type updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const DeleteProductCat = async (req, res) => {
  try {
    const { id } = req.body;
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

    // Assuming NewsType is a model with a findByIdAndDelete method
    const deletedNewsType = await NewsCat.ProductCat(id);

    if (!deletedNewsType) {
      throw new NotFoundError("News Type not found");
    }

    return res.status(StatusCodes.OK).json({
      data: deletedNewsType,
      message: "News Type deleted successfully",
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

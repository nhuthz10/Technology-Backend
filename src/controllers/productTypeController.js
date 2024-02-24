import productTypeService from "../services/productTypeService";

let handleCreateProductType = async (req, res) => {
  try {
    let message = await productTypeService.createProductTypeService(req.body);
    if (message.errCode === 0) {
      return res.status(201).json(message);
    } else {
      return res.status(400).json(message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from the server!!!",
    });
  }
};

let handleDeleteProductType = async (req, res) => {
  try {
    let message = await productTypeService.deleteProductTypeService(
      req.query.productTypeId
    );
    if (message.errCode === 0) {
      return res.status(200).json(message);
    } else {
      return res.status(400).json(message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from the server!!!",
    });
  }
};

let handleUpdateProductType = async (req, res) => {
  try {
    let message = await productTypeService.updateProductTypeService(req.body);
    if (message.errCode === 0) {
      return res.status(200).json(message);
    } else {
      return res.status(400).json(message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from the server!!!",
    });
  }
};

let handleGetAllProductType = async (req, res) => {
  try {
    let message = await productTypeService.getAllProductTypeService();
    if (message.errCode === 0) {
      return res.status(200).json(message);
    } else {
      return res.status(400).json(message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from the server!!!",
    });
  }
};

module.exports = {
  handleCreateProductType,
  handleDeleteProductType,
  handleUpdateProductType,
  handleGetAllProductType,
};

import productService from "../services/productService";

let handleCreateProduct = async (req, res) => {
  try {
    let message = await productService.createProductService(req.body);
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

let handleDeleteProduct = async (req, res) => {
  try {
    let message = await productService.deleteProductService(
      req.query.productId
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

let handleUpdateProduct = async (req, res) => {
  try {
    let message = await productService.updateUserService(req.body);
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

let handleGetProductDetail = async (req, res) => {
  try {
    let message = await productService.getProductDeatilService(
      req.query.productId
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

let handleGetAllProduct = async (req, res) => {
  try {
    let message = await productService.getAllProductService(req.body);
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
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetProductDetail,
  handleGetAllProduct,
};

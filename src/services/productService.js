import Product from "../models/product";
require("dotenv").config();

let checkProductNameUpdate = (productName, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await Product.find();
      products = products.filter((item) => item.id !== productId);
      let result;
      for (let i = 0; i < products.length; i++) {
        if (products[i].name === productName) {
          result = true;
          break;
        } else {
          result = false;
        }
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

let checkProductName = (productName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({
        name: productName,
      });
      if (product) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.images?.length > 0 ||
        !data.type ||
        !data.countInStock ||
        !data.price ||
        !data.description
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let checkProductNameExist = await checkProductName(data.name);
        if (checkProductNameExist) {
          resolve({
            errCode: 2,
            message: "Productname already exists",
          });
        } else {
          await Product.create({
            name: data.name,
            images: data.images,
            type: data.type,
            price: data.price,
            countInStock: data.countInStock,
            description: data.description,
          });
          resolve({
            errCode: 0,
            message: "Create product succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.productId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let product = await Product.findOne({
          _id: data.productId,
        });
        if (!product) {
          resolve({
            errCode: 2,
            message: "User isn't found",
          });
        } else {
          let checkProductExist = await checkProductNameUpdate(
            data.name,
            data.productId
          );
          if (checkProductExist) {
            resolve({
              errCode: 3,
              message: "Productname already exists",
            });
          } else {
            const updateProduct = await Product.findByIdAndUpdate(
              data.productId,
              data,
              {
                new: true,
              }
            );
            resolve({
              errCode: 0,
              message: "Update product succeed",
              data: updateProduct,
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProductService = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let product = await Product.findOne({
          _id: productId,
        });
        if (!product) {
          resolve({
            errCode: 2,
            message: "Product isn't found",
          });
        } else {
          await Product.findByIdAndDelete(productId);
          resolve({
            errCode: 0,
            message: "Delete product succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProductService = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!limit) limit = +process.env.LIMIT;
      if (!page) page = 1;
      let skip = (page - 1) * limit;
      const totalProdcut = await Product.countDocuments();
      let products;
      if (sort && !filter) {
        let formatSort = {};
        formatSort[sort[0]] = sort[1];
        products = await Product.find()
          .limit(limit)
          .skip(skip)
          .sort(formatSort);
      } else if (filter && !sort) {
        let filter = {};
        products = await Product.find({
          name: { $regex: "product" },
          price: { $regex: 90000 },
        })
          .limit(limit)
          .skip(skip);
      } else if (sort && filter) {
      } else {
        products = await Product.find().limit(limit).skip(skip);
      }
      resolve({
        errCode: 0,
        total: totalProdcut,
        currentPage: page,
        totalPage: Math.ceil(totalProdcut / limit),
        data: products,
        message: "Get all product succeed",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getProductDeatilService = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        const product = await Product.findOne({
          _id: productId,
        });
        if (!product) {
          resolve({
            errCode: 2,
            message: "Product isn't found",
          });
        } else {
          resolve({
            errCode: 0,
            data: product,
            message: "Get product detail succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProductService,
  updateUserService,
  deleteProductService,
  getAllProductService,
  getProductDeatilService,
};

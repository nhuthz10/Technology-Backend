import Product from "../models/product";

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

let checkSizeId = (productId, sizeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({
        _id: productId,
      });
      let size = product.productSizes.find((size) => size.sizeId === sizeId);
      if (size) {
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
        !data.productSizes?.length > 0 ||
        !data.productTypeId ||
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
            productTypeId: data.productTypeId,
            price: data.price,
            productSizes: data.productSizes,
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
          let checkSizeExist;
          for (let i = 0; i < data.productSizes.length; i++) {
            checkSizeExist = await checkSizeId(
              data.productId,
              data.productSizes[i]
            );
            console.log(checkSizeExist);
            if (checkSizeExist) {
              break;
            }
          }
          if (checkSizeExist) {
            resolve({
              errCode: 4,
              message: "Size already exists",
            });
          }

          if (data?.name) {
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

const getAllProductService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find();
      resolve({
        errCode: 0,
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

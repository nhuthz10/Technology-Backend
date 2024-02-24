import ProductType from "../models/productType";

let checkProductTypeName = (productTypeName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let productType = await ProductType.findOne({
        productTypeName: productTypeName,
      });
      if (productType) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createProductTypeService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.productTypeName) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let checkProductTypeNameExist = await checkProductTypeName(
          data.productTypeName
        );
        if (checkProductTypeNameExist) {
          resolve({
            errCode: 2,
            message: "ProductType name already exists",
          });
        } else {
          await ProductType.create({
            productTypeName: data.productTypeName,
          });
          resolve({
            errCode: 0,
            message: "Create productType succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProductTypeService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.productTypeId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let productType = await ProductType.findOne({
          _id: data.productTypeId,
        });
        if (!productType) {
          resolve({
            errCode: 2,
            message: "ProductType isn't found",
          });
        } else {
          let checkProductTypeExist = await checkProductTypeName(data.name);
          if (checkProductTypeExist) {
            resolve({
              errCode: 3,
              message: "ProductType name already exists",
            });
          } else {
            const updateProductType = await ProductType.findByIdAndUpdate(
              data.productTypeId,
              data,
              {
                new: true,
              }
            );
            resolve({
              errCode: 0,
              message: "Update productType succeed",
              data: updateProductType,
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProductTypeService = (productTypeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productTypeId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let productType = await ProductType.findOne({
          _id: productTypeId,
        });
        if (!productType) {
          resolve({
            errCode: 2,
            message: "ProductType isn't found",
          });
        } else {
          await ProductType.findByIdAndDelete(productTypeId);
          resolve({
            errCode: 0,
            message: "Delete productType succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProductTypeService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productTypes = await ProductType.find();
      resolve({
        errCode: 0,
        data: productTypes,
        message: "Get all productType succeed",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProductTypeService,
  updateProductTypeService,
  deleteProductTypeService,
  getAllProductTypeService,
};

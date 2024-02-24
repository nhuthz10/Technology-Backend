import Size from "../models/size";
import ProductType from "../models/productType";

let checkSizeName = (sizeName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let size = await Size.findOne({
        sizeName: sizeName,
      });
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

let checkProductTypeName = (productTypeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let productType = await ProductType.findOne({
        _id: productTypeId,
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

let checkSizeNameUpdate = (sizeName, productTypeId, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sizes = await Size.find({
        productTypeId: productTypeId,
      });
      sizes = sizes.filter((item) => item.id !== id);
      let result;
      for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].sizeName === sizeName) {
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

const createSizeService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.sizeName || !data.productTypeId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let checkSizeNameExist = await checkSizeName(data.sizeName);
        let checkProductTypeExist = await checkProductTypeName(
          data.productTypeId
        );
        if (!checkProductTypeExist) {
          resolve({
            errCode: 3,
            message: "ProductType isn't exist",
          });
        } else if (checkSizeNameExist) {
          resolve({
            errCode: 2,
            message: "Size name already exists",
          });
        } else {
          await Size.create({
            sizeName: data.sizeName,
            productTypeId: data.productTypeId,
          });
          resolve({
            errCode: 0,
            message: "Create Size succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateSizeService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.sizeId || !data.productTypeId || !data.sizeName) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let size = await Size.findOne({
          _id: data.sizeId,
        });
        if (!size) {
          resolve({
            errCode: 2,
            message: "Size isn't found",
          });
        } else {
          let checkSizeExist = await checkSizeNameUpdate(
            data.sizeName,
            data.productTypeId,
            data.sizeId
          );
          if (checkSizeExist) {
            resolve({
              errCode: 3,
              message: "Size name already exists",
            });
          } else {
            const updateSize = await Size.findByIdAndUpdate(data.sizeId, data, {
              new: true,
            });
            resolve({
              errCode: 0,
              message: "Update Size succeed",
              data: updateSize,
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteSizeService = (sizeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!sizeId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let size = await Size.findOne({
          _id: sizeId,
        });
        if (!size) {
          resolve({
            errCode: 2,
            message: "Size isn't found",
          });
        } else {
          await Size.findByIdAndDelete(sizeId);
          resolve({
            errCode: 0,
            message: "Delete Size succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSizeService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sizes = await Size.find();
      resolve({
        errCode: 0,
        data: sizes,
        message: "Get all Size succeed",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSizeService,
  updateSizeService,
  deleteSizeService,
  getAllSizeService,
};

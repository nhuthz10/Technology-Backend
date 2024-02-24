import emailService from "./emailService";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { generalAccessToken, generalRefreshToken } from "./jwtSerivce";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserName = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        userName: userName,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userName || !data.password || !data.fullName) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let checkUserExist = await checkUserName(data.userName);
        if (checkUserExist) {
          resolve({
            errCode: 2,
            message: "Username already exists",
          });
        } else {
          let hashPasswordFromBcrypt = await hashUserPassword(data.password);
          await User.create({
            userName: data.userName,
            fullName: data.fullName,
            password: hashPasswordFromBcrypt,
          });
          resolve({
            errCode: 0,
            data: data.userName,
            message: "Create a user succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserExist = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userName) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let checkUser = await checkUserName(userName);
        if (checkUser) {
          resolve({
            errCode: 0,
            message: "Username already exists",
            data: true,
          });
        } else {
          resolve({
            errCode: 0,
            data: false,
            message: "Username isn't exists",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userName || !data.password) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let user = await User.findOne({
          userName: data.userName,
        });
        let check = await bcrypt.compareSync(data.password, user.password);
        if (check) {
          const access_token = await generalAccessToken({
            id: user.id,
            isAdmin: user.isAdmin,
          });
          const refresh_token = await generalRefreshToken({
            id: user.id,
            isAdmin: user.isAdmin,
          });
          resolve({
            errCode: 0,
            message: "Login succeed",
            access_token,
            refresh_token,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Wrong password",
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
      if (!data.userId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let user = await User.findOne({
          _id: data.userId,
        });
        if (!user) {
          resolve({
            errCode: 2,
            message: "User isn't found",
          });
        } else {
          if (data?.userName) {
            let checkUserExist = await checkUserName(data.userName);
            if (checkUserExist) {
              resolve({
                errCode: 3,
                message: "Username already exists",
              });
            } else {
              const updateUser = await User.findByIdAndUpdate(
                data.userId,
                data,
                {
                  new: true,
                }
              );
              resolve({
                errCode: 0,
                message: "Update user succeed",
                data: updateUser,
              });
            }
          } else {
            const updateUser = await User.findByIdAndUpdate(data.userId, data, {
              new: true,
            });
            resolve({
              errCode: 0,
              message: "Update user succeed",
              data: updateUser,
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let user = await User.findOne({
          _id: userId,
        });
        if (!user) {
          resolve({
            errCode: 2,
            message: "User isn't found",
          });
        } else {
          await User.findByIdAndDelete(userId);
          resolve({
            errCode: 0,
            message: "Delete user succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUserService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();
      resolve({
        errCode: 0,
        data: users,
        message: "Get all user succeed",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let user = await User.findOne({
          _id: userId,
        });
        if (!user) {
          resolve({
            errCode: 2,
            message: "User isn't found",
          });
        } else {
          resolve({
            errCode: 0,
            message: "Get user detail succeed",
            data: user,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUserService,
  checkUserExist,
  loginService,
  updateUserService,
  deleteUserService,
  getAllUserService,
  getDetailUserService,
};

import userService from "../services/userService";
import { refreshTokenService } from "../services/jwtSerivce";
import { response } from "express";

let handleCreateNewUser = async (req, res) => {
  try {
    let message = await userService.createNewUserService(req.body);
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

let handleCheckUserExist = async (req, res) => {
  try {
    let message = await userService.checkUserExist(req.query.userName);
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

let handleLogin = async (req, res) => {
  try {
    let message = await userService.loginService(req.body);
    if (message.errCode === 0) {
      const { refresh_token, ...response } = message;
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      });
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

let handleUpdateUser = async (req, res) => {
  try {
    let message = await userService.updateUserService(req.body);
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

let handleDeleteUser = async (req, res) => {
  try {
    let message = await userService.deleteUserService(req.query.userId);
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

let handleGetAllUser = async (req, res) => {
  try {
    let limit = req.query.limit;
    let page = req.query.page;
    let message = await userService.getAllUserService(limit, page);
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

let handleGetDetailUser = async (req, res) => {
  try {
    let message = await userService.getDetailUserService(req.query.userId);
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

let handleRefreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    let message = await refreshTokenService(token);
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
  handleCreateNewUser,
  handleCheckUserExist,
  handleLogin,
  handleUpdateUser,
  handleDeleteUser,
  handleGetAllUser,
  handleGetDetailUser,
  handleRefreshToken,
};

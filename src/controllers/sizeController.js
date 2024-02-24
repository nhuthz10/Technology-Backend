import sizeService from "../services/sizeService";

let handleCreateSize = async (req, res) => {
  try {
    let message = await sizeService.createSizeService(req.body);
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

let handleDeleteSize = async (req, res) => {
  try {
    let message = await sizeService.deleteSizeService(req.query.sizeId);
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

let handleUpdateSize = async (req, res) => {
  try {
    let message = await sizeService.updateSizeService(req.body);
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

let handleGetAllSize = async (req, res) => {
  try {
    let message = await sizeService.getAllSizeService();
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
  handleCreateSize,
  handleDeleteSize,
  handleUpdateSize,
  handleGetAllSize,
};

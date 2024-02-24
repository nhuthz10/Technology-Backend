import express from "express";
import sizeController from "../controllers/sizeController";
let router = express.Router();

router.post("/create-size", sizeController.handleCreateSize);
router.put("/update-size", sizeController.handleUpdateSize);
router.delete("/delete-size", sizeController.handleDeleteSize);
router.get("/get-all-size", sizeController.handleGetAllSize);

export default router;

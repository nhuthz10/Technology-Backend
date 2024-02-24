import express from "express";
import productTypeController from "../controllers/productTypeController";
let router = express.Router();

router.post(
  "/create-product-type",
  productTypeController.handleCreateProductType
);
router.put(
  "/update-product-type",
  productTypeController.handleUpdateProductType
);
router.delete(
  "/delete-product-type",
  productTypeController.handleDeleteProductType
);
router.get(
  "/get-all-product-type",
  productTypeController.handleGetAllProductType
);

export default router;

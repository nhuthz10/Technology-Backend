import express from "express";
import productController from "../controllers/productController";
let router = express.Router();

router.post("/create-product", productController.handleCreateProduct);
router.put("/update-product", productController.handleUpdateProduct);
router.delete("/delete-product", productController.handleDeleteProduct);
router.get("/get-product-detail", productController.handleGetProductDetail);
router.get("/get-all-product", productController.handleGetAllProduct);

export default router;

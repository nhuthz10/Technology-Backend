import express from "express";
import userController from "../controllers/userController";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middlewares/authMiddleware";
let router = express.Router();

router.post("/create-user", userController.handleCreateNewUser);
router.get("/check-user-exist", userController.handleCheckUserExist);
router.post("/login", userController.handleLogin);
router.put("/update-user", userController.handleUpdateUser);
router.delete("/delete-user", authMiddleware, userController.handleDeleteUser);
router.get("/get-all-user", userController.handleGetAllUser);
router.get(
  "/get-detail-user",
  authUserMiddleware,
  userController.handleGetDetailUser
);
router.post("/refresh-token", userController.handleRefreshToken);

export default router;

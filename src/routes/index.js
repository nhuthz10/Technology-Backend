import userRouter from "./userRouter";
import productRouter from "./productRouter";

let initWebRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
};

export default initWebRoutes;

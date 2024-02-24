import userRouter from "./userRouter";
import productRouter from "./productRouter";
import productTypeRouter from "./productTypeRouter";
import sizeRouter from "./sizeRouter";

let initWebRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/product-type", productTypeRouter);
  app.use("/api/size", sizeRouter);
};

export default initWebRoutes;

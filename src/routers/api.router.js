<<<<<<< HEAD
import RouterHelper from "../helpers/router.helper.js";
=======
import { Router } from "express";
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import usersRouter from "./api/users.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";

<<<<<<< HEAD
class ApiRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/products", productsRouter);
    this.use("/carts", cartsRouter);
    this.use("/users", usersRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/auth", authRouter);
  };
}

const apiRouter = new ApiRouter().getRouter();
=======
const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/auth", authRouter);

>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
export default apiRouter;
<<<<<<< HEAD
import RouterHelper from "../helpers/router.helper.js";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

class IndexRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/", viewsRouter);
    this.use("/api", apiRouter);
  };
}

const indexRouter = new IndexRouter().getRouter();
export default indexRouter;
=======
import { Router } from "express";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

const indexRouter = Router();

indexRouter.use("/", viewsRouter);
indexRouter.use("/api", apiRouter);

export default indexRouter;
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34

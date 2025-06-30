<<<<<<< HEAD
import RouterHelper from "../../helpers/router.helper.js";
import { createOne, readAll, readById, updateById, destroyById } from "../../controllers/products.controller.js"

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:id", ["PUBLIC"], readById);
    this.update("/:id", ["ADMIN"], updateById);
    this.destroy("/:id", ["ADMIN"], destroyById);
  };
}

const productsRouter = new ProductsRouter().getRouter();
=======
import { Router } from "express";
import { productsManager } from "../../data/managers/mongo/manager.mongo.js";
import passport from "passport";

const productsRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    data.owner_id = req.user._id;
    const response = await productsManager.createOne(data);
    res.status(201).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const readAll = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const filter = req.query;
    const response = await productsManager.readAll(filter);
    if (response.length === 0) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const readById = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productsManager.readById(id);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const data = req.body;
    const response = await productsManager.updateById(id, data);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const destroyById = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productsManager.destroyById(id);
    if (!response) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const optsForbidden = {
  session: false,
  failureRedirect: "/api/auth/forbidden",
};

productsRouter.post(
  "/",
  passport.authenticate("admin", optsForbidden),
  createOne
);
productsRouter.get("/", readAll);
productsRouter.get("/:id", readById);
productsRouter.put(
  "/:id",
  passport.authenticate("admin", optsForbidden),
  updateById
);
productsRouter.delete(
  "/:id",
  passport.authenticate("admin", optsForbidden),
  destroyById
);

>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
export default productsRouter;
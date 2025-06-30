<<<<<<< HEAD
import RouterHelper from "../helpers/router.helper.js";
import setupPolicies from "../middlewares/setupPolicies.mid.js";
import {
  indexView,
  registerView,
  loginView,
  detailsView,
  profileView,
  updateView,
  verifyView,
  resetView,
  cartView,
} from "../controllers/views.controller.js";

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", ["PUBLIC"], indexView);
    this.render("/register", ["PUBLIC"], registerView);
    this.render("/login", ["PUBLIC"], loginView);
    this.render("/details/:pid", ["PUBLIC"], detailsView);
    this.render("/profile", ["USER", "ADMIN"], profileView);
    this.render("/update-user", ["USER", "ADMIN"], updateView);
    this.render("/verify/:email", ["PUBLIC"], verifyView);
    this.render("/reset/:email", ["PUBLIC"], resetView);
    this.render("/cart", ["USER", "ADMIN"], cartView);
    this.render("/forgot-password", ["PUBLIC"], (req, res) => res.render("forgot-password"));
    this.render("/reset-password/:token", ["PUBLIC"], (req, res) => {
  res.render("reset-password", { token: req.params.token });
});
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;
=======
import { Router } from "express";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";
import passport from "../middlewares/passport.mid.js";

const viewsRouter = Router();

const indexView = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    res.status(200).render("index", { products });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const registerView = async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const loginView = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const detailsView = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readById(pid);
    res.status(200).render("details", { product });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const profileView = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).render("profile", { user });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const updateView = async (req, res) => {
  try {
    res.status(200).render("update-user");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};
const cartView = (req, res) => {
  res.status(200).render("cart");
};

viewsRouter.get("/", indexView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/login", loginView);
viewsRouter.get("/details/:pid", detailsView);
viewsRouter.get(
  "/profile",
  passport.authenticate("user", { session: false }),
  profileView
);
viewsRouter.get("/update-user", updateView);
viewsRouter.get("/cart", cartView);

export default viewsRouter;
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34

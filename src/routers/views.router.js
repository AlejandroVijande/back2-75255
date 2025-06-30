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
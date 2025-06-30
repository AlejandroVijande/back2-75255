import RouterHelper from "../../helpers/router.helper.js";
import {
  addProductToCart,
  getCartByUser,
  deleteProductFromCart,
  clearCart,
  finalizarCompra,
} from "../../controllers/carts.controller.js";

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/user/products/:pid", ["USER"], addProductToCart);
    this.read("/user", ["USER", "ADMIN"], getCartByUser);
    this.destroy("/user/products/:pid", ["USER"], deleteProductFromCart);
    this.destroy("/user", ["USER"], clearCart);
    this.create("/user/purchase", ["USER"], finalizarCompra);
  };
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;

import * as cartsService from "../services/carts.service.js";
import CartsDTO from "../dto/carts.dto.js";

const addProductToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.pid;
    const cart = await cartsService.addProductToCart(userId, productId);
    res.status(200).json(new CartsDTO(cart));
  } catch (error) {
    next(error);
  }
};

const getCartByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await cartsService.getCartByUser(userId);
    res.status(200).json(new CartsDTO(cart));
  } catch (error) {
    next(error);
  }
};

const deleteProductFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.pid;
    const cart = await cartsService.deleteProductFromCart(userId, productId);
    res.status(200).json(new CartsDTO(cart));
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await cartsService.clearCart(userId);
    res.status(200).json({ message: "Carrito vaciado", cart: new CartsDTO(cart) });
  } catch (error) {
    next(error);
  }
};

const finalizarCompra = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const purchaserEmail = req.user.email;
    const result = await cartsService.purchaseCart(userId, purchaserEmail);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  addProductToCart,
  getCartByUser,
  deleteProductFromCart,
  clearCart,
  finalizarCompra,
};

import cartsRepository from "../repositories/carts.repository.js";
import productsRepository from "../repositories/products.repository.js";
import ticketsRepository from "../repositories/tickets.repository.js";
import crypto from "crypto";

const addProductToCart = async (userId, productId, quantity = 1) => {
  const cart = await cartsRepository.getOrCreateByUserId(userId);
  const existing = cart.products.find(p => String(p.product._id || p.product) === String(productId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }
  await cart.save();
  const updatedCart = await cartsRepository.getOrCreateByUserId(userId);
  console.log("Carrito después de agregar producto:", JSON.stringify(updatedCart, null, 2));
  return updatedCart;
};

const getCartByUser = async (userId) => {
  const cart = await cartsRepository.getOrCreateByUserId(userId);
  console.log("Carrito entregado al frontend:", JSON.stringify(cart, null, 2));
  return cart;
};

const deleteProductFromCart = async (userId, productId) => {
  const cart = await cartsRepository.getOrCreateByUserId(userId);
  cart.products = cart.products.filter(p => String(p.product._id || p.product) !== String(productId));
  await cart.save();
  return await cartsRepository.getOrCreateByUserId(userId);
};

const clearCart = async (userId) => {
  const cart = await cartsRepository.getOrCreateByUserId(userId);
  cart.products = [];
  await cart.save();
  return cart;
};

const purchaseCart = async (userId, purchaserEmail) => {
  const cart = await cartsRepository.getOrCreateByUserId(userId);
  let totalAmount = 0;
  let purchasedProducts = [];
  let failedProducts = [];

  for (const item of cart.products) {
    const product = await productsRepository.readById(item.product._id || item.product);
    if (product && product.stock >= item.quantity) {
      await productsRepository.updateById(product._id, {
        stock: product.stock - item.quantity,
      });
      purchasedProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
      totalAmount += product.price * item.quantity;
    } else {
      failedProducts.push({
        product: item.product,
        reason: product ? "Sin stock suficiente" : "No encontrado",
      });
    }
  }

  if (purchasedProducts.length === 0) throw new Error("Ningún producto tenía stock suficiente.");

  const code = crypto.randomBytes(8).toString("hex");
  const ticketData = {
    code,
    purchase_datetime: new Date(),
    amount: totalAmount,
    purchaser: purchaserEmail,
    products: purchasedProducts,
    status: "completed",
  };
  const ticket = await ticketsRepository.createOne(ticketData);

  cart.products = cart.products.filter(
    item => !purchasedProducts.find(p => String(p.product) === String(item.product._id || item.product))
  );
  await cart.save();

  return { ticket, failedProducts };
};

export {
  addProductToCart,
  getCartByUser,
  deleteProductFromCart,
  clearCart,
  purchaseCart,
};

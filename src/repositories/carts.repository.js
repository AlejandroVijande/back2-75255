import Cart from "../dao/mongo/models/carts.model.js";

class CartsRepository {
  async getOrCreateByUserId(userId) {
    let cart = await Cart.findOne({ user_id: userId }).populate("products.product");
    if (!cart) {
      cart = await Cart.create({ user_id: userId, products: [] });
      cart = await Cart.findOne({ user_id: userId }).populate("products.product");
    }
    return cart;
  }

  async updateById(cartId, updateData) {
    return await Cart.findByIdAndUpdate(cartId, updateData, { new: true }).populate("products.product");
  }
}

const cartsRepository = new CartsRepository();
export default cartsRepository;

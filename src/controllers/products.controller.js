import { productsService } from "../services/service.js";
import ProductsDTO from "../dto/products.dto.js";

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    data.owner_id = req.user._id;
    const response = await productsService.createOne(data);
    res.json201(new ProductsDTO(response));
  } catch (error) {
    next(error);
  }
};

const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const response = await productsService.readAll(filter);
    if (response.length === 0) return res.json404();
    const safeProducts = response.map(p => new ProductsDTO(p));
    res.json200(safeProducts);
  } catch (error) {
    next(error);
  }
};

const readById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productsService.readById(id);
    if (!response) return res.json404();
    res.json200(new ProductsDTO(response));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await productsService.updateById(id, data);
    if (!response) return res.json404();
    res.json200(new ProductsDTO(response));
  } catch (error) {
    next(error);
  }
};

const destroyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productsService.destroyById(id);
    if (!response) return res.json404();
    res.json200(new ProductsDTO(response));
  } catch (error) {
    next(error);
  }
};

export { createOne, readAll, readById, updateById, destroyById };

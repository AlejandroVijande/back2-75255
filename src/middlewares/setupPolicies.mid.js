import usersRepository from "../repositories/users.repository.js";
import { verifyToken } from "../helpers/token.helper.js";

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();
    const token = req?.signedCookies?.token || req?.cookies?.token;
    if (!token) return res.json401("Token no proporcionado");

    const data = verifyToken(token);
    const { _id, role } = data;
    if (!_id) return res.json401();

    const roles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };
    const verifyRole = roles[role];
    if (!verifyRole) return res.json403();
    const user = await usersRepository.readById(_id);
    const { password, __v, createdAt, updatedAt, ...rest } = user;
    req.user = rest;
    next();
  } catch (error) {
    next(error);
  }
};


export default setupPolicies;
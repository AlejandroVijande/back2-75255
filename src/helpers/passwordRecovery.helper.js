import jwt from "jsonwebtoken";
import { compareHash } from "./hash.helper.js";
const SECRET = process.env.JWT_SECRET || "coderRecoveryKey";

export const generateRecoveryToken = (email) => {
  return jwt.sign({ email }, SECRET, { expiresIn: "1h" });
};

export const verifyRecoveryToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};

export const isSamePassword = (plain, hashed) => compareHash(plain, hashed);

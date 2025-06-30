import { Router } from "express";
<<<<<<< HEAD
import { createCb, readCb, destroyCb } from "../../controllers/sessions.controller.js"

const sessionsRouter = Router();

=======

const sessionsRouter = Router();

const createCb = (req, res, next) => {
  try {
    req.session.role = "ADMIN";
    req.session.mode = "dark";
    const message = "Sessions vence en 7 dias";
    return res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};
const readCb = (req, res, next) => {
  try {
    const session = req.session;
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
};
const destroyCb = (req, res, next) => {
  try {
    req.session.destroy();
    const message = "Sessions eliminada";
    return res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
sessionsRouter.get("/create", createCb);
sessionsRouter.get("/read", readCb);
sessionsRouter.get("/destroy", destroyCb);

export default sessionsRouter;
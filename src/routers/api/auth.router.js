<<<<<<< HEAD
import RouterHelper from "../../helpers/router.helper.js";
import {
  registerCb,
  loginCb,
  signoutCb,
  onlineCb,
  badAuth,
  forbidden,
  verifyUserCb,
  recoverPassword,
  resetPassword,
} from "../../controllers/auth.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginCb);
    this.create("/signout", ["USER", "ADMIN"], signoutCb);
    this.create("/online", ["USER", "ADMIN"], onlineCb);
    this.read("/google", ["PUBLIC"], (req, res, next) => {
      passport.authenticate("google", {
        scope: ["email", "profile"],
      })(req, res, next);
    });
    this.read("/google/redirect", ["PUBLIC"], passportCb("google"), loginCb);
    this.read("/bad-auth", ["PUBLIC"], badAuth);
    this.read("/forbidden", ["PUBLIC"], forbidden);
    this.read("/verify/:email/:verifyCode", ["PUBLIC"], verifyUserCb);

    this.create("/recover", ["PUBLIC"], recoverPassword);
    this.create("/reset/:token", ["PUBLIC"], resetPassword);
  };
}
const authRouter = new AuthRouter().getRouter();
export default authRouter;
=======
import { Router } from "express";
import passportCb from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(201)
      .json({ message: "Registered", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};

const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(200)
      .cookie("token", req.user.token, { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ message: "Logged in", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};

const signoutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    return res.status(200).clearCookie("token").json({
      message: "Sign out",
      method,
      url,
    });
  } catch (error) {
    next(error);
  }
};

const onlineCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    return res
      .status(200)
      .json({ message: "Is online", response: true, method, url });
  } catch (error) {
    next(error);
  }
};

const badAuth = (req, res, next) => {
  try {
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const forbidden = (req, res, next) => {
  try {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  } catch (error) {
    next(error);
  }
};

// Registro y login
authRouter.post("/register", passportCb("register"), registerCb);
authRouter.post("/login", passportCb("login"), loginCb);
authRouter.post("/signout", passportCb("user"), signoutCb);
authRouter.post("/online", passportCb("user"), onlineCb);

// Google OAuth
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
authRouter.get("/google/redirect", passportCb("google"), loginCb);

// Error handling routes
authRouter.get("/bad-auth", badAuth);
authRouter.get("/forbidden", forbidden);
authRouter.get(
  "/user",
  passportCb("user"),
  (req, res) => {
    res.status(200).json({
      status: "success",
      payload: req.user
    });
  }
);

export default authRouter;
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34

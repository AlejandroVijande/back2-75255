import { usersService } from "../services/service.js";
import { generateRecoveryToken, verifyRecoveryToken, isSamePassword } from "../helpers/passwordRecovery.helper.js";
import { sendPasswordRecoveryEmail } from "../helpers/email.helper.js";
import { createHash } from "../helpers/hash.helper.js";

class AuthController {
  registerCb = async (req, res) => {
    const { _id } = req.user;
    res.json201(_id, "Registered");
  };
  loginCb = async (req, res) => {
    const { _id } = req.user;
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
    res.cookie("token", req.user.token, opts).json200(_id, "Logged in");
  };
  signoutCb = (req, res) => res.clearCookie("token").json200(req.user._id, "Sign out");
  onlineCb = (req, res) => res.json200(req.user, "Is online");
  badAuth = (req, res) => res.json401();
  forbidden = (req, res) => res.json403();
  verifyUserCb = async(req, res)=> {
    const { email, verifyCode } = req.params
    const user = await usersService.readBy({ email, verifyCode })
    if (!user) return res.json404();
    await usersService.updateById(user._id, { isVerified: true });
    res.json200(user, "Verified!");
  }

  recoverPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await usersService.readBy({ email });
      if (!user) return res.json404("Usuario no encontrado");
      const token = generateRecoveryToken(email);
      await sendPasswordRecoveryEmail(email, token);
      res.json200("Email de recuperación enviado.");
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const payload = verifyRecoveryToken(token);
      if (!payload) return res.json400("Token inválido o expirado.");

      const user = await usersService.readBy({ email: payload.email });
      if (!user) return res.json404("Usuario no encontrado");
      if (isSamePassword(newPassword, user.password)) {
        return res.json400("No puedes usar la misma contraseña anterior.");
      }

      const hashed = createHash(newPassword);
      await usersService.updateById(user._id, { password: hashed });
      res.json200("Contraseña actualizada exitosamente.");
    } catch (error) {
      next(error);
    }
  };
}

const authController = new AuthController();
export default authController;

const { 
  registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden, verifyUserCb,
  recoverPassword, resetPassword 
} = authController;
export { 
  registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden, verifyUserCb,
  recoverPassword, resetPassword 
};

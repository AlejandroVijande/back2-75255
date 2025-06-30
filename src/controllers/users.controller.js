import sendEmailHelper from "../helpers/email.helper.js";
import { usersService } from "../services/service.js";
import UsersDTO from "../dto/users.dto.js";

const safeUserDTO = (data) => {
  const user = new UsersDTO(data);
  delete user.password;
  delete user.verifyCode;
  return user;
};

const updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const { _id } = req.user;
    const response = await usersService.updateById(_id, data);
    if (!response) return res.json404();
    res.json200(safeUserDTO(response));
  } catch (error) {
    next(error);
  }
};

const sendEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    await sendEmailHelper(email);
    res.json200("Email sent!");
  } catch (error) {
    next(error);
  }
};

export { updateUser, sendEmail };

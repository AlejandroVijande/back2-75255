import RouterHelper from "../../helpers/router.helper.js";
import { updateUser, sendEmail } from "../../controllers/users.controller.js";

class UsersRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.update("/", ["USER"], updateUser);

    this.read("/:email", ["PUBLIC"], sendEmail);
  };
}

const usersRouter = new UsersRouter().getRouter();
export default usersRouter;

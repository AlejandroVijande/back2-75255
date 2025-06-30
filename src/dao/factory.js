const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    {
      console.log("memory connected");
      const { productsManager, cartsManager, usersManager, ticketsManager } = await import(
        "./memory/dao.memory.js"
      );
      dao = { productsManager, cartsManager, usersManager, ticketsManager };
    }
    break;
  case "fs":
    {
      console.log("fs connected");
      const { productsManager, cartsManager, usersManager, ticketsManager } = await import(
        "./fs/dao.fs.js"
      );
      dao = { productsManager, cartsManager, usersManager, ticketsManager };
    }
    break;

  default:
    {
      console.log("mongo database connected");
      const { productsManager, cartsManager, usersManager, ticketsManager } = await import(
        "./mongo/dao.mongo.js"
      );
      dao = { productsManager, cartsManager, usersManager, ticketsManager };
    }
    break;
}

const { productsManager, cartsManager, usersManager, ticketsManager } = dao;
export { productsManager, cartsManager, usersManager, ticketsManager };
export default dao;
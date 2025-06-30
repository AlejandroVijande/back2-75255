import { ticketsManager } from "../dao/factory.js";

class TicketsRepository {
  constructor() {
    this.manager = ticketsManager;
  }

  async createOne(data) {
    return await this.manager.createOne(data);
  }

  async findByCode(code) {
    return this.manager.findOne({ code });
  }

  async readAll(filter = {}) {
    return this.manager.find(filter);
  }
  async readById(id) {
    return this.manager.findById(id);
  }
}

const ticketsRepository = new TicketsRepository();
export default ticketsRepository;

const { Model, Sequelize } = require('sequelize');

class DogService {
  constructor(model) {
    this.model = model;
  }

  async sortingAndPagination(queryParams) {
    let { limit, pageNumber, attribute, order } = queryParams;
    
    let options = {};

    // Apply sorting if sortBy is provided
    if (attribute) {
      order = order.toUpperCase();
      options.order = [[attribute, order || 'ASC']];
    }

    // Apply pagination if limit and offset are provided
    if (limit && pageNumber) {
      pageNumber = parseInt(pageNumber, 10);
      console.log(pageNumber);
      const offset = pageNumber ? (pageNumber - 1) * limit : 0;
      options.limit = parseInt(limit, 10);
      options.offset = offset;
      console.log(options);
    }

    // Retrieve data based on options
    if (Object.keys(options).length > 0) {
      const data = await this.model.findAll(options);
      return data;
    } else {
      // Return raw data if no pagination or sorting options provided
      const data = await this.model.findAll();
      return data;
    }
  }
}


module.exports = DogService;

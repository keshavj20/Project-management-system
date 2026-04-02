const mongoose = require("mongoose");

class apiService {
  constructor(modelname) {
   try {
   
  this.model = mongoose.model(modelname);
} catch (error) {
  throw new Error(`Model '${modelname}' not found`);
}

  }

  async create(data) {
    return await this.model.create(data);
  }

  async get(filter = {}) {
    return await this.model.find(filter);
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async update(id, update) {
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteMany(filter = {}) {
    return await this.model.deleteMany(filter);
  }
}
class checkall{
  constructor(modelname){
    try{
      this.model=mongoose.model(modelname)
    }catch(error){
      console.error("error",error)
      
    }
  }
}

module.exports = apiService;

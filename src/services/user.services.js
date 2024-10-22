const { user } = require("../models");

const createServices = async (body) => {
  return await user.create(body);
};

const getAllServices = async () => {
  return await user.findAll();
};

const getOneServices = async (id) => {
  return await user.findByPk(id);
};

const updateServices = async (body, id) => {
  return await user.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await user.destroy({ where: { id } });
};

const getUserServices = async (email) => {
  return await user.findOne({ where: { email } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
  getUserServices,
};

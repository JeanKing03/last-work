const { city } = require("../models");

const createServices = async (body) => {
  return await city.create(body);
};

const getAllServices = async () => {
  return await city.findAll();
};

const getOneServices = async (id) => {
  return await city.findByPk(id);
};

const updateServices = async (body, id) => {
  return await city.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await city.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};

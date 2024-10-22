const { image } = require("../models");

const createServices = async (body) => {
  return await image.create(body);
};

const getAllServices = async () => {
  return await image.findAll();
};

const getOneServices = async (id) => {
  return await image.findByPk(id);
};

const updateServices = async (body, id) => {
  return await image.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await image.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};

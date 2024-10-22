const { review } = require("../models");

const createServices = async (body) => {
  return await review.create(body);
};

const getAllServices = async () => {
  return await review.findAll();
};

const getOneServices = async (id) => {
  return await review.findByPk(id);
};

const updateServices = async (body, id) => {
  return await review.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await review.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};

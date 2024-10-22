const { hotel, city } = require("../models");

const createServices = async (body) => {
  return await hotel.create(body);
};

const getAllServices = async () => {
  return await hotel.findAll({ include: [city] });
};

const getOneServices = async (id) => {
  return await hotel.findByPk(id);
};

const updateServices = async (body, id) => {
  return await hotel.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await hotel.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};
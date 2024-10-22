const { booking } = require("../models");

const createServices = async (body) => {
  return await booking.create(body);
};

const getAllServices = async () => {
  return await booking.findAll();
};

const getOneServices = async (id) => {
  return await booking.findByPk(id);
};

const updateServices = async (body, id) => {
  return await booking.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await booking.destroy({ where: { id } });
};

module.exports = {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
};

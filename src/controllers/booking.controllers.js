const {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
} = require("../services/booking.services");
const catchError = require("../utils/catchError");

const create = catchError(async (req, res) => {
  const result = await createServices(req.body);
  return res.status(201).json(result);
});

const getAll = catchError(async (req, res) => {
  const result = await getAllServices();
  return res.json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneServices(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await updateServices(req.body, id);
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeServices(id);
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};

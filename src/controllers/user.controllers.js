const {
  createServices,
  getAllServices,
  getOneServices,
  updateServices,
  removeServices,
} = require("../services/user.services");
const catchError = require("../utils/catchError");

const create = catchError(async (req, res) => {
  const result = await createServices({
    ...req.body,
    password: req.body.passwordHashed,
  });
  return res.status(201).json(result);
});

const getAll = catchError(async (req, res) => {
  const result = await getAllServices();
  return res.json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneServices(id);
  return res.json(result);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await updateServices(req.body, id);
  return res.json(result[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await removeServices(id);
  return res.sendStatus(204);
});

const login = catchError(async (req, res) => {
  const { userLogged, token } = req.body;
  return res.json({ user: userLogged, token });
});

const logged = catchError(async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "You Need To Be Logged!" });
  return res.json(user);
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  login,
  logged,
};

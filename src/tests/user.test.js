const request = require("supertest");
const app = require("../app");

//? POST --> 🔓
//? LOGIN --> 🔓
//? LOGGED --> 🔒
//? GET-ALL --> 🔒
//? GET-ONE --> 🔒
//? PUT --> 🔒
//? DELETE --> 🔒

const BASE_URL = "/api/v1/users";
let userId;
let token;

const user = {
  firstName: "Jean",
  lastName: "Carlos",
  email: "jean@gmail.com.kg",
  password: "jean123",
  gender: "male",
};

const userUpdate = {
  firstName: "Jean Carlos",
  lastName: "King Green",
};

// POST
test("POST -> 'BASE_URL' should return status code 201, res.body.email === user.email and res.body.name === user.name", async () => {
  const res = await request(app).post(BASE_URL).send(user);
  userId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.email).toBe(user.email);
  expect(res.body.name).toBe(user.name);
});

// LOGIN
test("LOGIN -> 'BASE_URL/login' should return status code 200, res.body.user  and res.body.token to be defined ", async () => {
  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send({ email: "jean@gmail.com.kg", password: "jean123" });
  token = `Bearer ${res.body.token}`;

  expect(res.status).toBe(200);
  expect(res.body.user).toBeDefined();
  expect(res.body.token).toBeDefined();
  expect(res.body.user.email).toBe(user.email);
});

// !LOGIN
test("LOGIN -> 'BASE_URL/login' should return status code 401", async () => {
  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send({ email: "jean@gmail.com", password: "jean123" });

  expect(res.status).toBe(401);
  expect(res.body.message).toBe("Invalid Credential!");
});

// GET-LOGGED
test("GET-ME -> 'BASE_URL/me' should return status code 200 and res.body.email === user.email", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/me`)
    .set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.userLogged.email).toBe(user.email);
});

// GET-ALL
test("GET-ALL -> 'BASE_URL' should return status code 200 and res.body to havent length === 0", async () => {
  const res = await request(app).get(`${BASE_URL}`).set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].email).toBe(user.email);
  expect(res.body.length).toBe(1);
});

// GET-ONE
test("GET-ONE -> 'BASE_URL/:id' should return status code 200, res.body.firstName === user.firstName and res.body.email === user.email", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${userId}`)
    .set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.email).toBe(user.email);
  expect(res.body.firstName).toBe(user.firstName);
});

// UPDATE
test("PUT -> 'BASE_URL/:id' should return status code 200, res.body.firstName === userUpdate.firstName and res.body.lastName === userUpdate.lastName", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .set("authorization", token)
    .send(userUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(userUpdate.firstName);
  expect(res.body.lastName).toBe(userUpdate.lastName);
  expect(res.body.id).toBe(userId);
});

// DELETE
test("DELETE -> 'BASE_URL/:id' should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set("authorization", token);

  expect(res.status).toBe(204);
});

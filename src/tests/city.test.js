const request = require("supertest");
const app = require("../app");

//? POST --> 🔒
//? GET-ALL --> 🔓
//? GET-ONE --> 🔒
//? PUT --> 🔒
//? DELETE --> 🔒

//! BEFORE_ALL
beforeAll(async () => {
  const user = {
    firstName: "Jean",
    lastName: "Carlos",
    email: "jean@gmail.com.kg",
    password: "jean123",
    gender: "male",
  };

  const BASE_URL = "/api/v1/users";

  const resPost = await request(app).post(BASE_URL).send(user);
  userId = resPost.body.id;

  const resLogin = await request(app)
    .post(`${BASE_URL}/login`)
    .send({ email: "jean@gmail.com.kg", password: "jean123" });
  token = `Bearer ${resLogin.body.token}`;
});

//! AFTER_ALL
afterAll(async () => {
  await request(app)
    .delete(`/api/v1/users/${userId}`)
    .set("authorization", token);
});

const BASE_URL = "/api/v1/cities";
let userId;
let citiId;
let token;

const city = {
  name: "Samana",
  country: "Rep. Dom.",
  countryId: "DR",
};

const cityUpdate = {
  name: "Santo Domingo",
};

// POST
test("POST -> 'BASE_URL'should return status code 201 and res.body.name === city.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(city)
    .set("authorization", token);
  citiId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(city.name);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200 and res.body and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.name === city.name ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${citiId}`)
    .set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(city.name);
});

// UPDATE
test("PUT -> 'BASE_URL/:id' shuold return status code 200 and res.body.name === cityUpdate.name", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${citiId}`)
    .set("authorization", token)
    .send(cityUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].name).toBe(cityUpdate.name);
});

// DELETE
test("DELETE -> 'BASE_URL/:id' shuold return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${citiId}`)
    .set("authorization", token);

  expect(res.status).toBe(204);
});

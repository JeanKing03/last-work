const request = require("supertest");
const app = require("../app");

//! BEFORE_ALL
beforeAll(async () => {
  //* POST --> USER
  const resUSer = await request(app).post("/api/v1/users").send({
    firstName: "Jean",
    lastName: "Carlos",
    email: "jean@gmail.com",
    password: "jean123",
    gender: "male",
  });
  userId = resUSer.body.id;

  //* POST --> LOGIN
  const resLogin = await request(app)
    .post(`${"/api/v1/users"}/login`)
    .send({ email: "jean@gmail.com", password: "jean123" });
  token = `Bearer ${resLogin.body.token}`;

  //* POST --> CITY
  const resCity = await request(app)
    .post("/api/v1/cities")
    .send({
      name: "Santo Domingo",
      country: "REP. DOM.",
      countryId: "RD",
    })
    .set("authorization", token);
  cityId = resCity.body.id;

  //* POST --> HOTEL
  const resHotel = await request(app)
    .post("/api/v1/hotels")
    .send({
      name: "King Green Palaces",
      description: "Disfruta",
      price: 20.99,
      address: "Punta Cana",
      lat: 185.62,
      lon: 203.254,
      rating: 9.9,
      cityId,
    })
    .set("authorization", token);
  hotelId = resHotel.body.id;
});

//! AFTER_ALL
afterAll(async () => {
  // DELETE USER
  await request(app)
    .delete(`/api/v1/users/${userId}`)
    .set("authorization", token);

  // DELETE CITY
  await request(app)
    .delete(`/api/v1/cities/${cityId}`)
    .set("authorization", token);

  // DELETE HOTEL
  await request(app)
    .delete(`/api/v1/hotels/${hotelId}`)
    .set("authorization", token);
});

// VARIABLES
const BASE_URL = "/api/v1/reviews";
let userId;
let token;
let cityId;
let hotelId;
let reviewId;

const review = {
  rating: "9.5",
  comment: "Buen Servicio, Pienso Regresar Algun Dia",
  hotelId,
};

// POST
test("POST -> 'BASE_URL' should return status code 200 and res.body.comment === review.comment", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send({ ...review, hotelId })
    .set("authorization", token);
  reviewId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.comment).toBe(review.comment);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200  and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL).set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.comment === review.comment ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${reviewId}`)
    .set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.comment).toBe(review.comment);
  expect(res.body.rating).toBe(review.rating);
});

// UPDATE
test("PUT -> 'BASE_URL/:id' shuold return status code 200 and and res.body.rating/comment must be the same as those sent.", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${reviewId}`)
    .set("authorization", token)
    .send({
      rating: "10.0",
      comment: "Buen Servicio, Excelente!",
      hotelId,
    });

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.rating).toBe("10.0");
  expect(res.body.comment).toBe("Buen Servicio, Excelente!");
});

// DELETE
test("DELETE -> 'BASE_URL/:id' shuold return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${reviewId}`)
    .set("authorization", token);

  expect(res.status).toBe(204);
});

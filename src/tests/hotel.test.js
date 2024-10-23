const request = require("supertest");
const app = require("../app");

//? POST --> 🔒
//? GET-ALL --> 🔓
//? GET-ONE --> 🔒
//? PUT --> 🔒
//? DELETE --> 🔒

const BASE_URL = "/api/v1/hotels";
let userId;
let token;
let cityId;
let hotelId;
let imageId;

//! BEFORE_ALL
beforeAll(async () => {
  const user = {
    firstName: "Jean",
    lastName: "Carlos",
    email: "jean@gmail.com",
    password: "jean123",
    gender: "male",
  };

  const resUser = await request(app).post("/api/v1/users").send(user);
  userId = resUser.body.id;

  const resLogin = await request(app)
    .post(`/api/v1/users/login`)
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
});

// HOTEL
const hotel = {
  name: "King Green Palaces",
  description: "Disfruta",
  price: 20.99,
  address: "Punta Cana",
  lat: 185.62,
  lon: 203.254,
  rating: 9.9,
  cityId,
};

// //* POST --> HOTEL
// const resHotel = await request(app)
//   .post(BASE_URL_HOTEL)
//   .set("authorization", token)
//   .send(hotel);
// hotelId = resHotel.body.id;

// POST
test("POST -> 'BASE_URL' should return status code 200 and res.body.name === hotel.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send({ ...hotel, cityId })
    .set("authorization", token);
  hotelId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(hotel.name);
});


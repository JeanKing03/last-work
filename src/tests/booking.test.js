const request = require("supertest");
const app = require("../app");

//! BEFORE_ALL
beforeAll(async () => {
  const BASE_URL_USER = "/api/v1/users";
  const BASE_URL_CITY = "/api/v1/cities";
  const BASE_URL_HOTEL = "/api/v1/hotels";

  // USER
  const user = {
    firstName: "Jean",
    lastName: "Carlos",
    email: "jean@gmail.com",
    password: "jean123",
    gender: "male",
  };

  //* POST --> USER
  const resUSer = await request(app).post(BASE_URL_USER).send(user);
  userId = resUSer.body.id;

  //* POST --> LOGIN
  const resLogin = await request(app)
    .post(`${BASE_URL_USER}/login`)
    .send({ email: "jean@gmail.com", password: "jean123" });
  token = `Bearer ${resLogin.body.token}`;

  // CITY
  const city = {
    name: "Santo Domingo",
    country: "REP. DOM.",
    countryId: "RD",
  };

  //* POST --> CITY
  const resCity = await request(app)
    .post(BASE_URL_CITY)
    .send(city)
    .set("authorization", token);
  cityId = resCity.body.id;

  //  HOTEL
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

  //* POST --> HOTEL
  const resHotel = await request(app)
    .post(BASE_URL_HOTEL)
    .send(hotel)
    .set("authorization", token);
  hotelId = resHotel.body.id;
});

//! AFTER_ALL
afterAll(async () => {
  // DELETE USER
  await request(app)
    .delete(`${"/api/v1/users"}/${userId}`)
    .set("authorization", token);

  // DELETE CITY
  await request(app)
    .delete(`${"/api/v1/cities"}/${cityId}`)
    .set("authorization", token);

  // DELETE HOTEL
  await request(app)
    .delete(`${"/api/v1/hotels"}/${hotelId}`)
    .set("authorization", token);
});

// VARIABLES
const BASE_URL = "/api/v1/bookings";
let userId;
let token;
let cityId;
let hotelId;
let bookingId;

const booking = {
  checkIn: "2100-01-01T00:00:00.000Z",
  checkOut: "2100-01-10",
  hotelId,
};

// POST
test("POST -> 'BASE_URL' should return status code 200 and res.body.checkIn === booking.checkIn", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send({ ...booking, hotelId })
    .set("authorization", token);
  bookingId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.checkIn).toBe(booking.checkIn);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200  and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL).set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.checkIn === booking.checkIn ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${bookingId}`)
    .set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.checkIn).toBe(booking.checkIn);
});

// UPDATE
test("PUT -> 'BASE_URL/:id' shuold return status code 200 and res.body.checkIn must be the same as those sent.", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${bookingId}`)
    .set("authorization", token)
    .send({
      checkIn: "2095-01-11T00:00:00.000Z",
    });

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.checkIn).toBe("2095-01-11T00:00:00.000Z");
});

// DELETE
test("DELETE -> 'BASE_URL/:id' shuold return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${bookingId}`)
    .set("authorization", token);

  expect(res.status).toBe(204);
});

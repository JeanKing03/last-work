const request = require("supertest");
const app = require("../app");

//! BEFORE_ALL
beforeAll(async () => {
  const BASE_URL_USER = "/api/v1/users";
  const BASE_URL_CITY = "/api/v1/cities";
  const BASE_URL_REVIEWS = "/api/v1/reviews";
  const BASE_URL_IMAGE = "/api/v1/image";
  const BASE_URL_BOOKINGS = "/api/v1/bookings";

  // USER
  // CITY
  //   IMAGE
  // BOOKING
  // REVIEW

  //* POST --> USER
  const resUSer = await request(app).post(BASE_URL_USER).send({
    firstName: "Jean",
    lastName: "Carlos",
    email: "jean@gmail.com",
    password: "jean123",
    gender: "male",
  });
  userId = resUSer.body.id;

  //* POST --> LOGIN
  const resLogin = await request(app)
    .post(`${BASE_URL_USER}/login`)
    .send({ email: "jean@gmail.com", password: "jean123" });
  token = `Bearer ${resLogin.body.token}`;

  //* POST --> CITY
  const resCity = await request(app)
    .post(BASE_URL_CITY)
    .send({
      name: "Santo Domingo",
      country: "REP. DOM.",
      countryId: "RD",
    })
    .set("authorization", token);
  cityId = resCity.body.id;

  //* POST --> REVIEWS
  const resReview = await request(app)
    .post(BASE_URL_REVIEWS)
    .send({
      rating: "9.5",
      comment: "Buen Servicio, Pienso Regresar Algun Dia",
      hotelId: 1,
    })
    .set("authorization", token);
  reviewId = resReview.body.id;

  //* POST --> BOOKING
  const resBooking = await request(app)
    .post(BASE_URL_BOOKINGS)
    .send({
      checkIn: "2100-01-01T00:00:00.000Z",
      checkOut: "2100-01-10",
      hotelId: 1,
    })
    .set("authorization", token);
  bookingId = resBooking.body.id;

  //* POST --> IMAGE
  const resImage = await request(app)
    .post(BASE_URL_IMAGE)
    .send({
      url: "htt://www.imagen.com",
      hotelId: 1,
    })
    .set("authorization", token);
  imageId = resImage.body.id;
});

//! AFTER_ALL
afterAll(async () => {
  const BASE_URL_USER = "/api/v1/users";
  const BASE_URL_CITY = "/api/v1/cities";
  const BASE_URL_REVIEWS = "/api/v1/reviews";
  const BASE_URL_IMAGE = "/api/v1/image";
  const BASE_URL_BOOKINGS = "/api/v1/bookings";

  // DELETE USER
  await request(app)
    .delete(`${BASE_URL_USER}/${userId}`)
    .set("authorization", token);

  // DELETE CITY
  await request(app)
    .delete(`${BASE_URL_CITY}/${cityId}`)
    .set("authorization", token);

  // DELETE BOOKING
  await request(app)
    .delete(`${BASE_URL_BOOKINGS}/${bookingId}`)
    .set("authorization", token);

  // DELETE IMAGE
  await request(app)
    .delete(`${BASE_URL_IMAGE}/${imageId}`)
    .set("authorization", token);

  // DELETE REVIEW
  await request(app)
    .delete(`${BASE_URL_REVIEWS}/${reviewId}`)
    .set("authorization", token);
});

// VARIABLES
const BASE_URL = "/api/v1/hotels";
let userId;
let token;
let cityId;
let hotelId;
let imageId;
let reviewId;

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

const updateHotel = {
  description: "Ven y aprovecha nuestros descuentos",
  price: 15.5,
};

// POST
test("POST -> 'BASE_URL' should return status code 200 and res.body.name === hotel.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send({ ...hotel, cityId })
    .set("authorization", token);
  hotelId = res.body.id;

  console.log(res.body);

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(hotel.name);
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200  and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL).set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200 and res.body.name === hotel.name ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${hotelId}`)
    .set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.city).toBe(hotel.city);
  expect(res.body.image).toBe(hotel.image);
  expect(res.body.booking).toBe(hotel.booking);
  expect(res.body.review).toBe(hotel.review);
});

// UPDATE
test("PUT -> 'BASE_URL/:id' shuold return status code 200 and res.body.description === updateHotel.description", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${hotelId}`)
    .set("authorization", token)
    .send(updateHotel);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.price).toBe(updateHotel.price);
  expect(res.body.description).toBe(updateHotel.description);
});

test("DELETE -> 'BASE_URL/:id' shuold return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${hotelId}`)
    .set("authorization", token);

  expect(res.status).toBe(204);
});

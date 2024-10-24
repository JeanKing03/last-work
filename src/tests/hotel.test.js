const request = require("supertest");
const app = require("../app");
const { DESCRIBE } = require("sequelize/lib/query-types");

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
  const resUser = await request(app).post("/api/v1/users").send({
    firstName: "Jean",
    lastName: "Carlos",
    email: "jean@gmail.com",
    password: "jean123",
    gender: "male",
  });
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

  //! -------------- INSERTANDO LOS REGISTRO QUE DEPENDEN DE HOTEL --------------------

  //* POST --> BOOKING
  const resBooking = await request(app)
    .post("/api/v1/bookings")
    .send({
      checkIn: "2100-01-01T00:00:00.000Z",
      checkOut: "2100-01-10",
      hotelId,
    })
    .set("authorization", token);
  bookingId = resBooking.body.id;

  // POST -> IMAGE
  const resImage = await request(app)
    .post("/api/v1/images")
    .send({
      url: "htt://www.imagen.com",
      hotelId,
    })
    .set("authorization", token);
  imageId = resImage.body.id;

  // POST -> REVIEW
  const resReview = await request(app)
    .post("/api/v1/reviews")
    .send({
      rating: "9.5",
      comment: "Buen Servicio, Pienso Regresar Algun Dia",
      hotelId,
    })
    .set("authorization", token);
  reviewId = resReview.body.id;
  // ! ---------------------------------------------------------------------
});

// GET-ALL
test("GET -> 'BASE_URL' should return status code 200  and res.body to haven't length === 0", async () => {
  const res = await request(app).get(BASE_URL).set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].name).toBe(hotel.name);
});

// GET-ONE
test("GET -> 'BASE_URL/:id' should return status code 200, res.body.name === hotel.name , res.body.[city, images, bookings and reviews] must be defined and recorded ", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${hotelId}`)
    .set("authorization", token);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(hotel.name);
  expect(res.body.city.name).toBe("Santo Domingo");
  expect(res.body.images[0].url).toBe("htt://www.imagen.com");
  expect(res.body.bookings[0].checkIn).toBe("2100-01-01T00:00:00.000Z");
  expect(res.body.reviews[0].comment).toBe(
    "Buen Servicio, Pienso Regresar Algun Dia"
  );
});

// UPDATE
test("PUT -> 'BASE_URL/:id' shuold return status code 200 and res.body.name/rating must be the same as those sent. ", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${hotelId}`)
    .set("authorization", token)
    .send({
      name: "King Lion 5 Star",
      rating: 10,
    });

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.rating).toBe("10");
  expect(res.body.name).toBe("King Lion 5 Star");
});

// DELETE
test("DELETE -> 'BASE_URL/:id' shuold return status code 204", async () => {
  //! ELIMINANDO LOS REGISTRO [BOOKING, IMAGES, Y REVIEW], YA QUE NO LO ESTAN HACIENDDO EN CASCADA Y LUEGO HAGO EL TEST DELETE DE HOTEL

  // DELETE BOOKING
  await request(app)
    .delete(`/api/v1/bookings/${bookingId}`)
    .set("authorization", token);

  // DELETE IMAGE
  await request(app)
    .delete(`/api/v1/images/${imageId}`)
    .set("authorization", token);

  // DELETE REVIEW
  await request(app)
    .delete(`/api/v1/reviews/${reviewId}`)
    .set("authorization", token);

  // ? DELETE HOTEL
  const res = await request(app)
    .delete(`${BASE_URL}/${hotelId}`)
    .set("authorization", token);

  expect(res.status).toBe(204);
});

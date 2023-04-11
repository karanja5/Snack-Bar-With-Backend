/* This is a TypeScript code that creates an express application and sets up various endpoints for
handling HTTP requests. It also uses the `cors` middleware to allow cross-origin requests from a
specific origin. Additionally, it uses the `jsonwebtoken` library to generate a token for user
authentication. The code defines routes for getting food items, searching for food items, getting
food tags, getting food items by tag, getting a specific food item by ID, and logging in a user.
Finally, it listens on port 5000 for incoming requests. */
import express from "express";
import cors from "cors";
import { sampleUsers } from "./data";
import Jwt from "jsonwebtoken";
import foodRouter from "./routers/food.router";

// Create an express application
const app = express();

// Parse application/json
app.use(express.json());

/* This code is setting up the `cors` middleware to allow cross-origin requests from a specific origin.
The `cors` middleware is used to enable cross-origin resource sharing (CORS) in the express
application. The `credentials` option is set to `true` to allow cookies to be sent with the request,
and the `origin` option is set to `http://localhost:4200` to allow requests from that specific
origin. */
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// Mount the food router at the "/api/foods" path
app.use("/api/foods", foodRouter);

// app.get("/api/foods", (req, res) => {
//   res.send(sampleFoods);
// });

// app.get("/api/foods/search/:searchTerm", (req, res) => {
//   const searchTerm = req.params.searchTerm;
//   const foods = sampleFoods.filter((food) =>
//     food.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   res.send(foods);
// });

// app.get("/api/foods/tags", (req, res) => {
//   res.send(sampleTags);
// });

// app.get("/api/foods/tag/:tagName", (req, res) => {
//   const tagName = req.params.tagName;
//   const foods = sampleFoods.filter((food) => food.tags?.includes(tagName));
//   res.send(foods);
// });

// app.get("/api/foods/:foodId", (req, res) => {
//   const foodId = req.params.foodId;
//   const foods = sampleFoods.find((food) => food.id == foodId)!;
//   res.send(foods);
// });

/* This code sets up a POST endpoint at "/api/users/login" that handles user login requests. It first
extracts the email and password from the request body using destructuring assignment. It then
searches for a user in the `sampleUsers` array that matches the email and password provided. If a
matching user is found, it generates a JSON Web Token (JWT) using the `jsonwebtoken` library and
sends a response containing the user object with the JWT token added. If no matching user is found,
it sends a 400 status code with an error message indicating that the email or password is invalid. */
app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = sampleUsers.find((user) => {
    return user.email == email && user.password == password;
  });

  user
    ? res.send(generateTokenResponse(user))
    : res.status(400).send("Email or Password is invalid");
});

/**
 * The function generates a token response for a user with a specific expiration time.
 * @param {any} user - The user parameter is an object that contains information about a user, such as
 * their email and whether or not they are an admin.
 * @returns The function `generateTokenResponse` is returning the `user` object with an added `token`
 * property.
 */
const generateTokenResponse = (user: any) => {
  const token = Jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    "ThisIsMyPrivateKey",
    { expiresIn: "30d" }
  );
  user.token = token;
  return user;
};

const port = 5000;
app.listen(port, () => {
  console.log("API served on http://localhost:" + port + "/api/foods");
});

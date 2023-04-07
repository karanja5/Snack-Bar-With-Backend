/* This is a TypeScript code that creates an express application and sets up various endpoints for
handling HTTP requests. It also uses the `cors` middleware to allow cross-origin requests from a
specific origin. Additionally, it uses the `jsonwebtoken` library to generate a token for user
authentication. The code defines routes for getting food items, searching for food items, getting
food tags, getting food items by tag, getting a specific food item by ID, and logging in a user.
Finally, it listens on port 5000 for incoming requests. */
import express from "express";
import cors from "cors";
import { sampleFoods, sampleTags, sampleUsers } from "./data";
import Jwt from "jsonwebtoken";
import foodRouter from "./routers/food.router";

// Create an express application
const app = express();

// Parse application/json
app.use(express.json());

app.use("/api/foods", foodRouter);

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
  console.log("Website served on http://localhost:" + port);
});

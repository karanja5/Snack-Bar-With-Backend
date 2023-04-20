/* This code is setting up a POST endpoint at "/api/users/login" that handles user login requests. It
extracts the email and password from the request body using destructuring assignment. It then
searches for a user in the `sampleUsers` array that matches the email and password provided. If a
matching user is found, it generates a JSON Web Token (JWT) using the `jsonwebtoken` library and
sends a response containing the user object with the JWT token added. If no matching user is found,
it sends a 400 status code with an error message indicating that the email or password is invalid.
The `import` statements at the beginning of the code are importing necessary modules and data. */
import { Router } from "express";
// import { sampleUsers } from "../data"; //I don't need this anymore because I have seeded the database
import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { IUser, UserModel } from "../models/user.models";
import bcrypt from "bcryptjs";

const BAD_REQUEST = 400;
const router = Router();

// router.get(
//   "/seed",
//   asyncHandler(async (req, res) => {
//     const usersCount = await UserModel.countDocuments();
//     if (usersCount > 0) {
//       res.send("Users already seeded");
//       return;
//     }
//     await UserModel.create(sampleUsers);
//     res.send("Users seeded");
//   })
// );
//I have already seeded the database so I don't need to seed it again

/* This code sets up a POST endpoint at "/api/users/login" that handles user login requests. It
extracts the email and password from the request body using destructuring assignment. It then
searches for a user in the database that matches the email and password provided. If a matching user
is found, it generates a JSON Web Token (JWT) using the `jsonwebtoken` library and sends a response
containing the user object with the JWT token added. If no matching user is found, it sends a 400
status code with an error message indicating that the email or password is invalid. */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body;
    const user = await UserModel.findOne({ phoneNumber });

    user && (await bcrypt.compare(password, user.password))
      ? res.send(generateTokenResponse(user))
      : res.status(BAD_REQUEST).send("PhoneNumber or Password is invalid");
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    const user = await UserModel.findOne({ phoneNumber });
    if (user) {
      res
        .status(BAD_REQUEST)
        .send(
          "User already exists. Please retry with a different phone number"
        );
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    const newUser: IUser = {
      id: "",
      name,
      phoneNumber,
      email,
      password: encryptedPassword,
      token: "",
    };

    const dbUser = await UserModel.create(newUser);
    /* `res.send(generateTokenResponse(dbUser));` is sending a response to the client with the user
    object and a JSON Web Token (JWT) generated using the `generateTokenResponse` function. The
    `generateTokenResponse` function takes a user object as an argument and returns an object with
    the user's information and a JWT token. The `res.send()` method sends this object as a response
    to the client. */
    res.send(generateTokenResponse(dbUser));
  })
);

/**
 * The function generates a JSON Web Token (JWT) using the `jsonwebtoken` library and returns an object
 * containing user information and the generated token.
 * @param {IUser} user - The `user` parameter is an object of type `IUser` which contains information
 * about a user, such as their `id`, `phoneNumber`, `name`, and `email`.
 * @returns The function `generateTokenResponse` is returning an object with the user's `id`, `name`,
 * `email`, `phoneNumber`, and a JSON Web Token (`token`) that contains the user's information as
 * payload data.
 */
const generateTokenResponse = (user: IUser) => {
  /* This code is generating a JSON Web Token (JWT) using the `jsonwebtoken` library. The `Jwt.sign()`
  method takes three arguments: an object containing the payload data to be included in the token, a
  secret key used to sign the token, and an options object that specifies the token's expiration
  time. */
  const token = Jwt.sign(
    {
      id: user.id,
      phoneNumber: user.phoneNumber,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    token,
  };
};
// The token is stored in the browser's local storage. The token is sent to the server in the
// Authorization header of the request. The server uses the token to authenticate the user.

export default router;
/* This code defines a route for getting a specific food item by its ID. It listens for GET requests to
the "/:foodId" endpoint, where ":foodId" is a dynamic parameter that represents the ID of the food
item. When a request is received, it uses the FoodModel to find the food item in the database with
the specified ID, and sends it as a response to the client. */

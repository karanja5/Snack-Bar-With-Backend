/* This code is setting up a POST endpoint at "/api/users/login" that handles user login requests. It
extracts the email and password from the request body using destructuring assignment. It then
searches for a user in the `sampleUsers` array that matches the email and password provided. If a
matching user is found, it generates a JSON Web Token (JWT) using the `jsonwebtoken` library and
sends a response containing the user object with the JWT token added. If no matching user is found,
it sends a 400 status code with an error message indicating that the email or password is invalid.
The `import` statements at the beginning of the code are importing necessary modules and data. */
import { Router } from "express";
import { sampleUsers } from "../data";
import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.models";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      res.send("Users already seeded");
      return;
    }
    await UserModel.create(sampleUsers);
    res.send("Users seeded");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });

    user
      ? res.send(generateTokenResponse(user))
      : res.status(400).send("Email or Password is invalid");
  })
);

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
    "ThisIsMySecretKey",
    { expiresIn: "30d" }
  );
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;

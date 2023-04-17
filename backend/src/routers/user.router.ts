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
import { UserModel } from "../models/user.models";
import bcrypt from "bcryptjs";
import { User } from "../../../frontend/src/app/shared/models/User";

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
      : res.status(400).send("PhoneNumber or Password is invalid");
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, password, phoneNumber } = req.body;
    const user = await UserModel.findOne({ phoneNumber });
    if (user) {
      res
        .status(400)
        .send("User already exists,Retry with a different phone number");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    const newUser: User = {
      id: "",
      name,
      phoneNumber,
      password: encryptedPassword,
      token: "",
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  })
);
/**
 * The function generates a token response containing user information and a JWT token.
 * @param {any} user - The `user` parameter is an object that contains information about a user, such
 * as their name, email, address, and whether or not they are an admin. This function generates a token
 * that can be used to authenticate the user and returns an object that includes the user's information
 * and the token.
 * @returns The function `generateTokenResponse` returns an object with the properties `id`, `name`,
 * `email`, `address`, `isAdmin`, and `token`. The values of `id`, `name`, `email`, `address`, and
 * `isAdmin` are taken from the `user` object passed as an argument to the function. The `token`
 * property is generated using the `jsonwebtoken` library
 */
const generateTokenResponse = (user: any) => {
  const token = Jwt.sign({ email: user.phoneNumber }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  return {
    id: user._id,
    name: user.name,
    phoneNumber: user.phoneNumber,
    token,
  };
};

export default router;
/* This code defines a route for getting a specific food item by its ID. It listens for GET requests to
the "/:foodId" endpoint, where ":foodId" is a dynamic parameter that represents the ID of the food
item. When a request is received, it uses the FoodModel to find the food item in the database with
the specified ID, and sends it as a response to the client. */

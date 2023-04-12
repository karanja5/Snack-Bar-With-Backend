/* This is a TypeScript code that creates an express application and sets up various endpoints for
handling HTTP requests. It also uses the `cors` middleware to allow cross-origin requests from a
specific origin. Finally, it listens on port 5000 for incoming requests. The code also mounts the
food router at the "/api/foods" path and sets up another endpoint for users at "/api/users". */
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
dbConnect();

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

// Mount the food and user router at the "/api/foods" path
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

const port = 5000;
app.listen(port, () => {
  console.log("Web server is running on http://localhost:" + port);
});

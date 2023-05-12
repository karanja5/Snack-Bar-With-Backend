/* This is a TypeScript code that creates an express application and sets up various endpoints for
handling HTTP requests. It also uses the `cors` middleware to allow cross-origin requests from a
specific origin. Finally, it listens on port 5000 for incoming requests. The code also mounts the
food router at the "/api/foods" path and sets up another endpoint for users at "/api/users". */

import path from "path";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import checkoutRouter from "./routers/checkoutEncryption.router";
import { dbConnect } from "./configs/database.config";

dbConnect();

// Create an express application
/* `const app = express();` is creating an instance of the Express application. This instance will be
used to set up various endpoints for handling HTTP requests. */
const app = express();

// Parse application/json
/* `app.use(express.json());` is setting up middleware in the express application to parse incoming
requests with JSON payloads. This middleware is responsible for parsing the request body and making
it available in the `req.body` property of the request object. This allows the application to handle
JSON data sent in the request body. */
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
/* These lines of code are mounting the food, user, and order routers at specific paths in the express
application. This means that any requests that match the specified paths will be handled by the
corresponding router. For example, any requests to "/api/foods" will be handled by the food router,
and any requests to "/api/users" will be handled by the user router. */
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/tinggCheckout", checkoutRouter);

/* `app.use(express.static("public"))` is setting up middleware in the express application to serve
static files from the "public" directory. This means that any files in the "public" directory can be
accessed by the client without any additional routing. */
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;
/* `app.listen(port, () => {...})` is starting the express application and listening for incoming
requests on the specified port. When the server starts listening, it logs a message to the console
indicating that the web server is running and the URL where it can be accessed. */

app.listen(port, () => {
  console.log("Web server is running on http://localhost:" + port);
});

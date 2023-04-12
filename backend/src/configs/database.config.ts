/**
 * The function connects to a MongoDB database using the provided URI and options.
 */
import { connect, ConnectOptions } from "mongoose";
/* The code defines a function named `dbConnect` that connects to a MongoDB database using
the provided URI and options. It uses the `connect` function from the `mongoose`
library to establish the connection and logs a success message if the connection is
successful, or an error message if the connection fails. The options passed to the
`connect` function include `useNewUrlParser` and `useUnifiedTopology`, which are
recommended options for connecting to MongoDB using Mongoose. */

export const dbConnect = () =>
  connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch((err) => console.log("Connection unsuccessful", err));

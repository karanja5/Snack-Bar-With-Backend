import { Schema, model } from "mongoose";

/* `export interface IUser` is defining an interface for a user object with properties `id`, `name`,
`email`, `password`, `address`, and `isAdmin`. This interface can be used to define the shape of
objects that will be stored in the database and retrieved from it. */
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  isAdmin: boolean;
}

/* This code defines a Mongoose schema for a user in a MongoDB database. The schema defines the
structure of the user document, including the fields `name`, `email`, `password`, `address`, and
`isAdmin`. The `required` property is set to `true` for all fields except `isAdmin`, which has a
default value of `false`. The schema also includes options for `toJSON`, `toObject`, and
`timestamps`. The `toJSON` and `toObject` options are used to include virtual properties in the
serialized output of the schema, and the `timestamps` option is used to automatically add
`createdAt` and `updatedAt` fields to the user document. */
export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    toJSON: /*This is for having the ids*/ {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

/*with user model we can create, read, update, delete, and find users in the database*/
/* This code exports a Mongoose model for the "User" collection in the database. It uses the `model`
function from Mongoose to create the model, which takes two arguments: the name of the model in the
database ("User"), and the schema for the model (`UserSchema`). The model is then exported as
`UserModel` for use in other parts of the application. */
export const UserModel = model<IUser>("User", UserSchema);

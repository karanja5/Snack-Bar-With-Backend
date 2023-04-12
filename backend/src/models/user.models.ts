import { Schema, model } from "mongoose";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  isAdmin: boolean;
}

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

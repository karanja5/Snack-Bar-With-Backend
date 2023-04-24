import { Schema, Types, model } from "mongoose";
// import { Food } from "../../../frontend/src/app/shared/models/food";
import { IFood, FoodSchema } from "./food.model";
import { OrderStatus } from "../constants/order_status_enum";

/* The `export interface IOrder` is defining the structure of an order object in TypeScript. It
specifies the properties of an order, such as its `id`, `userId`, `items`, `total`, `status`, and
`createdAt`. This interface can be used to ensure that objects passed around in the code conform to
this structure and have all the required properties. */
export interface IOrderItem {
  food: IFood;
  quantity: number;
  price: number;
}

/* This code defines a Mongoose schema for an order in a restaurant. The schema specifies the
properties of an order, such as its user ID, items, total, status, and other attributes. It also
includes options for the schema, such as enabling virtuals and timestamps. The schema is exported as
`OrderSchema` for use in creating a Mongoose model for the "Order" collection in the database. */
export const OrderItemSchema = new Schema<IOrderItem>({
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface IOrder {
  id: string;
  items: IOrderItem[];
  totalPrice: number;
  name: string;
  email: string;
  phoneNumber: string;
  paymentId: string;
  status: OrderStatus;
  /* `user: Types.ObjectId;` is defining a property called `user` in the `IOrder` interface, which is
  of type `Types.ObjectId`. This property is used to store the ID of the user who placed the order.
  The `Types.ObjectId` type is provided by the Mongoose library and is used to represent MongoDB
  ObjectIds. */
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = new Schema<IOrder>(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: OrderStatus.NEW },
    paymentId: { type: String },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model<IOrder>("Order", OrderSchema);

import { Schema, model } from "mongoose";
import { Food } from "../../../frontend/src/app/shared/models/food";
import { FoodSchema } from "./food.model";

/* The `export interface IOrder` is defining the structure of an order object in TypeScript. It
specifies the properties of an order, such as its `id`, `userId`, `items`, `total`, `status`, and
`createdAt`. This interface can be used to ensure that objects passed around in the code conform to
this structure and have all the required properties. */
export interface IOrderItem {
  food: Food;
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

export class Order {
  id!: number;
  items!: IOrderItem[];
  totalPrice!: number;
  totalQuantity!: number;
  name!: string;
  phoneNumber!: string;
  createdAt!: Date;
  status!: string;
}
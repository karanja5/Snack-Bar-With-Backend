/* The Order class represents an order with its properties such as id, items, totalPrice, name, email,
phoneNumber, paymentId, status, and createdAt. */
import { CartItem } from "./CartItem";

export class Order {
  id!: string;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
  paymentId!: string;
  status!: string;
  createdAt!: string;
}

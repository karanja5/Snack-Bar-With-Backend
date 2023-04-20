import { CartItem } from "./CartItem";

export class Order {
  id!: string;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
  paymentId!: string;
  createdAt!: Date;
  status!: string;
}

import { CartItem } from "./CartItem";

export class Order {
  id!: string;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  phoneNumber!: string;
  createdAt!: Date;
  status!: string;
}

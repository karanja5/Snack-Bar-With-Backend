import { CartItem } from "./CartItem";

export class Order {
  id!: number;
  items!: CartItem[];
  totalPrice!: number;
  totalQuantity!: number;
  name!: string;
  phoneNumber!: string;
  createdAt!: Date;
  status!: string;
}

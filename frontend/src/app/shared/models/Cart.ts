/* The Cart class represents a shopping cart with items, total price, and total count properties. */
import { CartItem } from "./CartItem";

export class Cart {
  items: CartItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}

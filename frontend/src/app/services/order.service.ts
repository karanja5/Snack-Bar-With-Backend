import { Injectable } from "@angular/core";
import { Order } from "../shared/models/Order";
import { HttpClient } from "@angular/common/http";
import {
  NEW_ORDER_FOR_CURRENT_USER_URL,
  ORDER_CREATE_URL,
  PAY_FOR_ORDER_FOR_CURRENT_USER_URL,
  TRACKING_ORDER_FOR_CURRENT_USER_URL,
} from "../shared/constants/urls";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient) {}
  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(NEW_ORDER_FOR_CURRENT_USER_URL);
  }

  payForOrder(order: Order): Observable<string> {
    return this.http.post<string>(PAY_FOR_ORDER_FOR_CURRENT_USER_URL, order);
  }

  trackOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(TRACKING_ORDER_FOR_CURRENT_USER_URL + id);
  }
}

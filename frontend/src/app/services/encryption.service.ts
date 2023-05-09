import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from "../shared/models/Order";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class EncryptionService {
  constructor(private http: HttpClient) {}

  encrypt(order: Order): Observable<string> {
    return this.http.post<string>(`http://localhost:3000/encrypt`, order);
  }
}

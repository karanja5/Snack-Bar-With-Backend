import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/shared/models/Order";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../../services/order.service";

@Component({
  selector: "app-tracking-page",
  templateUrl: "./tracking-page.component.html",
  styleUrls: ["./tracking-page.component.css"],
})
export class TrackingPageComponent implements OnInit {
  order!: Order;
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if (!params.orderId) return;
    orderService.trackOrderById(params.orderId).subscribe((order) => {
      this.order = order;
    });
  }

  ngOnInit(): void {}
}

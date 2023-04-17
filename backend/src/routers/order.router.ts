/* This code is defining a router for handling HTTP POST requests to create a new order. It imports the
`Router` and `asyncHandler` modules from the `express` library, as well as the `OrderModel` and
`OrderStatus` constants from other files in the project. */
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status_enum";

const router = Router();

router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;

    if (!requestOrder || requestOrder.items.length <= 0) {
      res.status(400).send("Cart is empty");
      return;
    }
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

export default router;

/* This code is defining a router for handling HTTP POST requests to create a new order. It imports the
`Router` and `asyncHandler` modules from the `express` library, as well as the `OrderModel` and
`OrderStatus` constants from other files in the project. */
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status_enum";
import authMid from "../middlewares/auth.mid";
import { NEW_ORDER_FOR_CURRENT_USER_URL } from "../../../frontend/src/app/shared/constants/urls";

const router = Router();
router.use(authMid);

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
router.get("/newOrder", async (req: any, res: any) => {
  const order = await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
  if (order) res.send(order);
  else res.status(400).send();
});

export default router;

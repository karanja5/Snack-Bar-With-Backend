import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status_enum";
import authMid from "../middlewares/auth.mid";

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
    /* `await OrderModel.deleteOne()` is deleting any existing order that has a status of
    `OrderStatus.NEW` and belongs to the current user (`req.user.id`). This is done to ensure that
    the user can only have one new order at a time. */
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
    /* This code is creating a new order object using the `OrderModel` constructor and passing in the
    `requestOrder` object as well as the `user` property from the `req` object. It then saves the
    new order to the database using the `save()` method and sends the new order object as a response
    to the client using the `res.send()` method. */
    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);
router.get("/newOrder", async (req: any, res: any) => {
  const order = await getNewOrderForCurrentUser(req);
  if (order) res.send(order);
  else res.status(400).send();
});

router.post("/payForOrder", async (req: any, res: any) => {
  const { paymentId } = req.body;
  const order = await getNewOrderForCurrentUser(req);
  if (!order) {
    res.status(400).send("No order found");
    return;
  } else {
    order.paymentId = paymentId;
    order.status = OrderStatus.PAID;
    await order.save();
    res.send(order._id);
  }
});

export default router;

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}

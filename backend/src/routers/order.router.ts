import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status_enum";
import auth from "../middlewares/auth.mid";

const router = Router();
router.use(auth);

router.post(
  "/create",
  asyncHandler(async (req: any, res: any) => {
    /* `const requestOrder = req.body;` is assigning the value of the `req.body` object to a constant
    variable named `requestOrder`. The `req.body` object contains the data submitted in the request
    body, which is typically in JSON format. In this case, it is likely that the request body
    contains information about the items in the user's cart, which will be used to create a new
    order. */
    const requestOrder = req.body;

    /* This code block is checking if the `requestOrder` object has any items in it. If there are no
    items in the cart, it sends a response with a status code of 400 and a message "Cart is empty",
    and then immediately returns from the function. This is likely done to prevent the creation of
    an order with no items, which would be invalid. */
    if (requestOrder.items.length <= 0) {
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
    /* `...requestOrder` is spreading the properties of the
      `requestOrder` object into a new object. `user: req.user.id`
      is then adding a new property to this object with the key
      `user` and the value of `req.user.id`. This new object is then
      passed as an argument to the `OrderModel` constructor to
      create a new order object with the properties of
      `requestOrder` and the `user` property set to the current
      user's ID. */
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

router.get(
  "/track/:id",
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    // res.send(order);
    if (order) {
      res.send(order);
    } else {
      res.status(400).send("Error: Order not found");
    }
  })
);

export default router;

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}

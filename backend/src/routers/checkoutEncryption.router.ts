import { Router } from "express";
import Encryption from "../routers/encryption";
import asyncHandler from "express-async-handler";
import { IPayload, PayloadModel } from "../models/payload.model";
import { OrderStatus } from "../constants/order_status_enum";
import { OrderModel } from "../models/order.model";

const router = Router();

const accessKey = process.env.ACCESS_KEY;
const IVKey = process.env.IV_KEY!;
const secretKey: string = process.env.SECRET_KEY!;
const algorithm: string = process.env.ALGORITHM!;
const port = process.env.PORT || 4200;

/* This code defines a route for handling a POST request to "/checkoutEncryption". When this route is
accessed, it creates a payload object with information about the current order, encrypts it using an
encryption class, and constructs a URL with the encrypted payload and other parameters. It then
creates a new payload document in the database, updates the status of the current order to
"PENDING", and sends a response with the URL and other information. The asyncHandler middleware is
used to handle any asynchronous errors that may occur during the execution of this route. */
router.post(
  "/checkoutEncryption",
  asyncHandler(async (req: any, res) => {
    // console.log(req.body);
    const currentOrder = req.body;
    const parts = currentOrder.name.split(" ");
    const firstName = parts[0];
    const lastName = parts[1];
    const itemNames = currentOrder.items.map((item: any) => item.food.name);
    const payload: IPayload = {
      merchantTransactionID: currentOrder._id,
      requestAmount: currentOrder.totalPrice.toString(),
      currencyCode: "KES",
      accountNumber: currentOrder.user,
      serviceCode: process.env.SERVICE_CODE!,
      dueDate: "", //Must be a future date
      requestDescription: "Payment for " + itemNames.join(", "),
      countryCode: "KE",
      languageCode: "en",
      payerClientCode: "",
      MSISDN: currentOrder.phoneNumber, //Must be a valid number
      customerFirstName: firstName,
      customerLastName: lastName,
      customerEmail: currentOrder.email,
      successRedirectUrl: "http://localhost:4200/track/" + currentOrder._id,
      failRedirectUrl: "http://localhost:4200/payment",
      pendingRedirectUrl: "",
      paymentWebhookUrl:
        "https://webhook.site/d486bb16-f476-4560-80b5-b3e3d7ecbaff",
    };

    let encryption: Encryption = new Encryption(IVKey, secretKey, algorithm);

    const params: string = encryption.encrypt(JSON.stringify(payload));
    const URL: string = `https://developer.tingg.africa/checkout/v2/express/?params=${params}&accessKey=${accessKey}&countryCode=${payload.countryCode}`;

    await PayloadModel.create(payload);
    currentOrder.status = OrderStatus.PAID;
    await OrderModel.findByIdAndUpdate(currentOrder._id, currentOrder); //Update the order status to PAID
    res.send({
      success: true,
      data: URL,
    });
  })
);

export default router;

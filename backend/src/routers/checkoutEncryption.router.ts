import { Router } from "express";
import Encryption from "../routers/encryption.js";
// import { OrderModel } from "../models/order.model";
// import { OrderStatus } from "../constants/order_status_enum";
import asyncHandler from "express-async-handler";
import { IPayload, PayloadModel } from "../models/payload.model";
import { OrderStatus } from "../constants/order_status_enum";
import { OrderModel } from "../models/order.model";
import { forEachChild } from "typescript";
// import { random } from "lodash";
// import { TRACKING_ORDER_FOR_CURRENT_USER_URL } from "../../../frontend/src/app/shared/constants/urls";

const router = Router();

const accessKey = process.env.ACCESS_KEY;
const IVKey = process.env.IV_KEY;
const secretKey: string = process.env.SECRET_KEY!;
const algorithm: string = process.env.ALGORITHM!;

router.post(
  "/checkoutEncryption",
  asyncHandler(async (req: any, res) => {
    // console.log(req.body);
    const currentOrder = req.body;
    let parts = currentOrder.name.split(" ");
    let firstName = parts[0];
    let lastName = parts[1];
    let itemNames = currentOrder.items.map((item: any) => item.food.name);
    console.log(itemNames);
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
      successRedirectUrl: "https://localhost:4200/track/" + currentOrder._id,
      failRedirectUrl: "localhost:4200/payment",
      pendingRedirectUrl: "",
      paymentWebhookUrl:
        "https://webhook.site/d486bb16-f476-4560-80b5-b3e3d7ecbaff",
    };

    let encryption: Encryption = new Encryption(IVKey, secretKey, algorithm);

    const params: string = encryption.encrypt(JSON.stringify(payload));
    const URL: string = `https://developer.tingg.africa/checkout/v2/express/?params=${params}&accessKey=${accessKey}&countryCode=${payload.countryCode}`;

    await PayloadModel.create(payload);
    currentOrder.status = OrderStatus.PENDING;
    await OrderModel.findByIdAndUpdate(currentOrder._id, currentOrder); //Update the order status to PAID
    res.json({ success: true, data: URL });
  })
);

export default router;

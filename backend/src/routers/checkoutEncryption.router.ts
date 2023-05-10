import { Router } from "express";
import Encryption from "../configs/encryption.config";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status_enum";
import asyncHandler from "express-async-handler";
import { IPayload } from "../models/payload.model";
// import { random } from "lodash";

const router = Router();

const accessKey = process.env.ACCESS_KEY;
const IVKey = process.env.IV_KEY;
const secretKey: string = process.env.SECRET_KEY!;
const algorithm: string = "aes-256-cbc";

router.get(
  "/",
  asyncHandler(async (req: any, res: any) => {
    const currentOrder = await getOrderForCurrentUser(req);
    if (!currentOrder) {
      res.status(400).send("No order found");
      return;
    }

    // } else {
    // let merchIdNo = random(100, 1000);
    // let merchId = `MERCHANT${merchIdNo}`;

    // const payload: IPayload = {
    //   merchantTransactionID: merchId,
    //   requestAmount: currentOrder.totalPrice,
    //   currencyCode: "KES",
    //   accountNumber: "devAccount1",
    //   serviceCode: "SASDEV1878",
    //   dueDate: "",
    //   requestDescription: "Test",
    //   countryCode: "KE",
    //   languageCode: "en",
    //   payerClientCode: "",
    //   MSISDN: currentOrder.phoneNumber,
    //   customerFirstName: currentOrder.name,
    //   customerLastName: currentOrder.name,
    //   customerEmail: currentOrder.email,
    //   successRedirectUrl: "",
    //   failRedirectUrl: "",
    //   pendingRedirectUrl: "",
    //   paymentWebhookUrl: "",
    // };
    // const payload: IPayload = {
    //   merchantTransactionID: merchId,
    //   requestAmount: 100,
    //   currencyCode: "KES",
    //   accountNumber: "devAccount1",
    //   serviceCode: "SASDEV1878",
    //   dueDate: "",
    //   requestDescription: "Test",
    //   countryCode: "KE",
    //   languageCode: "en",
    //   payerClientCode: "",
    //   MSISDN: "+254700000000",
    //   customerFirstName: "john",
    //   customerLastName: "currentOrder.name",
    //   customerEmail: "currentOrder.email",
    //   successRedirectUrl: "",
    //   failRedirectUrl: "",
    //   pendingRedirectUrl: "",
    //   paymentWebhookUrl: "",
    // };
    // const checkoutType: string = ["modal", "redirect"].includes(
    //   req.query?.type as string
    // )
    //   ? (req.query?.type as string)
    //   : "redirect";
    req.body = {
      merchantTransactionID: "test-1234567890",
      requestAmount: "6000",
      currencyCode: "KES",
      accountNumber: "10092019",
      serviceCode: "SASDEV1878",
      //   "dueDate": "2019-06-01 23:59:59", //Must be a future date
      requestDescription: "Dummy merchant transaction",
      countryCode: "KE",
      languageCode: "en",
      payerClientCode: "1234567890",
      MSISDN: "+254700000000", //Must be a valid number
      customerFirstName: "John",
      customerLastName: "Smith",
      customerEmail: "john.smith@example.com",
      successRedirectUrl: "",
      failRedirectUrl: "",
      pendingRedirectUrl: "",
      paymentWebhookUrl: "",
    };

    let encryption: Encryption = new Encryption(IVKey, secretKey, algorithm);

    const params: string = encryption.encrypt(JSON.stringify(req.body));
    const URL: string = `https://developer.tingg.africa/checkout/v2/express/?params=${params}&accessKey=${accessKey}&countryCode=${req.body.countryCode}`;

    res.json({ success: true, data: URL });
    // }
  })
);

export default router;
async function getOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}

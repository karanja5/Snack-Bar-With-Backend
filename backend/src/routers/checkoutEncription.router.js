const cors = require("cors");

const express = require("express");
const Encryption = require("./Encryption");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const payload = {
  // un-encrypted parameters collected against a request in json format
  merchantTransactionID: "hureeh098856",
  requestAmount: "100",
  currencyCode: "KES",
  accountNumber: "10092019",
  serviceCode: "<service_code>",
  dueDate: "2023-05-09 23:59:59", //Must be a future date
  requestDescription: "Dummy merchant transaction",
  countryCode: "KE",
  languageCode: "en",
  payerClientCode: "",
  MSISDN: "+254700000000", //Must be a valid number
  customerFirstName: "John",
  customerLastName: "Smith",
  customerEmail: "john.smith@example.com",
  successRedirectUrl: "",
  failRedirectUrl: "",
  pendingRedirectUrl: "",
  paymentWebhookUrl: "",
};

const accessKey =
  "<access_key>"; /* This is the access key provided by Tingg to the merchant */
const IVKey = "<IV_key>";
const secretKey = "<secret_key>";
const algorithm = "aes-256-cbc";

app.get("/checkout", (req, res) => {
  const checkoutType = ["modal", "redirect"].includes(req.query?.type)
    ? req.query?.type
    : "redirect";

  let encryption = new Encryption(IVKey, secretKey, algorithm);

  const params = encryption.encrypt(JSON.stringify(payload));
  const URL = `https://developer.tingg.africa/checkout/v2/express/?params=${params}&accessKey=${accessKey}&countryCode=${payload.countryCode}`;

  res.json({ success: true, data: URL });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

const cors = require("cors");

const express = require("express");
const Encryption = require("./encryption.router");

const app = express();
const port = 3000;

app.use(cors());
// enable parsing application/json
app.use(express.json());

app.post("/checkout-encryption", (req, res) => {
  const accessKey = "<YOUR_ACCESS_KEY>";
  const IVKey = "<YOUR_IV_KEY>";
  const secretKey = "<YOUR_SECRET_KEY>";
  const algorithm = "aes-256-cbc";

  // get the request body
  const requestBody = req.body;

  let encryption = new Encryption(IVKey, secretKey, algorithm);

  const payload = JSON.stringify(requestBody).replace(/\//g, "\\/");

  console.log(
    `https://developer.tingg.africa/checkout/v2/express/?params=${encryption.encrypt(
      payload
    )}&accessKey=${accessKey}&countryCode=${requestBody.countryCode}`
  );
  // return a JSON response
  res.json({
    params: encryption.encrypt(payload),
    accessKey,
    countryCode: requestBody.countryCode,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

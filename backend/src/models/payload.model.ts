/* This code is defining a Mongoose schema and model for a payload object that will be used in a
Node.js application. The `import` statement is importing the `Schema` and `model` classes from the
Mongoose library. The `IPayload` interface defines the structure of the payload object. The
`PayloadSchema` variable defines the schema for the payload object using the `Schema` class and the
`PayloadModel` variable defines the model for the payload object using the `model` class. The schema
includes various properties with their data types and validation rules, and the model is used to
interact with the database to create, read, update, and delete payload objects. */
import { Schema, model } from "mongoose";

export interface IPayload {
  merchantTransactionID: string;
  requestAmount: string;
  currencyCode: string;
  accountNumber: string;
  serviceCode: string;
  dueDate: string;
  requestDescription: string;
  countryCode: string;
  languageCode: string;
  payerClientCode: string;
  MSISDN: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  successRedirectUrl: string;
  failRedirectUrl: string;
  pendingRedirectUrl: string;
  paymentWebhookUrl: string;
}

export const PayloadSchema = new Schema<IPayload>(
  {
    merchantTransactionID: { type: String, required: true },
    requestAmount: { type: String, required: true },
    currencyCode: { type: String, default: "KES" },
    accountNumber: { type: String, default: "devAccount1" },
    serviceCode: {
      type: String,
      required: true,
      default: process.env.SERVICE_CODE,
    },
    dueDate: { type: String, required: false },
    requestDescription: { type: String, required: false },
    countryCode: { type: String, default: "KE" },
    languageCode: { type: String, default: "en" },
    payerClientCode: { type: String, required: false },
    MSISDN: { type: String, required: true },
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    successRedirectUrl: { type: String },
    failRedirectUrl: { type: String },
    pendingRedirectUrl: { type: String },
    paymentWebhookUrl: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const PayloadModel = model<IPayload>("Payload", PayloadSchema);

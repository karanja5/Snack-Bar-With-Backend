import { Schema, model } from "mongoose";

/* This code defines a Mongoose schema for an payload in a restaurant. The schema specifies the
properties of a payload, such as its user ID, items, total, status, and other attributes. It also
includes options for the schema, such as enabling virtuals and timestamps. The schema is exported as
`PayloadSchema` for use in creating a Mongoose model for the "Order" collection in the database. */

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

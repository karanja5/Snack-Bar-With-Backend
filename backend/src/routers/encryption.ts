/* The Encryption class provides a method to encrypt a payload using a secret key and initialization
vector (IV) with a specified algorithm. */
// import * as crypto from "crypto";
// class Encryption {
//   private IVKey: string;
//   private secretKey: string;
//   private algorithm: string;

//   constructor(ivKey: string, secretKey: string, algorithm: string) {
//     this.IVKey = ivKey;
//     this.secretKey = secretKey;
//     this.algorithm = algorithm;
//   }

//   public encrypt(payload: string): string {
//     let key: string | Buffer = crypto
//       .createHash("sha256")
//       .update(this.secretKey)
//       .digest("hex")
//       .substring(0, 32);
//     key = Buffer.from(key);
//     let iv: string | Buffer = crypto
//       .createHash("sha256")
//       .update(this.IVKey)
//       .digest("hex")
//       .substring(0, 16);
//     iv = Buffer.from(iv);
//     const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(key), iv);
//     let encrypted: Buffer = cipher.update(payload);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);

//     let base64: string = Buffer.from(encrypted, "binary").toString("base64");
/* `Buffer.from(base64, "binary")` is creating a new Buffer object from the base64 encoded
    string `base64` with the encoding set to "binary". Then, `.toString("base64")` is
    converting the binary data in the Buffer object back to a base64 encoded string. This
    step seems unnecessary and redundant, as `base64` is already a base64 encoded string. It
    is likely a mistake or oversight in the code. */
//     return Buffer.from(base64, "binary").toString("base64");
//   }
// }

// export default Encryption;
import * as crypto from "crypto";

class Encryption {
  private IVKey: string;
  private secretKey: string;
  private algorithm: string;

  constructor(ivKey: string, secretKey: string, algorithm: string) {
    this.IVKey = ivKey;
    this.secretKey = secretKey;
    this.algorithm = algorithm;
  }

  public encrypt(payload: string): string {
    let key: string | Buffer = crypto
      .createHash("sha256")
      .update(this.secretKey)
      .digest("hex")
      .substring(0, 32);
    key = Buffer.from(key);
    let iv: string | Buffer = crypto
      .createHash("sha256")
      .update(this.IVKey)
      .digest("hex")
      .substring(0, 16);
    iv = Buffer.from(iv);
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(key), iv);
    let encrypted: Buffer = cipher.update(payload);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    /* `let base64: string = Buffer.from(encrypted, 0).toString("base64");` is converting the encrypted
    payload from a Buffer object to a base64 encoded string. The `Buffer.from()` method is used to
    create a new Buffer object from the encrypted payload, and the `toString()` method with the
    argument "base64" is used to convert the Buffer object to a base64 encoded string. The resulting
    base64 encoded string is then assigned to the `base64` variable. */

    let base64: string = Buffer.from(encrypted, 0).toString("base64");

    return base64;
  }
}

export default Encryption;

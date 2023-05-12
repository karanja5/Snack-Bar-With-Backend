/* The Encryption class provides a method to encrypt a payload using a secret key and initialization
vector (IV) with a specified algorithm. */
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
    let key: any = crypto
      .createHash("sha256")
      .update(this.secretKey)
      .digest("hex")
      .substring(0, 32);
    key = Buffer.from(key);
    let iv: any = crypto
      .createHash("sha256")
      .update(this.IVKey)
      .digest("hex")
      .substring(0, 16);
    iv = Buffer.from(iv);
    const cipher: any = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(key),
      iv
    );
    let encrypted = cipher.update(payload);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let base64 = Buffer.from(encrypted, "binary").toString("base64");
    return Buffer.from(base64, "binary").toString("base64");
  }
}

export default Encryption;

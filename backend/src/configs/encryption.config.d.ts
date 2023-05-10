export default class Encryption {
  constructor(
    ivKey: string | any,
    secretKey: string | any,
    algorithm: string | any
  );
  encrypt(data: string): string;
}

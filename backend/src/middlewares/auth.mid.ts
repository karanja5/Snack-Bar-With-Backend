import { verify } from "jsonwebtoken";
const UNAUTHORIZED = 401;

export default (req: any, res: any, next: any) => {
  /*This access_token is the name chosen for the token that is set 
  on an interceptor on the frontend side*/
  const token = req.headers.access_token as string;
  if (!token) {
    return res.status(UNAUTHORIZED).send("Access denied. No token provided.");
  }
  try {
    const decodedUserFromToken = verify(token, process.env.JWT_SECRET!);
    req.user = decodedUserFromToken;
  } catch (error) {
    res.status(UNAUTHORIZED).send("Invalid token.");
  }

  return next();
};

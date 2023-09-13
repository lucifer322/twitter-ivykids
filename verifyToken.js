import jwt from "jsonwebtoken";
import { handleError } from "./error.js";
const tokenss = "abdhbdbshbqahbahdbahdbahdbahdb";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(handleError(401, "You are not authenticated"));

  jwt.verify(token, tokenss, (err, user) => {
    if (err) return next(createError(403, "Token is invalid"));
    req.user = user;
    next();
  });
};

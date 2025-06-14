import jwt from "jsonwebtoken";
import { errorHandler } from "./errorhandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    //this user means user id from the database.
    req.user = user;
    next();
  });
};

import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(400).json([
      {
        message: "tokenが必要です。",
      },
    ]);
  } else {
    try {
      JWT.verify(token, "SECRET_KEY");
      next();
    } catch (e) {
      return res.status(400).json([
        {
          message: "tokenが一致しません。",
        },
      ]);
    }
  }
};

export default checkJWT;

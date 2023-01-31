import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
  // const authHeader = req.headers['authorization'];
  const token = req.headers['authorization'];
  // const token = authHeader && authHeader.split("")[1];
  if (!token) {
    res.status(400).json([
      {
        message: "権限がありません。",
      },
    ]);
  } else {
    try {
      JWT.verify(token, "SECRET_KEY");
      next();
    } catch {
      return res.status(400).json([
        {
          message: "tokenが一致しません。",
        },
      ]);
    }
  }
};

export default checkJWT;

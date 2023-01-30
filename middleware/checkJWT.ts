import { Jwt } from "jsonwebtoken";

export function auth(req, res, next) {
  // JWTを持っているか確認 -> リクエストヘッダの中のx-auth-tokenを確認
  const token = req.header("")
  const isHaveJWT = false;
  if (!isHaveJWT) {
    res.json(400).json([
      {
        message: "権限がありません。",
      },
    ]);
  } else {
    next();
  }
}

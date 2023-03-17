import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserRepository from "../repository/userRepository";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import config from "../config";
import { User } from "../model/User";

const userRepository = new UserRepository();

// ユーザー登録
export async function registerUser(req: Request, res: Response) {
  const { username, firstname, lastname, email, password } = req.body;
  const user = new User(username, firstname, lastname, email, password);

  // バリデーションチェック
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // そのユーザーがすでに存在しているか確認
  const duplicatingUser = await userRepository.findByEmail(user.email);
  if (duplicatingUser) {
    return res.status(400).send([
      {
        message: "すでにそのユーザーは存在しています。",
      },
    ]);
  }

  // パスワードの暗号化
  const hashedPassword = await bcrypt.hash(password, 10);

  // DBへ保存
  await userRepository.create(user, hashedPassword);
  res.send(user);
}

// ユーザーログイン
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res.status(400).send([
      {
        message: "そのユーザーは存在しません。",
      },
    ]);
  }

  // パスワードの復号、照合
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send([
      {
        message: "パスワードが異なります。",
      },
    ]);
  }

  const token = JWT.sign({ email }, config.jwt.secret, config.jwt.options);
  return res.json({
    token: token,
  });
}

// ユーザー情報更新
export async function putUser(req: Request, res: Response) {
  try {
    const user = await userRepository.findById(parseInt(req.params.id));
    if (user == null) {
      return res.status(404).send([
        {
          message: "そのユーザーは存在しません。",
        },
      ]);
    }

    // 一部更新も可能にする
    user.username = req.body.username || user.username;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;

    // パスワード暗号化
    if (req.body.password != undefined) {
      if (req.body.password.length >= 6) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      } else {
        return res.status(400).send([
          {
            message: "パスワードは6文字以上入力してください。",
          },
        ]);
      }
      user.password = user.password;
    }

    await userRepository.update(user);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

// ユーザー削除
export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await userRepository.findById(parseInt(req.params.id));
    if (user == null) {
      res.status(404).send([
        {
          message: "そのユーザーは存在しません。",
        },
      ]);
      return;
    }
    await userRepository.delete(user);
    res.send([
      {
        message: "削除しました。",
      },
    ]);
  } catch (error) {
    res.status(400).send(error);
  }
}

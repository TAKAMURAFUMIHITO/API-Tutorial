import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../model/User";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import config from "../config";

const userRepository = AppDataSource.getRepository(User);

// ユーザー登録
export async function registerUser(req: Request, res: Response) {
  const { username, firstname, lastname, email, password } = req.body;
  // バリデーションチェック
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  // そのユーザーがすでに存在しているか確認
  const user = await userRepository.findOneBy({
    email: email,
  });
  if (user) {
    return res.status(400).send([
      {
        message: "すでにそのユーザーは存在しています。",
      },
    ]);
  };

  // パスワードの暗号化
  let hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  // DBへ保存
  await userRepository.save({
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  res.send({
    username,
    firstname,
    lastname,
    email,
    password,
  });
};

// ユーザーログイン
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userRepository.findOneBy({
    email: email,
  });
  if (!user) {
    return res.status(400).send([
      {
        message: "そのユーザーは存在しません。",
      },
    ]);
  };

  // パスワードの復号、照合
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send([
      {
        message: "パスワードが異なります。",
      },
    ]);
  };

  const token = JWT.sign(
    { email }, config.jwt.secret, config.jwt.options
  );
  return res.json({
    token: token,
  });
};

// ユーザー情報更新
export async function putUser(req: Request, res: Response) {
  try {
    const user = await userRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (user == null) {
      res.status(404).send([
        {
          message: "そのユーザーは存在しません。",
        },
      ]);
      return;
    };

    // 一部更新も可能にする
    user.username = req.body.username || user.username;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    // パスワード
    if (req.body.password.length >= 6) {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword || user.password;
    } else {
      return res.status(400).send([
        {
          message: "パスワードは6文字以上入力してください。",
        },
      ]);
    };
    await userRepository.save(user);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  };
};

// ユーザー削除
export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await userRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (user == null) {
      res.status(404).send([
        {
          message: "そのユーザーは存在しません。",
        },
      ]);
      return;
    };
    await userRepository.remove(user);
    res.send([
      {
        message: "削除しました。",
      },
    ]);
  } catch (error) {
    res.status(400).send(error);
  };
};

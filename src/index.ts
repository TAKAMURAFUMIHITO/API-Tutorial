import express from "express";
import { Request, Response } from "express";
import { Book } from "./entity/Book";
import { User } from "./entity/User";
import AppDataSource from "./data-source";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import checkJWT from "../middleware/checkJWT";
import * as dotenv from 'dotenv';
dotenv.config();


AppDataSource.initialize()
    .then(() => console.log("データソースの初期化が完了しました！"))
    .catch((err) => console.error("データベースの初期化中に以下のようなエラーが発生しました:", err))

const app = express();
app.use(express.json());

const bookRepository = AppDataSource.getRepository(Book);
const userRepository = AppDataSource.getRepository(User);

// GET /books
app.get("/books", checkJWT, async function (req: Request, res: Response) {
    try {
        const books = await bookRepository.find();
        res.json(books);
    } catch (error) {
        res.status(400).send(error);
    };
});

// GET /books/:id
app.get("/books/:id", checkJWT, async function (req: Request, res: Response) {
    try {
        const book = await bookRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (book == null) {
            res.status(404).send([
                {
                    message: "その本は存在しません。",
                }
            ]);
            return;
        };
        res.send(book);
    } catch (error) {
        res.status(400).send(error);
    };
});

// POST /books
app.post("/books", checkJWT, async function (req: Request, res: Response) {
    try {
        const book = new Book(req.body.title, req.body.body, req.body.userId);
        await bookRepository.save(book);
        res.send(book);
    } catch (error) {
        res.status(400).send(error);
    };
});

// PUT /books/:id
app.put("/books/:id", checkJWT, async function (req: Request, res: Response) {
    try {
        const book = await bookRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (book == null) {
            res.status(404).send([
                {
                    message: "その本は存在しません。",
                }
            ]);
            return;
        };

        // 一部更新も可能にする
        book.title = req.body.title || book.title;
        book.body = req.body.body || book.body;

        await bookRepository.save(book);
        res.send(book);
    } catch (error) {
        res.status(400).send(error);
    };
});

// DELETE /books/:id
app.delete("/books/:id", checkJWT, async function (req: Request, res: Response) {
    try {
        const book = await bookRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (book == null) {
            res.status(404).send([
                {
                    message: "その本は存在しません。",
                }
            ]);
            return;
        };
        await bookRepository.remove(book);
        res.send([
            {
                message: "削除しました。",
            }
        ]);
    } catch (error) {
        res.status(400).send(error);
    };
});

//  Post /user/register
app.post(
    "/user/register",
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    async function (req: Request, res: Response) {
        const { username, firstname, lastname, email, password } = req.body;

        // バリデーションチェック
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // そのユーザーがすでに存在しているか確認
        const user = await userRepository.findOneBy({
            email: email,
        })
        if (user) {
            return res.status(400).send([
                {
                    message: "すでにそのユーザーは存在しています。",
                }
            ]);
        }

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
    }
);

// Post /user/login
app.post("/user/login", async function (req: Request, res: Response) {
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
        { email }, "SECRET_KEY", { expiresIn: "1d" }
    );
    return res.json({
        token: token,
    });
});

// Put /user/:id
app.put("/user/:id", checkJWT, async function (req: Request, res: Response) {
    try {
        const user = await userRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (user == null) {
            res.status(404).send([
                {
                    message: "そのユーザーは存在しません。",
                }
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
        }
        await userRepository.save(user);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    };
})

// Delete /user/:id
app.delete("/user/:id", checkJWT, async function (req: Request, res: Response) {
    try {
        const user = await userRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (user == null) {
            res.status(404).send([
                {
                    message: "そのユーザーは存在しません。",
                }
            ]);
            return;
        };
        await userRepository.remove(user);
        res.send([
            {
                message: "削除しました。",
            }
        ]);
    } catch (error) {
        res.status(400).send(error);
    };
});

app.listen(3000, () => {
    console.log('サーバーが起動しました。ポート番号:3000');
});

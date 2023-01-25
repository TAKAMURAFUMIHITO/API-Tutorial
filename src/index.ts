import express from "express";
import { Request, Response } from "express";
import { Book } from "./entity/Book";
import AppDataSource from "./data-source";

AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch((err) => console.error("Error during Data Source initialization:", err))

const app = express();
app.use(express.json());

const bookRepository = AppDataSource.getRepository(Book);

// GET /books
app.get("/books", async function (req: Request, res: Response) {
    try {
        const books = await bookRepository.find();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    };
});

// GET /books/:id
app.get("/books/:id", async function (req: Request, res: Response) {
    try {
        const book = await bookRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (book == null) {
            res.status(204).send();
            return;
        };
        res.send(book);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    };
});

// POST /books
app.post("/books", async function (req: Request, res: Response) {
    try {
        const book = new Book(req.body.title, req.body.body);
        await bookRepository.save(book);
        res.send(book);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    };
});

// PUT /books/:id
app.put("/books/:id", async function (req: Request, res: Response) {
    try {
        const book = await bookRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (book == null) {
            res.status(404).send();
            return;
        };

        // 一部更新も可能にする
        book.title = req.body.title || book.title;
        book.body = req.body.body || book.body;

        await bookRepository.save(book);
        res.send(book);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    };
});

// DELETE /books/:id
app.delete("/books/:id", async function (req: Request, res: Response) {
    try {
        const book = await bookRepository.findOneBy({
            id: Number(req.params.id),
        });
        if (book == null) {
            res.status(404).send();
            return;
        };

        await bookRepository.remove(book);
        res.sendStatus(404).send();
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    };
});

app.listen(3000, () => {
    console.log('サーバーが起動しました。ポート番号:3000');
});

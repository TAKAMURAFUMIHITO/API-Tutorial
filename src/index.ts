import express from "express";
import { Request, Response } from "express";
import { Book } from "./entity/Book";
import AppDataSource from "./data-source";

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error)
    })

/*
const app = express();
app.use(express.json());


app.get("/books", function (req: Request, res: Response) {
});

app.get("/books/:id", function (req: Request, res: Response) {
});

app.post("/books", function (req: Request, res: Response) {
});

app.put("/books/:id", function (req: Request, res: Response) {
});

app.delete("/books/:id", function (req: Request, res: Response) {
});


app.listen(3000);
*/

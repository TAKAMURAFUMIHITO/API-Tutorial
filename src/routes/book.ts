import express from "express";
import checkJWT from "../../middleware/checkJWT";
import { getBooks, getBook, postBook, putBook, deleteBook } from "../controller/book";

const router = express.Router();

// GET /books
router.get("/", checkJWT, getBooks);

// GET /books/:id
router.get("/:id", checkJWT, getBook);

// POST /books
router.post("/", checkJWT, postBook);

// PUT /books/:id
router.put("/:id", checkJWT, putBook);

// DELETE /books/:id
router.delete("/:id", checkJWT, deleteBook);

export default router;

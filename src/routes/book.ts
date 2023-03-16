import express from "express";
import checkJWT from "../../middleware/checkJWT";
import {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
} from "../controller/bookController";

const router = express.Router();

// GET /books
router.get("/", checkJWT, getBooks);

// GET /books/:id
router.get("/:id", checkJWT, getBook);

// POST /books/:userId
router.post("/:userId", checkJWT, postBook);

// PUT /books/:userId/:id
router.put("/:userId/:id", checkJWT, putBook);

// DELETE /books/:id
router.delete("/:userId/:id", checkJWT, deleteBook);

export default router;

import express from 'express';
import { createBooks, getBooks, detailBooks, changeBook, deleteBook } from './controller.js';

const router = express.Router();

router.post("/books", createBooks)
router.get("/books", getBooks)
router.get("/books/:id", detailBooks)
router.put("/books/:id", changeBook)
router.delete("/books/:id", deleteBook)

export default router;
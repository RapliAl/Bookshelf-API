import express from 'express';
import { createBooks, getBooks, detailBooks } from './controller.js';

const router = express.Router();

router.post("/books", createBooks)
router.get("/books", getBooks)
router.get("/books/:id", detailBooks)

export default router;
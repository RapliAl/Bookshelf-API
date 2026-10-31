import express from 'express';
import { createBooks, getBooks } from './controller.js';

const router = express.Router();

router.post("/books", createBooks)
router.get("/books", getBooks)

export default router;
import { nanoid } from 'nanoid';
import books from './books.js';

export const createBooks = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    const id = nanoid(16)
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    if(!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
    }

    if(readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }
 
    const newBook = {
        id, 
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        finished, 
        reading, 
        insertedAt,
        updatedAt
    }
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess === true) {
        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    })
}

export const getBooks = (req, res) => {
    const bookData = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }))

    const isSuccess = books.filter((book) => book.id).length > 0;

    if (isSuccess === true) {
        return res.status(200).json({
            status: 'success',
            data: {
                books: bookData
            }
        })
    }

    return res.status(200).json({
        status: 'success',
        data: {
            books: []
        }
    })
}

export const detailBooks = (req, res) => {
    const { id } = req.params;
    const book = books.filter((book) => book.id === id)[0];

    if (book !== undefined) {
        return res.status(200).json({
            status: 'success',
            data: {
                book: book
            }
        })
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
}

export const changeBook = (req, res) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    const { id } = req.params;

    if(!name) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        })
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: "fail",
            message: "Gagal memperbarui buku. ReadPage tidak boleh lebih besar dari pageCount"
        })
    }

    const isSuccess = books.filter((book) => id === book.id).length > 0;

    if(isSuccess === false) {
        return res.status(404).json({
            status: "fail",
            message: "Gagal memperbarui "
        })
    }

    return res.status(200).json({
        status: "success",
        message: "Buku berhasil diperbarui"
    })
}

export const deleteBook = (req, res) => {
    const { id } = req.params;
    const index = books.findIndex((b) => b.id === id);

    if (index !== -1) {
        books.splice(index, 1)

        return res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus"
        })
    }

    return res.status(404).json({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    })
}
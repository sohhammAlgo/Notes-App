const express = require('express');
const { createNote, getAllNotes, getSingleNote, getFilteredNotes, updateNote, deleteNote } = require('../controllers/notesControllers');
const router = express.Router();

router.get('/', getAllNotes);
router.get('/search', getFilteredNotes);  // For filtered/search queries
router.get('/:id', getSingleNote);  // Get single note by ID
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
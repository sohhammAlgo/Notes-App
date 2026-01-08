const Note = require('../models/Notes');

//Create a new note
const createNote = async (req, res)=>{
    try{
        const note = await Note.create(req.body);
        res.status(200).json(note);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

//Get all notes
const getAllNotes = async(req,res) =>{
    try{
        const notes = await Note.find({});
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// Get single note by ID
const getSingleNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Searching & filtering
const getFilteredNotes = async (req, res) => {
    try {
        const { search, priority, pinned } = req.query;
        let query = {};
        // Search in title or content
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }
        // Filter by priority
        if (priority) {
            query.priority = priority;
        }
        // Filter by pinned (convert string to boolean)
        if (pinned !== undefined) {
            query.isPinned = pinned === "true";
        }
        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Update Note
const updateNote = async(req,res) =>{
    try{
        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updated);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

//Delete Note 
const deleteNote = async(req,res) =>{
    try{
        const deleted = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json(deleted)
    } catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports = { createNote, getAllNotes, getSingleNote, getFilteredNotes, updateNote, deleteNote };

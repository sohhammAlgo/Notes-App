import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import NoteCard from "../components/NoteCard";
import AddNoteModal from "../components/AddNoteModal";
import { getNotes, createNote, deleteNote, updateNote } from "../api/notesApi";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        loadNotes();
    }, [search]);

    const loadNotes = async () => {
        const data = await getNotes({ search });
        setNotes(data);
    };

    const addNote = async (note) => {
        const newNote = await createNote(note);
        setNotes([newNote, ...notes]);
        setModal(false);
    };

    const removeNote = async (id) => {
        await deleteNote(id);
        setNotes(notes.filter(n => n._id !== id));
    };

    const pinNote = async (id) => {
        const note = notes.find(n => n._id === id);
        const updated = await updateNote(id, { isPinned: !note.isPinned });
        setNotes(notes.map(n => n._id === id ? updated : n));
    };

    return (
        <div className="p-8">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Notes</h1>

                <div className="flex gap-3">
                    <input
                        placeholder="Search..."
                        onChange={e => setSearch(e.target.value)}
                        className="border p-2"
                    />
                    <button onClick={() => setModal(true)} className="bg-black text-white p-3 rounded-full">
                        <Plus />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {notes.map(note => (
                    <NoteCard
                        key={note._id}
                        note={note}
                        onDelete={removeNote}
                        onPin={pinNote}
                        onUpdate={(id, data) => updateNote(id, data).then(loadNotes)}
                    />
                ))}
            </div>

            <AddNoteModal open={modal} onClose={() => setModal(false)} onSave={addNote} />
        </div>
    );
};

export default Notes;

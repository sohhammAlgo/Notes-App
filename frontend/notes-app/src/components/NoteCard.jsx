import { Trash2, Pin, MoreVertical } from "lucide-react";
import { useState } from "react";

const NoteCard = ({ note, onDelete, onPin, onUpdate }) => {
    const [menu, setMenu] = useState(false);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const save = () => {
        onUpdate(note._id, { title, content });
        setEdit(false);
    };

    return (
        <div className="rounded-2xl p-6 relative shadow-lg" style={{ backgroundColor: note.color }}>
            {edit ? (
                <>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-2 p-2 rounded" />
                    <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 rounded h-24" />
                    <button onClick={save} className="mt-2 bg-black text-white px-3 py-1 rounded">Save</button>
                </>
            ) : (
                <>
                    <h3 className="font-semibold">{note.title}</h3>
                    <p className="opacity-75">{note.content}</p>

                    <div className="flex justify-between mt-6">
                        <button onClick={() => setMenu(!menu)}><MoreVertical /></button>
                        <button onClick={() => onPin(note._id)}>
                            <Pin fill={note.isPinned ? "black" : "none"} />
                        </button>
                    </div>

                    {menu && (
                        <div className="absolute bottom-16 bg-white p-2 rounded shadow">
                            <button onClick={() => onDelete(note._id)}><Trash2 /></button>
                            <button onClick={() => setEdit(true)}>Edit</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default NoteCard;

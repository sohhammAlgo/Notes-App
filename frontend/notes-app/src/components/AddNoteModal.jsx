import { useState } from "react";
import ColorPicker from "./ColorPicker";

const AddNoteModal = ({ open, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [color, setColor] = useState("#FFD88A");

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-96">
                <h2 className="text-xl font-bold mb-3">Create Note</h2>

                <ColorPicker selectedColor={color} onColorChange={setColor} />

                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-2 border" />
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="w-full p-2 border h-24" />

                <div className="flex gap-2 mt-3">
                    <button onClick={() => onSave({ title, content, color })} className="bg-black text-white px-4 py-2 rounded">
                        Save
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddNoteModal;

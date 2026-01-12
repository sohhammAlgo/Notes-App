import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./NoteForm.css";

const NoteForm = ({ note, onSave, onCancel }) => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        priority: 'Low',
        tag: [],
        isPinned: false
    });

    const [tagInput, setTagInput] = useState('');

    // ✅ Sync form for edit / create
    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title || '',
                content: note.content || '',
                priority: note.priority || 'Low',
                tag: note.tag || [],
                isPinned: note.isPinned || false
            });
        } else {
            // reset for new note
            setFormData({
                title: '',
                content: '',
                priority: 'Low',
                tag: [],
                isPinned: false
            });
        }
        setTagInput('');
    }, [note]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FORM SUBMITTED", formData); // 👈 ADD THIS

        onSave({
            ...formData,
            title: formData.title.trim(),
            content: formData.content.trim()
        });
    };




    const addTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !formData.tag.includes(trimmed)) {
            setFormData(prev => ({
                ...prev,
                tag: [...prev.tag, trimmed]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tag: prev.tag.filter(t => t !== tagToRemove)
        }));
    };

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="modal-header">
                    <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={onCancel}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="note-form">

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="Enter note title..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({ ...formData, content: e.target.value })
                            }
                            placeholder="Write your note here..."
                            rows="6"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({ ...formData, priority: e.target.value })
                                }
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.isPinned}
                                    onChange={(e) =>
                                        setFormData({ ...formData, isPinned: e.target.checked })
                                    }
                                />
                                Pin this note
                            </label>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="form-group">
                        <label>Tags</label>
                        <div className="tag-input-wrapper">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag();
                                    }
                                }}
                                placeholder="Add tags..."
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="add-tag-btn"
                            >
                                Add
                            </button>
                        </div>

                        <div className="tags-list">
                            {formData.tag.map((tag, i) => (
                                <span key={i} className="tag-item">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-cancel"
                        >
                            Cancel
                        </button>

                        {/* ✅ THIS NOW WORKS */}
                        <button type="submit" className="btn-save">
                            {note ? 'Update' : 'Create'} Note
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default NoteForm;

import { Trash2, Pin, Edit2, Tag } from "lucide-react";
import "./NoteCard.css";

const NoteCard = ({ note, index, onDelete, onEdit, onTogglePin }) => {

    const noteColors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
        '#F8B739', '#52B788', '#E76F51', '#8338EC'
    ];

    const color = noteColors[index % noteColors.length];

    return (
        <div
            className="note-card"
            style={{
                borderLeft: `4px solid ${color}`,
                background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`
            }}
        >
            {/* Header */}
            <div className="note-header">
                <div className="note-priority" style={{ backgroundColor: color }}>
                    {note.priority}
                </div>

                <button
                    className={`pin-btn ${note.isPinned ? 'pinned' : ''}`}
                    onClick={() => onTogglePin(note)}
                    style={{ color: note.isPinned ? color : '#888' }}
                >
                    <Pin size={18} />
                </button>
            </div>

            {/* Content */}
            <h3 className="note-title" style={{ color }}>{note.title}</h3>
            <p className="note-content">{note.content}</p>

            {/* Tags */}
            {note.tag?.length > 0 && (
                <div className="note-tags">
                    {note.tag.map((tag, i) => (
                        <span key={i} className="tag" style={{ borderColor: color, color }}>
                            <Tag size={12} />
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="note-footer">
                <span className="note-date">
                    {new Date(note.createdAt).toLocaleDateString()}
                </span>

                <div className="note-actions">
                    <button className="action-btn edit" onClick={() => onEdit(note)}>
                        <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => onDelete(note._id)}>
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;

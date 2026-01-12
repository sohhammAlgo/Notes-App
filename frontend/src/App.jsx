import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from "./api/notesApi";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ priority: '', pinned: '' });

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, searchTerm, filters]);

  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const filterNotes = () => {
    let filtered = [...notes];

    // 🔍 Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
    }

    // ⭐ Priority
    if (filters.priority) {
      filtered = filtered.filter(
        note => note.priority === filters.priority
      );
    }

    // 📌 Pinned
    if (filters.pinned !== '') {
      filtered = filtered.filter(
        note => note.isPinned === filters.pinned
      );
    }

    // 🔽 Sort: pinned first, newest first
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredNotes(filtered);
  };

  const handleSaveNote = async (formData) => {
    if (editingNote) {
      await updateNote(editingNote._id, formData);
    } else {
      await createNote(formData);
    }

    await loadNotes();
    setShowForm(false);
    setEditingNote(null);
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
      loadNotes();
    }
  };

  const handleTogglePin = async (note) => {
    await updateNote(note._id, {
      isPinned: !note.isPinned
    });
    loadNotes();
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>📝 My Notes</h1>
          <button className="btn-new" onClick={() => setShowForm(true)}>
            <Plus size={20} />
            New Note
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="container">

        <SearchBar
          searchText={searchTerm}
          onSearch={setSearchTerm}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <h3>No notes found</h3>
            <p>Create your first note to get started!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                note={note}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <NoteForm
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={() => {
            setShowForm(false);
            setEditingNote(null);
          }}
        />
      )}
    </div>
  );
};

export default App;

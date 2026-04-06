import { useState, useRef, useEffect } from "react";
import { COLORS, INITIAL_NOTES } from "../constants";
import NoteCard from "./NoteCard";
import NoteEditor from "./NoteEditor";
import styles from "../styles/notes.module.css";

export default function NotesApp() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editColor, setEditColor] = useState(0);
  const titleRef = useRef(null);

  const filtered = notes
    .filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.body.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned || b.createdAt - a.createdAt);

  const openNew = () => {
    const note = {
      id: Date.now(),
      title: "",
      body: "",
      color: 0,
      pinned: false,
      createdAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setEditingId(note.id);
    setEditTitle("");
    setEditBody("");
    setEditColor(0);
  };

  const openEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditBody(note.body);
    setEditColor(note.color);
  };

  const saveEdit = () => {
    if (!editTitle.trim() && !editBody.trim()) {
      setNotes((prev) => prev.filter((n) => n.id !== editingId));
    } else {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? { ...n, title: editTitle, body: editBody, color: editColor }
            : n
        )
      );
    }
    setEditingId(null);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  useEffect(() => {
    if (editingId && titleRef.current) titleRef.current.focus();
  }, [editingId]);

  const pinnedNotes = filtered.filter((n) => n.pinned);
  const otherNotes = filtered.filter((n) => !n.pinned);

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect width="26" height="26" rx="7" fill="#1a1a2e" />
              <rect x="6" y="8" width="14" height="2" rx="1" fill="#f5c518" />
              <rect x="6" y="12" width="10" height="2" rx="1" fill="#f5c518" opacity="0.7" />
              <rect x="6" y="16" width="12" height="2" rx="1" fill="#f5c518" opacity="0.5" />
            </svg>
            <span className={styles.logoText}>Noted.</span>
          </div>
          <div className={styles.searchWrap}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={styles.searchIcon}>
              <circle cx="7" cy="7" r="5" stroke="#999" strokeWidth="1.5" />
              <line x1="11" y1="11" x2="15" y2="15" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className={styles.search}
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className={styles.addBtn} onClick={openNew} title="New note">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="9" y1="3" x2="9" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="9" x2="15" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Notes Grid */}
      <main className={styles.main}>
        {notes.length === 0 || filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📝</div>
            <p className={styles.emptyText}>
              {search ? "No notes match your search." : "No notes yet. Click + to get started!"}
            </p>
          </div>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <section>
                <p className={styles.sectionLabel}>📌 Pinned</p>
                <div className={styles.grid}>
                  {pinnedNotes.map((note) =>
                    editingId === note.id ? (
                      <NoteEditor
                        key={note.id}
                        titleRef={titleRef}
                        editTitle={editTitle}
                        editBody={editBody}
                        editColor={editColor}
                        setEditTitle={setEditTitle}
                        setEditBody={setEditBody}
                        setEditColor={setEditColor}
                        onSave={saveEdit}
                        onDelete={() => deleteNote(note.id)}
                      />
                    ) : (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={() => openEdit(note)}
                        onDelete={() => deleteNote(note.id)}
                        onPin={() => togglePin(note.id)}
                      />
                    )
                  )}
                </div>
              </section>
            )}
            {otherNotes.length > 0 && (
              <section>
                {pinnedNotes.length > 0 && <p className={styles.sectionLabel}>All Notes</p>}
                <div className={styles.grid}>
                  {otherNotes.map((note) =>
                    editingId === note.id ? (
                      <NoteEditor
                        key={note.id}
                        titleRef={titleRef}
                        editTitle={editTitle}
                        editBody={editBody}
                        editColor={editColor}
                        setEditTitle={setEditTitle}
                        setEditBody={setEditBody}
                        setEditColor={setEditColor}
                        onSave={saveEdit}
                        onDelete={() => deleteNote(note.id)}
                      />
                    ) : (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={() => openEdit(note)}
                        onDelete={() => deleteNote(note.id)}
                        onPin={() => togglePin(note.id)}
                      />
                    )
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

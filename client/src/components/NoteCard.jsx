import { useState } from "react";
import { COLORS } from "../constants";
import styles from "../styles/notes.module.css";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function NoteCard({ note, onEdit, onDelete, onPin }) {
  const [hovered, setHovered] = useState(false);
  const { bg, border } = COLORS[note.color] || COLORS[0];
  return (
    <div className={styles.card} style={{ background: bg, borderColor: hovered ? border : "transparent" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onEdit}>
      {note.title && <p className={styles.cardTitle}>{note.title}</p>}
      {note.body && <p className={styles.cardBody}>{note.body}</p>}
      <div className={styles.cardFooter}>
        <span className={styles.cardDate}>{formatDate(note.created_at)}</span>
        <div className={styles.cardActions} style={{ opacity: hovered ? 1 : 0 }} onClick={(e) => e.stopPropagation()}>
          <button className={styles.iconBtn} onClick={onPin} title={note.pinned ? "Unpin" : "Pin"}>{note.pinned ? "📌" : "📍"}</button>
          <button className={styles.iconBtn} onClick={onDelete} title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  );
}

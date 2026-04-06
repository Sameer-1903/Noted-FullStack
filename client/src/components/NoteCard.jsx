import { useState } from "react";
import { COLORS } from "../constants";
import styles from "../styles/notes.module.css";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function NoteCard({ note, onEdit, onDelete, onPin, onToggleItem }) {
  const [hovered, setHovered] = useState(false);
  const { bg, border } = COLORS[note.color] || COLORS[0];
  const items = note.type === "checklist" ? JSON.parse(note.items || "[]") : [];
  const done = items.filter(i => i.checked).length;

  return (
    <div className={styles.card} style={{ background: bg, borderColor: hovered ? border : "transparent" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={note.type !== "checklist" ? onEdit : undefined}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: note.title ? 6 : 0 }}>
        {note.type === "checklist" && <span style={{ fontSize: 12, background: "#1a1a2e", color: "#f5c518", borderRadius: 4, padding: "1px 6px", fontFamily: "Georgia, serif", flexShrink: 0 }}>checklist</span>}
        {note.title && <p className={styles.cardTitle} style={{ margin: 0 }}>{note.title}</p>}
      </div>
      {note.type === "checklist" ? (
        <div style={{ flex: 1 }}>
          {items.slice(0, 5).map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}
              onClick={(e) => { e.stopPropagation(); onToggleItem(idx); }}>
              <div style={{ width: 15, height: 15, borderRadius: 3, border: `1.5px solid ${border}`, background: item.checked ? border : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
                {item.checked && <svg width="9" height="9" viewBox="0 0 9 9"><polyline points="1,4.5 3.5,7 8,2" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
              </div>
              <span style={{ fontSize: 12.5, color: item.checked ? "#aaa" : "#444", textDecoration: item.checked ? "line-through" : "none", fontFamily: "Georgia, serif" }}>{item.text}</span>
            </div>
          ))}
          {items.length > 5 && <p style={{ fontSize: 11, color: "#aaa", margin: "4px 0 0" }}>+{items.length - 5} more</p>}
          <p style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>{done}/{items.length} done</p>
          <button onClick={onEdit} style={{ marginTop: 6, fontSize: 11, color: "#888", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "Georgia, serif" }}>Edit checklist →</button>
        </div>
      ) : (
        note.body && <p className={styles.cardBody}>{note.body}</p>
      )}
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
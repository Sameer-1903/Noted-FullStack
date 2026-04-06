import { COLORS } from "../constants";
import styles from "../styles/notes.module.css";

export default function NoteEditor({ titleRef, editTitle, editBody, editColor, setEditTitle, setEditBody, setEditColor, onSave, onDelete }) {
  const { bg, border } = COLORS[editColor];
  return (
    <div className={`${styles.card} ${styles.editorCard}`} style={{ background: bg, borderColor: border }}>
      <input ref={titleRef} className={styles.editorTitle} placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      <textarea className={styles.editorBody} placeholder="Take a note..." value={editBody} onChange={(e) => setEditBody(e.target.value)} rows={4} />
      <div className={styles.editorFooter}>
        <div className={styles.colorPicker}>
          {COLORS.map((c, i) => (
            <button key={i} className={styles.colorDot} style={{ background: c.bg, border: `2px solid ${editColor === i ? c.border : "transparent"}`, outline: editColor === i ? `2px solid ${c.border}` : "none" }} onClick={() => setEditColor(i)} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
          <button className={styles.saveBtn} onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

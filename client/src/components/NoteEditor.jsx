import { COLORS } from "../constants";
import styles from "../styles/notes.module.css";

export default function NoteEditor({ titleRef, editTitle, editBody, editColor, editType, editItems, setEditTitle, setEditBody, setEditColor, setEditItems, onSave, onDelete }) {
  const { bg, border } = COLORS[editColor];

  const addItem = () => setEditItems(prev => [...prev, { text: "", checked: false }]);
  const updateItem = (idx, text) => setEditItems(prev => prev.map((item, i) => i === idx ? { ...item, text } : item));
  const toggleItem = (idx) => setEditItems(prev => prev.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
  const removeItem = (idx) => setEditItems(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className={`${styles.card} ${styles.editorCard}`} style={{ background: bg, borderColor: border }}>
      <input ref={titleRef} className={styles.editorTitle} placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      {editType === "checklist" ? (
        <div style={{ flex: 1, marginBottom: 8 }}>
          {editItems.map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${border}`, background: item.checked ? border : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}
                onClick={() => toggleItem(idx)}>
                {item.checked && <svg width="9" height="9" viewBox="0 0 9 9"><polyline points="1,4.5 3.5,7 8,2" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
              </div>
              <input style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, fontFamily: "Georgia, serif", color: item.checked ? "#aaa" : "#444", textDecoration: item.checked ? "line-through" : "none" }}
                placeholder="List item..." value={item.text} onChange={(e) => updateItem(idx, e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(); } }} />
              <button onClick={() => removeItem(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 14, padding: "0 2px" }}>×</button>
            </div>
          ))}
          <button onClick={addItem} style={{ fontSize: 12, color: "#888", background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontFamily: "Georgia, serif" }}>+ Add item</button>
        </div>
      ) : (
        <textarea className={styles.editorBody} placeholder="Take a note..." value={editBody} onChange={(e) => setEditBody(e.target.value)} rows={4} />
      )}
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
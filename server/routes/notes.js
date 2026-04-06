import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY pinned DESC, created_at DESC");
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Note not found" });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", async (req, res) => {
  const { title = "", body = "", color = 0, pinned = false, type = "note", items = "[]" } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO notes (title, body, color, pinned, type, items) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, body, color, pinned, type, items]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/:id", async (req, res) => {
  const { title, body, color, pinned, type, items } = req.body;
  try {
    const result = await pool.query(
      `UPDATE notes SET
        title = COALESCE($1, title),
        body = COALESCE($2, body),
        color = COALESCE($3, color),
        pinned = COALESCE($4, pinned),
        type = COALESCE($5, type),
        items = COALESCE($6, items),
        updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [title, body, color, pinned, type, items, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Note not found" });
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM notes WHERE id = $1", [req.params.id]);
    res.json({ message: "Note deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
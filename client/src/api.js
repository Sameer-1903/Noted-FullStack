const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  getNotes: async () => {
    const res = await fetch(`${BASE_URL}/notes`);
    return res.json();
  },

  createNote: async (note) => {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    return res.json();
  },

  updateNote: async (id, note) => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    return res.json();
  },

  deleteNote: async (id) => {
    await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });
  },
};

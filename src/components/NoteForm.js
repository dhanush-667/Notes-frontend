import { useState } from "react";

function NoteForm({ onCreate, adding }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    try {
      await onCreate(trimmed);
      setText("");
    } catch (err) {
      // keep it simple: console for now; UI improvements can show a toast
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit} aria-label="Add note">
      <label className="sr-only" htmlFor="note-input">New note</label>
      <input
        id="note-input"
        className="note-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        aria-label="Note text"
      />
      <button className="btn btn-primary" type="submit" disabled={adding || submitting}>
        {adding || submitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default NoteForm;

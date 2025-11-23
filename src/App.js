import axios from "axios";
import { useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";
import NoteForm from "./components/NoteForm";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const backendUrl = "https://notes-cngk.onrender.com"

  // Fetch all notes
  const getNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const createNote = async (textParam) => {
    if (!textParam) return;
    setAdding(true);
    try {
      await axios.post(`${backendUrl}/notes`, { text: textParam });
      getNotes();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setAdding(false);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${backendUrl}/notes/${id}`);
      getNotes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Notes</h1>
      </header>

      <main>
        <NoteForm onCreate={createNote} adding={adding} />

        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <ul className="note-list">
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} onDelete={deleteNote} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const backendUrl = "https://notes-cngk.onrender.com"

  // Fetch all notes
  const getNotes = async () => {
    try {
      const res = await axios.get(`${backendUrl}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create a new note
  const createNote = async () => {
    if (!text) return;
    try {
      await axios.post(`${backendUrl}/notes`, { text });
      setText("");
      getNotes();
    } catch (err) {
      console.log(err);
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
    <div style={{ padding: 20 }}>
      <h1>Notes App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
      />
      <button onClick={createNote}>Add</button>

      <ul>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} onDelete={deleteNote} />
        ))}
      </ul>
    </div>
  );
}

export default App;

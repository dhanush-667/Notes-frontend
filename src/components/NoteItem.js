function NoteItem({ note, onDelete }) {
  return (
    <li style={{ marginBottom: 8 }}>
      {note.text} <button onClick={() => onDelete(note._id)}>X</button>
    </li>
  );
}

export default NoteItem;

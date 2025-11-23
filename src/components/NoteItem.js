function NoteItem({ note, onDelete }) {
  return (
    <li className="note-item">
      <div className="note-card">
        <div className="note-text">{note.text}</div>
        <div className="note-actions">
          <button
            className="note-delete"
            onClick={() => onDelete(note._id)}
            aria-label={`Delete note`}
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
}

export default NoteItem;

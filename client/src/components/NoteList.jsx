import React from 'react';
import { Link } from 'react-router-dom';

function NoteList({ notes }) {
  if (!notes.length) {
    return <p>No notes found.</p>;
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note._id} className="note-card">
          <h2>
            <Link to={`/note/${note._id}`} className="note-title" >{note.title}</Link>
          </h2>
          <p className="note-description">
            {typeof note.description === 'string' && note.description.length > 50
              ? note.description.slice(0, 50) + '...'
              : note.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;

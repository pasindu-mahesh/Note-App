import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/note`;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(baseUrl);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <main>
      <h1>All Notes</h1>
      <Link to="/addnote" className="add-button">+ Add Note</Link>
      <div className="notes-grid">
        {data.map((note) => (
          <div key={note._id} className="note-card">
            <h2>
              <Link to={`/note/${note._id}`}>{note.title}</Link>
            </h2>
            <p className="note-description">
              {typeof note.description === 'string' && note.description.length > 50
                ? `${note.description.substring(0, 50)}...`
                : note.description}
            </p>

          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;

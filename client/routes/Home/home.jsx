import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NoteList from '/src/components/NoteList';

function Home() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/note`;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  // 🔍 Filter logic
  const filteredNotes = data.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <h1>All Notes</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search notes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <Link to="/addnote" className="add-button">+ Add Note</Link>

      {/* ✅ Reuse NoteList component */}
      <NoteList notes={filteredNotes} />
    </main>
  );
}

export default Home;

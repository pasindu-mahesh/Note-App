import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/note/${id}`;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error("Failed to fetch note");
        const data = await response.json();
        setTitle(data.title || '');
        setDescription(data.description || '');
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching note.");
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Update note
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        console.error("Failed to update note");
      } else {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // ✅ Delete note
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete note");
      } else {
        alert("Note deleted successfully.");
        navigate("/"); // Go back to home page
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center error">{error}</p>;

  return (
    <div>
      <Link to="/" className="back-button">⏴ Back</Link>

      <form onSubmit={handleUpdate}>
        <div className="single-note">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="4"
            cols="50"
            className="description"
          />
        </div>

        <input
          type="submit"
          value={submitted ? "Saving..." : "Update Note"}
          disabled={submitted}
        />

        {submitted && (
          <p className="text-center success-message">Note updated successfully!</p>
        )}
      </form>

      {/* Delete Button */}
      <div className="text-center">
        <button
          onClick={handleDelete}
          className="delete-button"
        >
          🗑 Delete Note
        </button>
      </div>
    </div>
  );
}

export default UpdateNote;

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function AddNote() {

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/note`;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submited, setSubmitted] = useState(false);

  const addNote = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, description
        }),
      })

      if (!response.ok) {
        console.error("Failed to save note");
      } else {
        console.log("Note created successfully");
        setSubmitted(true); //Show success on success
        setTimeout(() => setSubmitted(false), 2000);
        setTitle(""); //Optionally reset form
        setDescription("");
      }

    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div>
      <Link to="/" className='back-button'> ⏴Back </Link>

      <form onSubmit={addNote}>

        <div className='single-note'>

          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
              className='title'
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description'
              rows="4"
              cols="50"
              className='description'
            >
            </textarea>
          </div>

        </div>

        <input type="submit"
          value={submited ? "Saving Note..." : "Save Note"}
          disabled={submited}
        />

        <p className='text-center'>
          {submited && <div className='success-message'> Note has been a</div>}
        </p>

      </form>

    </div>
  )
}

export default AddNote

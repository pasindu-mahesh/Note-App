import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function AddNote() {

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/note`;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addNote = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch(baseUrl,{
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ 
          title, description
        }),
      })

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

        <input type="submit"/>

      </form>

    </div>
  )
}

export default AddNote

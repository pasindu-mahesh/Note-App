import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function AddNote() {

  
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addNote = async (e) => {

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

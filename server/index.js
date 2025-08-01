require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const note = require("./models/note");

const app = express();
const PORT = process.env.PORT || 8000;


connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get all notes
app.get("/api/note", async (req, res) => {

    try{

        const data = await note.find({})

        if(!data){
            throw new Error('An error occurred while fetching notes.')
        }
        res.status(201).json(data);
    }catch ( error) {
        res.status(500).json({ error: 'An error occurred while fetching notes...'})
    }
});


//get note by ID 
app.get("/api/note/:id", async (req, res) => {

    try{
        const noteId = req.params.id;   
        const data = await note.findById(noteId)

        if(!data){
            throw new Error('An error occurred while fetching notes.')
        }
        res.status(201).json(data);
    }catch ( error) {
        res.status(500).json({ error: 'An error occurred while fetching notes...'})
    }
});

//create a note
app.post("/api/note", async (req, res) => {

    try{
        const { title, description } = req.body;
        const data = await note.create( {title, description} );

        if(!data){
            throw new Error('An error occurred while creating a note.')
        }
        res.status(201).json(data);
    }catch ( error) {
        res.status(500).json({ error: 'An error occurred while creating a note...'})
    }
});


//Update a note
app.put("/api/note/:id", async (req, res) => {

    try{

        const noteId = req.params.id;
        const { title, description } = req.body;
        const data = await note.findByIdAndUpdate(noteId, {title, description} );

        if(!data){
            throw new Error('An error occurred while updating a note.')
        }
        res.status(201).json(data);
    }catch ( error) {
        res.status(500).json({ error: 'An error occurred while updating a note...'})
    }
});

//Delete a note
app.delete("/api/note/:id", async (req, res) => {

    try{

        const noteId = req.params.id;
        const data = await note.findByIdAndDelete(noteId);

        if(!data){
            throw new Error('An error occurred while updating a note.')
        }
        res.status(201).json(data);
    }catch ( error) {
        res.status(500).json({ error: 'An error occurred while updating a note...'})
    }
});

app.get("/", (req, res) => {
    res.json("Hello from the server! This is the backend of the note app!");
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
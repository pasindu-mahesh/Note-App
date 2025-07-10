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


app.get("/", (req, res) => {
    res.json("Hello from the server! This is the backend of the note app!");
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
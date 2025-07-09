require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.json("Hello from the server! This is the backend of the Note App.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
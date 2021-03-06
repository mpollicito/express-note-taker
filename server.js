const { response } = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Start the server on the port
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/api/notes", function(req, res){
    savedNotes = fs.readFileSync(path.join(__dirname,"/db/db.json"))
    savedNotes = JSON.parse(savedNotes)
    console.log(savedNotes)
    res.json(savedNotes)
});

app.post("/api/notes", function(req, res){
    savedNotes = fs.readFileSync(path.join(__dirname,"/db/db.json"))
    savedNotes = JSON.parse(savedNotes)
    req.body.id = savedNotes.length
    savedNotes.push(req.body)
    savedNotes = JSON.stringify(savedNotes)
    fs.writeFileSync(path.join(__dirname,"/db/db.json"), savedNotes)
    res.json(savedNotes)
});

app.delete("/api/notes/:id", function(req, res){
    savedNotes = fs.readFileSync(path.join(__dirname,"/db/db.json"))
    savedNotes = JSON.parse(savedNotes)
    req.body.id = savedNotes.length
    savedNotes = savedNotes.filter((note) => {
        return note.id != req.params.id
    })
    savedNotes = JSON.stringify(savedNotes)
    fs.writeFileSync(path.join(__dirname,"/db/db.json"), savedNotes)
    res.json(savedNotes)
});

app.listen(PORT, () => console.log('Listening on localhost http://localhost:' + PORT));
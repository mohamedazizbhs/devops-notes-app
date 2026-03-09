const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require("body-parser")

const app = express()
const db = new sqlite3.Database("notes.db")

app.use(bodyParser.json())
app.use(express.static("public"))

db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, text TEXT)")

app.get("/notes", (req, res) => {
    db.all("SELECT * FROM notes", [], (err, rows) => {
        res.json(rows)
    })
})

app.post("/notes", (req, res) => {
    const text = req.body.text
    db.run("INSERT INTO notes(text) VALUES(?)", [text])
    res.send("Note added")
})
app.delete("/notes/:id", (req, res) => {

    const id = req.params.id

    db.run("DELETE FROM notes WHERE id=?", [id])

    res.send("Note deleted")

})
app.listen(3000, () => {
    console.log("Server running on port 3000")
})
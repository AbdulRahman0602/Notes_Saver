const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');
//GET:Use to get all the notes

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error has Occured")
    }

})

//POST:Use to add notes

router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'please ente a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        const { title, description, tag } = req.body
        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error has Occured")
    }

})

//PUT: Update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body
        const newnote = {}
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }
        //Finding the User and Updating it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("User Not allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error has Occured")
    }

})

//DELETE: Update an existing note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {


        //Finding the note and deleting it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("User Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error has Occured")
    }

})

module.exports = router
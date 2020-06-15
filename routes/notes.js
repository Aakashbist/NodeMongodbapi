const router = require('express').Router();
const verify = require('./verifyToken');
const Note = require('../model/Note');
const { notesValidation } = require('../validation');

router.get('/', verify, async (req, res) => {
    Note.find({ UserId: req.user._id }, (err, posts) => {
        return res.status(200).json(
            posts
        );
    })
})

router.post('/', verify, async (req, res) => {
    const { error } = notesValidation(req.body);
    if (error) {
        return res.status(500).json({ message: error.details[0].message });
    }
    const note = new Note({
        address: req.body.address,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        lat: req.body.lat,
        lng: req.body.lon,
        UserId: req.user._id,
    });
    try {
        const savedNotes = await note.save()
        return res.status(200).json({
            message: "note saved successfully"
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id/', verify, async (req, res) => {
    const note = await Note.findById(req.params.id);
    console.log(note)
    if (!note) return res.status(404).json({
        message: "Not found"
    });
    return res.status(404).json(
        note
    );
});

module.exports = router
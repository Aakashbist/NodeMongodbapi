const router = require('express').Router();
const verify = require('./verifyToken');
const Note = require('../model/Note');




router.get('/', verify, async (req, res) => {
    Note.find({ UserId: req.user._id }, (err, posts) => {
        return res.status(200).json(
            posts
        );
    })
})

router.post('/', verify, async (req, res) => {


    const note = new Note({
        address: req.body.address,
        description: req.body.description,
        imgurl: req.body.imgurl,
        lat: req.body.lat,
        lon: req.body.lon,
        UserId: req.user._id,
    });
    try {
        const savedNotes = await note.save()
        return res.status(200).json({
            note: savedNotes,
            message: "note saved successfully"
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router
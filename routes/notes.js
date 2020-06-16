const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const pagination = require('../middleware/pagination')
const Note = require('../model/Note');
const { notesValidation } = require('../validation');

router.get('/', verify, pagination(Note), async (req, res) => {
    res.json(res.paginatedResult);
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
        lng: req.body.lng,
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

    Note.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return res.status(404).json({
            message: "Not found"
        });

        return res.status(200).json({
            post: post
        });
    })

});
router.put('/:id/', verify, async (req, res) => {

    var updatedNote = {
        $set: {
            address: req.body.address,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            lat: req.body.lat,
            lng: req.body.lng,
            UserId: req.user._id,
        }
    };

    Note.update({ _id: req.params.id }, updatedNote, function (err, result) {
        if (err) {
            return res.status(200).json({

                message: err
            });
        } else {
            return res.status(200).json({

                message: "Notes updated Successfully"
            });
        }
    });
});

router.delete('/:id/', verify, async (req, res) => {

    await Note.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return res.status(404).json({
            message: "Not found"
        });

        post.remove();
        return res.status(200).json({
            message: "Note deleted successfully"
        });
    })

});


module.exports = router
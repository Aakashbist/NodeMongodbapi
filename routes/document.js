const router = require('express').Router();
const express = require('express');
const verify = require('./verifyToken');
const Document = require('../model/Document');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
router.post('/', verify, upload.single('Images'), async (req, res) => {
    try {
        console.log(req.file.path)
        res.json("http://localhost:3000/" + req.file.path)
    }
    catch (error) {
        res.status(400).json(
            "server error"
        );
    }

    // console.log(req.file)
    // const document = new Document({
    //     document: "http://localhost:3000/" + req.file.path
    // });
    // try {
    //     const savedDocument = await document.save()
    //     return res.status(200).json({
    //         document: savedDocument,
    //         message: "document saved successfully"
    //     });
    // } catch (error) {
    //     res.status(400).send(error);
    // }
});

module.exports = router;
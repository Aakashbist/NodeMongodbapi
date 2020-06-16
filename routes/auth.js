const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');


router.post('/register', async (req, res) => {
    //validation

    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(401).json({ message: error.details[0].message });
    }
    console.log("validate")
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(200).json({
        message: "email already exist"
    });

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save()
        return res.status(200).json({
            message: "register successful"
        });
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/login', async (req, res) => {
    //validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(401).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({
        message: "Email and password didn't match"
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).json({

        message: "Email and password didn't match"
    });

    const token = jwt.sign(
        { _id: user._id, email: user.email }
        , process.env.TOKEN_SECRET);

    console.log(token);
    return res.status(200).json({
        token: token
    });

});

module.exports = router;
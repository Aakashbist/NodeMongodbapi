const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({
            message: "unauthorised"
        });
    }
    jwt.verify(token,
        process.env.TOKEN_SECRET,
        (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "forbidden"
                });
            }
            req.user = user; //id , email
            next();
        })
}
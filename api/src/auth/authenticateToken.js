const jwt = require ("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

function authenticateToken (req, res, next) {
    const authcookie = req.cookies.authcookie;
    jwt.verify(authcookie, ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403)
        else if(data) {
            req.user = data;
            next()
        }
    })
}

module.exports =  authenticateToken;
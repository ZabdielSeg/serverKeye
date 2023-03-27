const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id) {
            next();
        } else {
            return res.status(400).send('Invalid token.');
        }
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}

module.exports = { verifyToken }
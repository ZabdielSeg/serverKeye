// const { verifyToken } = require("./jwt.middleware");
const jwt = require('jsonwebtoken')

const verifyAdminRole = (req, res, next) => {
    const user = verifyToken(req, res);
    if (user.role !== 'Admin') return res.status(403).send('Access denied.');

    next();
}

const verifyToken = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.id) {
            return decoded
        } else {
            return res.status(400).send('Invalid token.');
        }
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}

module.exports = { verifyAdminRole };
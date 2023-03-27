const router = require('express').Router();
const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await userService.getUserByUserName(username);
        if(user === null) return res.status(400).json({errorMessage: 'Wrong credentials'})

        const passwordCorrect = user === null
            ? false
            : bcrypt.compareSync(password, user.password);

        if(!passwordCorrect || !user) return res.status(400).json({errorMessage: 'Wrong credentials'});

        const userForToken = {
            id: user._id,
            username: user.username,
            role: user.role
        }
        const token = jwt.sign(userForToken, process.env.JWT_SECRET);

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            token
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
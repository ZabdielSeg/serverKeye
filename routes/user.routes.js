const router = require('express').Router();
const userService = require('../services/user.service');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/create-user', async (req, res, next) => {
    const { username, password } = req.body;
    try {

        const userFound = await userService.getUserByUserName(username);
        if(userFound) return res.status(401).json({ errorMessage: 'This user already exists'})
    
        const userSaved = await userService.createUser({ username, password })
        return res.status(201).json(userSaved)

    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured'})
    }
});

router.get('/all-users', async (req, res, next) => {
    try {
        const allUsers = await userService.getAllUsers()
        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured'})
    }
});

router.put('/update-user/:userID', async (req, res, next) => {
    const { userID } = req.params;
    const { username, password } = req.body;
    try {
        const userUpdated = await userService.updateUser(userID, { username, password })
        return res.status(200).json(userUpdated)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured'})
    }
})


router.delete('/delete-user/:userID', async (req, res, next) => {
    try {
        const userDeleted = await userService.deleteUser()
        return res.status(200).json(userDeleted)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured'})
    }
})

module.exports = router;
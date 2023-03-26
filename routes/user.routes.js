const router = require('express').Router();
const userService = require('../services/user.service');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const XLSX = require('xlsx');
const fs = require('fs');

router.post('/create-user', async (req, res, next) => {
    const { username, password } = req.body;
    try {

        const userFound = await userService.getUserByUserName(username);
        if (userFound) return res.status(401).json({ errorMessage: 'This user already exists' })

        const userSaved = await userService.createUser({ username, password })
        return res.status(201).json(userSaved)

    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured' })
    }
});

router.get('/all-users', async (req, res, next) => {
    try {
        const allUsers = await userService.getAllUsers()
        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured' })
    }
});

router.put('/update-user/:userID', async (req, res, next) => {
    const { userID } = req.params;
    const { username, password } = req.body;
    try {
        const userUpdated = await userService.updateUser(userID, { username, password })
        return res.status(200).json(userUpdated)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured' })
    }
})


router.delete('/delete-user/:userID', async (req, res, next) => {
    try {
        const userDeleted = await userService.deleteUser()
        return res.status(200).json(userDeleted)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured' })
    }
})


router.post('/upload-file', upload.single('archivo'), async (req, res, next) => {
    try {
        const archivo = req.file
        if (!archivo) return res.status(400).json({ errorMessage: 'Please select a document' });

        const workbook = XLSX.readFile(archivo.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // const n = Number(workbook.Strings.Unique)
        const usernames = [];
        const usersData = [];
        for (let i = 2; i < n; i++) {
            if (usernames.includes(worksheet[`A${i}`].v)) {
                continue;
            }
            usernames.push(worksheet[`A${i}`].v)
            const user = {
                username: worksheet[`A${i}`].v,
                password: worksheet[`B${i}`].v
            }

            usersData.push(user)
        }

        fs.unlinkSync(archivo.path);

        const usersSaved = await userService.insertMany(usersData)
        return res.status(200).json(usersSaved)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
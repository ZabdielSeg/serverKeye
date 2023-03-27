const router = require('express').Router();
const userService = require('../services/user.service');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const XLSX = require('xlsx');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { verifyToken } = require('../middlewares/jwt.middleware');
const saltRounds = 10;

router.post('/create-user', verifyToken, async (req, res, next) => {
    const { internalID, username, password, role, date, punchInHour, punchOutHour } = req.body;
    try {
        const userFound = await userService.getUserByUserName(username);
        if (userFound) return res.status(401).json({ errorMessage: 'This user already exists' })

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userSaved = await userService.createUser({ username, password: hashedPassword, role, internalID, punchInHour, punchOutHour, date })
        return res.status(201).json(userSaved)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMessage: error.message })
    }
});

router.get('/all-users', verifyToken, async (req, res, next) => {
    try {
        const allUsers = await userService.getAllUsers()
        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured' })
    }
});

router.put('/update-user/:userID', verifyToken, async (req, res, next) => {
    const { userID } = req.params;
    const { internalID, username, password, role, date, punchInHour, punchOutHour } = req.body;
    try {
        const userUpdated = await userService.updateUser(userID, { internalID, username, password, role, date, punchInHour, punchOutHour }, {new: true})
        return res.status(200).json(userUpdated)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured' })
    }
})


router.delete('/delete-user/:userID', verifyToken, async (req, res, next) => {
    const { userID } = req.params;
    try {
        const userDeleted = await userService.deleteUser(userID)
        return res.status(200).json(userDeleted)
    } catch (error) {
        return res.status(500).json({ errorMessage: 'An internal server error occured' })
    }
})


router.post('/upload-file', verifyToken, upload.single('archivo'), async (req, res, next) => {
    const excelDocument = req.file
    try {
        if (!excelDocument) return res.status(400).json({ errorMessage: 'Please select a document' });

        const workbook = XLSX.readFile(excelDocument.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const totalRowsNumber = Number(workbook.Strings.Unique)
        let usernames = [];
        let usersData = [];
        for (let i = 2; i < totalRowsNumber; i++) {
            if (usernames.includes(worksheet[`A${i}`].w)) {
                continue;
            }
            usernames.push(worksheet[`A${i}`].w)
            const dateToSave = new Date(worksheet[`C${i}`].w)
            const user = {
                internalID: worksheet[`A${i}`].w,
                username: worksheet[`B${i}`].w,
                role: 'User',
                date: dateToSave,
                punchInHour: worksheet[`D${i}`].w,
                punchOutHour: worksheet[`E${i}`].w
            }

            usersData.push(user)
        }

        fs.unlinkSync(excelDocument.path);

        const usersSaved = await userService.insertMany(usersData)
        return res.status(200).json(usersSaved)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
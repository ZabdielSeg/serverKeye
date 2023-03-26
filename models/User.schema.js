const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter a username']
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ['Admin', 'Major']
        },
        punchInHour: String,
        punchOutHour: String,
    },
    {
        timestamps: true
    }
)

const User = model('User', userSchema);
module.exports = User;
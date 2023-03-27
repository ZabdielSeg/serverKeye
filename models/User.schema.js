const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        internalID: Number,
        username: {
            type: String,
            required: [true, 'Please enter a username']
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ['Admin', 'Major', 'User'],
            default: 'User'
        },
        date: Date,
        punchInHour: String,
        punchOutHour: String,
    },
    {
        timestamps: true
    }
)

const User = model('User', userSchema);
module.exports = User;
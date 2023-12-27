const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    description: String,
    role: {
        type: String,
        default: 'regular'
    }
});

module.exports = model('user', userSchema);
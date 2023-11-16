const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    description: String,
    groups: [Schema.Types.ObjectId],
});

module.exports = model('user', userSchema);
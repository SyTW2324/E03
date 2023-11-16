const { model, Schema } = require('mongoose');


const groupSchema = new Schema({
    name: String,
    creator: String,
    description: String,
    users: [Schema.Types.ObjectId],
    posts: [Schema.Types.ObjectId],
});

module.exports = model('group', groupSchema);
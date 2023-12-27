const { model, Schema } = require('mongoose');


const textSchema = new Schema({
    title: String,
    creator: Schema.Types.ObjectId,
    description: String,
    content: String,
    likes: Number,
    comments: [{user: Schema.Types.ObjectId, comment: String}],
    explicit: Boolean,
});

module.exports = model('text', textSchema);
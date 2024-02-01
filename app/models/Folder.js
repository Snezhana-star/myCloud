const {Schema, model} = require('mongoose')
const Folder = new Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parentId : {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: false,
    },

});
module.exports = model('Folder', Folder)
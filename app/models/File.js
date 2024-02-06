const {Schema, model} = require('mongoose')
const File = new Schema({

    name: {
        type: String,
    },
    filePath: {
        type: String,
    },
    folderId: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
    },

});
module.exports = model('File', File)
const {Schema, model} = require('mongoose')
const User = new Schema({

    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

});
module.exports = model('User', User)
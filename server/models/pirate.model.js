const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Pirate needs a {PATH}.'],
        minlength: [3, '{PATH} needs to be at least 3 characters.']
    },
    image : {
        type: String,
        required : [true, 'What do you look like pirate? (Needs an image url)'],
        minlength: [3, '{PATH} needs to be at least 3 characters.']
    },
    role : {
        type: String,
        required: [true, 'Pirate needs a {PATH}.'],
        minlength: [3, '{PATH} needs to be at least 3 characters.']
    },
    treasure : {
        type : Number, 
        required: [true, 'Pirate be nothing without his booty. (Needs Treasure Chests)'],
        min: 1
    },
    phrase : {
        type : String,
        required: [true, "Yarrr what kind of pirate doesn\'t have a catch phrase?"],
        minlength: [3, '{PATH} needs to be at least 3 characters.']
    },
    pegLeg : {
        type: Boolean,
        required: [true, 'Does the pirate have a {PATH}?']
    },
    eyePatch : {
        type: Boolean,
        required: [true, 'Does the pirate have a {PATH}?']
    },
    hook : {
        type: Boolean,
        required: [true, 'Does the pirate have a {PATH}?']
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Pirate', PirateSchema);
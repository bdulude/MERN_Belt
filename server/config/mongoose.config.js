const mongoose = require('mongoose');

module.exports = (DB) => {
    mongoose.connect('mongodb://localhost/' + DB)
        .then( () => console.log(`DB is Connected to ${DB}!`))
        .catch( err => console.log("Cannot Connect to DB", err))
}
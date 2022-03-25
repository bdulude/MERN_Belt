const Pirate = require('../models/pirate.model');

module.exports = {

    // Create
    create: (req, res) => {
        Pirate.create(req.body)
            .then(newPirate => {
                console.log("POST new");
                console.log(newPirate);
                return res.json(newPirate)
            })
            .catch(err => res.status(400).json(err))
    },

    // Read all
    findAll: (req, res) => {
        Pirate.find()
            .then((pirateList) => {
                console.log("GET all");
                console.log(pirateList);
                return res.json({ pirates: pirateList })
            })
            .catch(err => res.status(400).json(err))
    },

    // Read One
    findOne: (req, res) => {
        Pirate.findById(req.params.id)
            .then(pirate => {
                console.log("GET", req.params.id);
                console.log(pirate);
                return res.json(pirate)
            })
            .catch(err => res.status(400).json(err))
    },

    // Update
    update: (req, res) => {
        Pirate.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(updatedPirate => {
                console.log("PUT ", req.params.id);
                console.log(updatedPirate);
                return res.json(updatedPirate)
            })
            .catch(err => res.status(400).json(err))
    },

    // Delete
    delete: (req, res) => {
        Pirate.findByIdAndDelete(req.params.id)
            .then(deletedPirate => {
                console.log("DELETE ", req.params.id);
                console.log(deletedPirate);
                return res.json(deletedPirate)
            })
            .catch(err => res.status(400).json(err))
    }

}
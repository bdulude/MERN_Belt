const Pirate = require('../controllers/pirate.controller');

module.exports = (app) => {
    app.get("/api/pirates", Pirate.findAll);
    app.post("/api/pirates", Pirate.create);
    app.get("/api/pirates/:id", Pirate.findOne);
    app.put("/api/pirates/:id", Pirate.update);
    app.delete("/api/pirates/:id", Pirate.delete);
}
module.exports = app => {
    const deliveries = require("../controllers/delivery.controller.js");
    //delete all deliveries from one runner
    app.delete("/deliveries/:id_runner", deliveries.delete);
    app.post("/deliveries/create", deliveries.create);

}
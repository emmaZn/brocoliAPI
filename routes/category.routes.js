module.exports = app => {

    const categories = require("../controllers/category.controller.js");

    // Retrieve all Departements
    app.get("/categories", categories.findAll);

};
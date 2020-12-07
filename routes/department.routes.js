module.exports = app => {

    const departments = require("../controllers/department.controller.js");

    // Retrieve all Departements
    app.get("/departments", departments.findAll);

};
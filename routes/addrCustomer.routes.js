module.exports = app => {
    const addrCustomer = require("../controllers/addrCustomer.controller.js");
    // Create a new Address
    app.post("/addrCustomer/add", addrCustomer.create);

    // Retrieve all Address
    app.get("/addrCustomer", addrCustomer.findAll);


    // // Retrieve a single Address with customerId
    // app.get("/adresseOrder/:addrCustomerId/:idDep", addrCustomer.findBy);

    // Retrieve a single Address with customerId
    app.get("/addrCustomer/:addrCustomerId", addrCustomer.findOne);

    // Update a Address with addressId
    app.put("/addrCustomer/:addrCustomerId", addrCustomer.update);

    // Delete a Address with addressId
    app.delete("/addrCustomers/:addrCustomerId", addrCustomer.delete);

    // Create a new Address
    // app.delete("/customers", customers.deleteAll);
};
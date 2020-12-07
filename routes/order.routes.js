module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    // Create a new Order
    app.post("/orders/add", orders.create);

    app.put("/order/updateWorkflow/:orderId", orders.updateWorkflow);


    // Retrieve all Orders by customer
    app.get("/orders/:IdCustomer", orders.findAllByCustomer);

    // // Retrieve a single Order with orderId
    // app.get("/orders/:orderId", orders.findOne);

    // // Update an Order with orderId
    // app.put("/orders/:orderId", orders.update);

};
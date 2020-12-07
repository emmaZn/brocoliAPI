const Order = require("../models/order.models.js");

// Create and Save a new Order
exports.create = (req, res) => {
    console.log(req)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create an Order
    const order = new Order({
        id_runner: req.body.id_runner,
        id_customer: req.body.id_customer,
        id_address: req.body.id_address,
        id_product: req.body.id_product,
        date: req.body.date,
        workflow: req.body.workflow,
        qtte: req.body.qtte,
        prix: req.body.prix
    });

    // Save Order in the database
    Order.create(order, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        else res.send(data)
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
};

// Find a single Order with a orderId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving order with id " + req.params.orderId
                });
            }
        } else res.send(data);
    });
};


// Update a Order identified by the customerId in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const order = new Order({

    });
    Order.updateById(
        req.params.orderId,
        order,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.params.orderId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.params.orderId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updateWorkflow = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log("req", req)
    const order = new Order({
        workflow: req.body.workflow
    });

    Order.updateWorkflow(req.params.orderId,
        order,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.body.orderId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.body.orderId
                    });
                }
            } else {
                res.send(data)

            }
        })
}

// Retrieve all Orders wt idCustomer from the database.
exports.findAllByCustomer = (req, res) => {
    Order.getAllByCustomer(req.params.IdCustomer, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving order with id " + req.params.orderId
                });
            }
        } else res.send(data);
    });
};
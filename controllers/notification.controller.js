const Notification = require("../models/notification.models.js");

exports.create = (req, res) => {
    console.log("req", req.body)
    let notification = new Notification(req.body)
    Notification.create(notification, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Delivery."
            });
        else res.send(data)

    });
},
    exports.findByCustomer = (req, res) => {
        Notification.findByCustomer(req.params.customerId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.send(data)
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving notification with customerId " + req.params.customerId
                    });
                }
            }
            else {
                res.send(data);
            }
        })
    },
    exports.updateByCustomer = (req, res) => {
        console.log("REQ", req.params)
        Notification.updateByCustomer(req.params.customerId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found notif with customer ${req.params.customerId}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving notif with customerId " + req.params.customerId
                    });
                }
            }
            else {

                res.send(data)

            }

        });
    };
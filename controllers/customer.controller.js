const Customer = require("../models/customer.models.js");
const AddrCustomer = require("../models/addrCustomer.models.js");
const Notification = require("../models/notification.models.js");
const bcrypt = require('bcrypt');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request

    // console.log("body", req.body)
    // console.log(req.body.departmentsId)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10)
    console.log("crypt psswd", encryptedPassword)
    // Create a Customer
    const customer = new Customer({
        mail: req.body.mail,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        password: encryptedPassword,
        phone: req.body.phone,
        image: req.body.image
    });

    // Save Customer in the database
    Customer.create(customer, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else {
            let id_customer = data.id
            // req.body.departmentsIds.forEach(idDepartment => {
            let addrCustomer = new AddrCustomer({
                road: req.body.road,
                zip: req.body.zip,
                id_department: req.body.id_department,
                id_customer
            })
            AddrCustomer.create(addrCustomer, (err, addrCustomerdata => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Delivery."
                    });

            }))
            // },
            res.send(data)

            // )

        }
    });
};

// exports.addressByIdCustomer = (req, res) => {

//     // console.log('test')
//     AddrCustomer.addressByIdCustomer((err, data) => {
//         if (err) {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while finding address of customer."
//             })
//         } else res.send({ message: `addr of customer` });

//     })
// }

exports.login = async function (req, res) {
    var mail = req.query.mail;
    var password = req.query.password;
    console.log("REQ", req.query)
    const auth = {
        mail,
        password
    }
    Customer.log(auth, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
}

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};
// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        } else {
            Notification.findByCustomer(req.params.customerId, (err, notificationData) => {
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
                    data.notifications = notificationData;
                    console.log("dATA", data)
                    res.send(data);
                }
            })
        }
    })
};


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10)

    const customer = new Customer({
        mail: req.body.mail,
        phone: req.body.phone,
        password: encryptedPassword
    });
    Customer.updateById(
        req.params.customerId,
        customer,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.customerId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.customerId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};
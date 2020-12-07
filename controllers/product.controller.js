const Product = require("../models/product.models.js");

exports.getByRunner = (req, res) => {
    Product.findByRunner(req.params.runnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send(data)
            } else {
                res.status(500).send({
                    message: "Error retrieving products with runnerId " + req.params.runnerId
                });
            }
        } else {
            res.send(data)

        }
    });
}
exports.create = (req, res) => {
    console.log("coucou")
    let product = new Product(req.body)
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Delivery."
            });
        else res.send(data)

    });
}
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const product = new Product(
        req.body
    );

    Product.updateById(req.body.id,
        new Product(product),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.body.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.body.id
                    });
                }
            } else {
                res.send(data)

            }
        }

    );
}

exports.updateOrder = (req, res) => {
    // Validate Request
    console.log(req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const product = new Product(
        req.body
    );

    Product.updateStockById(req.body.id,
        new Product(product),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.body.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.body.id
                    });
                }
            } else {
                res.send(data)

            }
        }

    );
}
exports.delete = (req, res) => {
    console.log("req", req.params)
    Product.remove(req.params.id_product, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found product with id ${req.params.id_product}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete product with id " + req.params.id_product
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });
    });
};
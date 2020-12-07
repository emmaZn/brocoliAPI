const Delivery = require("../models/delivery.models.js");


exports.delete = (req, res) => {
    console.log("REQ", req.params)
    Delivery.deleteByRunner(req.params.id_runner, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found delivery with runnerId ${req.params.id_runner}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving delivery with runnerId " + req.params.id_runner
                });
            }
        }
        else {

            res.send(data)

        }

    });
};
exports.create = (req, res) => {
    req.body.departmentsIds.forEach(department => {
        let delivery = new Delivery({
            id_runner: req.body.id_runner,
            id_department: department
        })
        Delivery.create(delivery, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Delivery."
                });
            }

        }); 
    });res.send("deliveries updated")
}
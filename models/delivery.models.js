
const sql = require("./dbServices.js");
const bcrypt = require('bcrypt');

// constructor
const Delivery = function (delivery) {
    this.id_runner = delivery.id_runner;
    this.id_department = delivery.id_department;
};

Delivery.create = (newDelivery, result) => {
    sql.query("INSERT INTO delivery SET ?", newDelivery, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created delivery: ", { id: res.insertId, ...newDelivery });
        result(null, { id: res.insertId, ...newDelivery });
        return
    });
};

Delivery.findByRunner = (runnerId, result) => {
    sql.query(`SELECT * FROM delivery natural join department WHERE id_runner = ${runnerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found deliveries: ", res);
            result(null, res);
            return;
        }

        // not found Runner with the id
        result({ kind: "not_found" }, null);
    });
};
Delivery.deleteByRunner = (id_runner, result) => {
    sql.query(`DELETE FROM delivery WHERE id_runner = ${id_runner}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res) {
            console.log("delete deliveries: ", res);
            result(null, res);
            return;
        }
        // not found Runner with the id
        result({ kind: "not_found" }, null);
    });
};
module.exports = Delivery;
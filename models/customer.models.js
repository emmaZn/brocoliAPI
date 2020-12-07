const sql = require("./dbServices.js");
const bcrypt = require('bcrypt');

// constructor
const Customer = function(customer) {
    this.mail = customer.mail;
    this.lastname = customer.lastname;
    this.firstname = customer.firstname;
    this.password = customer.password;
    this.image = customer.image;
    this.phone = customer.phone
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * 
               FROM customer NATURAL JOIN address NATURAL JOIN department
               WHERE id_customer = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Customer.log = (auth, result) => {
    sql.query('SELECT * FROM customer WHERE mail = ?', [auth.mail], async function(error, res, fields) {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        } else {
            console.log("try", auth, "for", res)
            if (res.length > 0) {
                const comparision = await bcrypt.compare(auth.password, res[0].password)
                if (comparision) {
                    console.log("Success authentification: ", res[0]);
                    result(null, res[0]);
                    return;
                } else {
                    console.log("Email and password does not match");
                    result(null);
                    return;
                }
            } else {
                console.log("Email does not exist");
                result(null);
                return;
            }
        }
    })
};

Customer.getAll = result => {
    sql.query("SELECT * FROM customer", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
    });
};

Customer.updateById = (id, customer, result) => {
    sql.query(
        "UPDATE customer SET mail = ?, phone = ?, password = ? WHERE id_customer = ?", [customer.mail, customer.phone, customer.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated customer: ", { id: id, ...customer });
            result(null, { id: id, ...customer });
        }
    );
};

Customer.remove = (id, result) => {
    sql.query("DELETE FROM customer WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

Customer.removeAll = result => {
    sql.query("DELETE FROM customer", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

module.exports = Customer;
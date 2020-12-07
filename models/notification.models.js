
const sql = require("./dbServices.js");

// constructor
const Notification = function (notification) {
    this.id_customer=notification.id_customer,
    this.head=notification.head,
    this.text=notification.text,
    this.read=notification.read
};

Notification.create = (newNotification, result) => {
    sql.query("INSERT INTO notification SET ?", newNotification, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created notification: ", { id: res.insertId, ...newNotification });
        result(null, { id: res.insertId, ...newNotification });
        return
    });
};
Notification.findByCustomer = (customerId, result) => {
    sql.query(`SELECT * FROM notification WHERE id_customer = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found notification: ", res);
            result(null, res);
            return;
        }

        // not found Runner with the id
        result({ kind: "not_found" }, null);
    });
};
Notification.updateByCustomer = (customerId, result) => {
    sql.query(`UPDATE notification SET` + "`read`" +`= true WHERE id_customer = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated notification: ", { id: customerId});
        result(null, { id: customerId });
    });
};

module.exports = Notification;
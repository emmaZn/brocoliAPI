const sql = require("./dbServices.js");

const Department = function (department) {
    this.code = department.code;
    this.nom = department.nom;
    this.nom_uppercase = department.nom_uppercase;
    this.slug = department.slug;
    this.nom_soundex = department.nom_soundex;
};

Department.getAll = result => {
    sql.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("departments: ", res);
        result(null, res);
    });
};
Department.findById = (departmentId, result) => {
    sql.query(`SELECT * FROM department WHERE id_department = ${departmentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found department: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found department with the id
        result({ kind: "not_found" }, null);
    });
};
module.exports = Department;

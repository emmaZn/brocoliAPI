const sql = require("./dbServices.js");

const Category = function (category) {
    this.name = category.name
};

Category.getAll = result => {
    sql.query("SELECT * FROM category", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("categories: ", res);
        result(null, res);
    });
};
module.exports = Category;

const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require("./routes/delivery.routes.js")(app);
require("./routes/customer.routes.js")(app);
require("./routes/runner.routes.js")(app);
require("./routes/addrCustomer.routes.js")(app);
require("./routes/department.routes.js")(app);
require("./routes/product.routes.js")(app);
require("./routes/category.routes.js")(app);
require("./routes/order.routes.js")(app);
require("./routes/notification.routes.js")(app);



app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})
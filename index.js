const express = require("express");
const bodyParser = require("body-parser");
const error = require("./middleware/error");
const app = express();

/* Middleware */
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* Routes */
const users = require("./routes/users");
app.use("/api/users", users);

app.use(error);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
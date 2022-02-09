const express = require("express");
const bodyParser = require("body-parser");
const error = require("./middleware/error");
const cors = require("cors");
const app = express();

/* Middleware */
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
/* Routes */
const users = require("./routes/users");
app.use("/api/users", users);

app.use(error);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
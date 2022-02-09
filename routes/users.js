const asyncMiddleware = require("../middleware/async");
const { validate } = require("../models/user");
const Connection = require("../database/connection");
const express = require("express");
const router = express.Router();

//get all users
router.get("/", asyncMiddleware(async (req,res) => {
    let users = "SELECT * FROM users";
    users = await Connection(users);
    res.send({
        message: "Successfully Retrived All users ",
        data: users
    });
}));

//create user
router.post("/", asyncMiddleware( async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    let user = `INSERT INTO ` +
                    `users` +
                  ` VALUES ` +
                    `(null, '${req.body.first_name}', '${req.body.last_name}', '${req.body.description}', '${req.body.mobile}')`

    user = await Connection(user);

    res.send({ message: "Successfully create a user" });
}));

//search
router.post("/find",asyncMiddleware(async (req,res) => {
   
    const search_value = req.body.search_value;
    let user = `SELECT * FROM ` +
                        `users ` +
                    `WHERE ` +
                        `first_name LIKE '%${search_value}%' OR ` +
                        `last_name LIKE '%${search_value}%' OR ` +
                        `description LIKE '%${search_value}%' OR ` +
                        `mobile LIKE '%${search_value}%' `;

    user = await Connection(user);

    if(user.length === 0) return res.status(404).send({ message: "The user not found" });

    res.send({
        message: "Successfully retrived a user",
        data: user
    });
}));

//update user
router.put("/:id", asyncMiddleware(async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({message: error.details[0].message});

    let user = `UPDATE ` +
                        `users ` +
                    `SET ` +
                        `first_name = '${req.body.first_name}', ` +
                        `last_name = '${req.body.last_name}', ` +
                        `description = '${req.body.description}', ` +
                        `mobile = '${req.body.mobile}' ` +
                    `WHERE ` +
                        `id = ${req.params.id}`;

    user = await Connection(user);

    if(user.affectedRows <= 0) return res.status(404).send({ message: "The user not found" });

    res.send({ message: "Successfully update user" });
}));

//delete user
router.delete("/:id",asyncMiddleware(async (req,res) => {
    let user = `DELETE FROM ` +
                    `users ` +
                  `WHERE ` +
                    `id = ${req.params.id}`;

    user = await Connection(user);

    if(user.affectedRows <= 0) return res.status(404).send({ message: "The user with the given ID was not found." });

    res.send({ message: "Successfully delete user "});
}));

//show
router.get("/:id",asyncMiddleware(async (req,res) => {
    let user = `SELECT * FROM ` +
                    `users ` +
                `WHERE ` +
                    `id = ${req.params.id}`;

    user = await Connection(user);
    
    if(user.length === 0) return res.status(404).send({ message: "The user with the given ID was not found." });

    res.send({
        message: "Successfully retrived a user",
        data: user
    });
}));

module.exports = router;
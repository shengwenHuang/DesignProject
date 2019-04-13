const express = require('express');
const router = express.Router();
const getConnection = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verifyToken = require('../middleware/verify-token');




router.post('/login', (req, res) => {
    const user = req.body;
    const staffNo = user.staffNo;
    const password = user.password;
    const queryString = "SELECT staffNo, userID, hashedPassword, userRoleID, statusID, firstname FROM nhsUsers WHERE statusID=1 AND staffNo = ?";

    getConnection().query(queryString, [staffNo], (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Authorisation failed."
            });
        }

        // This is to check if working status (current or former worker)
        if (results[0].statusID === 2) {
            return res.status(401).json({
                message: "Authorisation failed."
            });
        }
        const hash = results[0].hashedPassword.toString();
        bcrypt.compare(password, hash, (err, bcr_res) => {

            if (err) {
                return res.status(401).json({
                    message: "Authorisation failed."
                });
            }

            if (bcr_res === false) {
                return res.status(401).json({
                    message: "Authorisation failed."
                })
            } else {
                jwt.sign({
                    userID : results[0].userID,
                    userRoleID: results[0].userRoleID,
                    firstname: results[0].firstname
                }, 'J9dah7kPbo', {expiresIn : "1h"}, (err, token) => {
                    res.status(200).json({
                        message: "Authorisation successful",
                        token: token})
                });
            }
        })


    })

})

router.post('/register', verifyToken, (req, res) => {
    const user = req.body;
    const password = req.body.password;
    console.log(user);

    return;
    const queryCheckUser = `SELECT staffNo, description
    FROM nhsUsers
    INNER JOIN workingstatus on workingstatus.statusID = nhsUsers.statusID
    where nhsUsers.staffNo = ?`
    getConnection().query(queryCheckUser,[user.staffNo], (err, results, fields) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        };

        if (results.length >= 1) {
            return res.status(409).json({
                message: "This Nhs Staff is already registered",
                description: results[0].description
            });
        }

        user.password = hash;
        if (user.Userrole === "Admin") {
            userRoleID = 1;
        } if (user.Userrole === "NHS Staff") {
            userRoleID = 2;
        } else {
            return res.status(400).json({
                message: "Invaid user role."
            })
        } {
            userRoleID = 2;
        }

        bcrypt.hash(password, saltRounds, function(err, hash) {

            if (err) {
                return res.status(500).json({
                    error: err
                });
            };

            const queryString = "INSERT INTO nhsUsers (staffNo, hashedPassword, firstname, lastname, email, phone, userRoleID, statusID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

            console.log(user)
            const insert = [user.username, user.password, user.firstname, user.lastname, user.email, user.phone, userRoleID, 1]
            getConnection().query(queryString, insert, (err, results, fields) => {
                if (err) {
                    console.log("Failed to add an user." + err);
                    res.sendStatus(500);
                    return;
                }
                res.send("Success");
                console.log("Success, you have added a new user into the database.");
            })

          });

    })

})


router.post('/remove_user', verifyToken, (req, res) => {
    const userID = req.body.userID;
    const queryString = "SELECT statusID FROM nhsUsers WHERE userID = ?";
    getConnection().query(queryString, [userID], (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }

        if (results.length === 0) {
            console.log("NHS Staff does not exist.")
            // res.status(401)
            return;
        }
        if (results[0].statusID === 2) {
            console.log("This is an ex-employee.");
            return;
        }

        const removeQueryString = "UPDATE nhsUsers SET statusID = 2 WHERE userID = ?"
        getConnection().query(removeQueryString, [userID], (err, results, fields) => {
            if (err) {
                console.log("Failed to connect to the database." + err);
                return;
            } else {
                res.send("success");
            }

        })

    })

})


// Get all the user
router.get('/get_user', verifyToken, (req, res) => {

    if (req.userData.userRoleID !== 1) {
        return res.status(401).json({
            message: "Authorisation access."
        })
    }

    const queryString = `SELECT u.staffNo, u.firstname, u.lastname, u.email, u.phone, r.roleName, s.description
    FROM nhsUsers AS u, userRole AS r, workingStatus AS s
    WHERE u.userRoleID = r.roleID 
    AND s.statusID = u.statusID
    ORDER BY u.userRoleID ASC, s.description ASC, u.lastname ASC`;
    getConnection().query(queryString, (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }

        res.json(results);

    })

})

// edit status of users
router.post('/edit_user', verifyToken, (req, res) => {
    console.log("in");
    const userID = req.body.userID;
    const userRoleID = req.body.userRoleID;
    console.log(userID);
    queryString = ''
    if (userRoleID === 1) {
        queryString = `UPDATE nhsUsers SET userRoleID = 2 WHERE userID = ?`; //change to nurses
        console.log("1");
    } else {
        queryString = `UPDATE nhsUsers SET userRoleID = 1 WHERE userID = ?`; //change to admin
        console.log("2");
    }
    getConnection().query(queryString, [userID], (err, results, fields) => {
        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        } 
        console.log(results);
        // res.send("success");
    })

})



module.exports = router;

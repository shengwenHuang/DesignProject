const express = require('express');
const router = express.Router()
const getConnection = require('../db')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verify-token');




router.get('/patient_history', (req,res) => {
    const queryString = "SELECT responseID FROM response WHERE patientID = ?"
    getConnection().query(queryString, [2], (err, results, fields) => {
        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }

        if (results.length === 0) {
            res.send({})
        }

        const answersQueryString = "SELECT responseID FROM response WHERE patientID = ?"

    })
})


router.get('/patient_info', (req, res) => {
    const queryString = "SELECT NHSno, phone, email, firstname, lastname FROM patient where NHSno = ?"
    getConnection().query(queryString, ["1622021215099"], (err, results, fields) => {
        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }

        if (results.length === 0) {
            console.log("The NHS patient user does not exist.");
            return;
        }
        console.log("sucess");
        res.json(results[0]);
    })
})



router.post('/add_feedback', (req, res) => {
    // Fix the patientID stuff
    const patientID = 1;
    const data = req.body.data;
    const startTime = req.body.startTime;
    const completeTime = Date.now()
    const queryString = "INSERT INTO feedbackresponse (patientID, startTime, completeTime) VALUES (?, ?, ?)"
    getConnection().query(queryString, [patientID, '2019-02-17 20:55:34', '2019-02-17 21:04:34'], (err, results, fields) => {
        if (err) {
            console.log("Failed to add to the database" + err);
            return;
        }
        const feedbackID = results.insertId;

        const queryStringFeedback = "INSERT INTO feedback (feedbackID, patientID, feedbackQuestionID, feedback) VALUES (?, ?, ?, ?)"

        var i;
        for (i = 0; i < data.length; i++) {
            feedbackQuestionID = data[i].feedbackQuestionID;
            feedback = data[i].feedback;
    
            getConnection().query(queryStringFeedback, [feedbackID, patientID, feedbackQuestionID, feedback], (err, results, fields) => {
                if (err) {
                    console.log("Failed to add to the database" + err);
                    return;
                }
            })

        }

    })
    res.status(200).json({
        message: "Suvey Completed"
    })
})

router.get('/feedback_ques', (req, res) => {
    const queryString = 'SELECT * FROM feedbackquestion';
    getConnection().query(queryString, (err, results, fields) => {
        if (err) {
            console.log("Error querying.");
            return;
        }

        questions = results;

        var i;
        for (i = 0; i < results.length; i++) {
            questions[i].pos = i;
            questions[i]["feedback"] = ""
        }

        res.json(questions);
    })
})


router.post('/login', (req, res) => {
    // console.log(req.body);
    const user = req.body;
    const NHSno = user.NHSno;
    const lastname = user.lastname;
    const queryString = "SELECT patientID FROM patient WHERE NHSno = ? AND lastname = ?";

    getConnection().query(queryString, [NHSno, lastname], (err, results, fields) => {

        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Authorisation failed."
            });
        }

        jwt.sign({
            userID : results[0].patientID,
        }, 'J9dah7kPbo', {expiresIn : "1h"}, (err, token) => {
            res.status(200).json({
                message: "Authorisation successful",
                token: token})
        });


    })
    
})


module.exports = router;
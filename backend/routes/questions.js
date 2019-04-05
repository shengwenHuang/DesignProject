const express = require('express');
const router = express.Router();
const getConnection = require('../db')
const verifyToken = require('../middleware/verify-token');


// get patient

router.post("/get_patient", (req, res) => {
    const user = req.body;
    const NHSno = user.Nhsno;
    const lastname = user.lastname;
    const queryString = "SELECT patientID FROM patient WHERE NHSno = ? AND lastname = ?";
    getConnection().query(queryString, [NHSno, lastname], (err, patient, fields) => {

        if (err) {
            console.log("Failed to connect to the database." + err);
            return;
        }
        if (patient.length === 0) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        patientID = patient[0].patientID

        const queryString = "SELECT responseID, completeTime FROM response WHERE patientID = ? ORDER BY completeTime DESC"

        // First I am checking if there is a any previous survey of the patient
        getConnection().query(queryString, [patientID], async (err, results, fields) => {
            if (err) {
                console.log("Failed to add to the database" + err);
                return;
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "This patient has never filled in a survey."
                })
            }

            // I am obtaining all the previous surveys answers
            var i;
            for (i = 0; i < results.length; i++) {
                
                 // Change the date format
                start = new Date(results[i].startTime)
                results[i].startTime = `Date: ${start.toDateString()} Time: ${start.toLocaleTimeString()}`

                end = new Date(results[i].completeTime)
                results[i].completeTime = `Date: ${end.toDateString()} Time: ${end.toLocaleTimeString()}`

                const answersQueryString = `SELECT a.questionID, q.question, q.type, q.pos, a.answer
                FROM answer AS a, question AS q
                WHERE a.questionID = q.questionID AND a.responseID = ?`
                results[i].answer = await new Promise((resolve, reject) => {
                    getConnection().query(answersQueryString, [results[i].responseID], (err, answers, fields) => {
                        if (err) reject("Failed to add to the database" + err);
                        else resolve(answers);
                    })
                });
                
                


            }

            res.json(results)

        })
        
    })



    
})






// Adding new questions
router.post("/add_question", verifyToken, (req, res) => {

    const new_question = req.body
    const queryString = "INSERT INTO question SET ? "

    getConnection().query(queryString, req.body, (err, results, fields) => {
        if (err) {
            console.log("Failed to add a new question." + err);
            res.sendStatus(500);
            return;
        }

        // Just updating the json which was
        new_question.questionID = results.insertId

        res.send(new_question);
        console.log("Success, you have added a new question into the database.");
    })
})

// Deleting quesiton
router.get("/delete_question/:id", verifyToken, (req, res) => {

    const queryString = "DELETE FROM question WHERE questionID = ?"
    getConnection().query(queryString, req.params.id, (err, results, fields) => {
        if (err) {
            console.log("Failed to delete the question." + err);
            return;
        }
        res.send();
        console.log("Succesfully deleted the question.");

    })
})

// Obtain all the question
router.get("/questions", verifyToken, (req, res) => {

    const queryString = `SELECT questionID, question, questiontype.type, pos
    FROM question
    INNER JOIN questiontype ON question.type = questiontype.typeID
    ORDER BY pos ASC`
    getConnection().query(queryString, (err, results, fields) => {
        if  (err) {
            console.log("Failed to query the question" + err)
            res.sendStatus(500);
            return;
        }
        questions = results;

        var i;
        for (i = 0; i < results.length; i++) {
            questions[i].pos = i;
            questions[i]["answers"] = ""
        }

        console.log("yaaaiii")
        res.json(questions)
    });


});


module.exports = router;
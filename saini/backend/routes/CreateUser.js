const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const user = require('./../models/User');
const { validationResult } = require('express-validator')

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtsecrete = "RadhaKrishnaRadhaKrishnaRadhaKrishna"

router.post('/',
    [body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password, salt )

        try {

            const data = req.body 
            data.password = secpassword;    

            const newPerson = new user(data);   

            const response = await newPerson.save();
            console.log("data saved");
            res.status(200).json(response);


        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    })



router.get('/', async (req, res) => {
    try {
        const data = await user.find();
        console.log("data fetched")
        res.status(200).json(data);
        console.log(data);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
})


// router.post("/login", [
//     body('email', 'Incorrect email').isEmail(),
//     body('password', 'Incorrect password').isLength({ min: 5 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const email = req.body.email;
//     const enteredPassword = req.body.password.trim();

//     try {
//         const userdata = await user.findOne({ email });
//         if (!userdata) {
//             return res.status(400).json({ error: "Try logging in with correct credentials" });
//         }

//         const storedPassword = userdata.password.trim();

//         console.log('Stored Password:', storedPassword, 'Length:', storedPassword.length);
//         console.log('Entered Password:', enteredPassword, 'Length:', enteredPassword.length);

//         if (enteredPassword === storedPassword) {
//             console.log('Password Match: true');

//             // Generate token if passwords match
//             const data = {
//                 user: {
//                     id: userdata.id
//                 }
//             }

//             const authtoken = jwt.sign(data, jwtsecrete);

//             return res.json({ success: true, authtoken: authtoken });
//         } else {
//             console.log('Password Match: false');
//             return res.status(400).json({ error: "Incorrect Password" });
//         }
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).json({ success: false });
//     }
// });
router.post("/login", [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const enteredPassword = req.body.password.trim();

    try {
        const userdata = await user.findOne({ email });
        if (!userdata) {
            return res.status(400).json({ error: "Try logging in with correct credentials" });
        }

        const storedPassword = userdata.password.trim();

        // Compare entered password with stored hashed password
        const passwordMatch = await bcrypt.compare(enteredPassword, storedPassword);

        if (passwordMatch) {
            console.log('Password Match: true');

            // Generate token if passwords match
            const data = {
                user: {
                    id: userdata.id
                }
            }

            const authtoken = jwt.sign(data, jwtsecrete);

            return res.json({ success: true, authtoken: authtoken });
        } else {
            console.log('Password Match: false');
            return res.status(400).json({ error: "Incorrect Password" });
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
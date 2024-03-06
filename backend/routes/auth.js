const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "arisagoodb$oy"
//create a new user using POST: localhost:5000/api/auth/createuser
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  let success = false

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    console.log(req.body)
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ success, error: "User with this mail ID exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error:"Please send a valid input", message: err.message})})
    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET)

    success = true
    res.json({ success, authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error has Occured")
  }

})

//Authenticiate a user using POST: localhost:5000/api/auth/login

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password').exists(),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please enter a valid password" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password)
    if (!passwordcompare) {
      success = false
      return res.status(400).json({ success, error: "Please enter a valid password" });

    }
    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error has Occured")
  }
})

//Authenticiate a user using POST: localhost:5000/api/auth/getuser-loginrequired
// router.post('/getuser', fetchuser, async (req, res) => {
//   try {
//     userId = req.user.id;
//     const user = await User.findById(userId).select("-password")
//     res.send(user)
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Some Error has Occured")
//   }
// })
module.exports = router
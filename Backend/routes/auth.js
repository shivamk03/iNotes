const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const secCode= "SecureMyNoteApp@1";


router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("name").isLength({ min: 3 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
      let success = false;
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({success,error:"This email already exists."});
    }
    const salt =  await bcrypt.genSalt(10);
    const secpassword= await bcrypt.hash (req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      password: secpassword,
      email: req.body.email,
    });

    const data={
      user:{
        id:user.id
      }
    }

    const jwtToken= jwt.sign(data,secCode);
    success=true;
    res.json({success,jwtToken});
    console.log(jwtToken);
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
  }
);

router.post(
  "/",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const email= req.body.email;
      const password= req.body.password;
      try{
        let success= false;
        const user = await User.findOne({email});
        if(!user){
         res.status(400).json({success,error: "Please enter correct credentials"});
        }
        
        const passCompare = await bcrypt.compare(password,user.password);
        if(!passCompare){
         res.status(400).json({success,error: "Please enter correct credentials"});
        }
        
   
        const data={
         user:{
           id:user.id
         }
       }
       const jwtToken= jwt.sign(data,secCode);
       success=true;
       res.json({success,jwtToken});
       console.log(jwtToken);
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("Some error occurred");
      } 
  });


  router.post(
    "/getuser",fetchuser,
    async (req, res) => {
        try{
          userid=req.user.id;
          const user = await User.findById(userid).select("-password");
          res.send(user);
        }
        catch(error){
          console.error(error.message);
          res.status(500).send("Some error occurred");
        } 
    });

module.exports = router;

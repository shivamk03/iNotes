const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


router.get('/fetchnotes',fetchuser,async (req,res)=>{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
});
router.post('/createnote',fetchuser,[
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 6 })
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({error: "Error found"});
    }
    
})


router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    const {title,description}= req.body;
    const newnote= {};
    if(title){newnote.title=title;}
    if(description){newnote.description=description;}
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).json({error:"page not found"});
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true});
        res.json(note);
    }catch(error){
        res.json({error:error.message});
    }
    
});
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).json({error:"Note not found"});
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({success:"deleted Note"});
    }catch(error){
        res.json({error:error.message});
    }
});
module.exports= router;
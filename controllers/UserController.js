"use strict";

var mongoose 		= require('mongoose'),
         auth		= require("../auth/Auth"),
         Event      = require("../models/Events"),
      Usermodel 		= require("../models/Users");
      




 exports.RegisterUser = async (req, res, next) => {
 	try{
        var user = new Usermodel(req.body);

        let data = await user.save();
        
            if(!data){ return res.status(403).send({status : false, message : "Unable to save user"});}
            
            data = data.toObject();
            var token = auth.signToken(data._id);
            data["_token"] = token;
            res.status(200).json(data);
    
   

     }catch(e){
         return res.status(422).send({status : e, message : "something went wrong"});
     }

 }

 exports.getUserByEmail = async (req, res, next) => {
     try{
         const {email} = req.params;
         
         if(!email){return res.status(403).send({message : "please enter an email", status : "failed"});}

         let user = await Usermodel.findOne({email}).populate('event');

         if(user){ 
             var data = await Event.find({User : user._id});
            };

            let result = {user, events : data};
    
         user ? res.status(200).send(result) : res.status(404).send({message : "user not found"});

     }catch(e){
        return res.status(422).send({status : e, message : "something went wrong"});
     }
 }
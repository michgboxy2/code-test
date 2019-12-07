var mongoose 		= require('mongoose'),
 		auth		= require("../userAuth/userauth.js"),
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
         return res.status(422).send({status : false, message : "something went wrong"});
     }

 }
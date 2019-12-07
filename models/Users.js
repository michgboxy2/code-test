const mongoose 	= require('mongoose'),
    { Schema, model, connect } = mongoose,
	validator   = require('validator'),
    bcrypt		= require('bcrypt-nodejs');
    
const {mongoURI} = require('../config');

connect(mongoURI, {useNewUrlParser: true});
	



var UserSchema = new Schema({
	email : ({ type : String, 
			trim : true, 
			unique : true, 
			lowercase : true, 
			required : "please enter your email", 
			validate : [validator.isEmail, "Invalid Email Address"]}),
	password : ({ type : String, required : "please enter password"})

});


	UserSchema.pre('save', function(next){
		this.password = this.encryptPassword(this.password);
		next();
	});


	UserSchema.methods = {

		authenticate : function(plaintext){
			return bcrypt.compareSync(plaintext, this.password);
		},

		encryptPassword : (plaintext) => {
			if(!plaintext){ return next(new Error("please enter password"));}

			var salt = bcrypt.genSaltSync();

			return bcrypt.hashSync(plaintext, salt);
		}
	}




module.exports = mongoose.model('user', UserSchema);
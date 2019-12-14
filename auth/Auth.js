var expressjwt = require("express-jwt"),
  jwt = require("jsonwebtoken"),
  userModel = require("../models/Users"),
  { secretToken } = require("../config");

const checkToken = expressjwt({ secret: secretToken });

exports.decodeToken = (req, res, next) => {
  checkToken(req, res, next);
};

exports.verifyUser = async (req, res, next) => {
  try{
    const {email, password} = req.body;

  if (!email || !password) {
    return res.status(403).send({message : "Please enter both emsil and password", status : "failed"});
  }

  let user = await userModel.findOne({ email: email });

  if (!user) {
    return res
      .status(403)
      .send({ message: "invalid email or password", status: "failed" });
  }

  if (!user.authenticate(password)) {
    return res.status(403).send({message : "incorrect username/password", status : "failed"});
  }


  req.user = user;
  next();

  }catch(e){
    return res.status(422).send({message : e, status : "failed"});
  }
};

exports.signToken = id => {
  return jwt.sign({ _id: id }, secretToken, { expiresIn: 24 * 7 * 3600 });
};

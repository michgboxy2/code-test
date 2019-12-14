const router = require('express').Router();
const {RegisterUser, getUserByEmail} = require('../controllers/UserController');
const {decodeToken} = require('../auth/Auth');


router.route('/').post(RegisterUser);
router.route('/:email').get(getUserByEmail);


module.exports = router;


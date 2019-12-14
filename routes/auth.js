var {verifyUser}	= 		require("../auth/Auth"),
	{signIn}  = 	require("../controllers/AuthController"),
	express = 		require("express"),
	router  = 		express.Router();

	router.route("/")
	.post(verifyUser, signIn);
	
	module.exports = router;
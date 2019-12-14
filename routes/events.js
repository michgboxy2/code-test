const router = require("express").Router();
const { decodeToken } = require("../auth/Auth");
const {
  addEvent,
  getAllEvents,
  getSignInUserEvent,
  findOneUserEvent
} = require("../controllers/EventController");

router.route("/").post(decodeToken, addEvent);
router.route("/").get(getAllEvents);
router.route('/user').get(decodeToken, getSignInUserEvent);
router.route('/user/:id').get(findOneUserEvent);

module.exports = router;

const router = require('express').Router();
const {addEvent, getAllEvents} = require('../controllers/EventController');

router.route('/').post(addEvent);
router.route('/').get(getAllEvents);


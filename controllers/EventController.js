const Event = require('../models/Events');

module.exports = {
  addEvent: async (req, res) => {
    const {end, start} = req.body;
    
    let dateStart = new Date(start);

    let data = req.body;

    data.dateStart = dateStart;

    dateStart.setTime(
      dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    );
    data.start = dateStart;
    data.User = req.user._id;

    const dateEnd = new Date(data.end);
    dateEnd.setTime(
      dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    );

    data.end = dateEnd;
    const existingEvent = await Event.findOne({
      $and: [
        {
          'location.latLng.lng': data.location.latLng.lng,
          'location.latLng.lat': data.location.latLng.lat,
        },
        {
          start: { $gte: data.start } }, { end: { $lte: data.end },
        },
      ],
    });



    if (existingEvent) {
      res.status(500).json({
        success: false,
        message: 'An Event already exist at this venue on this day',
      });
    } else {
      Event.create(data)
        .then((event) => {
          res.status(200).json({
            success: true,
            event,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: 'An Error Occured, please try again later',
          });
        });
    }
  },
  getAllEvents: (req, res) => {
    Event.find({})
      .populate('User')
      .then((events) => {
        res.json({ success: true, events });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: 'An Error Occured, please try again later',
        });
      });
  },

  findOneUserEvent : async (req, res, next) => {
    try{
      const {id} = req.params;
      if(!id){return res.status(403).send({message : "please enter the user id", status : "failed"});}
  
      let data = await Event.find({User : id});
      data ? res.status(200).send(data) : res.status(400).send({data : [], status : "User events not found"});
    }catch(e){
      return res.start(422).send({message : e, status : "failed"});
    }
  },
  
  getSignInUserEvent : async (req, res, next) => {
    try{
      const {_id} = req.user;
      if(!_id){return res.status(403).send({message : "please enter the user id", status : "failed"});}
  
      let data = await Event.find({User : _id});

      data ? res.status(200).send(data) : res.status(400).send({data : [], status : "User events not found"});
  
    }catch(e){
      return res.start(422).send({message : e, status : "failed"});
    }
  }
};



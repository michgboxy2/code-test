const mongoose = require('mongoose');

const { Schema, model, connect } = mongoose;
const {mongoURI} = require('../config');

connect(mongoURI, {useNewUrlParser: true});

const EventSchema = new Schema(
  {
    end: { type: Date, required: true },
    start: { type: Date, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      latLng: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    User : { type : mongoose.Schema.Types.ObjectId, ref : 'user', required : "You must be logged in"},
  },
  {
    timestamps: true,
  },
);



module.exports = model('event', EventSchema);

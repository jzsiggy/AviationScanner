const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  timeStamp : {
    type : String,
    required : true,
  },
  flights : [{
    icao : String,
    lat : Number,
    long : Number,
    velocity : Number,
    direction : Number,
    origin_country : String,
  }]
})

const Status = mongoose.model('Status', statusSchema);

module.exports = {
  Status,
}
require('dotenv').config();

const service = require('axios');
const mongoose = require('mongoose');

const { Status } = require('./models/Status');

mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`, {useNewUrlParser: true})
.then(response => {
  console.log('Connected to mongoDB')
})
.catch(err => {
  console.log('Error connecting to mongoDB', err);
});


const getFlights = () => {
  service.get('https://opensky-network.org/api/states/all')
  .then(response => {
    const { data } = response;

    let status = {};
    status.timeStamp = data.time;
    status.flights = [];

    for (flight of data.states) {
      const f = {
        icao24 : flight[0],
        lat : flight[6],
        long : flight[5],
        velocity : flight[9],
        direction : flight[10],
        origin_country : flight[2],
      };
      status.flights.push(f);
    };

  Status.create(status);

  // console.log(status);

  })  
  .catch(err => {
    console.log(err);
  });
}

getFlights();

setInterval(() => {
  getFlights();
}, 1700000)


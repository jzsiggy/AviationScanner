require('dotenv').config()

let plotly = require('plotly')("joaoz@al.insper.edu.br", process.env.PLOTLY_KEY);
const mongoose = require('mongoose');
const { Status } = require('./models/Status');

mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`, {useNewUrlParser: true})
.then(response => {
  console.log('Connected to mongoDB')
})
.catch(err => {
  console.log('Error connecting to mongoDB', err);
});

let lat = [];
let long = [];

const getData = async (collection) => {
  const dbData = await Status.find();
  let data = dbData[2].flights;
  for (let item of data) {
    lat.push(item.lat);
    long.push(item.long);
  };
  // console.log(data)
};

const plot = () => {
  var data = [{
    type:'scattermapbox',
    lat: lat,
    lon: long,
    mode:'markers',
    marker: {
      size: 3
    },
    text:['Montreal']
  }];
  
  var layout = {
    fileopt : "overwrite", 
    filename : "simple-node-example",
    autosize: true,
    hovermode:'closest',
    mapbox: {
      bearing:0,
      center: {
        lat:45,
        lon:-73
      },
      pitch:0,
      zoom:5
    },
  };
  
  plotly.plot(data, layout, function (err, msg) {
    if (err) return console.log(err);
    console.log(msg);
  });  
}

const main = async () => {
 await getData(Status);
 console.log('got the data')
 plot();
}

main();
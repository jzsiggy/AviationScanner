require('dotenv').config()

let plotly = require('plotly')("joaoz@al.insper.edu.br", process.env.PLOTLY_KEY);
const fs = require('fs');

const mongoose = require('mongoose');
const { Status } = require('../models/Status');

let lat = [];
let long = [];

const loadData = async (collection) => {
  mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`, {useNewUrlParser: true})
  .then(response => {
    console.log('Connected to mongoDB')
  })
  .catch(err => {
    console.log('Error connecting to mongoDB', err);
  });

  const dbData = await Status.find();
  let data = dbData[2].flights;
  for (let item of data) {
    lat.push(item.lat);
    long.push(item.long);
  };
};

const plot = async (filename, latitude, longitude) => {
  var data = [{
    type:'scattermapbox',
    lat: latitude,
    lon: longitude,
    mode:'markers',
    marker: {
      size: 3
    },
    text:['Montreal']
  }];
  
  var layout = {
    fileopt : "overwrite", 
    filename : `${filename}`,
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

  var figure = { 
    'data' : [data], 
    // 'layout' : [layout],
  };

  var imgOpts = {
    format: 'png',
    width: 1000,
    height: 500
  };

  
  // plotly.plot(data, layout, function (err, msg) {
  //   if (err) return console.log(err);
  //   console.log(msg);
  // });

  plotly.getImage(figure, imgOpts, function (error, imageStream) {
      if (error) return console.log (error);
      console.log(imageStream);
      var fileStream = fs.createWriteStream('1.png');
      imageStream.pipe(fileStream);
  });
};

const main = async() => {
  await loadData()
  plot('file', lat, long)
}

main();

module.exports = {
  plot,
};
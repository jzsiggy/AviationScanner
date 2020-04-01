const fs = require('fs');
const { flights } = require('./parseData');

const restrucure = async () => {
  let restructuredJson = []

  console.log("**STARTING**")
  for (let i = 1583843400; i < 1585596600; i += 3600) {

    let current = {
      timestamp : i,
      flights : [],
    }
  
    let currentData = await flights.filter(item => {
      return item.time == i;
    })
  
    console.log(`...Starting @${i} with ${currentData.length} entries...`);
  
    for (let item of currentData) {
      current.flights.push({
        icao24 : item['icao24'],
        lat : item['lat'],
        long : item['lon'],
        velocity : item['velocity'],
        direction : item['heading'],
      })
    };
    restructuredJson.push(current);
  };

  restructuredJson = JSON.stringify(restructuredJson);
  
  fs.writeFile("data.json", restructuredJson, 'utf8', (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('SAVED JSON')
    }
  });
};

restrucure()
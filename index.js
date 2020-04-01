const { flights } = require('./assets/parseData');
const { plot } = require('./assets/plot');

console.log(flights.length)

const main = async () => {
  console.log("**STARTING**")
  for (let i = 1583843400; i < 1585596600; i += 3600) {

    let lat = [];
    let long = [];
  
    let currentData = await flights.filter(item => {
      return item.time == i;
    })
  
    console.log(`...Starting @${i} with ${currentData.length} entries...`);
  
    for (let item of currentData) {
      lat.push(item.lat);
      long.push(item.lon);
    }

    // console.log(lat, long)
  
    plot(i, lat, long);
    break;
  };
};

main();
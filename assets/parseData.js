// ==> csvtojson ../data/log.csv > ../data/flights.json <==

const fs = require("fs");

var data = fs.readFileSync("./data/flights.json");
var flights = JSON.parse(data);

module.exports = {
  flights,
};
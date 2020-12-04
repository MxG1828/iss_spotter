const request = require('request-promise-native');

const outputDate = (stamp, sec) => {
  let addon = { weekday: "short", year: "numeric", month: "short", day: "2-digit", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
  let obj = new Date(stamp * 1000);
  let date = `Next pass at ${obj.toLocaleDateString("en-us", addon).split(",").join("")} GMT-0800 (Pacific Standard Time) for ${sec} seconds!`;
  console.log(date);
};

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};
const fetchISSFlyOverTimes = (body) => {
  const { lat, lon } = JSON.parse(body)
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`)
};
const nextISSTimesForMyLocation = (body) => {
  const times = JSON.parse(body).response;
  for (let time of times) {
    outputDate (time.risetime,time.duration);
  }
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (err, response, data) => {
    if (err) {
      return callback(err, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      return callback(Error(msg), null);
    } else {
      callback(err, JSON.parse(data).ip);
    }
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`http://ip-api.com/json/${IP}`, (err, response, coords) => {
    if (err) {
      return callback(err, null);
    } else if (JSON.parse(coords).status === "fail") {
      return callback(Error(` ${JSON.parse(coords).status} when fetching IP. Response: ${coords}`), null);
    } else {
      callback(err, { latitude: JSON.parse(coords).lat, longitude: JSON.parse(coords).lon });
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, data) => {
    if (err) {
      return callback(err, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      return callback(Error(msg), null);
    } else {
      callback(null, JSON.parse(data).response);
    }
  });
};

const outputDate = (stamp, sec) => {
  let addon = { weekday: "short", year: "numeric", month: "short", day: "2-digit", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
  let obj = new Date(stamp * 1000);
  let date = `Next pass at ${obj.toLocaleDateString("en-us", addon).split(",").join("")} GMT-0800 (Pacific Standard Time) for ${sec} seconds!`;
  console.log(date);
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
    } else {
      fetchCoordsByIP(ip, (err, coords) => {
        if (err) {
          console.log("It didn't work!", err);
        } else {
          fetchISSFlyOverTimes(coords, (err, times) => {
            if (err) {
              callback(err);
            } else {
              for (let time of times) {
                outputDate(time.risetime, time.duration);
              }
            }
          });
        }
      });
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

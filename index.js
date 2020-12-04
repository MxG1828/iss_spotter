const { nextISSTimesForMyLocation } = require("./iss");
// const {  } = require("./iss");
// const {  } = require("./iss");


// fetchMyIP((error, ip) => {
//   fetchCoordsByIP(ip, (err, coords) => {
//     fetchISSFlyOverTimes(coords,(err,times) => {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         console.log(times);
//       }
//     });
//   });
// });
nextISSTimesForMyLocation((err) => {
  if (err) {
    console.log("It didn't work!",err);
  }
});
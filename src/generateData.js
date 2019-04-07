// const fs = require('fs');

function generateData(from, to) {
  const data = [];

  for (let i = 0; i < 100000; i++) {
    data.push(Math.random() * (to - from) + from);
  }

  return data;
}
module.exports = function(numPlots) {
  const data = [];
  for (let i = 0; i < numPlots; i++) {
    data.push(generateData(i * 10, (i + 1) * 10));
    // fs.writeFile(
    //   `./test-data-${i}.json`,
    //   JSON.stringify(generateData(i * 10, (i + 1) * 10)),
    //   function(err) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     console.log(`File test-data-${i}.json was saved!`);
    //   }
    // );
  }

  return data;
};

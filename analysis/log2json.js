// const fullGitHistory = require('full-git-history');
const fs = require('fs')
const exec = require('child_process')

exec('git log --date=iso --pretty=format:"%h%x09%an%x09%ad%x09%s" > commits.iso.csv')


// const flatten = require('flat')

// /**
//  * @param {string[]} Args list.
//  * @param {function(Error=,Object=)} Callback (when writting is finished)
//  */
// fullGitHistory(['../gitshow1', '-no', '-r'], (error, history) => {
 
//   if (error) {
//     console.error(`Cannot read history: ${error.message}`);
//     return;
//   } 
//   compiledHistory = JSON.stringify(history, null, '\t')

//   //console.log(`There are ${history.commits.length} commits.`);
//   // fs.writeFileSync('./history.json', compiledHistory)
//   let flatHistory = flatten(history)
//   let keys = Object.keys(flatHistory)
//   //console.log(keys)
//   jsonToCSV(keys, flatHistory)
//   // for (i = 0; i < keys.length; i++){
//   //   keySplit = keys[i].split('.')
//   //   console.log(keySplit.splice(2))

//   //   if(keySplit[1] === 0){
//   //     // make the columns for the commits
//   //   } else {

//   //   }
//   // }
  
// });



// const { Parser } = require('json2csv');
 
// // fields = keys
// // const myCars = [
// //   {
// //     "car": "Audi",
// //     "price": 40000,
// //     "color": "blue"
// //   }, {
// //     "car": "BMW",
// //     "price": 35000,
// //     "color": "black"
// //   }, {
// //     "car": "Porsche",
// //     "price": 60000,
// //     "color": "green"
// //   }
// // ];
// function jsonToCSV(keys, log){
//   const json2csvParser = new Parser({ keys });
//   const csv = json2csvParser.parse(log);
  
//   console.log(csv);
//   fs.writeFileSync('./log.csv', csv, null, '  ')
// }
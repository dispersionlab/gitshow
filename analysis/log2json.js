// const fullGitHistory = require('full-git-history');
const fs = require('fs')
const {exec} = require('child_process')

exec('git log --full-history --reverse --parents --date=unix --pretty=format:"%h,%p,%an,%ad,%s"', (stdout, stderr, err) =>{
    let columnNames = 'hash, parentHash, author, utc, comment\n'
    fs.writeFileSync('./commits.csv', columnNames)

    let line = stderr.split('\n')

    // since rstudio separates columns by commas, we need to replace any commas appearing in the commit comment with periods. 
    for (i = 0; i < line.length; i++){
        // get the comment, replace commas with periods
        let comment = line[i].split(',').slice(4).join(',').replace(/,/g, '.')
        // join the updated comment with the rest of commit
        let formatedComment = line[i].split(',').slice(0,3).join(',') + ',' + comment + '\n'
        // console.log(formatedComment)
        // append to file
        fs.appendFileSync('./commits.csv', formatedComment)
    }
    
})

// figure out how to format the csv so that Rstudio can access the filenames reported by git log --name-status
/* exec('git log --full-history --reverse --name-status --parents --date=unix --pretty=format:"%h   %p,%an,%ad,%s,%"', (stdout, stderr, err) =>{
    let columnNames = 'hash, parentHash, author, utc, comment\n'
    fs.writeFileSync('./commits.csv', columnNames)
    fs.appendFileSync('./commits.csv', stderr)
    console.log(stderr)
    
})
*/

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
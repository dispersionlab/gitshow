// const fullGitHistory = require('full-git-history');
const fs = require('fs')
const {exec, execSync} = require('child_process')

// execSync('git log --reverse --full-history --name-status', (stdout,  stderr,  err) =>{
//     console.log(err)
// })


// --name-status variables:
let added = {};
let modified = {};
let deleted = {};
let copied = {};
let renamed = {};
let log = {};
// result variable
let formattedCommit;

entries = 0

exec('git log --full-history --reverse --name-status --parents --date=unix --pretty=format:"$%h,%p,%an,%ad,%s"', (stdout, stderr, err) =>{
    let columnNames = 'hash, parentHash, author, utc, comment, added, modified, deleted, copied, renamed\n'
    fs.writeFileSync('./commits.csv', columnNames)

    let line = stderr.split('\n')

    
    // since rstudio separates columns by commas, we need to replace any commas appearing in the commit comment with periods. 
    // to do: in the rstudio data-import cheatsheet, it says you can also load tab-delimited csv files using read.tsv, so in the future just put %x09 in between each --pretty format variable instead of commas. 
    for (i = 0; i < line.length; i++){

        // get any file stat refs
        switch (line[i].charAt(0)){
            // file addition
            case "A":
                log[entries.toString()].added.push(line[i].split('\t')[1])
                // console.log(line[i].split('\t'))
                // added.push(line[i].split('\t')[1])
                // console.log(added)
            break;
            // file modification
            case "M":
                log[entries.toString()].modified.push(line[i].split('\t')[1])

            break;

            // file deletion
            case "D":
                log[entries.toString()].deleted.push(line[i].split('\t')[1])

            break;

            // "rename score"
            case "R":
                log[entries.toString()].renamed.push(line[i].split('\t')[1])

            break;

            // copy score"
            case "C":
                log[entries.toString()].copied.push(line[i].split('\t')[1])

            break;

            case ',':
            case ' ':
            // ignore
            break

            default: 
                if (line[i].charAt(0) === '$'){
                    entries++
                    //console.log('$')
                    match = line[i].split('$')[1]
                    // console.log(match, added)
                    //ignore blank 
                    log[entries.toString()] = {
                        commit: null,
                        added: [],
                        modified: [],
                        deleted: [],
                        copied: [],
                        renamed: []
                    }
                    //console.log(log)
                    
                    // let combine = added.join(',')
                    // console.log(concat.join(combine))
                    // first  clear all --name-status variables
                    added.length = 0;
                    modified.length = 0;
                    deleted.length = 0;
                    copied.length = 0;
                    renamed.length = 0;
                    concat.length = 0
                    
                    // get the comment, replace commas with periods
                    let comment = match.split(',').slice(4).join(',').replace(/,/g, '.')
                    // console.log(comment)
                    // join the updated comment with the rest of commit
                    formattedCommit = match.split(',').slice(0,4).join(',') + ',' + comment
                    // console.log(formattedCommit)
                    // append to file
                    log[entries.toString()].commit = formattedCommit

                    // console.log(concat)
                    
                }
        }
        

    }
        let commit;
        let keys = Object.keys(log)
        console.log(keys)
        for (i = 0; i < keys.length; i++){
            let astr;
            let ref = log[keys[i].toString()]
            commit = ref.commit + ', ' + ref.added.join(' ') + ', ' + ref.modified.join(' ')+ ', ' + ref.deleted.join(' ')+ ', ' + ref.copied.join(' ')+ ', ' + ref.renamed.join(' ') + '\n' 
            // if (log[ref].added.length > 0){
            //     commit = log[i].added.join(' ')
            // }

            //console.log(commit)
            fs.appendFileSync('./commits.csv', commit)
        }
})

let concat = [];

function addLine(line){
    fs.appendFileSync('./commits.csv', line)
}
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
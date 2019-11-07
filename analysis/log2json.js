// const fullGitHistory = require('full-git-history');
const fs = require('fs')
const {exec, execSync} = require('child_process')

let log = {};
// result variable
let formattedCommit;

entries = 0

// DON'T REMOVE THIS:
/*
let setOptions = [
// use this to set flags for git log or git rev-list...
]
// ...then use something like:
getOptions = setOptions.join(' ')
exec('git log ' + getOptions,  (stderr) =>{
    console.log(stderr)
    //  ...and so on
}
*/

exec('git log --full-history --all --reverse --name-status --parents --date=unix --pretty=format:"$%h,%p,%an,%ad,%s"', (stdout, stderr, err) =>{
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

                    // get the comment, replace commas with periods
                    let comment = match.split(',').slice(4).join(',').replace(/,/g, '.')
                    // console.log(comment)
                    // join the updated comment with the rest of commit
                    formattedCommit = match.split(',').slice(0,4).join(',') + ',' + comment
                    // console.log(formattedCommit)
                    // place commit in log json
                    log[entries.toString()].commit = formattedCommit
                    
                }
        }
        

    }
        let commit;
        let keys = Object.keys(log)
        // put the entire commit together as a single comma-separated list
        for (i = 0; i < keys.length; i++){
            let astr;
            let ref = log[keys[i].toString()]
            commit = ref.commit + ', ' + ref.added.join(' ') + ', ' + ref.modified.join(' ')+ ', ' + ref.deleted.join(' ')+ ', ' + ref.copied.join(' ')+ ', ' + ref.renamed.join(' ') + '\n' 

            // append the commit to the csv file for Rstudio
            fs.appendFileSync('./commits.csv', commit)
        }
        console.log('wrote ' + (keys.slice(-1)[0] - 1) + ' commits to commits.csv')
})


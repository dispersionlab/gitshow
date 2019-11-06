const fs = require('fs')
const dir = require('node-dir')

let presentationObjects = 0;
let nonPresentationObjects = 0;
let totalObjects = 0
let comments = 0
let data = []
let repos = process.argv[2].split(",")
let counter = 0;
let patcherCount = 0

// for (var i = 0; i < repos.length; i++) {

//   patcherCount = 0
  
// //   setTimeout(function(){
// // console.log('processing repo ' + i)
// //   }, 5);
// }
reportFiles(repos[0])
console.log(data)

function reportFiles(repo) {
  repoPath = "../../../" + repo
  counter++
  dir.readFiles(repoPath, {
    match: /.maxpat$/,
    exclude: /^\./
    }, function(err, content, next) {
        patcherCount++;

        /* if reporting per file, reset the values between each loop:
        presentationObjects = 0;
        nonPresentationObjects = 0;
        comments = 0;
        */

        if (err) throw err;
        let patcher = JSON.parse(content)
        length = patcher.patcher.boxes.length

        for (var i = 0; i < length; i++) {

          if (patcher.patcher.boxes[i].box.presentation === 1){
            presentationObjects++
            // console.log(patcher.patcher.boxes[i])
          } else {
            nonPresentationObjects++
          }

          if (patcher.patcher.boxes[i].box.maxclass === "comment"){
            comments++
            // console.log(patcher.patcher.boxes[i])
          } 
        }


        next();
    },
    function(err, files){
        if (err) throw err;
        console.log('finished reading files:',files);

        totalObjects = presentationObjects + nonPresentationObjects

        let presentationPercentage = presentationObjects/totalObjects

        

        maxpats = files.length

        let modularity =  maxpats / totalObjects
        
        let stats = {}

        stats[repo] = {presentationObjects, nonPresentationObjects, totalObjects, presentationPercentage, comments, maxpats, modularity}
        data.push(stats)

        // reset counts
        patcherCount = 0
        presentationObjects = 0;
        nonPresentationObjects = 0;
        comments = 0
        totalObjects = 0
        fs.writeFileSync("cycle1.json", JSON.stringify(data, null, 2))

        // if we have read all of the repos, exit script
        if (counter === repos.length){
          setTimeout(function(){
            process.exit()
          }, 500);
        } else {
          // wait 500ms and then move on to next repo
          setTimeout(function(){
            reportFiles(repos[counter])
          }, 500);
        }



    });

  


}


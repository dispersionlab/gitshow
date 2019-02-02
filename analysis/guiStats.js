const fs = require('fs')
const dir = require('node-dir')

let presentationObjects = 0;
let nonPresentationObjects = 0;
let totalObjects = 0
let comments = 0
let data = []
let repos = process.argv[2].split(",")

for (var i = 0; i < repos.length; i++) {

  patcherCount = 0
  reportFiles(repos[i])
}

console.log(data)

function reportFiles(repo) {

  dir.readFiles(repo, {
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
        repo = repo.replace("../../","")
        let stats = {}

        stats[repo] = {presentationObjects, nonPresentationObjects, totalObjects, presentationPercentage, comments, maxpats}
        data.push(stats)

        // reset counts
        patcherCount = 0
        presentationObjects = 0;
        nonPresentationObjects = 0;
        comments = 0
        totalObjects = 0
        fs.writeFileSync("GUI_Stats.json", JSON.stringify(data, null, 2))

    });

  


}


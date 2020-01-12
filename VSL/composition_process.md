IMPORTANT: Note that all filenames referenced in this readme include a #. This is a placeholder for the numbered gitshow repo. i.e. if you're working in gitshow2, then all files in that repo should be named:

- recording2.wav
- score2.md
- reflections2.md
- patch2.md
- module2.js

Please only edit these files. Do not modify the readme, markdown_examples, .gitignore, or any of the files in /admin or /web. Thanks!

-
-
This process will take ~10 hours per week to complete. 

-
-

It is **extremely important** that you follow the exact steps detailed in this document every week, as Michael may have added modifications to the process based on feedback.

-
-


1. Clone the repository you've been assigned and open it on your computer
2. open *reflections#.md* in a markdown editor, erase all of the content, and save the file. Leave this document open. 
3. open *score#.md*, and read it at least once. 
4. listen to recording.wav several times and follow along with *score#.md*
5. in score.md, copy (NOT CUT) the entire markdown code (not the rendered preview) of the document and paste it into the newly blank *reflections#.md*. 
6. Close *score#.md*.  
7. In *reflections#.md*, using markdown formatting, place the entire score in blockquotes by inserting the > symbol at the start of each line of the score, including line breaks. (in MacDown you can select entire text and type Shift-CMD-B). This will add a threadline in the rendered document i.e. a score with the > added to each line becomes:

	> low, sustained tone at medium intensity, gradually fades over ~45 seconds
	> 
	> medium and higher transients like clicks, pops, and buzzes are introduced gradually
	
	
	*note* that if blockquotes were used as part of the score to begin with, you can add a second > symbol to the line:
	
	> > example of a double block quote
	
	> > > example of a triple block quote ... 

8. Save *reflections#.md*, and make a commit

	```shell
	git commit -am "beginning to reflect on the score and recording"
	```
9. With the score now in blockquotes, continue to listen to the recording, but now insert your own reflections on the score and recording, making specific notes below areas of interest, and also noting the time(s) in the recording.

	> low, sustained tone at medium intensity, gradually fades over ~45 seconds
	
	I notice that while the score states that this low tone gradually fades over 45 seconds, I mostly only hear a fade begin around 33 seconds in.
	
	> medium and higher transients like clicks, pops, and buzzes are introduced gradually
	
	Further to the previous note about the later fade, I think that these clicks and pops would be more effective if the fade were indeed introduced sooner. Also, the transient at 0:37:13 is less of a click/pop/buzz, and more like a hard 'k' sound. 
	
10. Save and commit your changes **very often**, be generously descriptive in your commit messages!
11. continue to listen to the score and make notes. Some suggestions for what you could focus on: 
	- general reactions to the piece
	- reactions to the score and recording
	- how close is the recorded performance to what was written in the composition?
	- what sound elements are particularly of interest, what time(s) do they occur, experiment with describing them
	- some scores may be entirely technical in the writing (like an instruction manual), while at another extreme others are representations of the recordings, others still more abstract. Does the approach appeal to you? Is it effective? You can respond to this directly. 
	- remember to save and commit your changes **very often**, be generously descriptive in your commit messages!

12. Reopen the *score#.md*, and then open the file *patch#.vcv* in VCV Rack, and experiment with performing the score several times. Add nodes about this process in the *reflections#.md* document, remembering to save & commit your changes. 

13. Copy the entire contents of *reflections#.md* into the blank *score#.md*
14. Begin to compose a new version of the score in *score#.md* and make a newer version of *patch#.vcv*:
	- you can include as much or as little of the previous version of the score as you like. 
	- drawing from your own notes, add, duplicate, remove, or refine compositional elements
	- consider that markdown files can embed images and other content, so a score doesn't have to be limited to text... 
	- see the file markdown_examples.md for all that can be achieved in markdown!
	- Add new patch cables, add/remove modules, etc. 
	- remember to save and commit your changes **very often**, be generously descriptive in your commit messages!

15. Practice performing the score (maximum length is 90 seconds!). 

16. To record yourself, locate the record module in the patch (or add one if it isn't there). Right-click it, and ensure the following settings:
	- under 'Output File':
		- Click the /path/to/the/recording#.wav (might be 'Select...'), and ensure that this path is pointing to **the 'recording#.wav' in this week's repository, not the one from last week** i.e. the same folder that this readme.md is located in... 
		-  ensure that 'Append -001, -002, etc.' is **not enabled** (i.e. no checkmark)
	- under 'audio formats':
		- .wav is selected

17. Each time you record using this module, it will overwrite the previous recording.wav, so remember to commit each version of recording.wav.

18. When the score, recording, and patch are completed, save and commit any last changes, and update the remote github repo:

	```shell
	git commit -am "type a message about this commit..."
	
	git pull
	
	git push
	```
# VSL weekly class preparation:

Ensure you have committed & pushed changes to each of the 4 artefact files in your repo before 11:59pm on Sundays:
	- score
	- recording
	- patch
	- reflections

## Step 1: work in master, merge if needed
Need to ensure your repo is pointed at master branch and is up to date:

```shell
# check the current branch
git branch

## if not on master, check if anything needs to be committed
git status

## if any modifications not tracked, commit them
git commit -am "message about the changes"

## switch to master branch
git switch master

## if you need to bring and changes from the other branch into master, do a merge
git merge nameOfOtherBranch

# otherwise, check to see if you need to push your work
git status
## if necessary
git commit -am "message..."

git push
```

## Step 2: Improvisation session
Next, create a new branch for our improvisation session:

```shell
# make sure you're on the up-to-date master branch
git branch

git switch master

# create a branch called 'week2Improvisation'
git switch -c week2improvisation

# tell origin to track your new branch
git push -u origin week2improvisation

```

For the improvisation: keep your terminal window open alongside a view of VCV rack. as you make changes to VCV rack, save and commit them. This multitasking will not be easy, but try! *note* I'm working on a script to auto-commit during the improvisation for next week, but I want to have you do it intentionally first. 

#### after your improvisation session

save and commit any last changes to the patch. push the changes to origin

```
git push
```

## Step 3: Score performance

Next, create a new branch for your score performance session:

```shell
# make sure you're on the up-to-date master branch
git branch

git switch master

# create a branch called 'week2performance'
git switch -c week2performance

# tell origin to track your new branch
git push -u origin week2performance

```

#### after your performance

save and commit any changes to the patch. push the changes to origin

```
git push
```

Switch back to master. **ensure the patch.vcv and score.md have not been modified since the completion of Step 1.** If they have, run 

```shell
git stash
```
to maintain consistency the end of your creative work from last week. 


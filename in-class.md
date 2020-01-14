# VSL weekly class preparation:

1. Ensure you have committed & pushed changes to each of the 4 artefact files in your repo before 11:59pm on Sundays:
	- score
	- recording
	- patch
	- reflections

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

Next, create a new branch for our improvisation session:

```shell
# make sure you're on the up-to-date master branch
git branch

git switch master

# create a branch called 'week2Improvisation'
git switch -c week2improvisation

# tell origin to track your new branch
```

For the improvisation: keep your terminal window open alongside a view of VCV rack. as you make changes to VCV rack, save and commit them. This multitasking will not be easy, but try!


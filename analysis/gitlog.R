## Anything starting with ## is a comment, and won’t run
## Delete the ## if you want to run the code

## install.packages("tidyverse") ## If not already done
library(tidyverse) ## Will load ggplot2 and others
install.packages("readr")
install.packages('plotly')
library(plotly)


## Download the raw data
## ghg_raw <- readr("./analysis/commits.iso.csv")

# set Rstudio's working directory for this session:
setwd('./dispersion-code/gitshows/gitshow/analysis')
# confirm the working dir
getwd()

# load generated git logfile (from the nodejs script log2json.js)
logfile <- read.csv('./commits.csv')

## View the data
## RStudio: click on variable name in upper right
logfile

## Tidy it up: variables are columns, 
## observations are rows, 
## each value has its own cell.
## See https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html

## We’re using the pipe and the tidyr package here,
## but consider it magic for now.
ghg <- logfile %>% pivot_longer(-year, names_to = "sector", values_to = "emissions")

## View it now
## RStudio: click on variable name in uppper right
ghg


## Always a nice way to start: scatter plot 
## Here we’ll do it by sector
graph <- ggplot(data = logfile, aes(hash, parentHash, x = utc, y = author, comment)) + geom_point()
#ggplotly(graph)

ggplot
## Try just this: no points!
ggplot(data = ghg, aes(x = sector, y = emissions))

## Jitter it up
ggplot(data = ghg, aes(x = sector, y = emissions)) + geom_jitter()

## Tighten the spread
ggplot(data = ghg, aes(x = sector, y = emissions)) + geom_jitter(width = 0.3)

## Box plot (shows first and third quartiles, and median)
## https://ggplot2.tidyverse.org/reference/geom_boxplot.html
ggplot(data = logfile, aes(x = hash, y = parentHash)) + geom_boxplot() + geom_jitter()

## Compare the oil_gas column to the summary data here
ghg %>% filter(sector == "oil_gas") %>% summary()


## Now we’ll put year on the x-axis
## And we’ll leave out “data =” because it’s unnecessary

## Scatter plot
ggplot(ghg, aes(x = year, y = emissions)) + geom_point()

## Just lines
ggplot(ghg, aes(x = year, y = emissions)) + geom_line()

## That didn’t work!
## We need to connect it by sector, and 
## specifying colours is enough for R to know what to do
ggplot(ghg, aes(x = year, y = emissions)) + geom_line(aes(colour = sector))

## Lines and points
ggplot(ghg, aes(x = year, y = emissions)) + geom_line(aes(colour = sector)) + geom_point()

## Lines and shaped points
ggplot(ghg, aes(x = year, y = emissions)) + geom_line(aes(colour = sector)) + geom_point(aes(shape = sector))

## Lines and softer shaped points 
ggplot(ghg, aes(x = year, y = emissions)) + geom_line(aes(colour = sector)) + geom_point(aes(shape = sector), alpha = 0.2)

## What does this do?
ghg %>% group_by(sector) %>% mutate(percent_change_to_base = emissions / emissions[1]) %>% ggplot(aes(x = year, y = percent_change_to_base)) + geom_line(aes(colour = sector))






## Emissions are added up automatically
ggplot(ghg, aes(x = year, y = emissions)) + geom_col()

## Fill (with colour) by sector
ggplot(ghg, aes(x = year, y = emissions)) + geom_col(aes(fill = sector))

## Break it up by sector, dodge the bars
ggplot(ghg, aes(x = year, y = emissions)) + geom_col(aes(fill = sector), position = "dodge")

## Smaller portion of that
ggplot(ghg %>% filter(year >= 2010), aes(x = year, y = emissions)) + geom_col(aes(fill = sector), position = "dodge")





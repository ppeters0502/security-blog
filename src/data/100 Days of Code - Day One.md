---
id: 14
title: 100 Days of Code - Day One
publishedDate: 05/29/2024
featureImage: https://i.imgur.com/vBuk9PCh.png
---
## Intro
Hello Internet!
Oh man, this is crazy.... TWO POSTS IN ONE DAY?!!
Some sort of record here!

Anyways, as I mentioned in my [earlier post](https://screamintothevoid.today/blog/13) I'm starting a challenge to spend at least an hour writing code every day for the next 100 Days! To recap, here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

Day One, here is my GitHub Contributions Activity meter:
![ecba9762e0c1da438faea294ab95a535.png](https://i.imgur.com/Bb60MFV.png)It looks like GitHub counted my commit as one contribution, and my merged pull request as another contribution, so that's 27 at the start of my challenge!

## What are we doing today?
Today I think I'm going to focus on this actual site, making a (hopefully) small feature change. If I'm going to be posting at least once everyday for the next 100 days, that's going to absolutely fill up my Blog page with a ton of posts, and I should probably find a way to filter that!

I might end up doing something different later, but for right now I think I might go for some sort of drop down option, to filter my posts based off of what they're about. For right now I'll go with these options:
* CTF walkthroughs
* 100 Days of Code posts (small now, but hopefully growing)
* Anything else

Once the user selects one of the options, then the state of the blog post lists will change and you will only see the blog posts with the correct categories.
Now this change I think is big enough that I don't quite think I'm going to be able to do the whole thing in one hour. I'll probably split this up over 2-3 days, just because I don't regularly work in React anymore, and I'll probably have to do a little digging.

## useParams()
So I'm a little bit rusty with React, but I believe I should be able to pass in a new parameter, category, and then as long as I tag all of my posts accurately, then I can use those tags (I have a frontmatter section of each blog post where I can put tags.) and go from there!

For right now I'm just debugging via a big ole <h3> tag
![7f67652759f74df58a33cdc42282dde0.png](https://i.imgur.com/Sgpdh0D.png)

## End of Day One
I didn't quite get everything up and running with the post categories, but I have the category parameter working with the blog page, and once I get custom tags implemented on all my blog posts, we should be in business!

Welp that wraps it for day one, we'll see you tomorrow!
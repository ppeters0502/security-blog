---
id: 15
title: 100 Days of Code - Day Two
publishedDate: 05/30/2024
featureImage: https://i.imgur.com/9X6Fjhjh.png
tags:
  - 100_days
---
## Intro
Hello Internet!
Making our way to day two of the 100 day code challenge!

Just as a recap in case you missed my [original post](https://screamintothevoid.today/blog/13) I'm starting a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

For Day Two, here is my GitHub Contributions Activity meter:
![019ad1435ea00f5750a11920e445d6e5.png](https://i.imgur.com/weyZLKb.png)Let's get to it!


## What are we doing today?
The goal today is to finish up the post categories on my blog site, so that when viewing all of my blog posts, you can filter by the following categories:
* CTF walkthroughs
* 100 Days of Code posts (small now, but hopefully growing)
* Anything else

Yesterday I setup a new URL Parameter "category", which, when used, assigns the state of whatever I want to a new filter. So today I just have to link that new state item to a filter that only shows a post with the matching category. I then just added an extra function that checks for the category parameter that's passed through (I really like using numbers for URL params and don't like having to filter strings), and then sets the appropriate category that's handled by the rest of the functions within the component that are category based:
![73fda45973365a04ceaa5e31408e7976.png](https://i.imgur.com/D2w9OXs.png)
The last part was then adding some extra conditionals to check if a category was passed in (either by State of by URL param) and then filtering the posts that have the frontMatter tags that match:
![6a04f7e42b3a0d50335bfc779278e20c.png](https://i.imgur.com/pt5BMCA.png)
It's probably not gonna win me any code golf competitions, but it's working!

## A little while later
Ok, I have the filter completely working!
You can now either supply the category of posts you want to see via URL or by selecting the dropdown box that has the available options!
So if, for example, you want to see all 100 Days of Code related posts, you can either go to [https://screamintothevoid.today/category/2](https://screamintothevoid.today/category/2), which passes in the 100 Days of Code category and filters the posts, or (if you're already on the home page), there's a new dropdown above the window of posts where you can select an option and the posts filter without refreshing the page!

I'm not gonna lie, I'm a lot more rusty at React than I thought I was, today was more like 2 hours of coding rather than 1 hour (whoops). The important thing is I'm getting time to focus on coding, making this blog site better, and having some fun while I'm at it!

You can see the new post filter in this screenshot!
![aac13a4402ca82c5bd759a0220037532.png](https://i.imgur.com/9X6Fjhj.png)

## End of Day Two
I need to figure out a way to better show my progress in these posts, I feel like these posts are going to get really boring really quick if I'm not screenshotting and adding bits of code as I go along. Something I need to think through.

In the meantime though, that wraps it for day two, we'll see you tomorrow!
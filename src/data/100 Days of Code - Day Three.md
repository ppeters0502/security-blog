---
id: 16
title: 100 Days of Code - Day Three
publishedDate: 05/31/2024
featureImage: https://i.imgur.com/BHjhYkBh.png
tags:
  - 100_days
---
## Intro
Hello Internet!
Let's hear it for day 3 of the 100 days of code!!

Just as a recap in case you missed my [original post](https://screamintothevoid.today/blog/13) I'm starting a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

For Day Three, here is my GitHub Contributions Activity meter:
![0877c9948d2b986a1815752f43796882.png](https://i.imgur.com/6ai9C0n.png)Let's get to it!

## What are we doing today?
I'll be honest, I hit it pretty hard both yesterday and the day before, and unfortunately my day is pretty jammed packed. Thankfully I was still able to block off an hour to stick with my challenge, but I'm pretty limited to just that hour today.

With that in mind, I think today I'm going to get started working on a comment section for this blog! I know I'm not going to be able to get this done today, and this might end up being a 3-4 day sort of effort, but I think it would be really cool to get some extra engagement (if there is anyone reading them, lol) on some of these posts.


## How do you think this is going to work?
So my cloud services background is mostly through Amazon Web Services (AWS), so for simplicity I think I'm going to stick with AWS for this.
Prior to adding comments, all of my posts on this blog site are Markdown files that I store with my site files, pull in using a Markdown parser in React and display the contents in a window. I specifically did it this way, because I didn't want to have a bunch of back end, admin-only type of attack surface on this site that could possibly be hit by someone. It's just mostly a small site hosting some Markdown files!

I still want to keep that sort of structure, so I'll probably have a react text editor component with a character limit and a submit button that, when submitted, sends the text to an AWS lambda function. The lambda function can then parse the text to make sure the text is safe, and insert the text into dynamoDB or something like that. Then, in my single post component, I'll have to make a service call that pulls up all of the comments that are attached to a specific post ID, and then display them at the bottom!

## Where to start then?
I have to do quite a bit of AWS digging to figure out the right React - API Gateway - Lambda Function - DynamoDB combination. In the meantime though, I can start putting together a comment component in React so at least things look pretty!


## Ugh
I started putting together some fake comments to work on the styling, and a few new components:
![6536de3c2d338ca60795ebfff4cfd868.png](https://i.imgur.com/7L4ZSTI.png)Nothing super fantastic, and nothing I can really see on the page yet, but unfortunately my hour is quickly running out and I need to get back to work soon! This is the snippet I'm working off of in the meantime:
![86517ff04cbdcaea2fee732d0452b91d.png](https://i.imgur.com/BHjhYkB.png)I'll have more time tomorrow though and can hopefully have more to show for it! 
In the meantime I'll see you in the next one!
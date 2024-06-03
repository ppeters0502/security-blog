---
id: 19
title: 100 Days of Code - Day Six
publishedDate: 06/03/2024
featureImage: https://i.imgur.com/553R9pQh.png
tags:
  - 100_days
---
## Intro
Hello Internet!
New week, more coding

For the obligatory recap, as mentioned in my original post [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

For Day Six, here is my GitHub Contributions Activity meter:
![79e11a2a06a26593b16a496bb23dda89.png](https://i.imgur.com/HyjSAkO.png)
## What are we doing today?
I had to hop off rather abruptly last night, so today I spent a good bit of time setting up the service calls and React-specific code that renders comments on a post.

This is my first time working with React-Bootstrap Form inputs, so it's been an interesting day!
I now have a "comment section" reusable component that pulls from my test json-server instance running locally, matches comments that have the same post ID to the current post the user is on, and displays them all nicely like this:
![c7171294bab2542e957ddafee64ba99c.png](https://i.imgur.com/553R9pQ.png)Here's another screenshot on a post that has 2 fake comments:
![95f8da459ed440f56e367db64c32917f.png](https://i.imgur.com/69tiG7C.png)I'm currently working on the comment submission and validation section, which has been a little bit of a pain. I'm fairly confident that once I get the AWS API Gateway completed so that new comment requests update the DynamoDB table, then I can connect this React code to those requests and then we'll be in business!

Pretty short post today, but most of today was just finishing up some pieces that didn't get done yesterday.
Until next time!!

---
id: 23
title: 100 Days of Code - Day Eleven
publishedDate: 06/12/2024
featureImage: https://i.imgur.com/60dFX9ih.png
tags:
  - 100_days
---
## Intro
Hello Internet!

Welp, it took a good week of hacking things together, but I **finally have a comment section!!**

For the obligatory recap, as mentioned in my original post [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

For Day Eleven, here is my GitHub Contributions Activity meter:
![223dfd1297e0d74939fb9e1da79ae375.png](https://i.imgur.com/V4BF2vg.png)
Let's Go!!!!

## Recap and Wrestling with AWS
So like I mentioned in one of my earlier posts, I wanted to add a comment section to my blog posts. There were a few React-specific options that looked interesting, but in sticking with the 100 days of coding challenge, I wanted to try and write something myself!

This is the basic diagram of what I'm trying to get done:
![948c411def16b0a2c9123397d55f7e58.png](https://i.imgur.com/AfNrgOF.png)After spending a good bit of time setting up the react side of things, I had a working prototype that relied on a test JSON server running in localhost (here are some of the dumb test comments):
![5e398683e0e7a82f6c2b0cf7365b68e7.png](https://i.imgur.com/geHgXYH.png)Here they are on the actual post!
![95f8da459ed440f56e367db64c32917f.png](https://i.imgur.com/oXFFQmz.png)
So with the relatively easy part taken care of, I needed to get some AWS resources set up!
I started with the DynamoDB table, since I knew everything was eventually going to lead to there. Right off the bat things were a little tricky for me, because while I've worked with relational databases in MySQL and Microsoft SQL Server loads, I've never worked with NoSQL. So I had to create, destroy, and recreate tables a good couple of times before I got something put together that I liked. Here are the basic components of the table
* postID: The blog post that the comment will be attached to.
* comment_id: random string of unique characters to mark that individual comment as unique.
* author: Just a string for how the commenter wants to be named
* text: The actual comment
* post_date: when the comment was submitted

Once I had the table setup, I needed a Lambda function to interact with the table. I had messed around with Lambda functions a little bit in my previous life as a software developer, but I had never started from scratch on one, so needless to say I was a little lost at first! I also ran into a ton of problems getting the QueryCommand provided by the AWS SDK to interact with my dynamo table without **a lot** of testing and errors and swearing. After completely restarting with new tables and functions a couple of times though, I finally had a Lambda function that would return DynamoDB items without too much fuss!

## API Gateway
Initially setting up the API Gateways was actually pretty easy, I really like how AWS has the different stages setup and how to change request methods in how they are routed. I was able to setup GET and POST requests pretty easily and have them routed to the correct Lambda functions. Probably the most difficult piece of this whole project for me though was wrestling with how data is passed from the API Gateway to a Lambda function, and then getting the Lambda function to actually recognize that data. I had plenty of documentation to reference, and everything looked fine from testing on the Lambda side, but then I'd pass a new request body in the API Gateway side, and nothing would show up!

This annoyingly took me a couple of different coding sessions to finally get working, and I'm still a little afraid to touch anything in that POST lambda for fear of breaking it, but it's working!!!

![612b18e95a1dca105aaae9a55950559c.png](https://i.imgur.com/G5UJC9y.png)
## Putting it all together
The last piece was replacing the dummy JSON server that ran locally when I was putting together the react components with this new API endpoint. Most of that was actually trivially easy, just replacing some URLs, and then a little bit of troubleshooting when I had changed my post ID parameter from "postID" to "post_id". That, and playing with CORs headers for about an hour, and then I had the whole thing working!
![0e7e0a87e056ecd8de4d584616352cf8.png](https://i.imgur.com/60dFX9i.png)
It's still very much in an early mode, and I'll probably have to add more in terms of authentication, and flagging comments for approvals. But for right now, I set out to build components (in a serverless manner) to support comments, and I finally have something up and running!

The next day or two of my coding challenge I'll probably be cleaning up odds and ends from this, but hopefully soon I can move on to something new!!

Thanks for following, and we'll see you on the next one!







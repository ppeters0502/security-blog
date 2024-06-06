---
id: 21
title: 100 Days of Code - Day Eight
publishedDate: 06/05/2024
featureImage: https://i.imgur.com/nzCi8zqh.png
tags:
  - 100_days
---
## Intro
Hello internet!
Making progress with code, feeling better about my place in the world, and I even had an idea for a potential new project! Let's get into it!

For the obligatory recap, as mentioned in my original post [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

Let's goooooo!!

## What are we doing today?
I spent a good bit of time in AWS today trying to piece together API Gateway, Lambda functions and DynamoDB. At one point I pretty much had to start over with a new API instance, new Lambda Function and new DynamoDB table. I finally got the GET requests working solidly though, to where now I can make a request to my new API endpoint, it connects through to a Lambda integration, which scans the DynamoDB table and returns the results.

![58a4021dfdc08f318299175bf92dc535.png](https://i.imgur.com/nzCi8zq.png)
The function itself is pretty straightforward, for now, just scanning the table and bringing back comments. I'll eventually update this to a query so that I can pass in filter parameters, but after wrestling with this function for a couple of hours today, I threw in the towel and just kept this to a scan (NoSQL doesn't like me)
![f6dbd97b4e2c1f6ae4408aeaf0472d0f.png](https://i.imgur.com/yil3f24.png)
So with that taken care of, now I just have to integrate the blog site with this serverless setup, and we should be in business!

## Possible new project idea
I had to stop myself from getting started on a new project idea I had, since I've already sunk a good bit of time into these comment sections and I want to get them finished. 

As part of my job, I have to perform security reviews of libraries, packages and tools that are open source. Part of the review is generating a Software Bill of Materials (SBOM) out of the project and scan all of the listed dependencies for any known vulnerabilities.

Thankfully, GitHub has now rolled out a feature that enables any public repository to export an SPDX formatted SBOM, which certainly makes my job easier!!

So I think for a possible new project I'm going to work on some sort of CRUD system for storing different open source project repo URLs, and then at pre-determined intervals, it calls GitHub for that project to download an updated SBOM, and then scan it for vulnerabilities.

Not exactly the sexiest of projects, but I think it's something that should definitely keep me busy for a while!

Welp, that wraps up this post though. Hopefully tomorrow we'll have a fully functioning comment section wrapped up!
See you on the next one!
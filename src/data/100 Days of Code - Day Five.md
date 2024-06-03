---
id: 18
title: 100 Days of Code - Day Five
publishedDate: 06/02/2024
featureImage: https://i.imgur.com/mNjTQWuh.png
tags:
  - 100_days
---
## Intro
Hello Internet!
Time to wrap up this first weekend of coding everyday!

For the obligatory recap, as mentioned in my original post [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

For Day Five, here is my GitHub Contributions Activity meter:
![e85881768987e366dbaaefa8f356137f.png](https://i.imgur.com/CmUxdge.png)

## What are we doing today?
I'm still working on a comment section to be able to add to all of my blog posts in the future. Yesterday most of my day was focused on the network side of things, setting up new services in AWS and giving myself a headache. Partly because I'm tired, and partly because I don't have that much time, I'm instead focusing on the design of the comments today!

After adding some sample data, here is what I have for some formatting:
![1db568ab4e1c45e4bc5a97e4224aa0d4.png](https://i.imgur.com/mNjTQWu.png)

## json-server
I had some test blob data while working through how I wanted comments to look, but I still have to write up the actual service in my app that sends out an API request and processes responses. Since I'm staying away from AWS today, and don't want to get sucked into getting my API Gateway up and running, I'm just going to keep testing with dummy data.

Thankfully there's a really great NPM package, [json-server](https://www.npmjs.com/package/json-server), where I'm able to setup a local "server" that returns fake data with a real localhost endpoint!

So after installing that package, all I have to do is run the command to start the local server
`npx json-server --port 3001 --watch ./src/comments.json`
and then if I navigate to "http://localhost:3001/data" I see the following:
![10a232733ea75ecedfcd30bee1b6e81e.png](https://i.imgur.com/qxJd8JF.png)
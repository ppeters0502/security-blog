---
id: 26
title: 100 Days of Code - Day Fourteen and Fifteen
publishedDate: 06/20/2024
featureImage: https://i.imgur.com/fkTzVX4h.png
tags:
  - 100_days
---
## Intro
Hello Internet!

I made a little bit of progress yesterday, but was wrestling with Docker and .NET for a little while, and didn't get a post written up in time. So this post is a combination post from yesterday and today!

For the obligatory recap, as mentioned in my [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

Here is a screenshot of my current progress:
![f5fb190530c1993960387575281f4b27.png](https://i.imgur.com/lp9DnZy.png)
## Chess Backend
So after debating on what language and framework I wanted to use for the backend side of my chess engine, I decided to stick with what I know best and use C#. To be more specific, for right now it's a .NET Web API solution that is hosted and deployed via docker and acts as an API to the chess UI elements we already have going on.

It's a bit convoluted, but here's the dockerfile for that setup:
![50a00ad85577fb46dc7375e75a9ad028.png](https://i.imgur.com/OiKeMyZ.png)
Along with that I setup a new docker-compose file to stand the UI container and API container in the same network. I'm not sure if this is it's final form, but this is what I have so far in my docker-compose file:
![97c50c21fe0da0d680f5239fd5185434.png](https://i.imgur.com/KpjvjtH.png)
## Holy Cors Batman
After setting up the docker-compose setup, I wanted to test and make sure that the UI could take to the API. So I setup a JS function to send a GET request to "/chess" and setup an API endpoint at "/chess" to return "Hello World!"
Functionally it looks like it's working, but unfortunately I'm having problems with Cors headers:
![a8598ecfbb7ebd5d10c231bfebeb9afb.png](https://i.imgur.com/fkTzVX4.png)
I've been doing a little bit of digging into Cors headers in .NET Web API, but unfortunately nothing is working yet. I'm going to have to leave it here for now :(

Bit of a short post to cover a lot of work done so far, but I've had to do and redo a lot over the past couple of days. Hopefully, once I figure out the Cors issues, I can start setting up actual API endpoints and making some progress with that Chess backend!

Thanks, we'll see you on the next one!


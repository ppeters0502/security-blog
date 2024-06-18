---
id: 25
title: 100 Days of Code - Day Thirteen (or fourteen fifteen or whatever)
publishedDate: 06/17/2024
featureImage: https://i.imgur.com/KJMDnr9.gif
tags:
  - 100_days
---
## Intro
Hello Internet!

I'm not gonna lie, keeping this up over the weekends with two young kids and family obligations is getting tricky!

For the obligatory recap, as mentioned in my [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

Here is where I'm currently at:
![f91f1b30413d42f9815a3d6f0d0777ce.png](https://i.imgur.com/s0cVilz.png)
## What are we doing today?
Hopefully today I want to have the chessboard at least displaying on a webpage, and then I can start putting together a backend.

For development purposes, I'm using Docker to setup nginx and host the webpage on my localhost, so I first set up a Dockerfile with nginx to serve up a basic html page.

![735e52b48e5032bbb8be4a567487d42d.png](https://i.imgur.com/uR1nYFG.png)
## Chessboard.js
After getting a basic html page to come up, I downloaded the files for [Chessboard.js](https://chessboardjs.com/) and added the correct imports. It's barebones, but here is what's there for now:
![cc6e40c0305c1063fef65eff9f033dd3.png](https://i.imgur.com/jWr05ij.png)
Rebuild the image, run a container, and now: 
![444aa2f8e8cf94418ea001e9f090d636.png](https://i.imgur.com/PFriYci.png)the chessboard is here!

Unfortunately right now none of the pieces are movable, since there aren't any JS event handlers setup yet, so I have some work to do in order to get the pieces moving.

After looking at some of the example code that's on the chessboard.js site, I find one for clearing and setting the board. It's pretty much the same thing I had earlier, but with two extra buttons:
![33cd397b555ef27dfaa8b5a486bd2ff8.png](https://i.imgur.com/6KGfYtu.png)
And a little bit of JS to handle clearing and creating the board:
![a7a929f9dbad906f420c7b3cf9edfe15.png](https://i.imgur.com/YK0nSCG.png)
After adding this, I refresh the page and
![chessboard_move.gif](https://i.imgur.com/KJMDnr9.gif)we can move pieces now!!
It's still super basic, but I think I'm going to leave that for now. Tomorrow I'm going to start digging into the chessboard.js API so that I can (hopefully) start setting up a back end that can work with the board.

We'll see you on the next one!

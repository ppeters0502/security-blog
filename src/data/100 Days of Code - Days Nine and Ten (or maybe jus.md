---
id: 22
title: 100 Days of Code - Day Nine and Ten (or maybe just nine)
publishedDate: 06/10/2024
featureImage: https://i.imgur.com/Z5TnG8Kh.png
tags:
  - 100_days
---

## Note before Intro
This post is actually combined from multiple days. My apologies if it's a little hard to follow.

## Intro
Hello Internet!
This post is combining days nine and ten for reasons I'll get into later.

For the obligatory recap, as mentioned in my original post [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

Here's my progress so far:
![8f9479eccfdd8b1976be9afd1e4a7a07.png](https://i.imgur.com/joQm45R.png)Let's goooooo!!

## What are we doing today (or a couple of days ago for day nine)
So I made a bit of a goof last night. I spent a little bit of time in AWS yesterday tweaking the Lambda I have made to use DynamoDB Queries based off of the post ID, rather than doing a scan and returning all of the items in the table. Eventually I had to redo the DynamoDB table to change the partition key (I'm really bad with NoSQL, I keep wanting to make everything a relational database!), but I have it working great! Now I pass in a specific postID to grab comments from, and I only get comments tied to that post!

![fa5ecd65e8c2a5028fcc72cdef004a22.png](https://i.imgur.com/Z5TnG8K.png)
My goof was that all of this work was in AWS, so I didn't have any code to contribute on the actual blog yesterday, and I fell asleep on my couch when I was supposed to be typing up this blog post. So unfortunately my GitHub profile is going to show I did nothing yesterday, but you're just going to have to take my word for it that I got work done yesterday!


So today is two pieces, getting the new API integrated into my actual blog, and getting the POST setup correctly so that I can create comments from something other than then AWS console!


## Had to pause for a bit
So unfortunately I had some family issues come up over the weekend, and I actually had to take a break from this challenge for a couple days. Everythings ok now, but unfortunately over the weekend coding and this challenge were one of the last things on my mind, so my apologies for the unscheduled break!

So obviously this goes against the purpose of the challenge, but I still want to keep up with posting progress! So I'm going to pretend that the two weekend days where I was away didn't happen, and I'm really just on day nine.


Anyways, I have the GET comments Lambda working great, but am still working through the post. I'll have more updates tomorrow!



## Updates from tomorrow
Ok, I'm currently working on the blog post for today, but I think I'm going to run out of time before it hits midnight, and I want to keep my streak going, so here's a quick update. I now have the GET request for my comments in the app linked to my aws environment and working like a charm!!!
I'm currently wrestling with the CORS headers on the post request, but I think I finally have everything else figured out with this one! 
Again, I'll have more info in my next post!





---
id: 17
title: 100 Days of Code - Day Four
publishedDate: 06/01/2024
featureImage: https://i.imgur.com/08KzgMSh.png
tags:
  - 100_days
---
## Intro
Hello Internet!
And now for another glorious day of coding!

For the obligatory recap, as mentioned in my original post [original post](https://screamintothevoid.today/blog/13) I'm working on a challenge to spend at least an hour writing code every day for the next 100 Days! Here are the rules I'm setting myself:
* Code minimum an hour every day for the next 100 days.
* Post my progress every day on my blog.

For Day Four, here is my GitHub Contributions Activity meter:
![07a55b04e8afbcd255cf98364d6fb872.png](https://i.imgur.com/JP4aBu7.png)Let's get to it!

## What are we doing today?
Continuing the idea from my [post yesterday](https://screamintothevoid.today/blog/16), I'm working on adding a comment section to my blog posts. I'll be using AWS, which leads me to what I'm doing today.

## AWS
So I've been using AWS for about 7 years now, and feel (for the most part) pretty comfortable in this cloud provider. I've never really had a lot of experience with Lambda functions though, so I'm looking forward to diving in more on this part and setting up a new Lambda function!

I used a couple of different tutorials that were provided by AWS, including their [WildRydes SPA tutorial](https://aws.amazon.com/getting-started/hands-on/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/) and their [using Lambda with API Gateway](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway-tutorial.html) tutorial. This is the basic diagram of what we're trying to setup:
![948c411def16b0a2c9123397d55f7e58.png](https://i.imgur.com/08KzgMS.png)
## Lambda
Here's some of the Lambda function I'm working with. It's absolute garbage right now, and is using a static element to test that it can pull from DynamoDB, but at least it's bringing in the items ok:
![8f96e82c4e669183cb38bb4aa498ad4c.png](https://i.imgur.com/GY2cbfb.png)

So this is kind of a weird day. I definitely got more than an hour of coding in, but all of my code is within Lambda functions and putting around AWS, so my commits are only going to be for this blog post. I'll have more to show tomorrow though!

See you in the next one!
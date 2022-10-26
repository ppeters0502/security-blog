---
id: 5
title: OWASP Web Security Testing Guide
description: Quick blurb about OWASP and pentesting
publishedDate: 10/26/2022
featureImage: https://i.imgur.com/fmUVKdeh.png
---

## Intro
Hello Internet!
My apologies for the gap between this post and my last post in August! I've been getting more active in fulltime work on pentesting, and some of that has been driving what I focus on when learning and practicing in security.

Because of this, my focus on the pentesting side has been mostly focused on web application testing. Case in point, OWASP!

![OWASP-Logo.png](https://i.imgur.com/fmUVKde.png)
## Web Security Testing Guide
I'm in a bit of a weird place right now with my experience. I've been studying cybersecurity formally for about 5 years, and have been doing walkthroughs, CTFs and the like for about maybe 2-3 years? However, this has all just been for personal growth, never anything in a professional context. No need to write up fancy reports, just iterate on whatever I find and keep going!

So now that I've started my first position as an Application Security Engineer, I'm finding that I'm woefully behind in formalizing how I walk through an application, and communicating any findings I have to higher-ups and stakeholders. Enter [OWASP!](https://owasp.org/)

If you haven't heard of the Open Web Application Security Project (OWASP), they are a foundation  that works to improve the security of software (literally their mission statement). They have several different projects within the umbrella of OWASP such as their OWASP Top Ten (list of the most common vulnerabilities as reported by OWASP), the OWASP Security Champions program, and, for the purposes of this post, the [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/).

![8b8f4d2d0de0c01942b3fb6431d91a0a.png](https://i.imgur.com/k11qzq7.png)
This guide is pretty much exactly what I need, a formalized approach to performing a comprehensive analysis of a web app. I had heard of OWASP while in grad school, and reference the OWASP Top Ten pretty regularly in my day-to-day, but hadn't really ever used this guide until getting prompted by my boss to start integrating it into my everyday work. It's absolutely fantastic, and I finally feel like the random thoughts going through my head while looking at an app or site are in an actual organized, tactful approach! The guide spends some time outlining the software development lifecycle, different testing techniques that should be used, and then has a comprehensive Web Application Security Testing checklist broken up into the following categories:
* Information Gathering
* Configuration and Deployment Management Testing
* Identity Management Testing
* Authentication Testing
* Authorization Testing
* Session Management Testing
* Input Validation Testing
* Testing for Error Handling
* Testing for Weak Cryptography
* Business Logic Testing
* Client-side Testing
* API Testing

There's alos several appendices of some additional suggested reading, testing tools, history and more!

I'm currently working off of a spreadsheet adapted from the guide that was posted on github by [tanprathan](https://github.com/tanprathan/OWASP-Testing-Checklist). This is the same checklist, but with additional options for feedback and status checks so that it's easy to keep track of what more needs to be done on a given app that I'm testing.

![b56f1a3f52b8970fe455cb2bcc3722bf.png](https://i.imgur.com/oxc6GKX.png)
Welp, that's pretty much it for now. Bit of a short post, but this guide (and corresponding github checklist) have been so helpful for me the past few weeks that I couldn't help but write about it!
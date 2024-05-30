---
id: 4
title: CTF Walkthroughs - Agent T
description: My walkthrough of the Agent T room in TryHackMe.com
publishedDate: 08/08/2022
featureImage: https://i.imgur.com/hA5fy8jh.png
tags:
  - ctf_walkthroughs
---

## Intro
Hello Internet!
After making some small improvements to my site, and taking a few days off of security stuff, I thought it might be a good idea to get back into working on another walkthrough. Soon I'll be publishing a walkthrough on some HackTheBox boxes, but I'm still working through a few modules out of [TryHackMe.com](tryhackme.com), so I thought I'd stick to another TryHackMe room.
This writeup is a quick walkthrough on the [Agent T Room](https://tryhackme.com/room/agentt) created by [ben](https://tryhackme.com/p/ben), [JohnHammond](https://tryhackme.com/p/JohnHammond), [cmnatic](https://tryhackme.com/p/cmnatic), [blacknote](https://tryhackme.com/p/blacknote) and [timtaylor](https://tryhackme.com/p/timtaylor)

## Recon
I start things off with a quick nmap scan to see what's open and what's closed (replace the IP address in the command with the IP of your vulnerable machine)

`nmap -sC -sV 10.10.10.10`

Here's what we got:
![f87db52074d41ef475e9e9a0a6b465a6.png](https://i.imgur.com/wavMZFe.png)
Ok, nothing really open except port 80, so off to our web browser!
I navigate to http://IP_ADDRESS and here's what I see:
![1cd61ddf4f683c1e4c13c3b9d0e0142c.png](https://i.imgur.com/hA5fy8j.png)
### Brief Aside
So this admin page I actually know. In a previous life, before I was in cybersecurity, I was a .NET developer, and also made websites in my free time. For front-end work, I was never super great with CSS and styling, so I relied a lot on frameworks and the like. Anyways, one of the primary frameworks I used a lot was Bootstrap. You can find bootstrap templates all over the dang place, and one of the sites I used a ton for templates was [startbootstrap](https://startbootstrap.com).

One time I had to make an admin screen for users to navigate to a really basic user creation page, and low and behold, start bootstrap had a template I could work with! I'm pretty sure this exact template was the base level template I used as well, so it was kind of funny to see that in this context! Bit of a blast from the past.

### GET ON WITH IT
So anyways, I run gobuster with SecList's common.txt to try and find some directories, but I'm getting nothing. Like, less than nothing, either I'm not formatting my gobuster wordlist correctly, or I'm doing something else wrong.
![8cba41b119f3b82ac9eef6837bee19a8.png](https://i.imgur.com/DhUbmNt.png)
With that in mind, I go back to the browser, and start looking at the different tabs in developer tools to see if there's anything that stands out. Whenever I'm stuck for a bit I always like going back to basics, and to me nothing is more back to basics than the dev tools!
On the network tab, there's something interesting that keeps coming up in the response that might lead somewhere. The response to the main GET request has this extra header that seems a little wonky.
![c72ef2e9e16d5deebad03fee9014ec35.png](https://i.imgur.com/HoA9XB5.png)
OK, so looks like our vulnerable site is using PHP somewhere on the backend, and that seems a little concerning that it looks like it's some sort of Dev version of a PHP version. A quick search on exploit-db, and looks like we have a possible vulnerability! 
![6ec66688f73444fe2ac78f14825406b5.png](https://i.imgur.com/X6icY4N.png)

## Exploit
A temporary version of 8.1.0 was released for PHP that contained a vulnerability related to the User-Agent header that's sent in the request headers. Thankfully, this vulnerability even has a pre-built exploit on exploit-db ready to go! So I go ahead and download the exploit file (49933.py) and go ahead and run the exploit script:

`python 49933.py`

Wow, that was quick, we now have shell access!
![f500025011c0b69b25a04fc42eee55aa.png](https://i.imgur.com/8DOOlje.png)Oh dang, this was running as root, that's not good! Guess we don't have to escalate any privileges to find the flag!
Ok, I just have to do some searching for the flag. I'll skip the 20 minutes or so where I tried some unsuccessful grepping, this reverse shell wasn't super stable and I had to reconnect multiple times...

In the end, I just navigated to the top of the directory and ran ls, and was able to find the flag!

`cd ../../../../; ls -al`
![a29f19f9dd8a8c80c0a54a5c564419c7.png](https://i.imgur.com/AYlRvDX.png)
Run a quick cat to print it out, and we're golden!

`cd ../../../../; cat flag.txt`
![438e89c4f667b25779d8c8ab70097dde.png](https://i.imgur.com/A0ROazB.png)

## Conclusion
This room was rather small, only 1 vulnerability to exploit and one flag to find, but it made for a fun-filled couple hours! Seeing that dashboard made for a bit of a blast from the past as well... Main takeaway I had from this is you always want to trust your gut if things don't quite look right! Hope you enjoyed my (rather brief) walkthrough. Have a great day!

---
id: 3
title: CTF Walkthroughs - Pickle Rick
description: My first walkthrough on one of the beginner TryHackMe rooms, Pickle Rick
publishedDate: 07/15/2022
featureImage: https://i.imgur.com/3OXdZjmh.png
---

## Intro

This is my write up for the Pickle Rick room on tryhackme.com

## Recon

I start off with a quick nmap scan to get things off the ground
`nmap -sC -sV 10.10.204.14`

Looks like Apache is running on the box (possible vulnerable version?) and an SSH server is running on the box:
![dc29298f7da69ffcaf69f2e1c68ab197.png](https://i.imgur.com/KrYmk4vh.png)

I check up on the server via browser, and there's a home page to help Rick get 3 ingredients to turn him back from a pickle to a man:
![5a1bb33c34fae59bad8924bfc59698f2.png](https://i.imgur.com/3OXdZjmh.png)

If you check the page source on the index page, there's a comment that leaks the username
![3f5d6b108bdabc270130533a00e868e5.png](https://i.imgur.com/oMzjCk8h.png)

I run gobuster to look for some possible directories, and the only one I'm finding so far is /assets, which just brings up a directory of files
![54394aa6629f7e24fc2d727baa8f3bb1.png](https://i.imgur.com/ONccrc6h.png)

I also check the robots.txt and the only entry is
"Wubbalubbadubdub"

After looking around a bit more, I try nikto to see if there's anything that comes up that was missed by nmap and gobuster.

There's another link missed by gobuster, a login.php:
![fbb1d3cd13dc76c159a184ccbbc917b1.png](https://i.imgur.com/fYYSxUfh.png)

You go to the /login.php, and there's an admin login form:
![c592af50565bf65b0cb09fc026c9ee54.png](https://i.imgur.com/SVVNjnFh.png)

## Testing login and Enumeration

We now have a login page, a leaked username, so we can start checking passwords. I'm thinking the robots.txt entry might have been a possible password, so I try the username password combo, and I'm able to get into the admin side!

![5f37b4b981ae6f7018a040d0b06acd0c.png](https://i.imgur.com/V7o2OkDh.png)

There's a text box for a "Command Panel", so I try entering "ls" to see if it responds to any system commands. I can now see some of the files visible from where the commands panel is looking:

![6d3c4a96e4cf75fd23c4b3ea53ff60ad.png](https://i.imgur.com/bVghgbvh.png)

Looks like one of the files has the ingredients I'm looking for, Sup3rS3cretPickl3Ingred.txt!

I try running "cat Sup3rS3cretPickl3Ingred.txt" into the command panel, but looks like the cat command is disabled through the panel:
![e8d757686fcb80d9b4cc04f8728a280f.png](https://i.imgur.com/4rWsLJ4h.png)

From looking at some of the other files (robots.txt, login.php index.html), it looks like the command panel is running under the same directory as the rest of the sitefiles, so I should be able to browse through the rest of the files with the file browser!

Let's try with Sup3rS3cretPickl3Ingred.txt
![06a51926bfc8f4ea8e056f38b2dcdb15.png](https://i.imgur.com/yAFmtvzh.png)

First flag found!

## Second Flag

Ok, with the first flag done, let's look around in the portal a little more.
When you're logged in with the username that was stored in the index.html page, there are some extra menu links (Commands, Potions, Beth's Clone Notes, etc.), but the links in the menu are all setup to go directly to denied.php. This is making me think there's an additional login, and on the login page, a flag gets set on whether you're the "real rick" or not.

I check the page source on portal.php, and there's a base64 encoded string in the comments:
![78817bb3fd22093671a0a102596cffd9.png](https://i.imgur.com/Rj5NE5Jh.png)

I check through to see if I decode this string, but I'm not finding anything. Then for a moment I thought that it might be an SSH key, since theres an SSH service running on this box, and when I tried to SSH I needed a key. Unfortunately, after saving the text to a key file and trying to ssh in, I still ran into the same issues, whether trying to log in as root or ubuntu.

I'm thinking this must be some sort of session Id or something, but unfortunately I'm just not really getting anywhere with this string of text. I'll come back to this later.

Moving back to the command center, it looks like other than cat and a few other commands, I can pretty much run anything in here and view the results. Lets see if I can chain multiple commands together and do some directory traversal. I'm going to try to see if I can go to the main directory

`cd ../../../../; ls -al`

technically I could run this as one command (ls ../../../../) but this killed two birds with one stone! Running this in the Command Panel brings me here:
![73448b598f63238bf49de615b3a6cc6a.png](https://i.imgur.com/T8XXYOnh.png)

Looks like I have access to the home folder, maybe I can see if there's another user that has additional info

`cd /home; ls -al`
![df4d4766464509e1266fdaf40496d214.png](https://i.imgur.com/yvVhQd9h.png)

Ahhh, there's a rick user! Lets see if there's anything the rick user has that would come in handy!

`ls -al /home/rick`
![d3d6f97cd62e669a4ea3b698ca8f7008.png](https://i.imgur.com/neTxF8Rh.png)
Second ingredients!

Normally I would just run `cat "/home/rick/second ingredients"` and call it a day, but the cat command is being blocked by the panel....

I messed around with echo for a little while seeing if I could echo the contents of the file, but I had completely forgotten about less! The less command lets you page through a text file and displays a screenful of text at a time. Lets give it a try!

`less /home/rick/"second ingredients"`

You have to add the double quotes around the filename so that the text file is recognized as having a space in the filename.
![e6d572620fab3927ad002630c1a70586.png](https://i.imgur.com/F1g4WA0h.png)
I blanked out the answer, but this did the trick! Now onto the third ingredient

## Third Flag

After finding this flag, I was starting to think that I should try once more to SSH into the box to see if there's anything I might be missing. I tried the same trick with using the string of characters in the comments I had found earlier as a key, but using the rick username. Unfortunately I still could not SSH into the box, so I think the string of text in the page source was some sort of dead end.

After realizing I could use the less command, I started playing around with this for a little while to see if I could find any logic gaps in some of the php files. The returned results are a little ugly, but the page source still works!
Here's the body of login.php
![0a2f98e47cd6c58ae4e70f3cf4417211.png](https://i.imgur.com/3MtgQ9Th.png)
So from looking at this, you can see that the login page only looks for the username and password we used, so my earlier theory of there being some sort of superadmin user login to get to this page with different permissions doesn't look right.

Here's the body of portal.php:
![593bf4f5ddeb415112965df269ce7615.png](https://i.imgur.com/Rj5NE5Jh.png)
You can see that the panel checks to make sure you aren't using cat, head, more, tail, nano, vim, or vi, which is how we were able to use less!

At this point, I noticed there weren't any restrictions I could see as far as trying to run commands as root (sudo)

I double checked what user the command panel ran under, to see if there was something different
![e930521aca43a2f031f05838cd6f06f2.png](https://i.imgur.com/jORcH4Lh.png)

When doing this though, I noticed that I was able to run this same command prepended with sudo and my user had sudo privileges!

![a2d5d6623ac7fb28650f2c875f3904f8.png](https://i.imgur.com/cZNQztWh.png)

Thinking this through, that means as long as I avoid the commands the panel checked, I could pretty much run any command or look anywhere on the box I wanted!

With this in mind, I immediately went over to /root, to see if there was anything there.

`sudo ls /root`
![0349b05f9b1316b93a34524b4759a459.png](https://i.imgur.com/v2pvtMgh.png)

There's our third ingredient, just time to print this out, and we're all wrapped up!
`sudo less /root/3rd.txt`
![6a6acc62433bea2d07a2a592eed9637a.png](https://i.imgur.com/r3ZFZVih.png)

All Set!!

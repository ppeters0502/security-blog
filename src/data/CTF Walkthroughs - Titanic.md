---
id: 28
title: CTF Walkthroughs - Titanic
publishedDate: 2025-06-05
featureImage: https://i.imgur.com/mw5mrq5h.png
tags:
  - ctf_walkthroughs
---

---

id: 27
title: Where things are at right now
publishedDate: 11/14/2024
featureImage: https://i.imgur.com/Lw2Lk8Fh.png
tags:

- misc.

---

## Intro

Hello Internet!
So once again it's been a couple months of radio silence, my apologies for that.

A couple of updates, I got a new job!
My new job is still in Application Security, but there's a renewed focus on training and obtaining certs. The newhire training here is basically just going through the CompTIA Security+ training guides, so I might just end up taking that cert exam when I'm finished with newhire! Their cloud environment is all Azure though, so unfortunately the studying I did for AWS isn't really going to go anywhere (at least at the new gig). Oh well!

In other news, I got to see firsthand what happens when I don't spend as much time working through CTFs and pentesting in my free time at this years KernelCon!

[Insert picture of badge from KernelCon]

This year I went to KernelCon with a few of my coworkers from my previous job and spent the entire week there at workshops, the different villages, talks, and their CTF tournament! Unfortunately, I'm apparently very rusty at these types of events since I haven't really done any serious CTFs or pentesting (outside of my job) for over a year, and I was a bit of deadweight on my team, not getting any flags whatsoever :(.

Yep. No flags......

Sooooooooo between that and picking back up on the cert train at my new job, I figured I should probably dust off my keyboard and start seriously getting back into pentesting machines on HTB and TryHackMe! If I'm going to do that, I might as well start writing about it again too!! Hooray!

## Time to get back to it

Ok, starting off with what was listed in reviews as a very easy box on HackTheBox, I'm starting things off with Titanic!

![fab86e4eed22f93f7a64b3952694e1ae.png](https://i.imgur.com/TiDD9lx.png)

## Recon

Let's start things off by dusting off the threader script I used a few years back:
`python threader3000.py` (if you don't remember, you can find that script [here](https://github.com/dievus/threader3000))
Here are the results:
![0b12f7868b3d3f20f9e8f2f83f1f8a4a.png](https://i.imgur.com/UgXnnJD.png)Ok, so looks like ports 22 and 80 are open. I forgot to screenshot this the first time I ran threader3000, but the 1st time it was trying to redirect me to http://titanic.htb, so I added that to the hosts file on my attacker machine.
I open up a new browser, navigate to http://titanic.htb, and this is what I see
![99003df952bee97abfcd2109786adaee.png](https://i.imgur.com/mw5mrq5.png)Ok, after scrolling and poking around a little, it looks like none of the links really go anywhere, though there is a form at the bottom.
![8ab791dcaf75c686dc91b13c0b8ab897.png](https://i.imgur.com/VCaFdg2.png)I'll come back to that in a bit.

## GoBuster and forms

I decide to fire up gobuster to see if there are any directories that I don't know about
`gobuster dir -u http://titanic.htb -w /usr/share/wordlists/common.txt`
Here is what I see:
![880a3b865e779a5dd6808ada2cc61924.png](https://i.imgur.com/LomzXEA.png)Ok, we have three different endpoints, **/book**, **/download** and **/server-status**.
The server status page just returns page not found, nothing too interesting there. The /book endpoint doesn't allow GET commands either, I'm wondering if this is maybe tied to the form I found at the bottom earlier.
![6cae0f1785d0008be87453de656ea73a.png](https://i.imgur.com/tvX4ZrL.png)Ahhh, looks like both **/book** and **/download** are tied to this form! The **/book** endpoint is a form POST that takes the data you put in, and returns a 302 redirect to the download endpoint with a ticket parameter for a new JSON file that looks like a random string of characters. It automatically downloads the file, and after opening up the JSON file, it looks like it's just whatever I supplied in the form data. So with this type of setup, I'm already thinking the issue is probably either some type of SQL injection, some type of XSS, or possibly trying to find a different file (like through directory traversal).

## It was Directory Traversal

I tried a little bit of SQL injection jiggery-pokery, but didn't have too much luck. After thinking for a bit, I also realized that if the issue was XSS, there's no way you could really use it because what you put in isn't eventually printed on the screen (like reflected XSS).

After about 10 minutes of poking around with SQL injection though, I just kind of go for a hail mary, and try to bring up something that I know would be on the server if it's running some flavor of linux
![d33fe895357a8faef528870faba42195.png](https://i.imgur.com/C5nKfBm.png)Well that was quick! Looks like the issue is directory traversal!!
Ok, so the response that comes from a successful traversal is base64 encoded, so I bring up cyberchef, and here we go!
![828c6eacc546bb4415f405d6a9f54f0c.png](https://i.imgur.com/o3HmWtK.png)
After digging through everything listed in the passwd file, it looks like the only other user I could see who has a home directory and doesn't have the link to /nologin is developer:
![b1946eeb6492f8301a0243386ff95b43.png](https://i.imgur.com/XISYZPM.png)I'm thinking that's probably who we're going to end up logging in as initially, but I'll keep an open mind!
If you're trying to speedrun along at home, and have done HTB machines before, the user flag is almost always in a text file "user.txt". You'll still have to do all of the steps to get to the root flag, but I was able to grab the user flag just with this directory traversal, the flag was at http://titanic.htb/download?ticket=../../../../home/developer/user.txt
![387dcd1b3002f49d00436381dc02017b.png](https://i.imgur.com/R5vQ7cu.png)

## Gitea and the Initial Foothold

Ok, what else can we pull up file wise? Let's try the hosts file, maybe there's something else running on here:
![c14a372b0c7d68731211ca3d3a174fa1.png](https://i.imgur.com/q7epaYY.png)Put that through cyberchef, and here is what we find:
![ff5bfc6311cf82fb26dc6cc5984a64de.png](https://i.imgur.com/gmTP4lb.png)Ooooh interesting, looks like there's a subdomain, dev.titanic.htb!
So I add that that to my hosts file as well, and here's what I find:
![e19a5d09c25ad944fc216a94ae58b275.png](https://i.imgur.com/ZIMLso5.png)Interesting, it's a whole set of repositories with gitea! I'll be honest I've never even heard of gitea (I always thought the self-hosted types used gitlab, but I guess there's this too!), but let's see what's there!
![12842e1ef79ce9e24dfc58c7a731466e.png](https://i.imgur.com/j9nsKWl.png)Ok, there's two repositories, **docker-config** and **flask-app**, and they're both under the org/user **developer** (which fits what we saw earlier with the developer user on /etc/passwds).
I start off with the flask app, and this looks exactly like what we had encountered with the Titanic website, looks like it's a flask app of some sort. Here's part of the app.py:
![37d1149126f2c1e5418f2df3239075d0.png](https://i.imgur.com/Zi7sISB.png)Eventually if you keep scrolling you can actually find the exact directory traversal issue:
![70cc3bc604361f891e5fa846afe122fa.png](https://i.imgur.com/OCghapB.png)Welp, there's yer problem! No validation, just takes the passed in path, checks that it exists, and runs to send a copy of that file!

Not sure if this is relevant, but in the **/tickets** directory of the repo, there are two premade tickets, here's one:
![bf64bfe95f52b5510343c9b515b2953a.png](https://i.imgur.com/wmDwS8B.png)Aaaannnd the other:
![abdce0eaf1f71787587e20ae5d7571b5.png](https://i.imgur.com/Ett7l19.png)Someone's quite the James Cameron fan!

Not really finding much else of value, I start looking through the other repository, docker-config
There's two docker-compose files there, and when I check the one under the "gitea" folder, here's what I see:
![d4e7e0f20dd1105abe447837f0a0f64a.png](https://i.imgur.com/LpJEkjh.png)Oooooohhh a data folder, that looks good!

I'm not gonna lie, I was stuck at this point for a good while. In the other docker-compose file, I had recovered MySQL creds, which I was hoping would be useful for either SSH or remote MySQL access, but they were not. I also went so far as to register a new user, chuck, to see if I could inject a reverse shell script into the repo and call from the web app. I was also trying to download a bunch of different types of files in where I thought that data volume was set up (titanic.htb/download?ticket=../../../../home/developer/gitea/data/), but was running into problems for a couple of hours. Eventually I ended up finding a hint on the discussion board that mentioned there's an additional gitea folder that's created when docker starts up, so the location I was using needed one additional level (titanic.htb/download?ticket=../../../../home/developer/gitea/data/gitea) which was exactly what I needed!
A little more poking around and I was able to snag the SQLite DB file that gitea was running on!
(http://titanic.htb/download?ticket=../../../../home/developer/gitea/data/gitea/gitea.db)
![d5108c5f92b56e675325e3bb13f85022.png](https://i.imgur.com/FgsdIaB.png)Ok, time to fire up SQLite!

## SQLite and hashcat

If I was doing like a full security review, I would've gone through absolutely everything in this DB file. Since I'm primarily hunting for creds to get onto the box, I dove straight into the table "users".
![86c375f80b2d51e5c87eb1992e34b870.png](https://i.imgur.com/BcGoJUA.png)Here is what I saw:
![fe115f5294966432a20d942fe158f19a.png](https://i.imgur.com/VU4JWx6.png)So at this point I was thinking if I can crack the hash for the developer account (or really any of the admin users) I could

1. Hope that the password is the same to SSH onto the box
2. If it's not the same, inject a reverse shell script into the repo and try to call the script from the directory traversal vuln or by docker deployment?

First I needed to actually crack the hash. From the screenshot above, you can see the hashing algorithm used was pbkdf2, which I had never heard of before. A bit of googling though, and I found a [blog post](https://www.unix-ninja.com/p/cracking_giteas_pbkdf2_password_hashes) outlining how to format this hash so that hashcat can work on it! They were even nice enough to write their own python script that does it [automatically](https://github.com/unix-ninja/hashcat/blob/master/tools/gitea2hashcat.py)!

So I first selected the data out of DBBrowser in the format that gitea2hashcat prefers (\<salt\>:\<hash\>)
![b33ef395adf7fb24f6076045b3af12a4.png](https://i.imgur.com/ga6mJHv.png)
Then I copied that data and put into the gitea2hashcat.py script I downloaded from my earlier link (the highlighted part is what the script outputs):
![55851659222e5b7538926b45adb79f0e.png](https://i.imgur.com/3I1Sjxw.png)
Lastly, I put this into a textfile "hashcat" and ran hashcat against it with rockyou.txt
![82325e11b875205a9581169d28717bf5.png](https://i.imgur.com/2xZGf8B.png)About 15 minutes later we got the password!
![b429d8d82166582e9546d1e64e89c706.png](https://i.imgur.com/1ALWjrw.png)
With fingers crossed, lets see if this works for SSH.....
![788f72134047712615ffde206ac3e5c3.png](https://i.imgur.com/gLfq9LO.png)Aaaaaannnd we're in!!
In case you didn't wanna speedrun the user flag and grab it from the directory traversal, the user flag was in /home/developer/user.txt. 1 flag down, 1 to go!!

## Privilege Escalation

Ok, I started with the usual "let's see if this guy can do anything sudo" check

`sudo -l`

![0ef7158c3c6287f33ac2dc05f0d6fce6.png](https://i.imgur.com/LNjHD1c.png)bupkus. Nothing!
Ok, what about files that have the SUID bit turned on perhaps?
`find / -type f -perm -04000 -ls 2>/dev/null`
![1c21ded87f2b3c7479347b54058f96ce.png](https://i.imgur.com/Kl27B42.png)I cross referenced everything that came up from /usr/bin against [GTFOBins](https://gtfobins.github.io/) and still get nowhere.

At this point, I'm really not sure what to do, almost every other time I've needed to do linux privilege escalation, I could normally find something relatively quickly. It doesn't help that I'm terrible at privilege escalation, I really never need to do this in my current or former role, so it's just really outside of my wheelhouse.
Let's just see what's currently running on the box.
`ps aux`
![4ef53cc5beea4b3b9755f78e5f7d636b.png](https://i.imgur.com/ByBFpEI.png)Ok, looks like the actual flask app is running inside the /opt directory, let's see if there's anything over there
`ls -al /opt/app`
![20b527b2d5c4fd937ab9675312567793.png](https://i.imgur.com/1QZ7Y74.png)Nope, that's just the app scripts, I was hoping there'd maybe be like a .env file or something not part of the repo. Maybe there's something outside of this folder.
`ls -al /opt`
![c0de8c6c46cb43626b1aa24a53142b3f.png](https://i.imgur.com/AbvMkcn.png)Hmmmm, what's that scripts folder about???
`ls -al /opt/scripts`
![589d9d6761741dc8f7eb24eaa6a17d37.png](https://i.imgur.com/DWX47lZ.png)Uhhhh, ok, that doesn't look normal, looks like it's owned by root as well...
Desperately hoping there's something in this stupid script, I open it up.
![501cd3eaca8ba8052466d259b5b06ff0.png](https://i.imgur.com/ylqqluH.png)It's a pretty short script, looks like it moves to a folder, finds all JPEG images, and then runs some magick command and sends it to metadata.log.

It took a bit of poking around to figure out magick is actually ImageMagick, a widely used image manipulation tool.
I don't think I've ever seen a TryHackMe or HTB machine that has ImageMagick on it, so I'm starting to wonder if this has anything to do with either getting a foothold some other way, or privilege escalation. Let's check out the version, maybe there's a CVE or something.
![37717b67e15f2a0615594ef635fa892f.png](https://i.imgur.com/1JT9VFS.png)![5838ba988072f73e201e1d908adc9642.png](https://i.imgur.com/oNeUxI9.png)Ahhh ok, maybe there's something there!
The next couple of hours were me trying to find devent PoC demonstrations of this to see if this was something I could possibly do, and then me failing spectacularly.
I found one other guy who wrote a [python script](https://github.com/Dxsk/CVE-2024-41817-poc) that generated an exploit file and loaded it for you, but I still wasn't having any luck with that. I also had zero luck with the delegates.xml piece of the exploit, unfortunately. Eventually it was thoroughly reading through the PoC section on the original [disclosure](https://github.com/ImageMagick/ImageMagick/security/advisories/GHSA-8rxc-922v-phg8) that finally got me moving in the right direction with the other piece of the exploit, the LD_LIBRARY_PATH. So his time I tried just writing out the exact PoC piece line by line for exploiting the LD_LIBRARY_PATH
![b6071c461f312379819421a8097771a1.png](https://i.imgur.com/nrIzD9W.png)Here's the result, still following that PoC:
![fe15bde64d8ee182a3af49a6eec12111.png](https://i.imgur.com/OhoWhW1.png)
Okkkkkk so I think I'm actually starting to get somewhere. That wonky shell script I found runs magick in that app folder, and the LD_LIBRARY_PATH seems to take place anytime the malicious bit of code is in the working directory that magick is called from. So I'm going to try doing the same whoami, but saving it in a file and see if it runs as root.
Here's the updated script:
![0320ec7b17f8a9c41855462ab05c97f7.png](https://i.imgur.com/AIZutYu.png)Let's put it in that folder referenced in the other script.
![803de25713ae7297bef3ef7f340448f5.png](https://i.imgur.com/uoG3To6.png)Woooohooooo that's spooky!!! So I'll be honest, I wasn't sure how I was going to get that script to run. It's owned by root, I tried to run it myself and got nowhere. I checked back in the directory a few minutes later though after digging through PS and running services (got nowhere), and BAM the text file was there! This script must run like every few minutes or something automatically, that's freaky!! And it successfully ran the exploit as root!!!!!!
Ok, I just have to change the exploit to do a reverse shell and then I think we should be wrapped!

Here's that same script, but with a reverse shell:
![1a16794c1bb58f1b110df555e2abbca3.png](https://i.imgur.com/91Z8U8T.png)To be on the safe side, I'm letting it sit for like 10 minutes before giving up and trying something else. Thankfully it looks like when magick runs, it removes the exploit script I generated, so at least I know if it ran.

I'm not sure what I was doing wrong, but while the whoami ran with no issues, I was having a hell of a time getting a reverse shell to start. I tried a couple of different flavors, with bash, and even netcat, but wasn't having any luck. I was very confident I was on the right path though, and at this point, I started looking at other people who had used this specific exploit, and I saw I wasn't calling bash with bash(?), so I changed up my script a little bit. Here it is:
![633ad742fd676c102f9657f6f71d26cf.png](https://i.imgur.com/CKHkt4T.png)Aaaaaaannnnnnddd.....
![4bc08699168f929486a0161b0b9c35ec.png](https://i.imgur.com/VXMFyI2.png)**BOOOMMMMM** I finally got the reverse shell!!!!

And the system flag?????
![a6fdc0ec9c5ffae58e8e1b509b2429df.png](https://i.imgur.com/6BagMuN.png)GOT IT!!!

Whew, first machine done in literally years!!
![688208cbb633fb35e039b366550c4873.png](https://i.imgur.com/9edMe0p.png)

## Conclusion

Overall I really enjoyed this machine! I struggled wayyy more than I'd like to admit with the privilege escalation (guess I should probably work on that a little more...), and it took me off and on a full 2 days before I had both flags. Overall though I'm happy with this being my first foray back into CTFs and walkthroughs!

Thanks for making it this far, and we'll see you on the next one!

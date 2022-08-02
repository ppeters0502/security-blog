---
id: 3
title: CTF Walkthroughs - Olympus
description: My walkthrough of the Olympus room in TryHackMe.com
publishedDate: 07/26/2022
featureImage: https://i.imgur.com/DpgtMWbh.png
---

## Intro
This is my writeup for the [Olympus Room](https://tryhackme.com/room/olympusroom) on [TryHackMe.com](https://tryhackme.com).
Most of the rooms I've done so far on TryHackMe were either part of a learning series, or they have a specific vulnerability that I'm trying to learn more about. This one came up on my TryHackMe dashboard as "Recently posted", and was the first one I've ever just dove in on with no prior knowledge.
I'll be honest, there weren't any writeups published when I started this one, but the room creator did post a Hints page that I had to reference a couple times when I was getting stuck. You'll see a little bit of that throughout this walkthrough. This room also took me a good while, and I had to stretch grabbing screenshots over 4 days, so you'll see some of the IP addresses change for the target machine and AttackBox machine. Alright, lets get started!


## Recon
I start off with a quick nmap scan of the target machine:
`nmap -sC -sV 10.10.93.124`

![34c9d7a07ade7edac10590b0a94605fb.png](https://i.imgur.com/H6OTiHD.png)
After seeing some of the error message in the title, I tried to navigate to http://10.10.93.124 and saw that it was trying to route to olympus.thm. So with that in mind, I updated the host file on my box to associate olympus.thm to 10.10.93.124. After doing that and then navigating to http://olympus.thm, I came across this:
![8fbe20fc0ff41bdd2c7ce9d2cf816dc0.png](https://i.imgur.com/DpgtMWb.png)
I then checked with gobuster to see what directories and paths were available based off my lists:

![2404e7a4399ba70ac290feb2290df5e6.png](https://i.imgur.com/IKpe6l4.png)
I spent some time going through these directories, but wasn't finding the other site that was mentioned on the home page. I tried a few other gobuster scans, and eventually had more luck with the SecLists common.txt file (this was also a hint in the Github page for this challenge, there haven't been any published walkthroughs on TryHackMe, but I used this hint after being stuck for a while)

So I used SecList's common.txt and got a few more interesting looking paths:
![fc2c52bc99b17abf197415483498720a.png](https://i.imgur.com/yg5vK1X.png)
This reminds me that I need to stop using the directory lists on the TryHackMe attackbox, how could it miss some of these???

Anyways, I went to http://olympus.thm/~webmaster, and was routed here:
![ab5f998b35cd9e1da8a795ad5e6c822f.png](https://i.imgur.com/mBHJctV.png)
There's kind of a lot to this page, there's a login form, a search form, some post links that all route to /post.php, so I'm thinking this is probably where I need to start digging

All of the post links take me to post.php with the post Id (so a post with the ID of 2 would be http://olympus.thm/~webmaster/post.php?post=2) These are all returning 404 not found errors though.

After checking the Page Source, I found some extra comments about how this was the "Simple Content Management System" by "Victor Alagwu"
![2fd942ff84512d6db9150eeb43fdcad9.png](https://i.imgur.com/li0Lz6v.png)
After a little bit of googling I found out this is an open source project called [Victor CMS](https://github.com/VictorAlagwu/CMSsite), and that there are multiple known vulnerabilities, including a SQL Injection attack in the [search function](https://www.exploit-db.com/exploits/48734)

With this in mind, I tried running a few of the queries in search.php that triggered alerts in the exploitdb proof of concept. When using the search "1337'union+select+1,2,version(),databases(),5,6,7,8,9,10%20--%20-" I was able to get a MySQL error:

![04a729dd270b9e02f5196d9b975468bf.png](https://i.imgur.com/94ZCAVY.png)
after playing around with this for a little while, I realized the databases() call in the query was causing the SQL exception (I later figured out it should be "database()" instead). So I swapped that out with 'this is a test' and you can now see the OS Version as the post title and "this is a test" as the author of a post in the results!

![3257e1173db665c853c4c4914d46d015.png](https://i.imgur.com/5HIpb3M.png)
## First Flag

Now that we found where our in-road (SQL injection wise) is, we need to try and figure out the schema, as far as the different databases, tables, and data structures. This first command prints out all of the different databases setup under information_schema. This is what I put into the search bar

`1337'union select 1,2,concat(schema_name),4,5,6,7,8,9,10 from information_schema.schemata-- -`
![464d93ff5816ad412a85436c4813170a.png](https://i.imgur.com/k8bZT46.png)
You can't quite see all of the databases, but here's what came back:
* mysql
* information_schema
* performance_schema
* sys
* phpmyadmin
* olympus

We already knew about olympus from our first SQLInjection attempt, and since that's named after the site, I'm thinking there's probably some relevant info there!

Now time to try and figure out the tables in olympus. Here's my search in the text box again

`1337'union select 1,2,concat(table_name),4,5,6,7,8,9,10 from information_schema.tables where table_schema="olympus"-- -`

![3c36fb0c2911962501a421e8e27cd709.png](https://i.imgur.com/E6dxcFl.png)
For tables in the olympus database, we have the following:
* categories
* chats
* comments
* flag
* posts
* users


Right off the bat I'm thinking our first flag is in that flag table, so lets see if we can get the columns for that table!

`1337'union select 1,2,concat(column_name),4,5,6,7,8,9,10 from information_schema.COLUMNS where table_name="flag"-- -`

![e56d04eb058b869bca9a92ddcde5f910.png](https://i.imgur.com/f6Rp93Y.png)
Well, not much to that table! Let's get that flag!!
`1337'union select 1,2,concat(flag),4,5,6,7,8,9,10 from olympus.flag -- -`

![ae23a66f0c7ca0dbf3de587f8195c16b.png](https://i.imgur.com/CpZL9Nn.png)
We have our first flag!!


## More poking around the database
There are a few more tables in olympus that I think are definitely worth looking into. After grabbing the flag, it's time to check out the users table to see if we can get into the admin side of this site.

First, lets see what columns are there:
`1337'union select 1,2,concat(column_name),4,5,6,7,8,9,10 from information_schema.COLUMNS where table_name="users"-- -`

![0fbfb001055e217138f2409fbaa53c7d.png](https://i.imgur.com/YktxaBb.png)There are quite a few columns on this table, here's everything:
* randsalt
* user_email
* user_firstname
* user_id
* user_image
* user_lastname
* user_name
* user_password
* user_role
* CURRENT_CONNECTIONS
* TOTAL_CONNECTIONS
* USER

Really the only columns in this I'm interested in are the user_name, password and user_email columns, so I'll concatenate them together to see if I can get them in one go:

`1337'union select 1,2,concat(user_name, ':', user_password, ' - ', user_email),4,5,6,7,8,9,10 from olympus.users-- -`

![0bb995562c9e75be7215f97406be3f35.png](https://i.imgur.com/nTsSU30.png)
It's a little hard to read on the screen, but I'm able to copy and paste. The emails I'm going to keep ahold of for now, and I'm going to try and crack the passwords using john the ripper
| user_name | user_password | user_email |
|:-----------:|:---------------:|:------------:|
| prometheus | $2y$10$YC6uoMwK9VpB5QL513vfLu1RV2sgBf01c0lzPHcz1qK2EArDvnj3C | prometheus@olympus.thm |
| root | $2y$10$lcs4XWc5yjVNsMb4CUBGJevEkIuWdZN3rsuKWHCc.FGtapBAfW.mK | root@chat.olympus.thm |
| zeus | $2y$10$cpJKDXh2wlAI5KlCsUaLCOnf0g5fiG0QSUS53zp/r0HMtaj6rT4lC | zeus@chat.olympus.thm |


I grab one of the hashes and load it into TunnelsUP.com's Hash Analyzer, to try and figure out what kind of hash it is.
![7b35427391db1dcf460efa1a586d6b79.png](https://i.imgur.com/m3oenC2.png)Looks like bcrypt!

You'll notice that in the email on users table, both root's and zeus' emails end in "@chat.olympus.thm". Is there a whole other subdomain we're missing???

First I remove the emails from my copy-pastes so that I can let John the Ripper do it's thing

`john --format=bcrypt --wordlist=/usr/share/wordlists/rockyou.txt user_hashes`

Using RockYou.txt ended up cracking one of the passwords (I redacted the actual password, but it's for prometheus)
![5a9f6206adac1cc9245d54697585755c.png](https://i.imgur.com/c6ODk0h.png)
## CMS Admin

Ok, so we have the credentials now! I go back to search.php, and in the login form I enter them. I'm then routed to the CMS Admin Page!
![ce496d82e3581fc6082ef676ac8e24dd.png](https://i.imgur.com/ju0GC8X.png)
For an admin page, there's not a ton to it. I browse around the posts, categories, users, and comments, not really finding much of any value.
I got a little excited when I saw this post, since I couldn't really get to the whole post from the non-admin side:
![5cca8dc70bf13551375565caa93458ca.png](https://i.imgur.com/UBgGPE8.png)
After going to this post though, there wasn't any information that seemed very useful:
![b388fa06d7ba209082f8e4ff0eb26c1e.png](https://i.imgur.com/TXM52SM.png)
From trying to edit one of the posts though, I notice there's a File Upload button. When doing recon and checking exploit-db, one of the vulnerabilities that was mentioned was an RCE vulnerability in the file uploads! This means we can try to upload scripts to get a reverse shell!

I first need to upload just a random file to see what directory it goes to. I just grab a text file and upload it while I have the dev-tools open:
![ebffefc8e83fdd68b9eb0e2c0500b18b.png](https://i.imgur.com/65A56Kz.png)Looks like as soon as you upload what's supposed to be a post image, it runs a GET request to where the file is stored. The fact that it returned a 403 is a little concerning to me though, let's see if I can get to that file manually.

![a3a0e6aca9aabd86bfaf7878a3add7fe.png](https://i.imgur.com/YP8zvkm.png)Ahhh dang, this is going to be trickier than I thought!
I'll be honest, I was stuck in this part for a good while. I was pretty sure that the next step was going to involve some sort of file upload RCE. After a good hour of poking around the CMS Admin, uploading some more files, and going back to search.php to dig around some of the other tables, I start looking through the other olympus tables. As a refresher, these are the olympus tables:

* categories
* chats
* comments
* flag
* posts
* users

I had already investigated users, posts, flag, and comments pretty thoroughly, and after striking out with categories I gave chats a try:
`1337'union select 1,2,concat(column_name),4,5,6,7,8,9,10 from information_schema.columns where table_name="chats"-- -`

Here were the columns for the chats table:
* dt
* file
* msg
* uname

![f90baa29e03ca63f5e8f78644d93434b.png](https://i.imgur.com/7XRU4Lw.png)
Ok, so there's a uname (username?) message and file... Lets see what sort of data we have here:
`1337'union select 1,2,concat(dt, ', ', msg, ', ', file),4,5,6,7,8,9,10 from olympus.chats-- -`
![158fb067284ab60bc09b80369c63d648.png](https://i.imgur.com/g6BdjZB.png)Hmmm interesting... Looks like a couple of these chat messages the user attached a filename, and the message lists the filename and then there's a second filename. So I'm trying to figure out where these would be displaying in the CMS, I haven't found any chats other than here...

The email addresses! I had almost completely forgotten about those after grabbing the user data!!
The emails had @chat.olympus.thm, I bet the chat messages are in the chat subdomain! 
*facepalm*...
I update the /etc/hosts page to link chat.olympus.thm to the machines IP. I then go to chat.olympus.thm, and voila!

![ea36cd647369ea1969ca957dd688665b.png](https://i.imgur.com/fsuD4uT.png)
## Chat Subdomain

Oh joy of joys, another login screen! I use the prometheus credentials, and thankfully I'm able to log in as prometheus (the last thing I wanted to do was more hash cracking...)
![4049e30b58c64eb41906988d32e6a46f.png](https://i.imgur.com/rsteR3e.png)
Looks like a pretty basic chat app. Really basic, just a form POST for each message, though there's a spot for uploading files too. One of the chat messages from "zeus" gives a pretty clear clue as well, looks like the files uploaded here are renamed so that it's harder to manually navigate to the file in the directory. This must be what I was seeing in the chats table, the message showed a user uploaded a password file, prometheus_password.txt. This goofy file name function renamed the file and saved that filename in the chats table! So now I have what the file should be named in the directory, I just gotta figure out what directory it's in.

Time to break out gobuster again now that we have a whole new subdomain to scan. I use the same SecList's common.txt file I had grabbed earlier.
`gobuster dir -u http://chat.olympus.thm -w ./common.txt`
![ccb6b35c94a5eb0c3b607a1b4e12a7bc.png](https://i.imgur.com/KFxjE4c.png)
Ok, this looks a little more straightforward, there's a /uploads folder. I'll try and grab that filename for the passwords file that was uploaded and see if I can find it in the uploads folder.
![732e7babb747cbd3fd4c4666a76d8d98.png](https://i.imgur.com/PlfvjmU.png)Ahhh, looks like this guy's being a little cheeky!

Ok, cool, I can navigate to the uploads folder, and see the file, so I think I can actually get a reverse shell this time. I just have to upload it in the chat, find the corresponding entry in the chats table of the olympus database to get the new filename, and then navigate to that location in the uploads folder.

I grabbed a quick PHP reverse shell from pentest monkey, and upload the file (I forgot to update the host and port, so I had to upload it twice)

![b4964ebd17cebd2c21ee416fa640b078.png](https://i.imgur.com/qhjFYOG.png)
Now let's set up netcat on our attacker machine
`nc -lvnp 9090`

![40645559355562942d1798659884bcd8.png](https://i.imgur.com/nP09PPS.png)
We have our shell!!!

(second flag is in /home/zeus/user.flag)

## Privilege Escalation
So we're in the box, but we're only in as www-data, we need to escalate privileges before we can find any other flags.
I start off with a search for any files that have the sticky SUID bit on
`find / -perm -4000 2>/dev/null`
![c4a768e1140c2a26e0e8aa277518a5b3.png](https://i.imgur.com/PVZy2QD.png)This brings up quite a few files. I spent a little bit of time sifting through this trying to find something I could use, and I came across this cputils file in .usr/bin/cputils
![922742e6a07e6ec00f246545183a79cd.png](https://i.imgur.com/kg9dRul.png)After running the executable, it looks like it takes basically any file you pass in, and you can make a copy of it. Nifty!

So in this case, I'm thinking if this utility is here, there's probably a file only zeus or root have access to that (if I can make a copy of said file) I'd be able to elevate my privileges.
Let's check zeus:
![a7c805c97993459e7fea439bf84b3382.png](https://i.imgur.com/780agVg.png)
Looks like there's a .ssh folder, maybe I can copy his SSH key?
![d613999e29c322e738beab5d43bcb356.png](https://i.imgur.com/ewaRghM.png)Yep, we hit paydirt! Now I just need to save the key to my machine and try to SSH in!

![9706d6448b5d23e73947927374861cfc.png](https://i.imgur.com/D1vlKnK.png)This screenshot was a little later, I had some troubles with not copying everything the first time I tried to save the key (hence the key_zeus_two name!). Looks like his SSH key has a passphrase too.... Ugh, I hate cracking passwords, time to break out john and ssh2john!

On TryHackMe, the ssh2john tool is an additional python module on top of John, so I had to navigate to where the John the Ripper python files were, and hit it using python
`python ssh2john.py ~/key_zeus_two >~/key_zeus_two.hash`

After that, I took the hash that was outputted by ssh2john and hit it with john!
`john --wordlist=/usr/share/wordlists/rockyou.txt key_zeus_two.hash`

I redacted the answer, but rockyou worked!
![fe5c55cd3f31c1aeeeb1f1221e2cbf91.png](https://i.imgur.com/bD0zIjI.png)
I now try SSH-ing with the key and passphrase
![31d375c971c25b11af84ed2dfe0964c2.png](https://i.imgur.com/EksnJA5.png)We're logged in as zeus!

## Escalating Zeus to Root
I'll be honest, normally I write these walkthroughs as I'm going through the CTF/room, so that I don't miss anything. By the time I got to this point, it was pretty late at night, and I was trying to wrap up as quick as I could, so I took as many screenshots as I thought I was going to need but didn't write anything. So the rest of this walkthrough is me coming back the morning after, and I realized this morning that I missed a couple important screenshots, my apologies!
After logging in as Zeus, I spent some time digging to see if there were any other flags. Unfortunately, I just wasn't finding anything flag wise...

Inside /var/www/html though was a weird file that looked almost like a hash or something:
`ls -lah /var/www/html`

![e3b189163828a0f0276cc51899949143.png](https://i.imgur.com/TRpm84S.png)
Ohhh it's actually a directory! Ok....
![982cb3d1db8b55e252e03781e3a3eab3.png](https://i.imgur.com/Zbd0lOh.png)The index.html file didn't have anything I could see in it, but the other PHP file looked like some sort of reverse shell? There was a password too:
![701272386dc873293cf788f641a57680.png](https://i.imgur.com/0XfVhQK.png)I redacted the password, but I'm going to try and hit it from the browser.

Ok, I went to the PHP page and ran into a password prompt (I forgot to screenshot that page), and after putting in the password I recovered from the PHP file, I came across this:
![447a9bd19267311542f92a348e642dac.png](https://i.imgur.com/84JzT6M.png)

Okie dokie, looks like we do have a reverse shell setup! I still had NetCat running from the first exploit in the chat uploads folder, but I started another netcat session and got ready:
`nc -lvnp 9191`

I then went to the URL in the screenshot above (forgot to screenshot that as well, my apologies) and successfully made the reverse shell!
![2b5ecaf4ad8a5bfd48ed5836daaed20d.png](https://i.imgur.com/wnIQp5N.png)

I found flag #3 inside the root directory, /root/root.flag. (UGH, I gotta stop doing these late at night, I didn't screenshot the super cool flaming skull gif! I'll have to try and get back to it later)
There's a fourth "bonus flag" that I haven't found quite yet, I'll also see if I can finish up the last bit tonight and post my results.

## Conclusion
This was a really fun room, a lot of kinda goofy obfuscation and workarounds to make what would have been a pretty easy room much more difficult! I think the main takeaway I got from this room was to keep track of anything data-wise you come across, because you never know when it might come in handy! I learned that the hard way, and if I would've remembered the chat subdomain earlier on, I probably would've saved a full day of poking around!

Anyways, hope you enjoyed my walkthrough, have a great day!







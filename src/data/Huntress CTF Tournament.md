---
id: 10
title: Huntress CTF Tournament
description: Cybersecurity Awareness Month and a new CTF!
publishedDate: 10/03/2023
featureImage: https://i.imgur.com/x0pPeKeh.png
---

## Intro
Hello Internet!
So it's been a little while since I've written up any walkthroughs. I've still been doing some CTF type room and box work, but I normally like to get to a point where I have that completed before I write about it.

At the same time at my current place of employment, we have a good number of folks on our security team that are interested in getting involved in live CTFs and tournaments! So with October being cybersecurity awareness month, we decided to form a CTF team and compete in the Huntress CTF tournament hosted by JustHacking!

![30130f746047171b416478f4a13816bc.png](https://i.imgur.com/x0pPeKe.png)
Our team name is Sema4, and we have 5 team members (I'm SkyWisd0m)
![3575b3fc302ecb6ede55d83d906119a6.png](https://i.imgur.com/httEayh.png)

## The month of October
So October is always a pretty busy month for me in security (and tech in general). With cybersecurity awareness month, there's always CTFs and contests galore that I'm starting to get more involved in. October is also Open Source Hacktoberfest (AKA Open Source Awareness Month), which I was very involved with while working in software development.

While I'll be focusing more on the cybersec opportunities I'm able to find this year, I still want to try and find some open source projects in which I can contribute! So you might see some posts from me related to some open source projects along with posts about the different contests I'm participating in!

## Huntress
This is my first time doing this Capture the Flag competition, so I'm excited to see what kind of projects and challenges are in this month of hacking! My goal is to try and post at least a few times a week with some of flags that either I was able to figure out or that my team was able to complete.

Unfortunately I decided I should start posting from this competition after the second day, so this post will be all the flags from day 1.
Lets get cracking!!

## Day 1
The competition started on October 2nd with 6 "warmup" style flags. Most of these flags were very 1st timer friendly to help boost someone's confidence if they've never done a CTF before, so some of these I'll just skim over.

The very first two flags were joining the Discord server for this contest (the flag was in the ticketing channel), and reading the rules page (the flag was in HTML comments on )
![fbd6a44e407e30a9c474c63638e05f5c.png](https://i.imgur.com/ppCRC42.png)
After that were a couple other smaller flags, like one inside a text file:
![ba899e72fd9f8b8ea4bdb464e4a97e64.png](https://i.imgur.com/P3L9jE9.png)
And one that was inside the hex values of a picture of some string cheese. For this one I used HxD to look at the hexcode of the picture and found the flag:

![d43a6c5f6fa50d0169951db5cfa782e0.png](https://i.imgur.com/rwmdIVi.png)
Query Code was a little bit trickier. This one the file didn't end in an extension, so it wasn't immediately clear what the file was. I opened this file in a hex editor as well though, and noticed that the file header was for a PNG:

![94f6f4842cddf9ba3dbfee537664680d.png](https://i.imgur.com/gzvgCFa.png)
I tried adding a ".png" extension to the file, and voila, we have a PNG of a QR code!

![9416dee49bf8c9bd55d4c2071543e7e2.png](https://i.imgur.com/SDjKzQd.png)
I scanned the QR code with my phone, and voila!!
![94b3d38d317701d3b476258e628951a8.png](https://i.imgur.com/UhslUZc.png)
With most of these flags taken care of very quickly, there was only one left, Zerion. This was definitely more difficult than the other ones, but was a blast to work on!

## Zerion
Rather than being labeled "warmup" like the other flags, this flag was labeled as "malware". In this case, that meant the flag was hidden within malware of some sort, so time to put on my digital hazmat suit!

I downloaded the malware file within a VM, and opened it up with a Hex editor, and immediately saw it was a PHP file, which made me feel a little more comfortable working with the file. I added a ".php" extension to the file and opened it up with VS code to be able to format it a little better.

![71ef097432b2a5e1e17ba1ca7f47d83c.png](https://i.imgur.com/FYz3iyL.png)
The first line of this pretty much tells you everything going on with the rest of the file!
The first variable,
`$L66Rgr=explode(base64_decode("Pz4="),file_get_contents(__FILE__));` ,basically takes the entire file, and splits it into an array based off of the the base64 string "Pz4=" ("?>"). So that means the array $L66Rgr would be two records long, with $L66Rgr[0] being all of the PHP code on the first line, and $L66Rgr[1] being all of the ciphertext that's underneath the PHP code in the file.

Ok, moving right along here, the second variable in the code looks like it's starting to some sort of array:

`$L6CRgr=array(base64_decode("L3gvaQ=="),base64_decode("eA=="),base64_decode(strrev(str_rot13($L66Rgr[1]))));`

If we take the first two values in the array and base64 decode them, it comes out to "/x/i" and "x". The third value is just the 2nd value of the earlier variable we put together, $L6CRgr, but base64 decoded, Rot13 deciphered, and reversed. So that's just all of the ciphertext underneath our PHP code base64 decoded Rot13 deciphered, and reversed! This sounds like a job for cyberchef.org!!

After opening the site, I grab all of the ciphertext underneath the "?>" part of the PHP file, and double check what I need to do. Remember, in cyberchef the top right panel is the input, the middle is the different recipes you add, and then the bottom right is the output panel. We'll want to start with the inner-most function in this variable declaration and work our way out:
`base64_decode(strrev(str_rot13($L66Rgr[1])))`
So first we need to do the string reversal!

![030944ece10f752c0f6f1ef7f8081e38.png](https://i.imgur.com/JeQE0XL.png)
Ok, now we have a Rot13 decipher we need to add:
![cfa5069168c1c7ef4ffe912ac9eb7bd6.png](https://i.imgur.com/O5IVsPJ.png)
And then finally a Base64 decode:
![3f5566d29a82aae4da28f4e468c079d1.png](https://i.imgur.com/ynI8qkW.png)
Heyyy, that's starting to look like some human readable code!
If you start scrolling through the code, the flag is right in the middle of the code! Or you can be fancy with cyberchef and regex filter it so you only see the flag!
![dda7ccb35a002e36e8ac02cb72fd9503.png](https://i.imgur.com/2cRxxL8.png)
## Conclusion
Wasn't the most photogenic of flags, but it was a nice end to the first day of flags in the huntress CTF!

As I sit writing this, we're done with the first 2 days of the CTF, and so far our team has gotten all of the flags from both days! 
![181c76287eec65005796e1d804a2713d.png](https://i.imgur.com/cnq8A0T.png)
![abe886dc44d5c01925707501ea891d70.png](https://i.imgur.com/zLkgqNn.png)
To be honest though, it's getting late and I wanted to try and get this posted before the day 3 challenges go live.

Next post tomorrow, I'll put down all of the flags from Day 2 (and maybe day 3 if we're successful and if I get my screenshots in time)! In the meantime, I'll see you later!
Happy Hacking!




---
id: 11
title: Huntress CTF - Day 2 and 3
publishedDate: 10/05/2023
featureImage: https://i.imgur.com/MsHkggqh.png
---

## Intro

Hello Internet!
As I mentioned in my [last post](https://screamintothevoid.today/blog/10), some of my coworkers and I are participating as a CTF team in John Hammond's [Huntress CTF Tournament](https://huntress.ctf.games/)! Since I've been a little neglectful on posting regularly to this site, I thought it might be a good idea to continue posting about our team's progress in this CTF! Some of the challenges I solved on our team, and some (most to be honest) were solved by my other team mates, but I tried to grab details on every flag so that I can talk about all of them!
Anyways, let's talk about Day 2!

## Day 2

There were 3 flags to find in Day 2, and to be honest I didn't find any of them on my team! I came onto the challenges in Day 2 a little late, and by the time I had started my teammates had solved all of them. Compared to Day 1 and Day 3 though, I really felt like the malware flags on this day were fantastic! Here are the flags:
![725589e9cb4d5b45ea5628bc44d6ec18.png](https://i.imgur.com/uWyHLvU.png)

## Book By Its Cover

I'll start with the warmup flag, Book By Its Cover.
![085aa526f19b30e0c687ca06c9977eb4.png](https://i.imgur.com/7qgxQlX.png)So this one, you have a .rar file to work with, which makes you think it's an archive file to extract. If you try to use like Ubuntu's archive manager, it fails to extract the archive, and you're left with not much to work off of.

After running into this problem with the Archive Manager, I decided to try opening the file with a Hex Editor to see if I could spot any file headers.
![43c76987ebe19c7d8ebb31a55e1bb81b.png](https://i.imgur.com/MW9EztC.png)Right off the bat it looked like this file might possibly be a PNG image with the wrong extension (which fits with the "Don't judge a book by it's cover" description of the flag). So I tried changing the file extension to .PNG, and voila!

![589911d7a67fa1237717a7cd0a0e1e7e.png](https://i.imgur.com/fNvCqL4.png)Okie dokie, next flag!

## HumanTwo

![a8516a5d9aef6b550e1407d798201a52.png](https://i.imgur.com/Sss4HeE.png)So with this flag, as the description says there are tons of "indicators of compromise" that are all similar except for one piece. So I first extracted the zip folder, and started manually looking at a few of the files. From going through a few of them, the files all look almost exactly the same, line for line. To be sure they weren't all duplicates, I put two files in an online diff checker, and found where the differences are:

![04e2833fdf03cda477338e6524c0ea25.png](https://i.imgur.com/ztwZHQa.png)Looks like inside the Page_load function, the hash that's used to check against the password is different between these two pages!
With that info I did a quick grep of all the extracted files, and compared the hashes:
![340d1d149b790853ef3c59765f608b8d.png](https://i.imgur.com/Tqf0Nne.png)I wasn't able to fit all of the hashes in this screenshot, but you can see almost all of them stick to a 36 character format, except for this highlighted one that seems to stretch for quite a while! I'm thinking this is probably what we're looking for!
I grab that extra long hash and pop it into cyber chef to start playing around. I tried Base64, ROT13, and a few other typical things we come across in CTFs, but eventually we figured out that it was the flag in hexidecimal:
![0bda3084beec12a4c9cf05450c70507f.png](https://i.imgur.com/p1jHZeh.png)
Alrighty, on to the last flag of Day 2!

## Hot Off The Press

![a3a89fb09e9a1da5fb4c07f2b3fb403a.png](https://i.imgur.com/CHJE6MV.png)For me personally this was the hardest challenge we've come across in the whole competition. While I didn't get the flag for our team, I was kind of obsessed with this one, and managed to still figure it out on my own (albeit, about 3 hours after my teammate originally found it!)

So first off I opened the file from this flag with a hex editor, and saw a file header I did not recognize:
![17b9b246413e04ee391fdd345fb6e9c6.png](https://i.imgur.com/ynuIk0i.png)After a big of googling, I found out it was more than likely a UHA archive file. I did a little more digging and was able to find what looked like an ancient windows tool for compressing and de-compressing UHA files. I double checked using windows sandbox that the installer would be ok, and installed it on my machine. The tool wasn't the most user friendly and it took me longer than I'd like to admit to figure out how to use correctly, but I eventually decompressed the UHA file with the password given in the challenge description "infected".
![165050f332e3c296202ee2e4e7f939b9.png](https://i.imgur.com/YcFbcmo.png)Looks like there's a PowerShell script stored in this archive, lets pop this open in VS Code (without running it, mind you!)
So this script was rather miserable to look at. It was like a minified version, only taking up 1 line, and lots of quotes and formats that made reading this thing a nightmare!
Here's a screenshot after I did a little shoddy formatting:
![5a68f2949bcbeb8687fea7eac79cfe4a.png](https://i.imgur.com/cO7BqSy.png)Ok, so the biggest piece that helped put this together for me was the string formatting that was partially obfuscating how to read this script. Take this variable in the screenshot:
`$sw=((''E''+''nable{3}''+''c{''+''1}''+''ip{0}Bloc{2}Logging''+'''')-f''t'',''r'',''k'',''S'');`
So the variable is concatenating the statement with multiple strings and some formatters (hence the -f and array of characters at the end of the line), so once you replace the {0}, {1}, {2} and {3} pieces with the letters that are in that character array at the end, you can put it together! So in this case, after replacing the placeholder pieces, and removing unnecessary ''+'' parts, that variable looks like this:
`$sw=(('EnableScriptBlockLogging'));`

At the bottom of this script is a super long concatenation of a bunch of strings that are all inside a "FromBase64" function, which is inside of a GzipStream call. So I'm thinking if we piece together that super long string, Base64 decode it, and then gunzip that, we should be getting somewhere!

After a while of finding and replacing pieces of this, I popped it into cyberchef, and here's what we have!
![79d4e03c67bd938d1b6c014178e5b215.png](https://i.imgur.com/2kQ2o1o.png)
Looks like the result is more code of some sort. Scrolling through this code, it looks like there's more Base64 encoded stuff:
![378a3bdbb06ae581390c56d9546c461b.png](https://i.imgur.com/Fmi5gZq.png)

Because I'm lazy, I added some more cyberchef recipes to cut it down to the Base64 string only, and decoded that string:

![81a46c4c779aeeddcac78bb03061dee0.png](https://i.imgur.com/QDEX3tI.png)
Hey, we're getting somewhere now! Looks like there's a URL with an encoded_flag parameter, let's URL Decode that and see what we get!
![7783bc37169702cfc94d4494996eda02.png](https://i.imgur.com/fRuD1Ir.png)Wooohoo, flag found finally!

## Conclusion on Day 2

I'll be honest, the Book By Its Cover and HumanTwo flags weren't too difficult and made for a fun few minutes! The Hot Off The Press flag definitely took me a long time to get through, and as I said earlier, it's been the hardest flag so far in this competition!

# Day 3

There were two flags for this day, and by now we were starting to really jive as a team, working through some of these flags! Here are the flags for Day 3:
![5e4ed09bac085b20bb0999f2b43d0fc6.png](https://i.imgur.com/whWK84Z.png)

## BaseFFFF+1

If you really like hexidecimal-decimal conversions, this one is a favorite!
![9af99c0ec5b454533887428d924e0057.png](https://i.imgur.com/rtx8j9v.png)
So this one I had no idea what it was talking about until one of my teammates solved it and spilled the beans for the rest of us!
The hexadecimal number 0xFFFF is 65535 in decimal, and if you add 1 to that (65,536), you can base decode to that amount, and the suplemented file is decoded!
My teammate used a python script to decode that, but I found an online one after the fact that did just as well:
![3d202ab9550cb30e52c97df22bbc8950.png](https://i.imgur.com/4CG6wCz.png)
moving right along...

## Traffic

This one I managed to solve on my team, if you approach this one with an open mind and don't immediately start looking for vulnerabilities or malicious requests, it's a breeze.
![db204dbdb29a74fcc7789734c5304a78.png](https://i.imgur.com/RH5yVTL.png)So after extracting the archive on this one, there are a ton of log files that were exported with the tool zeek. I managed to install zeek on my VM and it did help a bit in formatting some of the logs for easier reading, but it wasn't absolutely necessary in solving this one.

I spent wayyyyyyy too long on this challenge. I was looking at the "notice" and "weird" logs that were in this archive, thinking the logs there should point me to the sketchy site that was mentioned in the description. After going down multiple rabbit holes with nothing to show for, I re-read the description for probably the 5th or 6th time. I remember in some of the other challenges, the descriptions were sometimes very literal, and I started to wonder if maybe that was the case with this one. One simple grep command, and I saw what was sketchy:
![e0e74912796a090fca00a996bc04f5be.png](https://i.imgur.com/ZzewBpM.png)
In the dns and ssl logs, there were a bunch of records for "sketchysite.github.io", the site was literally a sketchy site!!
Seeing nothing else in the logs that would give credence to a flag, I decided to see if sketchysite.github.io was a live site:
![d90f8aa27d8ccf5f00f8b378154815ea.png](https://i.imgur.com/VCPNlYU.png)Ok, there's a response, what happens if we browse to it?

![87f79404cfcdbf38ca56ebb2c7dd4de9.png](https://i.imgur.com/MsHkggq.png)_facepalm_
This one was a textbook case of me making the challenge wayyyyyy harder than it needed to be! Welp, there's the flag!

## Conclusion

I was kind of hoping there would be more challenges day to day in this CTF, given there were 5 on the first day. Since our team has 5 members in it, it's a bit of a scramble to see who is going to grab flags first, but a little competitiveness never hurt anyone, right?

Welp, that wraps up day 2 and 3 of this CTF, I'll see you later as we make more progress in the huntress CTF!

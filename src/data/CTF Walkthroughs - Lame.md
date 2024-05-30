---
id: 7
title: CTF Walkthroughs - Lame
description: My walkthrough of the Lame machine on HackTheBox.com
publishedDate: 02/04/2023
featureImage: https://i.imgur.com/tK4ptaWh.png
tags:
  - ctf_walkthroughs
---
## Intro
Hello Internet!
Yep, told you I'd be getting more of these done! I'm now spending most of my weeknights (when I'm not burned out on the computer or watching TV) working through vulnerable machines, so I'm writing these much more often now!
This box was part of a series called [TJ_Null's list of Hack The Box OSCP-like VMs](https://docs.google.com/spreadsheets/u/1/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/htmlview#), a list of retired HackTheBox machines that are comparable to OSCP machines that are often used. This machine, Lame (that's the name of it, not that it's a lame machine!), was the very first one on the linux list, so thought I'd give this one a crack!

## Recon
Ok, I get started with the scan and I'm immediately running into problems:

![045b24f209bcbe088f0da8206a461fc7.png](https://i.imgur.com/Dlat6KG.png)
So I recently purchased a VIP subscription to HackTheBox, and I didn't realize I needed to download a new VPN connection so that I would be allowed to hit the retired machines! It took a little while to get to a point where any of my scans were doing anything, but I started adding "-Pn" (skips pinging the host) after reading up on the HTB forums that sometimes it takes a while for the retired machines to start up all services and respond to pings.

Anyways, once I'm finally getting pings back, this is what I see:
![a6ab866cd00c0ff2fa16b7c1a0ac815a.png](https://i.imgur.com/Y4XGuRL.png)Interesting! Looks like FTP, SSH, and the SMB/SAMBA ports are open! I'll be honest, I've only ever done 1 or 2 machines where I was connecting via SMB, so this is going to be a bit of an uncomfortable journey. I'll do my best though!

## SMB

So from what I've learned about SMB, there's a tool called enum4linux that works very well with checking through some of the vulnerable configuration options that leave SMB servers open to exploits. So that's the next thing to run.

There was a lot that I got back, but this was the main thing that I focused on at first:
![30758eabfac0e1f8678b6060b6b8c1ab.png](https://i.imgur.com/2S9PiyA.png)
After seeing that the tmp share was open to anonymous users, I tried accessing that. I was able to connect, but wasn't really getting anywhere, and I didn't see any files that were useful.

Conceding defeat on the /tmp share, I started looking around some of my old documentation on previous SMB challenges. There was an old TryHackMe room I had worked on called [Relevant](https://tryhackme.com/room/relevant) that used an SMB that I had done a side-by-side walkthrough of (I got stuck and had conceded defeat on this one, so I didn't bother writing a blog post on this one!)
Anyways, the walkthrough of this one that I had done, the creator had added some additional HTTP services on wonky ports, but had found them using this scanning tool [threader3000](https://github.com/dievus/threader3000). I thought the tool looked kinda neat, and in his video walkthrough, threader ran super fast!

So I went ahead and installed and ran threader, and looks like there's another port I was missing from my nmap scan!

## Distccd
![91e900a8c214024e22c33b66ec7a09eb.png](https://i.imgur.com/rcVi537.png)This tool is pretty neat! It does a multi-threaded scan of open ports and then generates the nmap command to hit only those ports. I definitely think I'm going to be adding threader3000 to my normal tool rotation!

![1be06d88d6965b6c5dea8ed808ba4896.png](https://i.imgur.com/eEDhtfV.png)With a newly discovered open port (3632) and running service (distccd? What's that?), I started searching for any vulnerabilities of this service.
Looks like there's a RCE vulnerability with this service, and metasploit has an exploit available! Unfortunately, I couldn't get the exploit working (also I really should try to avoid using metasploit since I won't be able to for the OSCP exam), and even found a [python port of the exploit](https://github.com/galenlim/distcc-exploit-python) that I also could not get working....

![5beca5b6860d9c482d9b571609a25907.png](https://i.imgur.com/tPx5NAq.png)
## Metasploit
At this point I was starting to get a bit frustrated, and took a second look at the SMB versions running, thinking I might be able to find a vulnerability there. Sure enough, it looks like Samba 3.0.20 does have a RCE vulnerability as well, and there are exploits available!
I first tried another python port of a metasploit exploit on this version of Samba, but was having a hard time getting the script to work. Conceding defeat on the front of trying to own this machine without metasploit, I started up metasploit.

![54b41709670adf52cf30219c42a2ad00.png](https://i.imgur.com/I3Px8Gw.png)
After setting the RHOSTS and LHOST options (leaving the RPORT as is), I ran the exploit, and (finally) got in as root!

![030d012411b368c72693067334141283.png](https://i.imgur.com/Z1R3drn.png)
Pretty much the rest of this is fairly self explanatory. Since I'm already in as root, I didn't have to do any additional privilege escalation. The user flag took a couple minutes to find, but was just in /home/makis/user.txt and the root flag was in /root/root.txt

## Conclusion
I'll be honest, I wasn't a huge fan of this one. Having very little experience with SMB, the whole machine felt a little foreign to me, and I kinda went down a bit of a rabbit hole trying to get the exploit I had found for distccd to run. I guess that's really how you improve though, work on the bits you aren't comfortable with, don't just stick with stuff you already know! All in all though, I'm glad to be done with this one!
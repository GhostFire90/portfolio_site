+++
title="SnailMail"
template="project.html"

[extra]
repo="https://github.com/GhostFire90/SnailMail"
+++
SnailMail is a project idea I had when I was craving something more old fassioned, something in the terminal yet still pleasing to look at to a degree. That was the original thought. Then I thought about how I felt weird giving my address out to people on the internet to be pen pals with so I thought "Lets make email but with, extra steps".

**Technical:**

SnailMail uses a TCP client/server relationship.  
Server:  
  - Synchronizes public keys with new/returning clients
  - Maintains a subdirectory tree for each recipient which contains encrypted files as well as their public key
  - Handles client requests and file transfers

Client:  
  - Requests recipient public key to encrypt data before sending
  - Maintains a recipient address book
  - Displays TUI
<!-- more -->


# Overview
SnailMail works as a file transfer program except with the twist of adding tension through the means of a "delivery" system. Configurable on server side, you can control how many days it takes for the file to be "Delivered", what this means is, the recipient cannot download the file until that amount of time has passed.

SnailMail automatically uses an asymetric public key encryption algorithm to ecrypt your files so no one except the planned recipient can view them. Public keys are stored on the server and then downloaded by sender, while private keys are saved on recipient's computer and used to decrypt, private keys are never transmitted.

[Terminal.Gui by Miguel Deicaza](https://github.com/migueldeicaza/gui.cs) brings it the older, DOS-like TUI that I wanted to use for this project .

# Preview
![preview gif](newLook.gif)


# Usage 
Both the server and client automatically generate a config file with the neccesary entries
 - ip is the ip the client will connect to or the server will bind to.
 - port is the port the client will connect to or the server will bind to.
 - days is the amount of days the server will delay the delivery by.

# Credits
  - Binaries used
    - [Terminal.Gui](https://github.com/migueldeicaza/gui.cs) 
    - [NewtonSoft.Json](https://github.com/JamesNK/Newtonsoft.Json) 

+++
title="Codefriend"
template="project.html"
weight=5
[extra]
repo="https://github.com/GhostFire90/Codefriend"
+++

Codefriend is a toolchain developed during my 2024-2025 year at Digipen with 2 other teammates. It uses a languages AST to break down and analyze source files into a uniform format and stores it into an SQLite database for access of an AI agent. The agent can reference back to the database to create documentation for the various objects or generate new code that uses stored code.

**Technical:**  
Codefriend is comprised of 3 parts, I will label the parts I wrote. 
1. Backend
  - Handles Database entries (Me)
  - Interracts/Orchestrates the AI agent(s)
2. Language Server (Me)
  - Breaks apart a given languages AST
  - Serializes into uniform JSON format, represented in the database
3. Extension
  - Adds Codefriend functionality to your chosen IDE

All of these communicate through a central "hub" program also written by me that uses a binary protocol.
- Automatic assignment of address UUIDs to clients
- Routes messages to correct tools

<!-- more -->

## Demo
![demo gif](codefriend.gif)

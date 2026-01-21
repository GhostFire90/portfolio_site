+++
title="Redim"
template="project.html"
weight=1
[extra]
repo="https://codeberg.org/PersephonesRain/Redim"
+++

Redim is an interpreted Lua-like language I worked on with another programmer over 9 months. I had always wanted to design and implement a programming language and my project course at DigiPen Institute of Technology allowed me to do just that. 
Redim was originally written in C++ over a semester but as the project got more complex, the STL caused many problems. To fix this in the second semester we pivoted to using Rust which showed immediate productivity boosts.

**Technical:**  

During both semesters my work was in the execution of code based on a parsed AST given by my teammate's portion, this included:
  - Function/Table scopes
  - Import database for caching imports
  - Recursive execution based on AST Node types
  - Python/Lua-like command-line interface
  - Various aspects of our "standard library"
    - networking
    - math
  - All the sample programs
<!-- more -->


## Syntax:

![[](https://codeberg.org/PersephonesRain/Redim/src/branch/main/SPEC.md)](redim_vecmath.PNG)
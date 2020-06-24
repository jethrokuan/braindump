+++
title = "Security"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:57+08:00
draft = false
+++

## Exploitation (Halvar Flake) {#exploitation--halvar-flake}

- Phrack
- Stack Smashing
- Heap Overflow
- ASLR

Weird machines, exploitability, and provable unexploitability:
<http://ieeexplore.ieee.org/stamp/stamp.jsp?reload=true&tp=&arnumber=8226852>

### Finite State Machines {#finite-state-machines}

CPU States:

1.  Sane
2.  Transitory
3.  Weird States

### Exploitation Procedure {#exploitation-procedure}

1.  Setup (choose the right sane state)
2.  Instantiation (enter the weird state)
3.  Programming (program the weird state)

### Attacker Specialization {#attacker-specialization}

- Different version of the same "host" may create similar weird machines.

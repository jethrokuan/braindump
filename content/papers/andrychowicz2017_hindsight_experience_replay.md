+++
title = "Hindsight Experience Replay"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:27:01+08:00
draft = false
+++

paper
: <https://papers.nips.cc/paper/7090-hindsight-experience-replay.pdf>


## Hindsight Experience Replay {#hindsight-experience-replay}


### Key Challenges {#key-challenges}

It is challenging for agents to learn in environments where the
rewards are sparse. It is desirable to design algorithms where manual
reward engineering is not required.


### Key Insight {#key-insight}

Consider a state sequence \\(s\_1, \dots, s\_T\\), and a goal \\(g \ne s\_1,
\dots s\_T\\). We may re-examine this trajectory with a different goal --
while this trajectory may not help us learn how to achieve state \\(g\\),
it tells us how to achieve the state \\(s\_T\\). This information can be
harvested by using an off-policy algorithm and experience replay where
\\(g\\) in the replay buffer is replaced with \\(s\_T\\). This trajectory can
also be replayed with goal \\(g\\) intact.

This modification results in at least half of the replayed
trajectories containing meaningful rewards, and makes learning
possible. Using _Universal Value Function Approximators_, which are
policies and value functions that take as input state \\(s \in S\\) and
goal \\(g \in G\\).


### HER as Implicit Curriculum {#her-as-implicit-curriculum}

Goals used for replay naturally shift from simple to achieve goals
achievable by a random agent, to more difficult ones. HER has no
explicit control over the distribution of initial environment states.


## Backlinks {#backlinks}

-   [Playing Atari with Deep RL]({{< relref "mnih2013_atari_deeprl" >}})
-   [LeCun's Cake Analogy]({{< relref "lecun_cake_analogy" >}})

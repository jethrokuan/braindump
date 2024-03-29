+++
title = "Playing Atari with Deep RL"
author = ["Jethro Kuan"]
draft = false
+++

## Playing Atari With Deep RL (NO\_ITEM\_DATA:mnih2013playing) {#playing-atari-with-deep-rl--no-item-data-mnih2013playing}


### Preprocessing Steps {#preprocessing-steps}

1.  Obtain raw pixels of size \\(210 \times 160\\)
2.  Grayscale and downsample to \\(110 \times 84\\)
3.  Crop representative \\(84 \times 84\\) region
4.  Stack the last 4 frames in history to form the \\(84 \times 84 \times
       4\\) input


### DQN {#dqn}

1.  Use of [Experience Replay]({{<relref "experience_replay.md#" >}}) buffer
2.  Separate target network stabilizes optimization targets:

\begin{equation}
  \delta = r\_t + \gamma \mathrm{max}\_a Q(s\_{t+1}, a ; \theta') -
  Q(s\_t, a\_t; \theta)
\end{equation}

The network parameterized with \\(\theta '\\) is a snapshot of the network
at some point in time, so the optimization target doesn't change so
rapidly.

1.  Clip \\(\delta\\) to \\(\left[1, -1\right]\\)


## Improving DQN {#improving-dqn}

-   Double Q-learning reduces bias ([Van Hasselt, Guez, and Silver, n.d.](#orgde80b6b))
-   Average Q-learning reduces variance ([Anschel, Baram, and Shimkin, n.d.](#org000f56a))
-   [Hindsight Experience Replay]({{<relref "andrychowicz2017_hindsight_experience_replay.md#" >}}) ([Andrychowicz et al., n.d.](#org1bd8f05))
-   Distributional RL ([Dabney et al., n.d.](#org03613ed))


## References {#references}

-   [Defeating the Deadly Triad: | random walks and lots of ♥s](https://davidsanwald.github.io/2016/12/11/Double-DQN-interfacing-OpenAi-Gym.html)


## Bibliography {#bibliography}

<a id="org1bd8f05"></a>Andrychowicz, Marcin, Filip Wolski, Alex Ray, Jonas Schneider, Rachel Fong, Peter Welinder, Bob McGrew, Josh Tobin, OpenAI Pieter Abbeel, and Wojciech Zaremba. n.d. “Hindsight Experience Replay.” In _Advances in Neural Information Processing Systems_, 5048–58.

<a id="org000f56a"></a>Anschel, Oron, Nir Baram, and Nahum Shimkin. n.d. “Averaged-Dqn: Variance Reduction and Stabilization for Deep Reinforcement Learning.” In _Proceedings of the 34th International Conference on Machine Learning-Volume 70_, 176–85. JMLR. org.

<a id="org03613ed"></a>Dabney, Will, Mark Rowland, Marc G Bellemare, and Rémi Munos. n.d. “Distributional Reinforcement Learning with Quantile Regression.” In _Thirty-Second AAAI Conference on Artificial Intelligence_.

<a id="orgde80b6b"></a>Van Hasselt, Hado, Arthur Guez, and David Silver. n.d. “Deep Reinforcement Learning with Double Q-Learning.” In _Thirtieth AAAI Conference on Artificial Intelligence_.

NO\_ITEM\_DATA:mnih2013playing
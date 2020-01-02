+++
title = "Playing Atari with Deep RL"
author = ["Jethro Kuan"]
lastmod = 2020-01-03T00:33:34+08:00
draft = false
math = true
+++

## Playing Atari With Deep RL <a id="e3433750724eb4eebeebd0d71a7608d6" href="#mnih2013playing">(Mnih et al., 2013)</a> {#playing-atari-with-deep-rl}


### Preprocessing Steps {#preprocessing-steps}

1.  Obtain raw pixels of size \\(210 \times 160\\)
2.  Grayscale and downsample to \\(110 \times 84\\)
3.  Crop representative \\(84 \times 84\\) region
4.  Stack the last 4 frames in history to form the \\(84 \times 84 \times
       4\\) input


### DQN {#dqn}

1.  Use of [§experience\_replay]({{< relref "experience_replay" >}}) buffer
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

-   Double Q-learning reduces bias <a id="12d44fc18d38fd615bdd468a7a3a1f21" href="#van2016deep">(Van Hasselt et al., 2016)</a>
-   Average Q-learning reduces variance <a id="ff6280fa6d28cb1f79170f6a8c88ad92" href="#anschel2017averaged">(Anschel et al., 2017)</a>
-   [§andrychowicz2017\_hindsight\_experience\_replay]({{< relref "andrychowicz2017_hindsight_experience_replay" >}}) <a id="ffaf2d08e446da500e82a251db070767" href="#andrychowicz2017hindsight">(Andrychowicz et al., 2017)</a>
-   Distributional RL <a id="df0211097f3af68bb797b195f1e9d661" href="#dabney2018distributional">(Dabney et al., 2018)</a>


## References {#references}

-   [Defeating the Deadly Triad: | random walks and lots of ♥s](https://davidsanwald.github.io/2016/12/11/Double-DQN-interfacing-OpenAi-Gym.html)

# Bibliography
<a id="mnih2013playing" target="_blank">Mnih, V., Kavukcuoglu, K., Silver, D., Graves, A., Antonoglou, I., Wierstra, D., & Riedmiller, M., *Playing atari with deep reinforcement learning*, arXiv preprint arXiv:1312.5602, *()*,  (2013). </a> [↩](#e3433750724eb4eebeebd0d71a7608d6)

<a id="van2016deep" target="_blank">Van Hasselt, H., Guez, A., & Silver, D., *Deep reinforcement learning with double q-learning*, In , Thirtieth AAAI conference on artificial intelligence (pp. ) (2016). : .</a> [↩](#12d44fc18d38fd615bdd468a7a3a1f21)

<a id="anschel2017averaged" target="_blank">Anschel, O., Baram, N., & Shimkin, N., *Averaged-dqn: variance reduction and stabilization for deep reinforcement learning*, In , Proceedings of the 34th International Conference on Machine Learning-Volume 70 (pp. 176–185) (2017). : .</a> [↩](#ff6280fa6d28cb1f79170f6a8c88ad92)

<a id="andrychowicz2017hindsight" target="_blank">Andrychowicz, M., Wolski, F., Ray, A., Schneider, J., Fong, R., Welinder, P., McGrew, B., …, *Hindsight experience replay*, In , Advances in Neural Information Processing Systems (pp. 5048–5058) (2017). : .</a> [↩](#ffaf2d08e446da500e82a251db070767)

<a id="dabney2018distributional" target="_blank">Dabney, W., Rowland, M., Bellemare, M. G., & Munos, R\'emi, *Distributional reinforcement learning with quantile regression*, In , Thirty-Second AAAI Conference on Artificial Intelligence (pp. ) (2018). : .</a> [↩](#df0211097f3af68bb797b195f1e9d661)

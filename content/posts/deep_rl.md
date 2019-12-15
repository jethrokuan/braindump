+++
title = "Deep Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2019-12-16T01:43:58+08:00
tags = ["machine-learning"]
draft = false
math = true
+++

## Why Deep Reinforcement Learning? {#why-deep-reinforcement-learning}

1.  Reinforcement learning provides a mathematical framework for decision-making
2.  Deep learning has shown to be extremely successful in unstructured
    environments (e.g. image, text)
3.  Deep RL allows for end-to-end training of policies
    1.  Features are tedious and difficult to hand-design, and are not
        so transferable across tasks
    2.  Features are informed by the task


## Good Resources {#good-resources}

1.  [CS285 Fall 2019 - YouTube](https://www.youtube.com/playlist?list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A)
2.  [Welcome to Spinning Up in Deep RL! — Spinning Up documentation](https://spinningup.openai.com/en/latest/)
    ([Tensorflow](https://github.com/openai/spinningup), [Pytorch](https://github.com/kashif/firedup/))
3.  [David Silver's Deep RL ICML Tutorial](https://www.icml.cc/2016/tutorials/deep%5Frl%5Ftutorial.pdf)


## Anatomy of Deep RL algorithms {#anatomy-of-deep-rl-algorithms}

\begin{equation}
  \theta^{\star}=\arg \max \_{\theta} E\_{\tau \sim p\_{\theta}(\tau)}\left[\sum\_{t} r\left(\mathbf{s}\_{t}, \mathbf{a}\_{t}\right)\right]
\end{equation}

policy gradients
: directly differentiate above objective

value-based
: estimate value/q-function of the optimal policy (no
    explicit policy)

actor-critic
: estimate value/q-function of the current policy, use
    it to improve policy

model-based RL
: estimate the transition model, and then...
    -   use it for planning (no explicit policy)
        -   Trajectory optimization/optimal control (continuous spaces)
        -   Discrete planning in discrete action spaces ([§mcts]({{< relref "mcts" >}}))
    -   use it to improve a policy (e.g. via backpropagation, with some tricks)
    -   use the model to learn a value function (e.g. through dynamic programming)


## Why so many RL algorithms? {#why-so-many-rl-algorithms}

-   Different tradeoffs
    -   sample efficiency
        -   is it off policy: can improve policy without generating new
            samples from that policy?
        -   however, are samples cheap to obtain?

{{< figure src="/ox-hugo/screenshot2019-12-16_01-35-50_.png" caption="Figure 1: Sample efficiency comparison" >}}

-   stability and ease of use (does it converge, and if so to what?)
    -   Q-learning: fixed point iteration
    -   Model-based RL: model is not optimized for expected reward
-   Different assumptions
    -   fully observable?
        -   generally assumed by value function fitting methods (mitigated
            by adding recurrence)
        -   episodic learning
            -   generally assumed by pure policy gradient methods
            -   assumed by some model-based RL methods
        -   continuity or smoothness?
            -   assumed by some continuous value function learning methods
            -   often assumed by some model-based RL methods
    -   stochastic or deterministic?
-   Different things are easy or hard in different settings
    -   easier to represent the policy?
    -   easier to represent the model?


## Algorithms {#algorithms}


### The Simplest Policy Gradient ([Spinning Up](https://spinningup.openai.com/en/latest/spinningup/rl%5Fintro3.html#deriving-the-simplest-policy-gradient)) {#the-simplest-policy-gradient--spinning-up}

We can derive a simple policy gradient algorithm by using the
   likelihood ratio trick:

\begin{equation}
  \nabla\_{\theta} P(\tau |
 \theta)=P(\tau | \theta) \nabla\_{\theta} \log P(\tau | \theta)
\end{equation}

The link provides a succinct derivation of the PG algorithm.


### Vanilla Policy Gradient ([Spinning Up](https://spinningup.openai.com/en/latest/algorithms/vpg.html)) {#vanilla-policy-gradient--spinning-up}

Spinning Up's implementation of VPG uses several tricks:

1.  [Generalized Advantage Estimation (GAE)](#generalized-advantage-estimator--gae)
2.  [Actor-critic](#actor-critic)


### Generalized Advantage Estimator (GAE) <a id="57393aa8ebb8846c7181c31bfd5fbe89" href="#schulman15_high_dimen_contin_contr_using" title="Schulman, Moritz, Levine, Sergey, Jordan \&amp; Abbeel, High-Dimensional Continuous Control Using  Generalized Advantage Estimation, {CoRR}, v(), (2015).">(Schulman et al., 2015)</a> {#generalized-advantage-estimator--gae}

The variance of a gradient estimator scales unfavourably with the time
horizon, since the effect of an action is confounded with the effects
of past and future actions.

The generalized advantage estimator (GAE) is a fapmily of policy
gradient estimators that **reduce variance of the policy gradient
estimators while maintaining a tolerable level of bias**.

Policy gradient methods maximize the expected total reward by
repeatedly estimating the gradient \\(g\\):

\begin{equation}
  g=\mathbb{E}\left[\sum\_{t=0}^{\infty} \Psi\_{t} \nabla\_{\theta} \log \pi\_{\theta}\left(a\_{t} | s\_{t}\right)\right]
\end{equation}

Where \\( \Psi\_{t} \\) may be one of the following:

\begin{equation}
  \begin{array}{ll}{\text { 1. } \sum\_{t=0}^{\infty} r\_{t} : \text { total reward of the trajectory. }} & {\text { 4. } Q^{\pi}\left(s\_{t}, a\_{t}\right) : \text { state-action value function. }} \\ {\text { 2. } \sum\_{t^{\prime}=t}^{\infty} r\_{t} : \text { reward following action } a\_{t} .} & {\text { 5. } A^{\pi}\left(s\_{t}, a\_{t}\right) : \text { advantage function. }} \\ {\text { 3. } \sum\_{t^{\prime}=t}^{\infty} r\_{t^{\prime}}-b\left(s\_{t}\right) : \text { baselined version of }} & {} \\ {\text { previous formula. }} & {\text { 6. } r\_{t}+V^{\pi}\left(s\_{t+1}\right)-V^{\pi}\left(s\_{t}\right) : \text { TD residual. }}\end{array}
\end{equation}

The choice of \\( \Psi\_{t} = A^{\pi}(s\_t, a\_t)\\) yields almost the
lowest variance, but in practice, the advantage function is not known
and must be approximated.

The parameter \\(\gamma\\) allows us to reduce variance by downweighting
rewards corresponding to delayed effects, at the cost of introducing
bias. This parameter corresponds to the discount factor used in
discounted formulations of MDPs, but is used as variance reduction in
an undiscounted problem.

\begin{equation}
  V^{\pi, \gamma}\left(s\_{t}\right) :=\underset{a\_{s\_{t+1} : \infty}}{\mathbb{E}\_{s\_{t+1 ; \infty}},}\left[\sum\_{l=0}^{\infty} \gamma^{l} r\_{t+l}\right] \quad Q^{\pi, \gamma}\left(s\_{t}, a\_{t}\right) :=\underset{a\_{s\_{t+1} : \infty}}{\mathbb{E}\_{s\_{t+1 ; \infty}},}\left[\sum\_{l=0}^{\infty} \gamma^{l} r\_{t+l}\right]
\end{equation}

\begin{equation}
  A^{\pi, \gamma}\left(s\_{t}, a\_{t}\right) :=Q^{\pi, \gamma}\left(s\_{t}, a\_{t}\right)-V^{\pi, \gamma}\left(s\_{t}\right)
\end{equation}


### Actor Critic {#actor-critic}

Batch actor-critic algorithm:

1.  sample \\(\left\\{ s\_i, a\_i \right\\}\\) from \\(\pi\_\theta (a|s)\\) (run it
    on the robot)
2.  fit \\(\hat{V}\_\phi^\pi (s)\\) to sample reward sums
3.  evaluate \\(\hat{A}^\pi (s\_i, a\_i) = r(s\_i, a\_i) +
       \hat{V}\_\phi^\pi(s\_i') - \hat{V}\_\phi^\pi (s\_i)\\)
4.  \\(\nabla\_\theta J(\theta) \approx \sum\_i \nabla\_\theta \log
       \pi\_\theta(a\_i|s\_i) \hat{A}^\pi (s\_i|a\_i)\\)
5.  \\(\theta \leftarrow \theta + \alpha \nabla\_\theta J(\theta)\\)

<a id="38c18a560d20d4d8d46b43c7dc375d47" href="#sutton2000policy" title="Sutton, McAllester, Singh \&amp; Mansour, Policy gradient methods for reinforcement learning with function approximation, 1057--1063, in in: {Advances in neural information processing systems}, edited by (2000)">(Sutton et al., 2000)</a><a>, </a><a id="5ee60195703614202558f73eaeb64891" href="#mnih16_async_method_deep_reinf_learn" title="Mnih, Badia, Puigdom\`enech, Mirza, Graves, , Lillicrap, Harley, , Silver \&amp; Kavukcuoglu, Asynchronous Methods for Deep Reinforcement  Learning, {CoRR}, v(), (2016).">(Mnih et al., 2016)</a><a>, </a><a id="23ad5881923885616b0afd34dad9df52" href="#gu16_q_prop" title="Gu, Lillicrap, Ghahramani, Zoubin, Turner \&amp; Levine, Q-Prop: Sample-Efficient Policy Gradient With an  Off-Policy Critic, {CoRR}, v(), (2016).">(Gu et al., 2016)</a>


### Deep RL with Q-functions {#deep-rl-with-q-functions}

-   What happens if we Just use a critic without an actor?
-   Extracting a policy from a value function
-   Q-learning algorithm
-   Extension to Q-learning algorithms

-    Instabilities in Q-Learning

    1.  Correlations are present in the sequence of observations
    2.  Small updates to \\(Q\\) may significantly change the policy and
        therefore change the data distribution
    3.  Correlations between the action-values \\(Q\\) and the target values
        \\(r + \gamma \mathrm{max}\_{a'}Q(s', a')\\).

    Full fitted Q-iteration algorithm:

    1.  collect dataset \\(\left\\{ (s\_i, a\_i, s\_i', r\_i)\right\\}\\) using some
        policy
    2.  set \\(y\_i \leftarrow r(s\_i, a\_i) + \gamma \mathrm{max}\_{a\_i'}
           Q\_\phi(s\_i', a\_i')\\)
    3.  set \\(\phi \leftarrow \mathrm{argmin}\_\phi \frac{1}{2} \sum\_i \lVert
           Q\_\phi (s\_i, a\_i) - y\_i \rVert ^2\\)

    Online Q-iteration algorithm:

    1.  take some action \\(a\_i\\) and observe \\((s\_i, a\_i, s\_i', r\_i)\\)
    2.  \\(y\_i = r(s\_i, a\_i) + \gamma \mathrm{max}\_{a'}Q\_\phi(s\_i', a\_i')\\)
    3.  \\(\phi \leftarrow \phi - \alpha \frac{dQ\_\phi}{d\phi} (s\_i, a\_i)
           (Q\_\phi (s\_i, a\_i) - y\_i)\\)

    Q-learning is not gradient descent, and does not converge in general,
    because there are no gradients through target value.


### Deep Q-network (DQN) {#deep-q-network--dqn}

DQN <a id="2be9d1740dee0aea772ef29e59e5766a" href="#Mnih_2015" title="Mnih, Kavukcuoglu, Silver, David, Rusu, Veness, , Bellemare, Graves, Riedmiller, Martin, Fidjeland, Ostrovski, Georg \&amp; et, Human-level control through deep reinforcement  learning, {Nature}, v(7540), 529&#8211;533 (2015).">(Mnih et al., 2015)</a> aims to improve the stability of Q-learning by
introducing 2 mechanisms: **experience replay**, and a **periodically
updated target**.

-    Experience Replay

    All episodic steps \\(e\_t = (S\_t, A\_t, R\_t, S\_{t+1})\\) are stored in a
    replay buffer \\(D\_t = \left\\{e\_1, \dots, e\_t\right\\}\\). \\(D\_t\\) has
    experience tuples over many episodes. During Q-learning updates,
    samples are drawn at random from the replay buffer. This allows for
    multiple reuse of each episode, improving data efficiency, and smooths
    changes in the data distribution.

    Is uniform sampling from the replay buffer the best approach? It is
    expected that some episodes may provide higher expected learning
    progress, and prioritizing these episodes should lead to faster
    learning. Prioritized experience replay
    <a id="63b3f3d1a1abcd81f6cfc4a0b95212d0" href="#schaul15_prior_exper_replay" title="Schaul, Quan, Antonoglou, \&amp; Silver, Prioritized Experience Replay, {CoRR}, v(), (2015).">(Schaul et al., 2015)</a> uses TD-error as a measure of
    expected learning progress, correcting for the introduced bias by
    using importance-sampling weights.

    One ability humans have is to learn almost as much from achieving an
    undesirable outcome as from the desired one. This property is missing
    from many model-free RL algorithms. _Hindsight Experience Replay (HER)_
    <a id="ffaf2d08e446da500e82a251db070767" href="#andrychowicz2017hindsight" title="Andrychowicz, Wolski, Ray, Schneider, Fong, Welinder, McGrew, Tobin, Abbeel \&amp; Zaremba, Hindsight experience replay, 5048--5058, in in: {Advances in Neural Information Processing Systems}, edited by (2017)">(Andrychowicz et al., 2017)</a> allows the algorithm to perform
    this kind of reasoning, and can be combined with any off-policy RL
    algorithm. This is applicable whenever multiple goals may be achieved.
    This makes learning more sample efficient, and possible when rewards
    are sparse.

-    Periodically Updated Target

    The Q-function is optimized towards target values that are only
    periodically updated. The Q-network is cloned, and kept frozen as the
    optimization target every \\(K\\) steps, \\(K\\) being a tunable
    hyperparameter.

    The modified loss function looks like this:

    \begin{equation}
      L(\theta) = \mathcal{E}\_{(s,a,r,s') \sim U(D)}\left[ \left( r +
          \gamma \mathrm{max}\_{a'}Q(s',a';\theta^-)-Q(s,a;\theta) \right)^2 \right]
    \end{equation}

    where \\(U(D)\\) is a uniform distribution over the replay buffer, and
    \\(\theta^-\\) is the parameters of the frozen target Q-network.

    # Bibliography
    <a id="schulman15_high_dimen_contin_contr_using"></a>Schulman, J., Moritz, P., Levine, S., Jordan, M., & Abbeel, P., *High-Dimensional Continuous Control Using Generalized Advantage Estimation*, CoRR, *()*,  (2015).  [↩](#57393aa8ebb8846c7181c31bfd5fbe89)

    <a id="sutton2000policy"></a>Sutton, R. S., McAllester, D. A., Singh, S. P., & Mansour, Y., *Policy gradient methods for reinforcement learning with function approximation*, In , Advances in neural information processing systems (pp. 1057–1063) (2000). : . [↩](#38c18a560d20d4d8d46b43c7dc375d47)

    <a id="mnih16_async_method_deep_reinf_learn"></a>Mnih, V., Badia, Adri\`a Puigdom\`enech, Mirza, M., Graves, A., Lillicrap, T. P., Harley, T., Silver, D., …, *Asynchronous methods for deep reinforcement learning*, CoRR, *()*,  (2016).  [↩](#5ee60195703614202558f73eaeb64891)

    <a id="gu16_q_prop"></a>Gu, S., Lillicrap, T., Ghahramani, Z., Turner, R. E., & Levine, S., *Q-prop: sample-efficient policy gradient with an off-policy critic*, CoRR, *()*,  (2016).  [↩](#23ad5881923885616b0afd34dad9df52)

    <a id="Mnih_2015"></a>Mnih, V., Kavukcuoglu, K., Silver, D., Rusu, A. A., Veness, J., Bellemare, M. G., Graves, A., …, *Human-level control through deep reinforcement learning*, Nature, *518(7540)*, 529–533 (2015).  http://dx.doi.org/10.1038/nature14236 [↩](#2be9d1740dee0aea772ef29e59e5766a)

    <a id="schaul15_prior_exper_replay"></a>Schaul, T., Quan, J., Antonoglou, I., & Silver, D., *Prioritized Experience Replay*, CoRR, *()*,  (2015).  [↩](#63b3f3d1a1abcd81f6cfc4a0b95212d0)

    <a id="andrychowicz2017hindsight"></a>Andrychowicz, M., Wolski, F., Ray, A., Schneider, J., Fong, R., Welinder, P., McGrew, B., …, *Hindsight experience replay*, In , Advances in Neural Information Processing Systems (pp. 5048–5058) (2017). : . [↩](#ffaf2d08e446da500e82a251db070767)

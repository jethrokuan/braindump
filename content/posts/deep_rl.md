+++
title = "Deep Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:26+08:00
draft = false
+++

tags
: [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})

## Why Deep Reinforcement Learning? {#why-deep-reinforcement-learning}

1.  Reinforcement learning provides a mathematical framework for decision-making
2.  Deep learning has shown to be extremely successful in unstructured
    environments (e.g. image, text)
3.  Deep RL allows for end-to-end training of policies
    1.  Features are tedious and difficult to hand-design, and are not
        so transferable across tasks
    2.  Features are informed by the task

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
: estimate the transition model, and then... - use it for planning (no explicit policy) - Trajectory optimization/optimal control (continuous spaces) - Discrete planning in discrete action spaces ([Monte Carlo Tree Search]({{< relref "mcts" >}})) - use it to improve a policy (e.g. via backpropagation, with some tricks) - use the model to learn a value function (e.g. through dynamic programming)

## Why so many RL algorithms? {#why-so-many-rl-algorithms}

- Different tradeoffs
  - sample efficiency
    - is it off policy: can improve policy without generating new
      samples from that policy?
    - however, are samples cheap to obtain?

{{< figure src="/ox-hugo/screenshot2019-12-16_01-35-50_.png" caption="Figure 1: Sample efficiency comparison" >}}

- stability and ease of use (does it converge, and if so to what?)
  - Q-learning: fixed point iteration
  - Model-based RL: model is not optimized for expected reward
- Different assumptions
  - fully observable?
    - generally assumed by value function fitting methods (mitigated
      by adding recurrence)
    - episodic learning
      - generally assumed by pure policy gradient methods
      - assumed by some model-based RL methods
    - continuity or smoothness?
      - assumed by some continuous value function learning methods
      - often assumed by some model-based RL methods
  - stochastic or deterministic?
- Different things are easy or hard in different settings
  - easier to represent the policy?
  - easier to represent the model?

## Challenges in Deep RL {#challenges-in-deep-rl}

### Stability and Hyperparameter Tuning {#stability-and-hyperparameter-tuning}

- Devising stable RL algorithms is hard
- Can't run hyperparameter sweeps in the real world

Would like algorithms with favourable improvement and convergence
properties:

- Trust region policy optimization
  ([Schulman et al., n.d.](#org9d9d010))

or algorithms that adaptively adjust parameters:

- Q-Prop ([Gu et al., n.d.](#org46bc8cd))

### Problem Formulation {#problem-formulation}

- Multi-task reinforcement learning and generalization
- Unsupervised or self-supervised learning

## Resources {#resources}

1.  [CS285 Fall 2019 - YouTube](https://www.youtube.com/playlist?list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A)
2.  [Welcome to Spinning Up in Deep RL! — Spinning Up documentation](https://spinningup.openai.com/en/latest/)
    ([Tensorflow](https://github.com/openai/spinningup), [Pytorch](https://github.com/kashif/firedup/))
3.  [David Silver's Deep RL ICML Tutorial](https://www.icml.cc/2016/tutorials/deep%5Frl%5Ftutorial.pdf)

## Bibliography {#bibliography}

<a id="org46bc8cd"></a>Gu, Shixiang, Timothy Lillicrap, Zoubin Ghahramani, Richard E. Turner, and Sergey Levine. n.d. “Q-Prop: Sample-Efficient Policy Gradient with an Off-Policy Critic.” <http://arxiv.org/abs/1611.02247v3>.

<a id="org9d9d010"></a>Schulman, John, Philipp Moritz, Sergey Levine, Michael Jordan, and Pieter Abbeel. n.d. “High-Dimensional Continuous Control Using Generalized Advantage Estimation.” <http://arxiv.org/abs/1506.02438v6>.

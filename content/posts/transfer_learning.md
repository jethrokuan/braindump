+++
title = "Transfer Learning"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Reinforcement Learning ⭐]({{<relref "reinforcement_learning.md#" >}})

Prior understanding of problem structure can help us solve complex
tasks quickly. Perhaps solving prior tasks would help acquire useful
knowledge for solving a new task.

Transfer learning is the _use of experience from one set of tasks for
faster learning and better performance on a new task_.


## Few-Shot Learning {#few-shot-learning}

"shot" refers to the number of attempts in the target domain. For
example, in 0-shot learning, a policy trained in the source domain
works in the target domain.

This typically requires assumptions of similarity between source and
target domain.


## Taxonomy of Transfer Learning {#taxonomy-of-transfer-learning}

"forward" transfer
: train on one task, transfer to a new task
    -   Randomizing source domain
    -   Fine-tuning

multi-task transfer
: train on many tasks, transfer to a new task
    -   generate highly randomized source domains
    -   model-based RL
    -   model distillation
    -   contextual policies
    -   modular policy networks

multi-task meta-learning
: learn to learn from many tasks
    -   RNN-based/Gradient-based meta-learning


## Forward Transfer {#forward-transfer}


### Fine-tuning {#fine-tuning}

_Key Idea_: Train on the source task, then train some more on the target
task, for example, by retraining the weights on the last layer. Lower
layers are likely to learn representations from the source task that
are useful in the target task. This works well if the source task is
broad and diverse.

Fine tuning is popular in the supervised learning setting.


#### Why fine-tuning doesn't work well for RL {#why-fine-tuning-doesn-t-work-well-for-rl}

1.  RL tasks tend to be narrow (not broad and diverse), and features
    are less general
2.  RL methods tend to learn deterministic policies, the policies that
    are optimal in the fully-observed MDP.
    1.  Low-entropy policies adapt very slowly to new settings
    2.  Little exploration at convergence

To increase diversity and entropy, we can do maximum-entropy learning
which acts as randomly as possible while collecting high rewards ([Haarnoja et al., n.d.](#orgf773a01)):

\begin{equation}
  \pi(a|s) = \mathrm{exp} (Q\_\phi(s,a)-V(s))
\end{equation}

This optimizes

\begin{equation}
  \sum\_t E\_{\pi(s\_t, a\_t)}[r(s\_t, a\_t)] + E\_{\pi(s\_t)}[\mathcal{H}(\pi(a\_t|s\_t))]
\end{equation}


### Manipulating the Source Domain {#manipulating-the-source-domain}

This is used where we can design the source domain (e.g. training in a
simulator, which can be tweaked). Injecting randomness/diversity in
the source tends to be helpful.

Resources:

-   [Domain Randomization for Sim2Real Transfer](https://lilianweng.github.io/lil-log/2019/05/05/domain-randomization.html)


## Multi-task Transfer {#multi-task-transfer}

Some things remain constant across tasks, such as the laws of physics.
Model-based RL may learn these laws, and transfer this knowledge
across multiple tasks.

In model distillation, multiple policies are combined into one, for
concurrent multi-task learning. Policy distillation
([Rusu et al., n.d.](#org2ee8d95)) is able to:

1.  Compress policies learnt on single games into smaller models
2.  Build agents capable of playing multiple games
3.  Improve the stability of the [DQN learning algorithm]({{<relref "q_learning.md#" >}}) by distilling
    online the policy of the best performing agent


## Bibliography {#bibliography}

<a id="orgf773a01"></a>Haarnoja, Tuomas, Haoran Tang, Pieter Abbeel, and Sergey Levine. n.d. “Reinforcement Learning with Deep Energy-Based Policies.” In _Proceedings of the 34th International Conference on Machine Learning_, edited by Doina Precup and Yee Whye Teh, 70:1352–61. Proceedings of Machine Learning Research. PMLR. <http://proceedings.mlr.press/v70/haarnoja17a.html>.

<a id="org2ee8d95"></a>Rusu, Andrei A., Sergio Gomez Colmenarejo, Caglar Gulcehre, Guillaume Desjardins, James Kirkpatrick, Razvan Pascanu, Volodymyr Mnih, Koray Kavukcuoglu, and Raia Hadsell. n.d. “Policy Distillation.” <http://arxiv.org/abs/1511.06295v2>.
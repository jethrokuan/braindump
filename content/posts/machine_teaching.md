+++
title = "Machine Teaching"
author = ["Jethro Kuan"]
lastmod = 2019-03-08T08:56:34+08:00
tags = ["machine-learning"]
draft = false
math = true
+++

## Definitions <sup id="b5c1005733dab7e951e8ecd46dff695f"><a href="#simard17_machin_teach" title="Simard, Amershi, , Chickering, Pelton, , Ghorashi, Meek, Ramos, Gonzalo, Suh, Verwey, Wang, \&amp; Wernsing, Machine Teaching: a New Paradigm for Building  Machine Learning Systems, {CoRR}, v(), (2017).">(Simard {\it et al.}, 2017)</a></sup> {#definitions}

machine learning research
: machine learning research aims at
    making the learner better by improving ML algorithms

machine teaching research
: machine teaching research aims at
    making the teacher more productive at building machine learning
    models


## Problem Formulation {#problem-formulation}

Machine learning takes a given training dataset \\(D\\) and learns a model
\\(\hat{\theta}\\). The learner can take various formrs, including version
space learners, Bayesian learners, deep neural networks, or cognitive
models.

In contrast, in machine teaching the target model \\(\theta^\*\\) is given,
and the teacher finds a teaching set \\(D\\) -- not necessarily i.i.d. -
such that a machine learner trained on \\(D\\) will approximately learn
\\(\theta^\*\\).

In machine teaching, we wish to solve the following optimization
problem:

\begin{align}
  \begin{matrix}
    \textrm{min}\_{D, \hat{\theta}} & \textrm{TeachingRisk}(\hat{\theta}) +
                             \eta \textrm{TeachingCost}(D) \\\\\\
  \textrm{s.t.} & \hat{\theta} = \textrm{MachineLearning}(D).
  \end{matrix}
\end{align}

Where \\(\textrm{TeachingRisk(\hat{\theta})}\\) is a generic function for
how unsatisfied the teacher is. The target model \\(\theta^\*\\) is folded
into the teaching risk function. The teaching cost function is also
generalized beyond the number of teaching items. For example,
different teaching items may have different cognitive burdens for a
human student to absorb. <sup id="caa5573af457f4ae7bf053810593bdf7"><a href="#zhu18_overv_machin_teach" title="Zhu, Singla, Zilles, \&amp; Rafferty, An Overview of Machine Teaching, {CoRR}, v(), (2018).">(Zhu {\it et al.}, 2018)</a></sup>

There are other formulations of machine teaching that place different
constraints on the teaching. For example, one may want to minimize the
teaching cost, while constraining the teaching risk, or instead choose
to optimize the teaching risk given constraints on the teaching cost.


## Why bother if \\(\theta^\*\\) is known? {#why-bother-if--theta--is-known}

There are applications where the teacher needs to convey the target
model \\(\theta^\*\\) to a learner via training data. For example:

-   In education problems, the teacher may know \\(\theta^\*\\) but is unable
    to telepathize the model to the students. If the teacher possesses a
    good cognitive model on how students learn from samples, they can
    use machine teaching to optimize the choice of learning examples.
-   In training-set poisoning, an attacker manipulates the behaviour of
    a machine learning system by maliciously modifying the training
    data. An attacker knowing the algorithm may send specially designed
    training examples to manipulate the learning algorithm.


## Faster Teaching Via POMDP Teaching <sup id="20d8df4efc7c1861be90e93bf2bf9231"><a href="#Rafferty_2015" title="Rafferty, Brunskill, Griffiths, Thomas \&amp; Shafto, Faster Teaching via POMDP Planning, {Cognitive Science}, v(6), 1290&#8211;1332 (2015).">(Rafferty {\it et al.}, 2015)</a></sup> {#faster-teaching-via-pomdp-teaching}

The authors formulate teaching as a POMDP, and use a
decision-theoretic approach to planning teaching. Assuming knowledge
about the student's learning model, the teacher is able to find
optimal teaching actions.

{{< figure src="/ox-hugo/screenshot_2019-05-18_12-53-37.png" >}}

A POMDP is specified as a tuple:

\begin{equation}
  \langle S, A, Z, p(s'|s, a), p(z|s,a), r(s,a), \gamma \rangle
\end{equation}

S
: set of states

A
: set of actions

Z
: set of observations

\\(p(s' | s, a)\\)
: transition model

\\(p(z|s, a)\\)
: Probability of observing z

\\(r(s,a)\\)
: Reward/cost model

\\(\gamma\\)
: Discount factor

POMDP planning seeks to choose actions that minimize
\\(\sum\_{t=0}^\infty \gamma^t r(s\_t, a\_t)\\).

The learner model specifies the space \\(S\\) of possible knowledge
states, and transition model \\(p(s'|s ,a)\\) for how knowledge changes.

Simple learner models for concept learning can be specified. For
example, in the memoryless model, if an action is consistent with the
current concept, then the state stays the same. Else, the learner
transitions to a state that is consistent with the action, with
probability proportional to the prior probability of the concept:

\begin{equation}
  p(s\_{t+1} = c\_i | s\_t = c\_j , a\_t) = \begin{cases}
    p\_0(c\_i) & \textrm{ if $c\_i$ is consistent with $a\_t$} \\\\\\
    0 & \textrm{otherwise}
  \end{cases}
\end{equation}

Experiments showed that POMDP planning leads to faster teaching.


### Limitations {#limitations}

1.  POMDP relies on having models of learning. The models that we
    currently have do not fully model human learning. Human learners
    can also learn better if they are aware they are being taught. The
    models are not accurate enough to know when to decide to terminate
    teaching.
2.  Beyond time to teach, it is difficult to incorporate other factors
    such as motivation. The learners may have their own reward
    function, and a joint optimization of the student and teacher
    rewards is computationally more difficult.
3.  POMDP can be computationally intractable, requiring the use of
    techniques such as MCTS and forward search, sampling only possible
    actions taken.


##  {#}

# Bibliography
<a id="simard17_machin_teach"></a>Simard, P. Y., Amershi, S., Chickering, D. M., Pelton, A. E., Ghorashi, S., Meek, C., Ramos, G., …, *Machine teaching: a new paradigm for building machine learning systems*, CoRR, *()*,  (2017).  [↩](#b5c1005733dab7e951e8ecd46dff695f)

<a id="zhu18_overv_machin_teach"></a>Zhu, X., Singla, A., Zilles, S., & Rafferty, A. N., *An overview of machine teaching*, CoRR, *()*,  (2018).  [↩](#caa5573af457f4ae7bf053810593bdf7)

<a id="Rafferty_2015"></a>Rafferty, A. N., Brunskill, E., Griffiths, T. L., & Shafto, P., *Faster teaching via pomdp planning*, Cognitive Science, *40(6)*, 1290–1332 (2015).  http://dx.doi.org/10.1111/cogs.12290 [↩](#20d8df4efc7c1861be90e93bf2bf9231)

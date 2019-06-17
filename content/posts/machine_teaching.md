+++
title = "Machine Teaching"
author = ["Jethro Kuan"]
lastmod = 2019-06-17T14:28:33+08:00
tags = ["machine-learning"]
draft = false
math = true
+++

## Definitions <a id="b5c1005733dab7e951e8ecd46dff695f" href="#simard17_machin_teach" title="Simard, Amershi, , Chickering, Pelton, , Ghorashi, Meek, Ramos, Gonzalo, Suh, Verwey, Wang, \&amp; Wernsing, Machine Teaching: a New Paradigm for Building  Machine Learning Systems, {CoRR}, v(), (2017).">(Simard et al., 2017)</a> {#definitions}

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
human student to absorb. <a id="caa5573af457f4ae7bf053810593bdf7" href="#zhu18_overv_machin_teach" title="Zhu, Singla, Zilles, \&amp; Rafferty, An Overview of Machine Teaching, {CoRR}, v(), (2018).">(Zhu et al., 2018)</a>

There are other formulations of machine teaching that place different
constraints on the teaching. For example, one may want to minimize the
teaching cost, while constraining the teaching risk, or instead choose
to optimize the teaching risk given constraints on the teaching cost.


### Why bother if \\(\theta^\*\\) is known? {#why-bother-if--theta--is-known}

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


## Faster Teaching Via POMDP Teaching <a id="20d8df4efc7c1861be90e93bf2bf9231" href="#Rafferty_2015" title="Rafferty, Brunskill, Griffiths, Thomas \&amp; Shafto, Faster Teaching via POMDP Planning, {Cognitive Science}, v(6), 1290&#8211;1332 (2015).">(Rafferty et al., 2015)</a> {#faster-teaching-via-pomdp-teaching}

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
    teaching. **Are we able to learn to teach without explicitly
    assuming a student model?**

2.  Beyond time to teach, it is difficult to incorporate other factors
    such as motivation. The learners may have their own reward
    function, and a joint optimization of the student and teacher
    rewards is computationally more difficult.

3.  POMDP can be computationally intractable, requiring the use of
    techniques such as MCTS and forward search, sampling only possible
    actions taken.
    1.  Suppose a task is modelled with a discrete state space. A task
        with 1000 states will result in a belief state of 1000
        dimensions. To overcome this "curse of dimensionality",
        point-based POMDP algorithms like HSVI2 and SARSOP use
        probabilistic sampling.

    2.  One can also factor out the fully observable state components to
        reduce the dimensionality of the belief space into \\(S = X \times
              Y\\), where \\(X\\) is the space of all possible values fully
        observable variables, and \\(Y\\) is the space of partially
        observable variables.  <a id="b4b7f43790c8103452a6d9a6561a6727" href="#Du2010APA" title="Yanzhu Du, David Hsu, Hanna Kurniawati, Wee Sun Lee, Sylvie Ong \&amp; Shao Wei Png, A POMDP Approach to Robot Motion Planning under Uncertainty, in edited by (2010)">(Yanzhu Du et al., 2010)</a> Since state variable \\(x\\)
        is fully observable, we only need to maintain belief \\(b\_Y\\) for
        the state variables in \\(Y\\).


## Machine Teaching For Inverse Reinforcement Learning <a id="2729f1e86d52c599d1e5b0d6d75a3b47" href="#brown18_machin_teach_inver_reinf_learn" title="Brown \&amp; Niekum, Machine Teaching for Inverse Reinforcement Learning:  Algorithms and Applications, {CoRR}, v(), (2018).">(Brown \& Niekum, 2018)</a> {#machine-teaching-for-inverse-reinforcement-learning}

Optimal Teaching for IRL gives:

1.  Insights into the intrinsic difficulty of teaching certain
    sequential decision-making tasks
2.  Provides a lower bound on the number of samples needed by the
    active IRL algorithm
3.  Optimal teaching can be used to design algorithms that better
    leverage highly informative demonstrations which do not follow the
    i.i.d assumptions made by many IRL applications


### Machine Teaching Problem for IRL {#machine-teaching-problem-for-irl}

Given an MDP, \\(M\\), and the teacher's reward function, \\(R^\* =
\mathbf{w}^{\*^T} \phi (s)\\), find the set of demonstrations, \\(D\\), that
minimizes the following optimization problem:

\begin{equation}
  \textrm{min}\_{D} \textrm{TeachingCost}(D) \textrm{ s.t. } \textrm{Loss}(\mathbf{w^\*}, \hat{\mathbf{w}}) \le \epsilon, \hat{\mathbf{w}} = IRL(D)
\end{equation}

Optimizing this is hard, since there are a large number of candidate
sets of demonstrations, and the IRL problem needs to be solved for
each candidate set. The paper proposes a greedy set-cover
approximation algorithm that requires solving only a single
policy-evaluation problem, using the Behavioural Equivalence Class
(BEC) of the teacher's policy.


## Teaching Inverse Reinforcement Learners via Features and Demonstrations <a id="255bc1a536215d32ce8dfd159d3c4d7a" href="#haug18_teach_inver_reinf_learn_via_featur_demon" title="Haug, Tschiatschek, Singla \&amp; Adish, Teaching Inverse Reinforcement Learners Via Features  and Demonstrations, {CoRR}, v(), (2018).">(Haug et al., 2018)</a> {#teaching-inverse-reinforcement-learners-via-features-and-demonstrations}

It is difficult to specify a reward function that captures all
important aspects. In these situations, learning from demonstrations
transforms the need of specifying this reward function to the task of
providing examples of optimal behaviour.

The paper considers the following setting:

-   The true reward function is a linear combination of features known
    to the teacher
-   The learner also assumes the reward function is a linear combination
    of features, different from the important ones (e.g. observing only
    a subset)
-   The _teaching risk_ is proposed to bound the performance gap of the
    teacher and learner as a function of the learner's worldview

Teaching risk is defined as:

\begin{equation}
  \rho\left(A^{L} ; \mathbf{w}^{\*}\right) :=\max \_{v \in \operatorname{ker} A^{L},\\|v\\| \leq 1}\left\langle\mathbf{w}^{\*}, v\right\rangle
\end{equation}

Where \\(A^L\\) is the learner's worldview. Geometrically it is the cosine
of the angle between ker \\(A^L\\) and \\(\mathbf{w}^\*\\).

Limiting the set of teachable features, choosing features that allow
for minimizing teaching risk experimentally shows better performance
than randomly choosing features.


## Learner-aware Teaching: Inverse Reinforcement Learning with Preferences and Constraints <a id="2d73f677b073c0fc37c32e652da58e0d" href="#tschiatschek19_learn_aware_teach" title="Tschiatschek, Ghosh, Haug, Luis, Devidze \&amp; Singla, Learner-Aware Teaching: Inverse Reinforcement  Learning With Preferences and Constraints, {CoRR}, v(), (2019).">(Tschiatschek et al., 2019)</a> {#learner-aware-teaching-inverse-reinforcement-learning-with-preferences-and-constraints}

This paper considers the setting where the learner has preferences.
This captures:

1.  behavioural bias
2.  mismatched worldviews
3.  physical constraints

Learner-aware teaching shows significant performance improvements

_Math of the paper is beyond me right now._


## Interactive Teaching Algorithms for Inverse Reinforcement Learning <a id="d5cdce41e67580ca88216f11069230f8" href="#kamalaruban19_inter_teach_algor_inver_reinf_learn" title="Kamalaruban, Devidze, , Cevher \&amp; Singla, Interactive Teaching Algorithms for Inverse  Reinforcement Learning, {CoRR}, v(), (2019).">(Kamalaruban et al., 2019)</a> {#interactive-teaching-algorithms-for-inverse-reinforcement-learning}

Considers the setting where the learner is assisted by a teacher. Two
sub-settings are considered:

1.  Where the teacher can fully observe the student's current policy,
    and understands the student's dynamics (for theoretical bounds)
2.  Where the teacher only has a noisy estimate of the learner's
    current policy, and does not understand the student's dynamics

The environment is modelled as a MDP, where the learner does not have
access to the reward furncion R. The teaching objective is to achieve
a high-performing policy through learning from teacher demonstrations.

The learner is asssumed to use the MCE-IRL algorithm. Theoretical
analysis of the omniscient teacher shows that only \\(O(\log
\frac{1}{\epsilon})\\) demonstrations are required to achieve the
teaching objective, an exponential improvement compared to selecting
demonstrations at random.

In the black box setting, the strategy considered picks the most
informative demonstration. This is evaluated experimentally. The black
box teacher is shown to learn faster than the agnostic teacher, in
both the linear and non-linear reward setting. In the non-linear
reward setting, both learners are unable to learn a good policy, but
in the black box teaching setting progress is made much quicker.

_Would be interesting to work through the proofs._


## Bayesian Teaching {#bayesian-teaching}

Bayesian teaching aims to induce a target model in the learner by
presenting teaching sets of data. This involves two sides of
inference:

1.  Teacher's inference: over the space of possible teaching sets
2.  Learner's inference: over the space of possible target models


### Bayesian Teaching as Model Explanation {#bayesian-teaching-as-model-explanation}

The intuition is that subsets of training data that lead a model to
the same (or approximately similar) inference as the model trained on
all the data should be useful for understanding the fitted model.
<a id="f88402a68a48e8e87e35ad010169c296" href="#ravi_bayesian_teaching_mnist" title="@misc{ravi_bayesian_teaching_mnist,
  author =       {Ravi Sojitra},
  howpublished =
                  {https://ravisoji.com/2018/03/04/bayesian-teaching-as-explanation.html},
  note =         {Online; accessed 19 May 2019},
  title =        {Bayesian Teaching as Model Explanation: An MNIST Example},
  year =         {2018},
}">@misc{ravi_bayesian_teaching_mnist,
  author =       {Ravi Sojitra},
  howpublished =
                  {https://ravisoji.com/2018/03/04/bayesian-teaching-as-explanation.html},
  note =         {Online; accessed 19 May 2019},
  title =        {Bayesian Teaching as Model Explanation: An MNIST Example},
  year =         {2018},
}</a>

Below is an example of using Bayesian teaching, limited to a teaching
set of dimension 2, to understand an MNIST model.

{{< figure src="/ox-hugo/screenshot_2019-05-19_16-30-05.png" >}}

One can inspect the best and worst teaching sets to understand what
the model finds to be the best and worst representations for a
particular number.

Hence, Bayesian teaching is also useful in telling us which examples
are most valuable: better suited to induce the desired target model.


##  {#}

# Bibliography
<a id="simard17_machin_teach"></a>Simard, P. Y., Amershi, S., Chickering, D. M., Pelton, A. E., Ghorashi, S., Meek, C., Ramos, G., …, *Machine teaching: a new paradigm for building machine learning systems*, CoRR, *()*,  (2017).  [↩](#b5c1005733dab7e951e8ecd46dff695f)

<a id="zhu18_overv_machin_teach"></a>Zhu, X., Singla, A., Zilles, S., & Rafferty, A. N., *An overview of machine teaching*, CoRR, *()*,  (2018).  [↩](#caa5573af457f4ae7bf053810593bdf7)

<a id="Rafferty_2015"></a>Rafferty, A. N., Brunskill, E., Griffiths, T. L., & Shafto, P., *Faster teaching via pomdp planning*, Cognitive Science, *40(6)*, 1290–1332 (2015).  http://dx.doi.org/10.1111/cogs.12290 [↩](#20d8df4efc7c1861be90e93bf2bf9231)

<a id="Du2010APA"></a>Du, Y., Hsu, D., Kurniawati, H., Lee, W. S., Ong, S. C. W., & Png, S. W., *A pomdp approach to robot motion planning under uncertainty*, In ,  (pp. ) (2010). : . [↩](#b4b7f43790c8103452a6d9a6561a6727)

<a id="brown18_machin_teach_inver_reinf_learn"></a>Brown, D. S., & Niekum, S., *Machine teaching for inverse reinforcement learning: algorithms and applications*, CoRR, *()*,  (2018).  [↩](#2729f1e86d52c599d1e5b0d6d75a3b47)

<a id="haug18_teach_inver_reinf_learn_via_featur_demon"></a>Haug, L., Tschiatschek, S., & Singla, A., *Teaching inverse reinforcement learners via features and demonstrations*, CoRR, *()*,  (2018).  [↩](#255bc1a536215d32ce8dfd159d3c4d7a)

<a id="tschiatschek19_learn_aware_teach"></a>Tschiatschek, S., Ghosh, A., Haug, L., Devidze, R., & Singla, A., *Learner-aware teaching: inverse reinforcement learning with preferences and constraints*, CoRR, *()*,  (2019).  [↩](#2d73f677b073c0fc37c32e652da58e0d)

<a id="kamalaruban19_inter_teach_algor_inver_reinf_learn"></a>Kamalaruban, P., Devidze, R., Cevher, V., & Singla, A., *Interactive teaching algorithms for inverse reinforcement learning*, CoRR, *()*,  (2019).  [↩](#d5cdce41e67580ca88216f11069230f8)

<a id="ravi_bayesian_teaching_mnist"></a>Sojitra, R. (2018). *Bayesian teaching as model explanation: an mnist example*. Retrieved from [https://ravisoji.com/2018/03/04/bayesian-teaching-as-explanation.html](https://ravisoji.com/2018/03/04/bayesian-teaching-as-explanation.html). Online; accessed 19 May 2019. [↩](#f88402a68a48e8e87e35ad010169c296)

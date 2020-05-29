+++
title = "Machine Teaching"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:02:45+08:00
draft = false
+++

tags
: [§machine\_learning]({{< relref "machine_learning" >}})

## Definitions <a id="b5c1005733dab7e951e8ecd46dff695f" href="#simard17_machin_teach">(Simard et al., 2017)</a> {#definitions}

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
human student to absorb. <a id="caa5573af457f4ae7bf053810593bdf7" href="#zhu18_overv_machin_teach">(Zhu et al., 2018)</a>

There are other formulations of machine teaching that place different
constraints on the teaching. For example, one may want to minimize the
teaching cost, while constraining the teaching risk, or instead choose
to optimize the teaching risk given constraints on the teaching cost.

### Why bother if \\(\theta^\*\\) is known? {#why-bother-if--theta--is-known}

There are applications where the teacher needs to convey the target
model \\(\theta^\*\\) to a learner via training data. For example:

- In education problems, the teacher may know \\(\theta^\*\\) but is unable
  to telepathize the model to the students. If the teacher possesses a
  good cognitive model on how students learn from samples, they can
  use machine teaching to optimize the choice of learning examples.
- In training-set poisoning, an attacker manipulates the behaviour of
  a machine learning system by maliciously modifying the training
  data. An attacker knowing the algorithm may send specially designed
  training examples to manipulate the learning algorithm.

## Faster Teaching Via POMDP Teaching <a id="20d8df4efc7c1861be90e93bf2bf9231" href="#Rafferty_2015">(Rafferty et al., 2015)</a> {#faster-teaching-via-pomdp-teaching}

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
\\(\sum\_{t=0}^\infty \gamma^t r(s_t, a_t)\\).

The learner model specifies the space \\(S\\) of possible knowledge
states, and transition model \\(p(s'|s ,a)\\) for how knowledge changes.

Simple learner models for concept learning can be specified. For
example, in the memoryless model, if an action is consistent with the
current concept, then the state stays the same. Else, the learner
transitions to a state that is consistent with the action, with
probability proportional to the prior probability of the concept:

\begin{equation}
p(s\_{t+1} = c_i | s_t = c_j , a_t) = \begin{cases}
p_0(c_i) & \textrm{ if $c\_i$ is consistent with $a\_t$} \\\\\\
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
        observable variables. <a id="b4b7f43790c8103452a6d9a6561a6727" href="#Du2010APA">(Yanzhu Du et al., 2010)</a> Since state variable \\(x\\)
        is fully observable, we only need to maintain belief \\(b_Y\\) for
        the state variables in \\(Y\\).

## Machine Teaching For Inverse Reinforcement Learning <a id="2729f1e86d52c599d1e5b0d6d75a3b47" href="#brown18_machin_teach_inver_reinf_learn">(Brown \& Niekum, 2018)</a> {#machine-teaching-for-inverse-reinforcement-learning}

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
\textrm{min}\_{D} \textrm{TeachingCost}(D) \textrm{ s.t. }
\textrm{Loss}(\mathbf{w^\*}, \hat{\mathbf{w}}) \le \epsilon,
\hat{\mathbf{w}} = IRL(D)
\end{equation}

Optimizing this is hard, since there are a large number of candidate
sets of demonstrations, and the IRL problem needs to be solved for
each candidate set. The paper proposes a greedy set-cover
approximation algorithm that requires solving only a single
policy-evaluation problem, using the Behavioural Equivalence Class
(BEC) of the teacher's policy.

## Teaching Inverse Reinforcement Learners via Features and Demonstrations <a id="255bc1a536215d32ce8dfd159d3c4d7a" href="#haug18_teach_inver_reinf_learn_via_featur_demon">(Haug et al., 2018)</a> {#teaching-inverse-reinforcement-learners-via-features-and-demonstrations}

It is difficult to specify a reward function that captures all
important aspects. In these situations, learning from demonstrations
transforms the need of specifying this reward function to the task of
providing examples of optimal behaviour.

The paper considers the following setting:

- The true reward function is a linear combination of features known
  to the teacher
- The learner also assumes the reward function is a linear combination
  of features, different from the important ones (e.g. observing only
  a subset)
- The _teaching risk_ is proposed to bound the performance gap of the
  teacher and learner as a function of the learner's worldview

Teaching risk is defined as:

\begin{equation}
\rho\left(A^{L} ; \mathbf{w}^{\*}\right) :=\max \_{v \in
\operatorname{ker} A^{L},\\|v\\| \leq 1}\left\langle\mathbf{w}^{\*},
v\right\rangle
\end{equation}

Where \\(A^L\\) is the learner's worldview. Geometrically it is the cosine
of the angle between ker \\(A^L\\) and \\(\mathbf{w}^\*\\).

Limiting the set of teachable features, choosing features that allow
for minimizing teaching risk experimentally shows better performance
than randomly choosing features.

## Learner-aware Teaching: Inverse Reinforcement Learning with Preferences and Constraints <a id="2d73f677b073c0fc37c32e652da58e0d" href="#tschiatschek19_learn_aware_teach">(Tschiatschek et al., 2019)</a> {#learner-aware-teaching-inverse-reinforcement-learning-with-preferences-and-constraints}

This paper considers the setting where the learner has preferences.
This captures:

1.  behavioural bias
2.  mismatched worldviews
3.  physical constraints

Learner-aware teaching shows significant performance improvements

_Math of the paper is beyond me right now._

## Interactive Teaching Algorithms for Inverse Reinforcement Learning <a id="d5cdce41e67580ca88216f11069230f8" href="#kamalaruban19_inter_teach_algor_inver_reinf_learn">(Kamalaruban et al., 2019)</a> {#interactive-teaching-algorithms-for-inverse-reinforcement-learning}

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
<a id="f88402a68a48e8e87e35ad010169c296" href="#ravi_bayesian_teaching_mnist">(Ravi Sojitra, 2018)</a>

Below is an example of using Bayesian teaching, limited to a teaching
set of dimension 2, to understand an MNIST model.

{{< figure src="/ox-hugo/screenshot_2019-05-19_16-30-05.png" >}}

One can inspect the best and worst teaching sets to understand what
the model finds to be the best and worst representations for a
particular number.

Hence, Bayesian teaching is also useful in telling us which examples
are most valuable: better suited to induce the desired target model.

## Learning To Interactively Learn and Assist <a id="126795725ed501c93990ffff037191f4" href="#woodward19_learn_to_inter_learn_assis">(Woodward et al., 2019)</a> {#learning-to-interactively-learn-and-assist}

Rewards and demonstrations are often defined and collected before
training begins, when the human is most uncertain about what
information would help the agent.

Key idea: use _interactive learning_ in contrast to rewards or
demonstrative learning to enable an agent to learn from another agent
who knows the current task.

Interactive learning

## Robot Teaching and the Sim2Real gap {#robot-teaching-and-the-sim2real-gap}

Obtaining real-world training data can be expensive, and many RL
algorithms are sample-inefficient. Hence, many models are trained in a
simulated environment, and the "sim2real" gap causes these models to
perform poorly on real-world tasks.
<a id="1f99c4b9974f48e237e3ce698feb574b" href="#lilian_domain_random_sim2r_trans">(Lilian Weng, 2019)</a>

There are several approaches to closing the sim2real gap:

1.  System Identification
    - _System identification_ involves building a mathematical model for
      a physical system. This requires careful calibration, which can
      be expensive.
2.  Domain Adaptation
    - This refers to a set of transfer learning techniques that update
      the data distribution in the simulated environment to match that
      of the real world. Many of these are build on adversarial loss or GAN.
3.  Domain Randomization
    - A variety of simulated environments with randomized properties
      are created, and to allow for training a robust model that works
      across all these environments.

Both DA and DR are unsupervised. While DA requires a large amount of
real data samples to capture the distribution, DR requires little to no
real data.

### Domain Randomization {#domain-randomization}

<!--list-separator-->

- Definitions

  source domain
  : The environment we have full access to (the
  simulator). This is where training happens.

  target domain
  : The environment we want to transfer our model to
  (the real world)

  randomization parameters
  : A set of parameters in the source
  domain, which we can sample \\(\xi\\)

<!--list-separator-->

- Goal

  During policy training, episodes are collected from the source domain
  with randomization applied. The policy learns to generalize across
  all the environments. The policy parameter \\(\theta\\) is trained to
  maximize the expected reward \\(R(\cdot)\\) average across a distribution
  of configurations:

  \begin{equation}
  \theta^{\*}=\arg \max \_{\theta} \mathbb{E}\_{\xi \sim \Xi}\left[\mathbb{E}\_{\pi\_{\theta}, \tau \sim e\_{\xi}}[R(\tau)]\right]
  \end{equation}

  where \\(\tau\_{\xi}\\) is a trajectory collected in the source domain
  randomized with \\(\xi\\). **Discrepancies between the source and target
  domains are modelled as variability in the source domain**.

  In _uniform domain randomization_, each randomization parameter
  \\(\xi\_{i}\\) is bounded by an interval \\(\xi\_{i}
  \in\left[\xi\_{i}^{\mathrm{low}}, \xi\_{i}^{\mathrm{high}}\right], i=1,
  \ldots, N\\), and each parameter is uniformly sampled within the range.

   <!--list-separator-->

  - <span class="org-todo todo TODO">TODO</span> read <https://arxiv.org/abs/1703.06907>, <https://arxiv.org/abs/1611.04201>

<!--list-separator-->

- <span class="org-todo todo TODO">TODO</span> Domain Randomization as Optimization (read <https://arxiv.org/abs/1903.11774>)

  One can view learning of randomization parameters as a bilevel
  optimization.

  Assume we have access to the real environment \\(e\_{\textrm{real}}\\) and
  the randomization configuration is sampled from a distribution
  parameterized by \\(\phi\\), \\(\xi \sim P\_{\phi}(\xi)\\), we would like to
  learn a distribution on which policy \\(\pi\_\theta\\) is trained on can
  achieve maximal performance in \\(e\_{\textrm{real}}\\):

  \begin{equation}
  \begin{array}{c}{\phi^{\*}=\arg \min \_{\phi}
  \mathcal{L}\left(\pi\_{\theta^{\prime}(\phi)} ; e\_{\text { real
  }}\right)} \\ {\text { where } \theta^{\*}(\phi)=\arg \min
  \_{\theta} \mathbb{E}\_{\xi \sim
  P\_{\phi}(\xi)}\left[\mathcal{L}\left(\pi\_{\theta} ;
  e\_{\xi}\right)\right]}\end{array}
  \end{equation}

  where \\(\mathcal{L}(\pi ; e)\\) is the loss function of policy \\(\pi\\)
  evaluated in the environment \\(e\\).

<!--list-separator-->

- Guided Domain Randomization

  Vanilla Domain Randomization assumes to access to the real data, and
  randomization configuration is sampled as broadly and uniformly as
  possible in sim, hoping that the real environment is covered under
  this broad distribution.

  **Idea:** guide domain randomization to use configurations that are "more
  realistic". This avoids training models in unrealistic environments.

<!--list-separator-->

- <span class="org-todo todo TODO">TODO</span> read <https://arxiv.org/abs/1805.09501>

## Invariant Risk Minimization <a id="5feb37b967977943f69738d540e822e8" href="#arjovsky19_invar_risk_minim">(Arjovsky et al., 2019)</a> {#invariant-risk-minimization}

Key idea: To learn invariances across environments, find a data
representation such that the optimal classifier on top of that
representation matches for all environments.

Consider a cow/camel classifier. If we train on labeled images where
most pictures of cows are taken on green pastures, and pictures of
camels in desserts, the classifier may learn to classify green
landscapes as cows, and beige landscapes as camels.

To solve this problem, we need to identify which properties of the
training data are spurious correlations (e.g. background), and which
are actual phenomenon of interest (animal shape). Spurious
correlations are expected not to hold in unseen data.

The goal is to learn correlations invariant across training
environments.

### {#}

# Bibliography

<a id="simard17_machin_teach" target="_blank">Simard, P. Y., Amershi, S., Chickering, D. M., Pelton, A. E., Ghorashi, S., Meek, C., Ramos, G., …, _Machine teaching: a new paradigm for building machine learning systems_, CoRR, _()_, (2017). </a> [↩](#b5c1005733dab7e951e8ecd46dff695f)

<a id="zhu18_overv_machin_teach" target="_blank">Zhu, X., Singla, A., Zilles, S., & Rafferty, A. N., _An overview of machine teaching_, CoRR, _()_, (2018). </a> [↩](#caa5573af457f4ae7bf053810593bdf7)

<a id="Rafferty_2015" target="_blank">Rafferty, A. N., Brunskill, E., Griffiths, T. L., & Shafto, P., _Faster teaching via pomdp planning_, Cognitive Science, _40(6)_, 1290–1332 (2015). http://dx.doi.org/10.1111/cogs.12290</a> [↩](#20d8df4efc7c1861be90e93bf2bf9231)

<a id="Du2010APA" target="_blank">Du, Y., Hsu, D., Kurniawati, H., Lee, W. S., Ong, S. C. W., & Png, S. W., _A pomdp approach to robot motion planning under uncertainty_, In , (pp. ) (2010). : .</a> [↩](#b4b7f43790c8103452a6d9a6561a6727)

<a id="brown18_machin_teach_inver_reinf_learn" target="_blank">Brown, D. S., & Niekum, S., _Machine teaching for inverse reinforcement learning: algorithms and applications_, CoRR, _()_, (2018). </a> [↩](#2729f1e86d52c599d1e5b0d6d75a3b47)

<a id="haug18_teach_inver_reinf_learn_via_featur_demon" target="_blank">Haug, L., Tschiatschek, S., & Singla, A., _Teaching inverse reinforcement learners via features and demonstrations_, CoRR, _()_, (2018). </a> [↩](#255bc1a536215d32ce8dfd159d3c4d7a)

<a id="tschiatschek19_learn_aware_teach" target="_blank">Tschiatschek, S., Ghosh, A., Haug, L., Devidze, R., & Singla, A., _Learner-aware teaching: inverse reinforcement learning with preferences and constraints_, CoRR, _()_, (2019). </a> [↩](#2d73f677b073c0fc37c32e652da58e0d)

<a id="kamalaruban19_inter_teach_algor_inver_reinf_learn" target="_blank">Kamalaruban, P., Devidze, R., Cevher, V., & Singla, A., _Interactive teaching algorithms for inverse reinforcement learning_, CoRR, _()_, (2019). </a> [↩](#d5cdce41e67580ca88216f11069230f8)

<a id="ravi_bayesian_teaching_mnist" target="_blank">Sojitra, R. (2018). _Bayesian teaching as model explanation: an mnist example_. Retrieved from [https://ravisoji.com/2018/03/04/bayesian-teaching-as-explanation.html](https://ravisoji.com/2018/03/04/bayesian-teaching-as-explanation.html). Online; accessed 19 May 2019.</a> [↩](#f88402a68a48e8e87e35ad010169c296)

<a id="woodward19_learn_to_inter_learn_assis" target="_blank">Woodward, M., Finn, C., & Hausman, K., _Learning to interactively learn and assist_, CoRR, _()_, (2019). </a> [↩](#126795725ed501c93990ffff037191f4)

<a id="lilian_domain_random_sim2r_trans" target="_blank">Weng, L. (2019). _Domain randomization for sim2real transfer_. Retrieved from [https://lilianweng.github.io/lil-log/2019/05/05/domain-randomization.html](https://lilianweng.github.io/lil-log/2019/05/05/domain-randomization.html). Online; accessed 28 June 2019.</a> [↩](#1f99c4b9974f48e237e3ce698feb574b)

<a id="arjovsky19_invar_risk_minim" target="_blank">Arjovsky, M., Bottou, L\'eon, Gulrajani, I., & Lopez-Paz, D., _Invariant Risk Minimization_, CoRR, _()_, (2019). </a> [↩](#5feb37b967977943f69738d540e822e8)

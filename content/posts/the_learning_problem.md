+++
title = "The Learning Problem"
author = ["Jethro Kuan"]
draft = false
+++

In [Machine Learning]({{<relref "machine_learning.md#" >}}), an agent is said to be _learning_ if it improves its
performance P on task T based on experience/observations/data E. T must be
fixed, P must be measurable, E must exist. See [Learning agents]({{<relref "artificial_intelligence.md#" >}}).


## Types of Learning {#types-of-learning}


### Active vs Passive Learning {#active-vs-passive-learning}

An active learner interacts with the environment at training time,
(e.g. by posing queries or performing experiments), while a passive
learner only observes the information provided by the environment.


### Online vs Batch Learning {#online-vs-batch-learning}

In online learning, the hypothesis has to be updated each time a new
label is received.


### Reinforcement Learning {#reinforcement-learning}

Each action in a state has an associated cost and a probability
distribution of the next state.

Goal is to learn a policy (mapping from state to action) that
minimizes the sum of expected current and future costs.


### Supervised Learning {#supervised-learning}

Since learning involves an interaction between the learner and the
environment, one can divide tasks according to the nature of that
interaction.

Supervised learning describes a scenario in which the training
examples contain significant information that is missing in the unseen
"test examples". In unsupervised learning, there is no distinction
between the training and test data. The goal is to come up with some
summary, or compressed version of that data.


#### Measure of success {#measure-of-success}

A loss function helps measure our success. Given a set \\(H\\) of hypothesis of
models, and a domain \\(Z\\), let \\(l\\) be a function from \\(H \times Z\\) to
non-negative real numbers \\(l: H \times Z \rightarrow \mathbb{R}\_{+}\\).

The _risk function_ is the expected loss of the hypothesis,

\begin{equation\*}
  L\_D(h) = E\_{z \sim D}[l(h,z)]
\end{equation\*}

We are interested in finding a hypothesis \\(h\\) that has a small risk,
or expected loss, typically using [Empirical Risk Minimization]({{<relref "erm.md#" >}}).


#### Assumptions Made ⚠ {#assumptions-made}

1.  One common assumption is that the data in the data generation
    process is independently and identically distributed (IID),
    according to the distribution \\(D\\).

Q: Given a large enough training set, do you expect the long term test
error to be similar to the training error?

-   If IID, then yes
-   If not, there is likely dependencies, but under certain conditions,
    yes.
    -   If sampling mixes well, it will not take long for D' to look
        like a steady set distribution.
-   If dependencies are exploited, there is a possibility of attaining
    lower training and test error.


## Is Learning Feasible? {#is-learning-feasible}

The target function \\(f\\) that we want to learn is unknown. The
performance of a hypothesis on the training set \\(D\\) tells us nothing
about the performance on the data outside of \\(D\\).

As long as \\(f\\) is unknown, knowing \\(D\\) cannot exclude any patterns of
\\(f\\) outside of \\(D\\), and the predictions of \\(g\\) would be meaningless.


### Probabilistic View {#probabilistic-view}

If we accept a probabilistic answer, that is \\(D\\) tells us something
likely about \\(f\\) outside of \\(D\\), then learning is feasible, only with
a small price.

Learning a hypothesis \\(g\\) approximates the target function \\(f\\) well,
i.e. \\(E\_{out}(g) \approx 0\\). However, probabilistic analysis via
Hoeffding's Inequality gives \\(E\_{out}(g) \approx E\_{in}(g)\\).
Therefore, we still need to ensure \\(E\_{in}(g) \approx 0\\).
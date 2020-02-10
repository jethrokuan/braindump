+++
title = "Model-Based Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2020-02-10T20:17:29+08:00
draft = false
+++

In model-free [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}}), we assumed that \\(p(s\_{t+1} |
s\_t, a\_t)\\) is unknown, and no attempt is made to learn it. However, we
often know the dynamics. For example, in games such as chess, and
easily modeled systems, like car navigation.

Model-based Reinforcement learning is about learning system dynamics,
and using the learnt system to make decisions.

In the stochastic _open-loop_ case,

\begin{equation}
  p\_{\theta}(s\_1, \dots, s\_T | a\_1, \dots, a\_T) = p(s\_1)
  \prod\_{t=1}^{T} p(s\_{t+1} | s\_t, a\_t)
\end{equation}

and we'd want to choose:

\begin{equation}
  a\_1, \dots, a\_T = \mathrm{argmax}\_{a\_1, \dots, a\_T} E \left[
    \sum\_{t} r(s\_t, a\_t) | a\_1, \dots, a\_T \right]
\end{equation}

In a **closed-loop** setting, the process by which the agent performs
actions receives feedback. Planning in the open-loop case can go
extremely awry.

In the stochastic _closed-loop_ case,

\begin{equation}
  p(s\_1, a\_1, \dots, s\_T, a\_T) = p(s\_1) \prod\_{t=1}^{T} \pi(a\_t | s\_t)
  p(s\_{t+1} | s\_t, a\_t)
\end{equation}

where \\(\pi = \mathrm{argmax}\_{\pi}E\_{\tau \sim p(\tau)} \left[ \sum\_t
r(s\_t, a\_t)\right]\\)


## Simple Model-based RL {#simple-model-based-rl}

The most basic algorithm does this:

1.  Run base policy to obtain tuples \\((s\_{t+1}, s\_t, a\_t)\\)
2.  Use supervised learning on the tuples to learn the dynamics \\(f(s\_t,
       a\_t)\\), minimizing loss \\(\sum\_i |f(s\_t, a\_t) - s\_{t+1}|^2\\)
3.  Use the learnt model for control

Problem: _distributional shift_. We learn from some base distribution
\\(\pi\_{0}\\), but control via \\(\pi\_{f}\\). This can be addressed by
re-sampling \\((s, a, s')\\) to \\(D\\) after step 3.


## Performance gap in model-based RL {#performance-gap-in-model-based-rl}

Model-based RL tends to plateau in performance much earlier than
model-free RL. This is because it needs to use a function approximator
that:

1.  Does not overfit a low amount of samples
2.  But also is expressive enough

And this turns out to be hard. Below, the model is overfitted, and the
planner might want to exploit going to this non-existent peak, and
result in nonsensical behaviour.

![](/ox-hugo/screenshot2019-12-23_14-31-15_.png)
We can use _uncertainty estimation_ to detect where the models may be
wrong, for example by using [§gaussian\_processes]({{< relref "gaussian_processes" >}}).

For planning under uncertainty, one can use the expected value,
optimistic value, or pessimistic value, depending on application.


## How can we have uncertainty-aware models? {#how-can-we-have-uncertainty-aware-models}

1.  ~~Use output entropy: high entropy means model is uncertain.~~
    1.  But model might overfit and be confident, but wrong!
2.  Estimate model uncertainty: the model is certain about the data,
    but we are not certain about the model.
    1.  estimate \\(\log p(\theta | D)\\)
3.  Or use Bayesian NN, Bootstrap ensembles


## Problems with model-based RL {#problems-with-model-based-rl}

1.  High dimensionality
2.  Redundancy


### Partial observability {#partial-observability}

Latent space models: separately learn \\(p(o\_t | s\_t)\\) (observation
model; high dimensional, but not dynamic) and \\(p(s\_{t+1} | s\_t,
a\_t)\\) (dynamics model; low dimensional, but dynamic), and \\(p(r\_t |
s\_t, a\_t)\\) (reward model).

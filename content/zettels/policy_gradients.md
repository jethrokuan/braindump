+++
title = "Policy Gradients"
author = ["Jethro Kuan"]
lastmod = 2020-02-10T20:18:20+08:00
draft = false
+++

tags
: [Machine Learning Algorithms]({{< relref "machine_learning_algorithms" >}}), [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})


## Key Idea {#key-idea}

The objective is:

\begin{equation}
  \theta^{\star}=\arg \max \_{\theta} E\_{\tau \sim p\_{\theta}(\tau)}\left[\sum\_{t} r\left(\mathbf{s}\_{t}, \mathbf{a}\_{t}\right)\right]
\end{equation}

To evaluate the objective, we need to estimate this expectation, often
through sampling by generating multiple samples from the distribution:

\begin{equation}
  J(\theta)=E\_{\tau \sim p\_{\theta}(\tau)}\left[\sum\_{t} r\left(\mathbf{s}\_{t}, \mathbf{a}\_{t}\right)\right] \approx \frac{1}{N} \sum\_{i} \sum\_{t} r\left(\mathbf{s}\_{i, t}, \mathbf{a}\_{i, t}\right)
\end{equation}

Recall that:

\begin{equation}
  \nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N} \underbrace{\nabla\_{\theta} \log \pi\_{\theta}\left(\tau\_{i}\right)}\_{\sum\_{t=1}^{T} \nabla\_{\theta} \log \_{\theta} \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right)}r\left(\tau\_{i}\right)
\end{equation}

This makes the good stuff more likely, and bad stuff less likely, but
scaled by the rewards.


### Comparison to Maximum Likelihood {#comparison-to-maximum-likelihood}

policy gradient
: \\(\nabla\_{\theta} J(\theta) \approx \frac{1}{N}
      \sum\_{i=1}^{N}\left(\sum\_{t=1}^{T} \nabla\_{\theta} \log
      \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i,
      t}\right)\right)\left(\sum\_{t=1}^{T} r\left(\mathbf{s}\_{i, t},
      \mathbf{a}\_{i, t}\right)\right)\\)

maximum likelihood
: \\(\nabla\_{\theta} J\_{\mathrm{ML}}(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N}\left(\sum\_{t=1}^{T} \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right)\right)\\)


### Partial Observability {#partial-observability}

The policy gradient method does not assume that the system follows the
[Markovian Assumption]({{< relref "markovian_assumption" >}})! The algorithm only requires the ability to
generate samples, and a function approximator for
\\(\pi\_{\theta}(a\_t |o\_t)\\).


## Issues {#issues}

-   Policy gradients have high variance: the gradient is noisy, easily
    affected by a constant change in rewards


## Properties of Policy gradients {#properties-of-policy-gradients}

1.  On-policy

The objective is an expectation under trajectories sampled under that
policy. This can be tweaked into an off-policy method using
[Importance Sampling]({{< relref "importance_sampling" >}}).

{{< figure src="/ox-hugo/screenshot2019-12-16_13-24-18_.png" caption="Figure 1: Off-policy policy gradients" >}}

\begin{aligned} \nabla\_{\theta^{\prime}} J\left(\theta^{\prime}\right) &=E\_{\tau \sim \pi\_{\theta}(\tau)}\left[\frac{\pi\_{\theta^{\prime}}(\tau)}{\pi\_{\theta}(\tau)} \nabla\_{\theta^{\prime}} \log \pi\_{\theta^{\prime}}(\tau) r(\tau)\right] \quad \text { when } \theta \neq \theta^{\prime} \\ &=E\_{\tau \sim \pi\_{\theta}(\tau)}\left[\left(\prod\_{t=1}^{T} \frac{\pi\_{\theta^{\prime}}\left(\mathbf{a}\_{t} | \mathbf{s}\_{t}\right)}{\pi\_{\theta}\left(\mathbf{a}\_{t} | \mathbf{s}\_{t}\right)}\right)\left(\sum\_{t=1}^{T} \nabla\_{\theta^{\prime}} \log \pi\_{\theta^{\prime}}\left(\mathbf{a}\_{t} | \mathbf{s}\_{t}\right)\right)\left(\sum\_{t=1}^{T} r\left(\mathbf{s}\_{t}, \mathbf{a}\_{t}\right)\right)\right] \end{aligned}

Problem: with large T the first term becomes extremely big or small.


## Variance Reduction {#variance-reduction}


### Causality {#causality}

The policy at time \\(t'\\) cannot affect the reward at time \\(t\\) when \\(t <
   t'\\).

\begin{equation}
  \nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N}\left(\sum\_{t=1}^{T} \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right)\right)\left(\sum\_{t=t'}^{T} r\left(\mathbf{s}\_{i, t}, \mathbf{a}\_{i, t}\right)\right)
\end{equation}

This is still an unbiased estimator, and has lower variance because
the gradients are multiplied by smaller values. This is often written
as:

\begin{equation}
  \nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N} \sum\_{t=1}^{T} \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right) \hat{Q}\_{i, t}
\end{equation}

where \\(\hat{Q}\_{i,t}\\) is the reward-to-go.


### Baseline Reduction {#baseline-reduction}

\begin{equation}
  \nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N} \nabla\_{\theta} \log \pi\_{\theta}(\tau)[r(\tau)-b]
\end{equation}

Subtracting a baseline is unbiased in expectation, but may reduce the
variance. We can compute the optimal baseline, by evaluating the
variance of the gradient, and setting the derivative of the variance
with respect to \\(b\\) to 0:

{{< figure src="/ox-hugo/screenshot2019-12-16_13-17-00_.png" caption="Figure 2: Computing the optimal baseline" >}}

This is just expected reward, but weighted by gradient magnitudes.


## Policy Gradient in practice {#policy-gradient-in-practice}

-   Gradients have high variance
-   Consider using much larger batches
-   Tweaking learning rates might be important
-   Adaptive learning rates are fine, there are some policy-gradient
    oriented learning rate adjustment methods


## REINFORCE {#reinforce}

1.  For each episode,
    1.  generate \\(\tau = s\_0, a\_0, r\_1, \dots, s\_{t-1},
              a\_{t-1}, r\_t\\) by following \\(\pi\_{\theta}(a |s)\\)
    2.  For each step \\(i = 0, \dots, t-1\\):
        1.  \\(R\_i = \sum\_{k=i}^{t} \gamma^{t-k} r\_k\\) (Unbiased estimate of
            remaining episode return under \\(\pi\_{\theta}\\) starting from \\(i\\))
        2.  \\(\hat{A\_i} = R\_i - b\\) (Advantage function: subtract base line \\(b\\) to lower variance)
            1.  Advantage function tells you how relatively good this
                action is
        3.  $&theta; = \\(\theta + \alpha \nabla\_\theta \log \pi\_{\theta}
                     (a| s\_i) \hat{A}\_i\\)

Objective: \\(J(\theta) = \sum\_{\tau} P\_{\theta}(\tau)R(\tau)\\)

\begin{align}
  \nabla\_\theta J(\theta) &=  \nabla\_\theta \sum\_{\tau} P\_\theta(\tau)
                            R(\tau) \\\\\\
                          &= \sum\_{\tau} \nabla\_\theta P\_\theta(\tau)R(\tau)
\end{align}

Actor critics use learned estimate (e.g. $\hat{A}(s, a) = \hat{Q}(s,
a) - \hat{V}(s).)


## Policy Gradients an Policy Iteration {#policy-gradients-an-policy-iteration}

Policy gradients involves estimating \\(\hat{A}{s,a}\\), and using it to
improve the policy, much like policy iteration which evaluates
\\(A(s,a)\\) and use it to create a better, deterministic policy.

\begin{align}
  J(\theta') - J(\theta)  &= J(\theta') - E\_{s\_0 \sim p(s\_1)}\left[
                            V^{\pi\_\theta}(s\_0) \right] \\\\\\
                          &=J(\theta') - E\_{\tau \sim p\_{\theta'}(\tau)}\left[
                            V^{\pi\_\theta}(s\_0) \right] \\\\\\
                          &= J(\theta') - E\_{\tau \sim
                            p\_{\theta'}(\tau)} \left[
                            \sum\_{t=0}^{\infty} \gamma^t
                            V^{\pi\_\theta} (s\_t) - \sum\_{t=1}^{\infty} \gamma^t
                            V^{\pi\_\theta} (s\_t)\right] \\\\\\
                          &= J(\theta') + E\_{\tau \sim
                            p\_{\theta'}(\tau)} \left[
                            \sum\_{t=0}^{\infty} \gamma^t (\gamma
                            V^{\pi\_\theta}(s\_{t+1}) -
                            V^{\pi\_\theta})(s\_t) \right] \\\\\\
                          &= E\_{\tau \sim \p\_{\theta'}(\tau)} \left[
                            \sum\_{t=0}^{\infty} \gamma^t r(s\_t, a\_t)
                            \right] + E\_{\tau \sim
                            p\_{\theta'}(\tau)} \left[
                            \sum\_{t=0}^{\infty} \gamma^t (\gamma
                            V^{\pi\_\theta}(s\_{t+1}) -
                            V^{\pi\_\theta})(s\_t) \right] \\\\\\
                          &= E\_{\tau \sim p\_{\theta'}(\tau)} \left[
    \sum\_t \gamma^t A^{\pi\_\theta} (s\_t, a,\_t) \right]
\end{align}

We have an expectation under \\(\theta'\\), but samples under \\(\theta\\). We
use marginals representation, and [Importance Sampling]({{< relref "importance_sampling" >}}) to remove the
expectation under \\(\pi\_\theta'\\), but can we ignore the other
distribution mismatch?

{{< figure src="/ox-hugo/screenshot2019-12-19_14-47-34_.png" >}}

We can bound the distribution change from \\(p\_{\theta}(s\_t)\\) to
\\(p\_{\theta'}(s\_t)\\). (See Trust Region Policy Optimization paper)

We can measure the distribution mismatch with KL divergence.

Then, we can enforce the constraint of a small KL divergence by using
a loss function with  the Lagrange Multiplier:

\begin{equation}
  L(\theta', \lambda) = \sum\_{t} E\_{s\_t \sim p\_\theta(s\_t)} \left[
    E\_{a\_t \sim \pi\_{theta}(a\_t|s\_t)} \left[
      \frac{p\_{theta'}(a\_t|s\_t)}{p\_\theta(a\_t|s\_t)} \gamma^t
      A^{\pi\_\theta} (s\_t, a\_t) \right] \right] - \lambda \left(
    D\_{KL}(\pi\_{\theta'}(a\_t|s\_t) || \pi\_\theta (a\_t|s\_t)) - \epsilon \right)
\end{equation}

1.  Maximize \\(L'\\) wrt to \\(\theta'\\)
2.  \\(\lambda  \leftarrow \lambda + \alpha (D\_{KL} - \epsilon)\\)

Intuition: raise \\(\lambda\\) if constraint violated too much, else lower
it.

Alternatively, optimize within some region, and use a Taylor expansion
to approximate the function within that region.


## Natural Gradients {#natural-gradients}


## Resources {#resources}

-   [Deep Reinforcement Learning Through Policy Optimization - NIPS 2016 Tutorial](https://nips.cc/Conferences/2016/Schedule?showEvent=6198)
-   [CS285 Fa19 9/16/19 - YouTube](https://www.youtube.com/watch?v=Ds1trXd6pos&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=6&t=0s)
-   [CS285 Fa19 9/30/19 - YouTube](https://www.youtube.com/watch?v=uR1Ubd2hAlE&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=10&t=0s)

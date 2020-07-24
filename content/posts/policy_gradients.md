+++
title = "Policy Gradients"
author = ["Jethro Kuan"]
lastmod = 2020-07-24T23:17:05+08:00
draft = false
+++

tags
: [Machine Learning Algorithms]({{< relref "machine_learning_algorithms" >}}), [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})

## Key Idea {#key-idea}

The objective is:

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_2a1bdc9e7dd8048742cb312f1c2816472e1b1ba5.png" alt="policy_gradients_2a1bdc9e7dd8048742cb312f1c2816472e1b1ba5.png" />
</span>
<span class="equation-label">
1
</span>
</div>

To evaluate the objective, we need to estimate this expectation, often
through sampling by generating multiple samples from the distribution:

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_52caaca9055fdb7d627a86bc0c0faad45d160bfc.png" alt="policy_gradients_52caaca9055fdb7d627a86bc0c0faad45d160bfc.png" />
</span>
<span class="equation-label">
2
</span>
</div>

Recall that:

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_27b9b836defc721d60aac854c382562e469de7a8.png" alt="policy_gradients_27b9b836defc721d60aac854c382562e469de7a8.png" />
</span>
<span class="equation-label">
3
</span>
</div>

This makes the good stuff more likely, and bad stuff less likely, but
scaled by the rewards.

### Comparison to Maximum Likelihood {#comparison-to-maximum-likelihood}

policy gradient
: <img src="file:///tmp/ltximg/policy_gradients_3e5f477193c682cfdefe925fb5317c65c7957f75.png" alt="policy_gradients_3e5f477193c682cfdefe925fb5317c65c7957f75.png" />

maximum likelihood
: <img src="file:///tmp/ltximg/policy_gradients_1b936a0f960c211058a02086676406b709e3095c.png" alt="policy_gradients_1b936a0f960c211058a02086676406b709e3095c.png" />

### Partial Observability {#partial-observability}

The policy gradient method does not assume that the system follows the
[Markovian Assumption]({{< relref "markovian_assumption" >}})! The algorithm only requires the ability to
generate samples, and a function approximator for
<img src="file:///tmp/ltximg/policy_gradients_26c0188fe2777e8c3929d1963c10b4549f0cb0b3.png" alt="policy_gradients_26c0188fe2777e8c3929d1963c10b4549f0cb0b3.png" />.

## Issues {#issues}

- Policy gradients have high variance: the gradient is noisy, easily
  affected by a constant change in rewards

## Properties of Policy gradients {#properties-of-policy-gradients}

1.  On-policy

The objective is an expectation under trajectories sampled under that
policy. This can be tweaked into an off-policy method using
[Importance Sampling]({{< relref "importance_sampling" >}}).

{{< figure src="/ox-hugo/screenshot2019-12-16_13-24-18_.png" caption="Figure 1: Off-policy policy gradients" >}}

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_e79ee30c961fb9943960ee6c89172bbc1e2d9708.png" alt="policy_gradients_e79ee30c961fb9943960ee6c89172bbc1e2d9708.png" />
</span>
<span class="equation-label">
4
</span>
</div>

Problem: with large T the first term becomes extremely big or small.

## Variance Reduction {#variance-reduction}

### Causality {#causality}

The policy at time <img src="file:///tmp/ltximg/policy_gradients_d53c844885179a2e946a9454c1be23f17821dcf6.png" alt="policy_gradients_d53c844885179a2e946a9454c1be23f17821dcf6.png" /> cannot affect the reward at time <img src="file:///tmp/ltximg/policy_gradients_2f1652c3ed738663624a0b7b35d348a6a23bef71.png" alt="policy_gradients_2f1652c3ed738663624a0b7b35d348a6a23bef71.png" /> when <img src="file:///tmp/ltximg/policy_gradients_25f39c7b8ef04a76f1388c5ac35a6386f55fd574.png" alt="policy_gradients_25f39c7b8ef04a76f1388c5ac35a6386f55fd574.png" />.

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_3a619058355c3f77073852d7b8f0d9ed8df81d00.png" alt="policy_gradients_3a619058355c3f77073852d7b8f0d9ed8df81d00.png" />
</span>
<span class="equation-label">
5
</span>
</div>

This is still an unbiased estimator, and has lower variance because
the gradients are multiplied by smaller values. This is often written
as:

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_744029c44db8314cf9e9e9c1a3ea89810b9c1e6f.png" alt="policy_gradients_744029c44db8314cf9e9e9c1a3ea89810b9c1e6f.png" />
</span>
<span class="equation-label">
6
</span>
</div>

where <img src="file:///tmp/ltximg/policy_gradients_0b918be4bd07a2ca573e49e7a1874eb56cda26e1.png" alt="policy_gradients_0b918be4bd07a2ca573e49e7a1874eb56cda26e1.png" /> is the reward-to-go.

### Baseline Reduction {#baseline-reduction}

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_5bb766618d8bc2c3d529b2d4808010cbdc0a323a.png" alt="policy_gradients_5bb766618d8bc2c3d529b2d4808010cbdc0a323a.png" />
</span>
<span class="equation-label">
7
</span>
</div>

Subtracting a baseline is unbiased in expectation, but may reduce the
variance. We can compute the optimal baseline, by evaluating the
variance of the gradient, and setting the derivative of the variance
with respect to <img src="file:///tmp/ltximg/policy_gradients_8a6bef24e96521055b306fb2b15c5402141af4e2.png" alt="policy_gradients_8a6bef24e96521055b306fb2b15c5402141af4e2.png" /> to 0:

{{< figure src="/ox-hugo/screenshot2019-12-16_13-17-00_.png" caption="Figure 2: Computing the optimal baseline" >}}

This is just expected reward, but weighted by gradient magnitudes.

## Policy Gradient in practice {#policy-gradient-in-practice}

- Gradients have high variance
- Consider using much larger batches
- Tweaking learning rates might be important
- Adaptive learning rates are fine, there are some policy-gradient
  oriented learning rate adjustment methods

## REINFORCE {#reinforce}

1.  For each episode,
    1.  generate <img src="file:///tmp/ltximg/policy_gradients_dcbf214d496dd1392c14741d45f80b32fa4bdc3b.png" alt="policy_gradients_dcbf214d496dd1392c14741d45f80b32fa4bdc3b.png" /> by following <img src="file:///tmp/ltximg/policy_gradients_47a0d5c6b754297f4edae880d63637eb6946252f.png" alt="policy_gradients_47a0d5c6b754297f4edae880d63637eb6946252f.png" />
    2.  For each step <img src="file:///tmp/ltximg/policy_gradients_765d3b3acb374e9a43caf265628b9b27f26e96a8.png" alt="policy_gradients_765d3b3acb374e9a43caf265628b9b27f26e96a8.png" />:
        1.  <img src="file:///tmp/ltximg/policy_gradients_4d773c9bb602d17bed1977420a4aa3abacdf4f12.png" alt="policy_gradients_4d773c9bb602d17bed1977420a4aa3abacdf4f12.png" /> (Unbiased estimate of
            remaining episode return under <img src="file:///tmp/ltximg/policy_gradients_9552890f817d28ea03f67f0936bd1a576f3584fc.png" alt="policy_gradients_9552890f817d28ea03f67f0936bd1a576f3584fc.png" /> starting from <img src="file:///tmp/ltximg/policy_gradients_ccdcc7aa0c5631b5cd6bcc0ee8a7ab02386bf002.png" alt="policy_gradients_ccdcc7aa0c5631b5cd6bcc0ee8a7ab02386bf002.png" />)
        2.  <img src="file:///tmp/ltximg/policy_gradients_31b6d7516fab04e8d2528e33c55a085b532293ef.png" alt="policy_gradients_31b6d7516fab04e8d2528e33c55a085b532293ef.png" /> (Advantage function: subtract base line <img src="file:///tmp/ltximg/policy_gradients_8a6bef24e96521055b306fb2b15c5402141af4e2.png" alt="policy_gradients_8a6bef24e96521055b306fb2b15c5402141af4e2.png" /> to lower variance)
            1.  Advantage function tells you how relatively good this
                action is
        3.  \$&theta; = <img src="file:///tmp/ltximg/policy_gradients_563025362a06567d90969e1579b4cacf85bf18ba.png" alt="policy_gradients_563025362a06567d90969e1579b4cacf85bf18ba.png" />

Objective: <img src="file:///tmp/ltximg/policy_gradients_23e8ae9cb803192dfa28e2d95694b64dd3917332.png" alt="policy_gradients_23e8ae9cb803192dfa28e2d95694b64dd3917332.png" />

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_3e82538392dbe7350a2a3ae1edd7846e7d7c00d7.png" alt="policy_gradients_3e82538392dbe7350a2a3ae1edd7846e7d7c00d7.png" />
</span>
<span class="equation-label">
8
</span>
</div>

Actor critics use learned estimate (e.g. \$(s, a) = (s,
a) - (s).)

## Policy Gradients an Policy Iteration {#policy-gradients-an-policy-iteration}

Policy gradients involves estimating <img src="file:///tmp/ltximg/policy_gradients_6f18ff6bac95c905ec6d7c528210ef0ad5c3e8ae.png" alt="policy_gradients_6f18ff6bac95c905ec6d7c528210ef0ad5c3e8ae.png" />, and using it to
improve the policy, much like policy iteration which evaluates
<img src="file:///tmp/ltximg/policy_gradients_773c4394a39e85263b87d3e3f04d246ebcf67fd9.png" alt="policy_gradients_773c4394a39e85263b87d3e3f04d246ebcf67fd9.png" /> and use it to create a better, deterministic policy.

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_43a8f6b52e7ac7b0a5ebe5f307bb0e82cdeb093f.png" alt="policy_gradients_43a8f6b52e7ac7b0a5ebe5f307bb0e82cdeb093f.png" />
</span>
<span class="equation-label">
9
</span>
</div>

We have an expectation under <img src="file:///tmp/ltximg/policy_gradients_7692207305cca1bcf57fb587a0bb4709ce9ff1fd.png" alt="policy_gradients_7692207305cca1bcf57fb587a0bb4709ce9ff1fd.png" />, but samples under <img src="file:///tmp/ltximg/policy_gradients_fa1189b66964fe54fa0c439c267ecab1a776d842.png" alt="policy_gradients_fa1189b66964fe54fa0c439c267ecab1a776d842.png" />. We
use marginals representation, and [Importance Sampling]({{< relref "importance_sampling" >}}) to remove the
expectation under <img src="file:///tmp/ltximg/policy_gradients_1d80709cb9fb0c7d6d95da9bd22008c79d0ca7da.png" alt="policy_gradients_1d80709cb9fb0c7d6d95da9bd22008c79d0ca7da.png" />, but can we ignore the other
distribution mismatch?

{{< figure src="/ox-hugo/screenshot2019-12-19_14-47-34_.png" >}}

We can bound the distribution change from <img src="file:///tmp/ltximg/policy_gradients_2e38cfe8d3f54109fa2de5d37ecc9734fdc03662.png" alt="policy_gradients_2e38cfe8d3f54109fa2de5d37ecc9734fdc03662.png" /> to
<img src="file:///tmp/ltximg/policy_gradients_1b244f78f553c3efc6021856016590be3a217d1a.png" alt="policy_gradients_1b244f78f553c3efc6021856016590be3a217d1a.png" />. (See Trust Region Policy Optimization paper)

We can measure the distribution mismatch with KL divergence.

Then, we can enforce the constraint of a small KL divergence by using
a loss function with the Lagrange Multiplier:

<div class="equation-container">
<span class="equation">
<img src="file:///tmp/ltximg/policy_gradients_1d0569e6d926c8b74b1bfeea663a1a778edf269f.png" alt="policy_gradients_1d0569e6d926c8b74b1bfeea663a1a778edf269f.png" />
</span>
<span class="equation-label">
10
</span>
</div>

1.  Maximize <img src="file:///tmp/ltximg/policy_gradients_d9cf4f4c1b4823cbaee09c84549cf1e985929713.png" alt="policy_gradients_d9cf4f4c1b4823cbaee09c84549cf1e985929713.png" /> wrt to <img src="file:///tmp/ltximg/policy_gradients_7692207305cca1bcf57fb587a0bb4709ce9ff1fd.png" alt="policy_gradients_7692207305cca1bcf57fb587a0bb4709ce9ff1fd.png" />
2.  <img src="file:///tmp/ltximg/policy_gradients_125e834c910d63e21daae530af555b75410d9b79.png" alt="policy_gradients_125e834c910d63e21daae530af555b75410d9b79.png" />

Intuition: raise <img src="file:///tmp/ltximg/policy_gradients_72c4c1bec2c356dc97436fbd65b09848c5fd93bc.png" alt="policy_gradients_72c4c1bec2c356dc97436fbd65b09848c5fd93bc.png" /> if constraint violated too much, else lower
it.

Alternatively, optimize within some region, and use a Taylor expansion
to approximate the function within that region.

## Natural Gradients {#natural-gradients}

## Resources {#resources}

- [Deep Reinforcement Learning Through Policy Optimization - NIPS 2016 Tutorial](https://nips.cc/Conferences/2016/Schedule?showEvent=6198)
- [CS285 Fa19 9/16/19 - YouTube](https://www.youtube.com/watch?v=Ds1trXd6pos&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=6&t=0s)
- [CS285 Fa19 9/30/19 - YouTube](https://www.youtube.com/watch?v=uR1Ubd2hAlE&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=10&t=0s)

## Backlinks {#backlinks}

- [Actor-Critic]({{< relref "actor_critic" >}})
- [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})
- [Q-Learning]({{< relref "q_learning" >}})
- [All pages]({{< relref "sitemap" >}})

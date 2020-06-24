+++
title = "Information-Theoretic Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:10:33+08:00
draft = false
+++

Can we learn _without_ any reward function at all?

## Identities {#identities}

entropy
: \\(\mathcal{H}(p(x)) = - E\_{x \sim p(x)}[\log p(x)]\\)

mutual information
: \\(\mathcal{I}(x;y) = D\_{KL}(p(x,y) || p(x)p(y))\\)

## Information theoretic quantities in RL {#information-theoretic-quantities-in-rl}

\\(\pi(s)\\)
: state marginal distribution of policy \\(\pi\\)

\\(\mathcal{H}(\pi(s))\\)
: state marginal entropy of policy \\(\pi\\)

empowerment
: \\(\mathcal{I}(s\_{t+1};a_t) = \mathcal{H}(s\_{t+1}) - \mathcal{H}(s\_{t+1}|a_t)\\)

## Papers {#papers}

- Skew-Fit ([Pong et al. 2019](#orgf95208d))
- Diversity is All your Need ([Eysenbach et al. 2018](#org84ed6da))

## Bibliography {#bibliography}

<a id="org84ed6da"></a>Eysenbach, Benjamin, Abhishek Gupta, Julian Ibarz, and Sergey Levine. 2018. “Diversity Is All You Need: Learning Skills Without a Reward Function.” _CoRR_.

<a id="orgf95208d"></a>Pong, Vitchyr H., Murtaza Dalal, Steven Lin, Ashvin Nair, Shikhar Bahl, and Sergey Levine. 2019. “Skew-Fit: State-Covering Self-Supervised Reinforcement Learning.” _CoRR_.

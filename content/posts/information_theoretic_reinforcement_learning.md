+++
title = "Information-Theoretic Reinforcement Learning"
author = ["Jethro Kuan"]
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
: \\(\mathcal{I}(s\_{t+1};a\_t) = \mathcal{H}(s\_{t+1}) - \mathcal{H}(s\_{t+1}|a\_t)\\)


## Papers {#papers}

-   Skew-Fit ([Pong et al., n.d.](#org60ae8db))
-   Diversity is All your Need ([Eysenbach et al., n.d.](#orgbda5d1e))


## Bibliography {#bibliography}

<a id="orgbda5d1e"></a>Eysenbach, Benjamin, Abhishek Gupta, Julian Ibarz, and Sergey Levine. n.d. “Diversity Is All You Need: Learning Skills without a Reward Function.” <http://arxiv.org/abs/1802.06070v6>.

<a id="org60ae8db"></a>Pong, Vitchyr H., Murtaza Dalal, Steven Lin, Ashvin Nair, Shikhar Bahl, and Sergey Levine. n.d. “Skew-Fit: State-Covering Self-Supervised Reinforcement Learning.” <http://arxiv.org/abs/1903.03698v2>.
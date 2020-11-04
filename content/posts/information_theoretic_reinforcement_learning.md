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
: \\(\mathcal{I}(s\_{t+1};a_t) = \mathcal{H}(s\_{t+1}) - \mathcal{H}(s\_{t+1}|a_t)\\)

## Papers {#papers}

- Skew-Fit ([Pong et al., n.d.](#orgdcf7bfc))
- Diversity is All your Need ([Eysenbach et al., n.d.](#orgafecd02))

## Bibliography {#bibliography}

<a id="orgafecd02"></a>Eysenbach, Benjamin, Abhishek Gupta, Julian Ibarz, and Sergey Levine. n.d. “Diversity Is All You Need: Learning Skills Without a Reward Function.” <http://arxiv.org/abs/1802.06070v6>.

<a id="orgdcf7bfc"></a>Pong, Vitchyr H., Murtaza Dalal, Steven Lin, Ashvin Nair, Shikhar Bahl, and Sergey Levine. n.d. “Skew-Fit: State-Covering Self-Supervised Reinforcement Learning.” <http://arxiv.org/abs/1903.03698v2>.

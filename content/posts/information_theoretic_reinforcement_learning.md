+++
title = "Information-Theoretic Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:03:24+08:00
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

- Skew-Fit <a id="3d4243b473ec81f5730e35c9021a5d81" href="#pong19_skew_fit">(Pong et al., 2019)</a>
- Diversity is All your Need <a id="f03c9ba458a5ac2f065b970316dc2f45" href="#eysenbach18_diver_is_all_you_need">(Eysenbach et al., 2018)</a>

# Bibliography

<a id="pong19_skew_fit" target="_blank">Pong, V. H., Dalal, M., Lin, S., Nair, A., Bahl, S., & Levine, S., _Skew-fit: state-covering self-supervised reinforcement learning_, CoRR, _()_, (2019). </a> [↩](#3d4243b473ec81f5730e35c9021a5d81)

<a id="eysenbach18_diver_is_all_you_need" target="_blank">Eysenbach, B., Gupta, A., Ibarz, J., & Levine, S., _Diversity is all you need: learning skills without a reward function_, CoRR, _()_, (2018). </a> [↩](#f03c9ba458a5ac2f065b970316dc2f45)

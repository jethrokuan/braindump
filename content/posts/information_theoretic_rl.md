+++
title = "Information Theoretic Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2019-12-27T12:45:50+08:00
draft = false
math = true
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

-   Skew-Fit <a id="3d4243b473ec81f5730e35c9021a5d81" href="#pong19_skew_fit" title="Pong, Dalal, Lin, , Nair, Bahl, Levine \&amp; Sergey, Skew-Fit: State-Covering Self-Supervised  Reinforcement Learning, {CoRR}, v(), (2019).">(Pong et al., 2019)</a>
-   Diversity is All your Need <a id="f03c9ba458a5ac2f065b970316dc2f45" href="#eysenbach18_diver_is_all_you_need" title="Eysenbach, Gupta, Ibarz, Julian \&amp; Levine, Diversity Is All You Need: Learning Skills Without a  Reward Function, {CoRR}, v(), (2018).">(Eysenbach et al., 2018)</a>

# Bibliography
<a id="pong19_skew_fit"></a>Pong, V. H., Dalal, M., Lin, S., Nair, A., Bahl, S., & Levine, S., *Skew-fit: state-covering self-supervised reinforcement learning*, CoRR, *()*,  (2019).  [↩](#3d4243b473ec81f5730e35c9021a5d81)

<a id="eysenbach18_diver_is_all_you_need"></a>Eysenbach, B., Gupta, A., Ibarz, J., & Levine, S., *Diversity is all you need: learning skills without a reward function*, CoRR, *()*,  (2018).  [↩](#f03c9ba458a5ac2f065b970316dc2f45)

+++
title = "Exploration In Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2019-12-27T12:32:06+08:00
draft = false
math = true
+++

Exploration is important where rewards are sparse, and not a direct
indication of how good an action is. Some environments where good
exploration is necessary is Montezuma's revenge, where finishing a
game only weakly correlates with rewarding events.

Key Questions:

1.  How can an agent discover high-reward strategies that require a
    temporally-extended sequence of complex behaviours that,
    individually, are not rewarding?
2.  How can an agent decide whether to attempt new behaviours or
    continue to do the best thing it knows so far?
3.  Is there an _optimal_ exploration strategy?

In order of theoretical tractability (tractable to intractable):

1.  multi-armed bandits (1-step stateless RL problems) : can be
    formailized as POMDP identification
2.  contextual bandits (1-step RL problems) : policy learning is
    trivial even with POMDP
3.  small, finite MDPs (tractable planning, model-based RL setting) :
    can frame as Bayesian model identification, reason explicitly about
    value of information
4.  large, infinite MDPs, continuous spaces : optimal methods don't work


## General Themes in exploration {#general-themes-in-exploration}

-   Requires some form of uncertainty
-   Assumes:
    -   Unknown is good (optimism)
    -   Sample = Truth
    -   information gain is good


## Exploration in Bandits {#exploration-in-bandits}


### Optimistic Exploration {#optimistic-exploration}

Keep track of average reward \\(\hat{\mu}\_a\\) for each action \\(a\\), and
choose $a = \mathrm{argmax} \hat{\mu}\_a + C&sigma;\_a$for some variance
estimate \\(\sigma\_a\\). This method is model-free.


### Posterior/Thompson Sampling {#posterior-thompson-sampling}

Here, we assume $r(a\_i) &sim; p<sub>&theta;\_i</sub>(r\_i), defining a POMDP with
\\(s = \left[\theta\_1, \dots, \theta\_n \right]\\), and we have a belief
over the states.

Thompson sampling does this:

1.  sample \\(\theta\_1, \dots, \theta\_n \sim \hat{p}(\theta\_1, \dots, \theta\_n)\\)
2.  pretend the model \\(\theta\_1, \dots, \theta\_n\\) is correct
3.  take the optimal action
4.  update the model

Thompson sampling is hard to analyze theoretically, but can work well
empirically.


### Information Gain {#information-gain}

\begin{equation}
  IG(z, y|a) = E\_y\left[ \mathcal{H}(\hat{p}(z)) - \mathcal{H}(\hat{p}(z)|y)|a \right]
\end{equation}

is how much we learn about \\(z\\) from action \\(a\\), given current beliefs

If we have \\(\Delta(a) = E[r(a^\star) - r(a)]\\), the expected
suboptimality of \\(a\\), and \\(g(a) = IG(\theta\_a, r\_a | a)\\), then we can
choose \\(a\\) according to \\(\mathrm{argmin}\_a \frac{\Delta(a)^2}{g(a)}\\).


### Upper Confidence Bound {#upper-confidence-bound}

\begin{equation}
  a = \mathrm{argmax} \hat{\mu}\_a + \sqrt{\frac{2 \ln T}{N(a)}}
\end{equation}


## Extending exploration to RL {#extending-exploration-to-rl}


### Count-based exploration <a id="e8434a667b6a92e6ed91dbeac3bc0890" href="#NIPS2016_6383" title="@incollection{NIPS2016_6383,
title = {Unifying Count-Based Exploration and Intrinsic Motivation},
author = {Bellemare, Marc and Srinivasan, Sriram and Ostrovski, Georg and Schaul, Tom and Saxton, David and Munos, Remi},
booktitle = {Advances in Neural Information Processing Systems 29},
editor = {D. D. Lee and M. Sugiyama and U. V. Luxburg and I. Guyon and R. Garnett},
pages = {1471--1479},
year = {2016},
publisher = {Curran Associates, Inc.},
url = {http://papers.nips.cc/paper/6383-unifying-count-based-exploration-and-intrinsic-motivation.pdf}
}">@incollection{NIPS2016_6383,
title = {Unifying Count-Based Exploration and Intrinsic Motivation},
author = {Bellemare, Marc and Srinivasan, Sriram and Ostrovski, Georg and Schaul, Tom and Saxton, David and Munos, Remi},
booktitle = {Advances in Neural Information Processing Systems 29},
editor = {D. D. Lee and M. Sugiyama and U. V. Luxburg and I. Guyon and R. Garnett},
pages = {1471--1479},
year = {2016},
publisher = {Curran Associates, Inc.},
url = {http://papers.nips.cc/paper/6383-unifying-count-based-exploration-and-intrinsic-motivation.pdf}
}</a> {#count-based-exploration-a-id-e8434a667b6a92e6ed91dbeac3bc0890-href-nips2016-6383-title-incollection-nips2016-6383-title-unifying-count-based-exploration-and-intrinsic-motivation-author-bellemare-marc-and-srinivasan-sriram-and-ostrovski-georg-and-schaul-tom-and-saxton-david-and-munos-remi-booktitle-advances-in-neural-information-processing-systems-29-editor-d-dot-d-dot-lee-and-m-dot-sugiyama-and-u-dot-v-dot-luxburg-and-i-dot-guyon-and-r-dot-garnett-pages-1471-1479-year-2016-publisher-curran-associates-inc-dot-url-http-papers-dot-nips-dot-cc-paper-6383-unifying-count-based-exploration-and-intrinsic-motivation-dot-pdf-incollection-nips2016-6383-title-unifying-count-based-exploration-and-intrinsic-motivation-author-bellemare-marc-and-srinivasan-sriram-and-ostrovski-georg-and-schaul-tom-and-saxton-david-and-munos-remi-booktitle-advances-in-neural-information-processing-systems-29-editor-d-dot-d-dot-lee-and-m-dot-sugiyama-and-u-dot-v-dot-luxburg-and-i-dot-guyon-and-r-dot-garnett-pages-1471-1479-year-2016-publisher-curran-associates-inc-dot-url-http-papers-dot-nips-dot-cc-paper-6383-unifying-count-based-exploration-and-intrinsic-motivation-dot-pdf-a}

Use pseudo-counts:

\begin{equation}
r\_i^+ = r\_i + \mathcal{B}(\hat{N}(s))
\end{equation}

There are many choices for the bonus.

# Bibliography
<a id="NIPS2016_6383"></a>Bellemare, M., Srinivasan, S., Ostrovski, G., Schaul, T., Saxton, D., & Munos, R., *Unifying count-based exploration and intrinsic motivation*, In D. D. Lee, M. Sugiyama, U. V. Luxburg, I. Guyon, & R. Garnett (Eds.), Advances in Neural Information Processing Systems 29 (pp. 1471–1479) (2016). : Curran Associates, Inc. [↩](#e8434a667b6a92e6ed91dbeac3bc0890)

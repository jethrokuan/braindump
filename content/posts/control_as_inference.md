+++
title = "Control As Inference"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Optimal Control and Planning]({{<relref "optimal_control.md#" >}}), [Reinforcement Learning ⭐]({{<relref "reinforcement_learning.md#" >}})

{{< figure src="/ox-hugo/screenshot2019-12-24_19-20-19_.png" caption="Figure 1: PGM for decision making for the first 3 time-steps" >}}

We introduce a binary variable for Optimality \\(\mathcal{O}\_t\\) at each
time-step. We want to infer: \\(p(\tau | \mathcal{O}\_{1:T})\\)

If we choose \\(p(O\_t | s\_t, a\_t) = \mathrm{exp}(r(s\_t, a\_t))\\), then:

\begin{align}
  p(\tau | \mathcal{O}\_{1:T}) &= \frac{p(\tau,
                                \mathcal{O}\_{1:T})}{p(\mathcal{O}\_{1:T})}
  \\\\\\
                              &\propto \prod\_{t} \mathrm{exp}(r(s\_t,
                                a\_t)) \\\\\\
                              &= p(\tau) \mathrm{exp} \left( \sum\_{t}
                                r(s\_t, a\_t) \right)
\end{align}

With this [Probabilistic Graph Model]({{<relref "pgm.md#" >}}), we can:

1.  model sub-optimal behaviour (important for inverse RL)
2.  can apply inference algorithms to solve control and planning problems
3.  provides an explanation for why stochastic behaviour may be
    preferred (useful for exploration and transfer learning)


## Inference {#inference}

1.  compute [backward messages](#backward-messages) \\(\beta\_t (s\_t, a\_t) =
       p(\mathcal{O}\_{t:T} | s\_t, a\_t)\\)
2.  compute policy \\(p(a\_t | s\_t, \mathcal{O}\_{1:T})\\), the policy of
    this model under assumption of optimality
3.  compute forward messages \\(\alpha\_t(s\_t) = p(s\_t | \mathcal{O}\_{1:t-1})\\)
    1.  useful for figuring out which states the optimal policy lands
        in, for the inverse RL problem (not used for forward RL)


## Backward Messages {#backward-messages}

\begin{align}
  \beta\_t (s\_t, a\_t) &= p(\mathcal{O}\_{t:T} | s\_t, a\_t) \\\\\\
                     &= \int p(\mathcal{O}\_{t:T}, s\_{t+1} | s\_t, a\_t)
                       ds\_{t+1} \\\\\\
                     &= \int p(\mathcal{O}\_{t+1:T}|s\_{t+1})
                       p(s\_{t+1}|s\_t,a\_t) p(\mathcal{O}\_t | s\_t, a\_t)
                       ds\_{t+1}
\end{align}

\begin{align}
  p(\mathcal{O}\_{t+1:T} | s\_{t+1}) &= \int p(\mathcal{O}\_{t+1:T} |
                                     s\_{t+1}, a\_{t+1})p(a\_{t+1}| s\_{t+1}) da\_{t+1} \\\\\\
                                   &= \int \beta\_t(s\_{t+1}, a\_{t+1}) da\_{t+1}
\end{align}

where we assume actions are likely a priori uniform. From these
equations, we can get:

For \\(t = T-1 \mathrm{ to } 1\\):

\begin{equation}
  \beta\_t(s\_t, a\_t) = p(\mathcal{O}\_t | s\_t, a\_t) E\_{s\_{t+1} \sim
    p(s\_{t+1},a\_{t+1})} \left[ \beta\_{t+1} (s\_{t+1}) \right]
\end{equation}

\begin{equation}
  \beta\_{t}(s\_t) = E\_{a\_t \sim p(a\_t | s\_t)} \left[ \beta\_t(s\_t, a\_t) \right]
\end{equation}

If we choose \\(V\_t (s\_t) = \log \beta\_t (s\_t)\\) and \\(Q\_t(s\_t, a\_t) =
\log \beta\_t (s\_t, a\_t)\\):

\begin{align}
V\_t(s\_t) &= \log \int \mathrm{exp} (Q\_t(s\_t, a\_t))da\_t \\\\\\
         &\rightarrow \mathrm{max}\_{a\_t} Q\_t(s\_t, a\_t) \textrm { as
           } Q\_t(s\_t, a\_t) \textrm { gets bigger }
\end{align}

For \\(Q\\):

\begin{equation}
  Q\_t (s\_t, a\_t) = r(s\_t, a\_t) + \log E\left[ \mathrm{exp} (V\_{t+1}
    (s\_{t+1},  a\_{t+1})) \right]
\end{equation}

In a deterministic transition setting, the log and exp cancel out.
However, this otherwise results in an optimistic transition, which is
not a good idea!

What if the action prior is not uniform? **We can always fold the action
prior into the reward!**


## Policy computation {#policy-computation}

\begin{align}
  p(a\_t | s\_t, \mathcal{O}\_{1:T}) &= \pi (s\_t | a\_t) \\\\\\
                                  &= p(a\_t | s\_t, \mathcal{O}\_{t:T})
  \\\\\\
                                  &= \frac{\beta\_t(s\_t,
                                    a\_t)}{\beta\_t(s\_t)}p(s\_t|a\_t) \\\\\\
                                  &= \frac{\beta\_t(s\_t,
                                    a\_t)}{\beta\_t(s\_t)}
\end{align}

It turns out the policy is just the ratio between the 2 backward
messages. Substituting \\(V\\) and \\(Q\\):

\begin{equation}
  \pi(a\_t | s\_t) = \mathrm{exp}(Q\_t(s\_t, a\_t) - V\_t(s\_t)) = \mathrm{exp}(A\_t(s\_t, a\_t))
\end{equation}

One can also add a temperature: \\(\pi(a\_t | s\_t) =
\mathrm{exp}(\frac{1}{\alpha} A\_t(s\_t, a\_t))\\)


## Forward Messages {#forward-messages}

\begin{equation}
  p(s\_t) \propto \beta\_t(s\_t) \alpha\_t(s\_t)
\end{equation}

same derivations as [Hidden Markov Model]({{<relref "hidden_markov_model.md#" >}})!

{{< figure src="/ox-hugo/screenshot2019-12-24_20-04-20_.png" >}}


## Resolving Optimism with Variational Inference {#resolving-optimism-with-variational-inference}

{{< figure src="/ox-hugo/screenshot2019-12-24_20-18-55_.png" >}}

For more, see ([Levine, n.d.](#orgd79161e)).


## Resources {#resources}

-   [CS285 Fa19 10/16/19 - YouTube](https://www.youtube.com/watch?v=Pei6G8%5F3r8I&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=13)


## Bibliography {#bibliography}

<a id="orgd79161e"></a>Levine, Sergey. n.d. “Reinforcement Learning and Control as Probabilistic Inference: Tutorial and Review.” <http://arxiv.org/abs/1805.00909v3>.
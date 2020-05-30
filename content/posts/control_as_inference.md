+++
title = "Control As Inference"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:09:34+08:00
draft = false
+++

tags
: [Optimal Control and Planning]({{< relref "optimal_control" >}}), [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})

{{< figure src="/ox-hugo/screenshot2019-12-24_19-20-19_.png" caption="Figure 1: PGM for decision making for the first 3 time-steps" >}}

We introduce a binary variable for Optimality \\(\mathcal{O}\_t\\) at each
time-step. We want to infer: \\(p(\tau | \mathcal{O}\_{1:T})\\)

If we choose \\(p(O_t | s_t, a_t) = \mathrm{exp}(r(s_t, a_t))\\), then:

\begin{align}
p(\tau | \mathcal{O}\_{1:T}) &= \frac{p(\tau,
\mathcal{O}\_{1:T})}{p(\mathcal{O}\_{1:T})}
\\\\\\
&\propto \prod\_{t} \mathrm{exp}(r(s_t,
a_t)) \\\\\\
&= p(\tau) \mathrm{exp} \left( \sum\_{t}
r(s_t, a_t) \right)
\end{align}

With this [Probabilistic Graph Model]({{< relref "pgm" >}}), we can:

1.  model sub-optimal behaviour (important for inverse RL)
2.  can apply inference algorithms to solve control and planning problems
3.  provides an explanation for why stochastic behaviour may be
    preferred (useful for exploration and transfer learning)

## Inference {#inference}

1.  compute [backward messages](#backward-messages) \\(\beta_t (s_t, a_t) =
    p(\mathcal{O}\_{t:T} | s_t, a_t)\\)
2.  compute policy \\(p(a_t | s_t, \mathcal{O}\_{1:T})\\), the policy of
    this model under assumption of optimality
3.  compute forward messages \\(\alpha_t(s_t) = p(s_t | \mathcal{O}\_{1:t-1})\\)
    1.  useful for figuring out which states the optimal policy lands
        in, for the inverse RL problem (not used for forward RL)

## Backward Messages {#backward-messages}

\begin{align}
\beta_t (s_t, a_t) &= p(\mathcal{O}\_{t:T} | s_t, a_t) \\\\\\
&= \int p(\mathcal{O}\_{t:T}, s\_{t+1} | s_t, a_t)
ds\_{t+1} \\\\\\
&= \int p(\mathcal{O}\_{t+1:T}|s\_{t+1})
p(s\_{t+1}|s_t,a_t) p(\mathcal{O}\_t | s_t, a_t)
ds\_{t+1}
\end{align}

\begin{align}
p(\mathcal{O}\_{t+1:T} | s\_{t+1}) &= \int p(\mathcal{O}\_{t+1:T} |
s\_{t+1}, a\_{t+1})p(a\_{t+1}| s\_{t+1}) da\_{t+1} \\\\\\
&= \int \beta_t(s\_{t+1}, a\_{t+1}) da\_{t+1}
\end{align}

where we assume actions are likely a priori uniform. From these
equations, we can get:

For \\(t = T-1 \mathrm{ to } 1\\):

\begin{equation}
\beta_t(s_t, a_t) = p(\mathcal{O}\_t | s_t, a_t) E\_{s\_{t+1} \sim
p(s\_{t+1},a\_{t+1})} \left[ \beta\_{t+1} (s\_{t+1}) \right]
\end{equation}

\begin{equation}
\beta\_{t}(s_t) = E\_{a_t \sim p(a_t | s_t)} \left[ \beta\_t(s\_t, a\_t) \right]
\end{equation}

If we choose \\(V_t (s_t) = \log \beta_t (s_t)\\) and \\(Q_t(s_t, a_t) =
\log \beta_t (s_t, a_t)\\):

\begin{align}
V_t(s_t) &= \log \int \mathrm{exp} (Q_t(s_t, a_t))da_t \\\\\\
&\rightarrow \mathrm{max}\_{a_t} Q_t(s_t, a_t) \textrm { as
} Q_t(s_t, a_t) \textrm { gets bigger }
\end{align}

For \\(Q\\):

\begin{equation}
Q_t (s_t, a_t) = r(s_t, a_t) + \log E\left[ \mathrm{exp} (V\_{t+1}
(s\_{t+1}, a\_{t+1})) \right]
\end{equation}

In a deterministic transition setting, the log and exp cancel out.
However, this otherwise results in an optimistic transition, which is
not a good idea!

What if the action prior is not uniform? **We can always fold the action
prior into the reward!**

## Policy computation {#policy-computation}

\begin{align}
p(a_t | s_t, \mathcal{O}\_{1:T}) &= \pi (s_t | a_t) \\\\\\
&= p(a_t | s_t, \mathcal{O}\_{t:T})
\\\\\\
&= \frac{\beta_t(s_t,
a_t)}{\beta_t(s_t)}p(s_t|a_t) \\\\\\
&= \frac{\beta_t(s_t,
a_t)}{\beta_t(s_t)}
\end{align}

It turns out the policy is just the ratio between the 2 backward
messages. Substituting \\(V\\) and \\(Q\\):

\begin{equation}
\pi(a_t | s_t) = \mathrm{exp}(Q_t(s_t, a_t) - V_t(s_t)) = \mathrm{exp}(A_t(s_t, a_t))
\end{equation}

One can also add a temperature: \\(\pi(a_t | s_t) =
\mathrm{exp}(\frac{1}{\alpha} A_t(s_t, a_t))\\)

## Forward Messages {#forward-messages}

\begin{equation}
p(s_t) \propto \beta_t(s_t) \alpha_t(s_t)
\end{equation}

same derivations as [Hidden Markov Model]({{< relref "hidden_markov_model" >}})!

{{< figure src="/ox-hugo/screenshot2019-12-24_20-04-20_.png" >}}

## Resolving Optimism with Variational Inference {#resolving-optimism-with-variational-inference}

{{< figure src="/ox-hugo/screenshot2019-12-24_20-18-55_.png" >}}

For more, see <a id="bf624e2cac020327e631eac77ec9f4e9" href="#levine18_reinf_learn_contr_as_probab_infer">(Levine, 2018)</a>.

## Resources {#resources}

- [CS285 Fa19 10/16/19 - YouTube](https://www.youtube.com/watch?v=Pei6G8%5F3r8I&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=13)

# Bibliography

<a id="levine18_reinf_learn_contr_as_probab_infer" target="_blank">Levine, S., _Reinforcement learning and control as probabilistic inference: Tutorial and review_, CoRR, _()_, (2018). </a> [↩](#bf624e2cac020327e631eac77ec9f4e9)

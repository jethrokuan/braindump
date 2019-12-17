+++
title = "Q-Learning"
author = ["Jethro Kuan"]
lastmod = 2019-12-17T14:35:50+08:00
draft = false
math = true
+++

The actor-critic algorithm ([§actor\_critic]({{< relref "actor_critic" >}})) fits 2 function
approximators: one for the policy, and one for the value function. A
key problem with the policy gradient method is the high variance in
the gradient update. _Can we omit policy gradients completely
([§policy\_gradients]({{< relref "policy_gradients" >}}))?_


## Key Ideas {#key-ideas}

1.  If we have a policy \\(\pi\\), and we know \\(Q^{\pi}(s\_t, a\_t)\\), then we
    can improve \\(\pi\\) by setting \\(\pi'(a|s) = 1\\) where \\(a =
       \mathrm{argmax}\_aQ^{\pi}(s , a)\\).
2.  We can compute the gradient to increase the probability of good
    actions \\(a\\): if \\(Q^{\pi}(s, a) > V^{\pi}(s)\\), then a is better than
    average (\\(V\\) is expectation of \\(Q\\) over \\(\pi(a|s)\\)).
3.  It can be shown that in a fully-observed MDP, there is a policy
    that is both deterministic and optimal


## Policy Iteration {#policy-iteration}

1.  evaluate \\(A^\pi (s, a)\\)
2.  set \\(\pi \leftarrow \pi'\\) where \\(\pi' = 1\\) if \\(a\_t =
       \mathrm{argmax}\_{a\_t}A^\pi(s\_t, a\_t)\\) and \\(0\\) otherwise


## Value Iteration {#value-iteration}

Skips the explicit policy representation altogether. _Key idea_:
argmax of advantage function is the same as argmax of Q-function.

1.  set \\(Q(s,a) \leftarrow r(s,a) + \gamma E\left[V(s')\right]\\)
2.  set \\(V(s) \leftarrow \mathrm{argmax}\_a Q(s,a)\\)

This simplifies the dynamic programming problem in policy iteration.


## Q-learning {#q-learning}

Q-learning learns an action-utility representation instead of learning
utilities. We will use the notation \\(Q(s,a)\\) to denote the value of
doing action \\(a\\) in state \\(s\\).

\begin{equation}
  U = max\_a Q(s, a)
\end{equation}

**A TD agent that learns a Q-function does not need a model of the form
\\(P(s' | s, a)\\), either for learning or for action selection.**
Q-learning is hence called a model-free method. We can write a
constraint equation as follows:

\begin{equation}
  Q(s,a) = R(s) + \gamma \sum\_{s'} P(s' | s, a) max\_{a'} Q(s', a')
\end{equation}

However, this equation requires a model to be learnt, since it depends
on \\(P(s' | s, a)\\). The TD approach requires no model of state
transitions.

The updated equation for TD Q-learning is:

\begin{equation}
  Q(s, a) \leftarrow Q(s, a) + \alpha (R(s) + \gamma max\_{a'} Q(s',
  a') - Q(s,a))
\end{equation}

which is calculated whenever action \\(a\\) is executed in state \\(s\\)
leading to state \\(s'\\).

Q-learning has a close relative called SARSA
(State-Action-Reward-State-Action). The update rule for SARSA is as
follows:

\begin{equation}
  Q(s, a) \leftarrow Q(s, a) + \alpha (R(s) + \gamma Q(s', a') - Q(s, a))
\end{equation}

where \\(a'\\) is the action actually taken in state \\(s'\\). The rule is
applied at the end of each \\(s, a, r, s', a'\\) quintuplet, hence the
name.

Whereas Q-learning backs up the best Q-value from the state reached in
the observed transition, SARSA waits until an action is actually taken
and backs up the Q-value for that action. For a greedy agent that
always takes the action with best Q-value, the two algorithms are
identical. When exploration is happening, they differ significanty.

Because Q-learning uses the best Q-value, it pays no attention to the
actual policy being followed - it is an off-policy learning algorithm.
However, SARSA is an on-policy algorithm.

Q-learning is more flexible in the sense that a Q-learning agent can
learn how to behave well even when guided by a random or adversarial
exploration policy. On the other hand, SARSA is more realistic: for
example if the overall policy is even partly controlled by other
agents, it is better to learn a Q-function for what will actually
happen rather than what the agent would like to happen.

Q-learning has been shown to be sample efficient in the tabular
setting <a id="01672110f741e437a834e37dc0d172c4" href="#jin_q_learning_provably_efficient" title="@incollection{jin_q_learning_provably_efficient,
title = {Is Q-Learning Provably Efficient?},
author = {Jin, Chi and Allen-Zhu, Zeyuan and Bubeck, Sebastien and Jordan, Michael I},
booktitle = {Advances in Neural Information Processing Systems 31},
editor = {S. Bengio and H. Wallach and H. Larochelle and K. Grauman and N. Cesa-Bianchi and R. Garnett},
pages = {4863--4873},
year = {2018},
publisher = {Curran Associates, Inc.},
url = {http://papers.nips.cc/paper/7735-is-q-learning-provably-efficient.pdf}
}">@incollection{jin_q_learning_provably_efficient,
title = {Is Q-Learning Provably Efficient?},
author = {Jin, Chi and Allen-Zhu, Zeyuan and Bubeck, Sebastien and Jordan, Michael I},
booktitle = {Advances in Neural Information Processing Systems 31},
editor = {S. Bengio and H. Wallach and H. Larochelle and K. Grauman and N. Cesa-Bianchi and R. Garnett},
pages = {4863--4873},
year = {2018},
publisher = {Curran Associates, Inc.},
url = {http://papers.nips.cc/paper/7735-is-q-learning-provably-efficient.pdf}
}</a>.


## Q-learning with function approximation {#q-learning-with-function-approximation}

To generalize over states and actions, parameterize Q with a function
approximator, e.g. a neural net:

\begin{equation}
  \delta = r\_t + \gamma \mathrm{max}\_a Q(s\_{t+1}, a; \theta) - Q(s\_t,
a ; \theta)
\end{equation}

and turn this into an optimization problem minimizing the loss on the
TD error:

\begin{equation}
J(\theta) = \left| \delta \right|^2
\end{equation}

The key problem with Q-learning is stability, coined the "deadly
triad".

1.  Off-policy learning
2.  flexible function approximation
3.  Bootstrapping

In the presence of all three, learning is unstable. DQN is the first
algorithm that stabilized deep Q-learning ([§mnih2013\_atari\_deeprl]({{< relref "mnih2013_atari_deeprl" >}})).


## Related {#related}

-   [§td\_learning]({{< relref "td_learning" >}})
-   [§policy\_gradients]({{< relref "policy_gradients" >}})

# Bibliography
<a id="jin_q_learning_provably_efficient"></a>Jin, C., Allen-Zhu, Z., Bubeck, S., & Jordan, M. I., *Is Q-Learning Provably Efficient?*, In S. Bengio, H. Wallach, H. Larochelle, K. Grauman, N. Cesa-Bianchi, & R. Garnett (Eds.), Advances in Neural Information Processing Systems 31 (pp. 4863–4873) (2018). : Curran Associates, Inc. [↩](#01672110f741e437a834e37dc0d172c4)

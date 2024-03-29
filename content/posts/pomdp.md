+++
title = "Partially Observable Markov Decision Processes (POMDPs)"
author = ["Jethro Kuan"]
draft = false
+++

## Partially Observable MDPs (POMDPs) {#partially-observable-mdps--pomdps}

The assumption of full observability, accompanied with the Markov
assumption for the transition model means that the optimal policy
depends only on the current state. When the environment is partially
observable, the agent does not know which state it is in. The agent
then cannot execute \\(\pi(s)\\). The utility of a state \\(s\\) and the optimal
action in \\(s\\) does not only depend on \\(s\\), but also how much the agent
knows when it is in \\(s\\).

In addition to the elements of the MDP -- the transition model
\\(P(s'|s, a)\\), actions \\(A(s)\\), and reward function \\(R(s)\\), it also has
a sensor model \\(P(e|s)\\). The sensor model specifies the probability of
perceiving evidence \\(e\\) in state \\(s\\). For example, a sensor might
measure the number of adjacent walls. A noisy sensor might return the
wrong value with some probability.

Belief states are the set of actual states the agent might be in. In
POMDPs, these belief states are probability distributions over all
possible states. The agent can calculate its current belief state as
the conditional probability distribution over the actual states given
the sequences of percepts and actions so far.

If the previous belief state is \\(b(s)\\), and the agent performs some
action \\(a\\) and perceives evidence \\(e\\), then the new belief state is
given by:

\begin{equation}
b'(s') = \alpha P(e | s') \sum\_s P(s' | s, a) b(s)
\end{equation}

where \\(\alpha\\) is a normalizing constant that makes the belief state sum
to 1.

**The optimal action in a POMDP depends only on the agent's belief
state**. The optimal policy can be described by a mapping \\(\pi^\* (b)\\) from
belief states to actions.

The decision cycle of a POMDP can be broken down into 3 steps:

1.  Given the current belief state \\(b\\), execute the action \\(a = \pi^\* (b)\\).
2.  Receive percept \\(e\\).
3.  Update the belief state to \\(b'\\) and repeat.

If we knew the action and the subsequent percept, then the update to
the belief state would be a deterministic one, following the update
equation. The subsequent percept is not yet known, so the agent will
arrive in one of several possible belief states. The probability of
perceiving \\(e\\), given that \\(a\\) is was the action taken from belief
state \\(b\\), is given by:

\begin{align}
  P(e | a,b) &= \sum\_{s'} P(e | a, s', b) P(s' | a, b) \\\\\\
             &= \sum\_{s'} P(e|s')P(s'|a, b) \\\\\\
             &= \sum\_{s'} P(e | s')\sum\_{s'}P(s'|s, a)b(s)
\end{align}

\begin{align}
  P(b' | a, b) &= \sum\_eP(b' | e, a, b) P(e | a, b) \\\\\\
               &= \sum\_eP(b' | e, a, b)\sum\_{s'} P(e|s')\sum\_{s'} P(s'
                 | s, a)b(s)
\end{align}

Where \\(P(b' | e, a, b) = 1\\) if \\(b' = FORWARD(b,a,e)\\) and \\(0\\)
otherwise.

Because POMDPs have continuous state space, new algorithms for
computing or approximating the optimal policies for MDPs do not apply here.


### Value iteration for POMDPs {#value-iteration-for-pomdps}

The value iteration algorithm for the MDP computed one utility value
for each state. With infinitely many belief states, we need to be more
creative.

Consider conditional plans, and how the expected utility of executing
a fixed conditional plan varies with the initial belief state.

1.  Let the utility of executing a fixed conditional plan \\(p\\) starting
    in physical state \\(s\\) be \\(\alpha\_p(s)\\). Then the expected utility of
    executing \\(p\\) in belief state \\(b\\) is \\(\sum\_s b(s) \alpha\_p (s)\\) Hence the
    expected utility of a fixed conditional plan varies linearly with
    \\(b\\).
2.  At any given belief state \\(b\\), the optimal policy will choose to
    execute the conditional plan with the highest expected utility, and
    the expected utility is just the utility of that conditional plan:

\begin{equation}
  U(b) = U^{\pi^\*}(b) = max\_{p} b \cdot \alpha\_p
\end{equation}

If the optimal policy \\(\pi^\*\\) chooses to execute \\(p\\) starting at \\(b\\),
then it is reasonable to expect that it might choose to execute \\(p\\) in
belief states that are close to \\(b\\).

From these 2 observations, we see that the utility function \\(U(b)\\) on
belief states, being the maximum of a collection of hyperplanes, will
be piecewise linear and convex.

Let \\(p\\) be a depth-d conditional plan whose initial action is \\(a\\) and
whose depth-d-1 subplan for percept \\(e\\) is \\(p.e\\), then

\begin{equation}
  \alpha\_p{s} = R(s) + \gamma \left( \sum\_{s'} P(s' | s,a)\sum\_e P(e|s')\alpha\_{p.e}(s') \right)
\end{equation}

This recursion gives rise to a value iteration algorithm:

```text
  function POMDP-VALUE-ITERATION returns a utility function
    inputs: pomdp
            e, the maximum error allowed for utility
    locals: U, U' sets of plans p

    U' <- set containing the empty plan [], with \alpha_[](s) = R(s)
    repeat
      U <- U'
      U' <- set of all plans computed with above equation
      U' <- REMOVE-DOMINATED-PLANS(U')
    until MAX-DIFFERENCE(U, U') < e(1-\gamma) / \gamma
    return U
```

The algorithm's complexity is dominated by the number of plans
generated: given \\(|A|\\) possible actions and \\(|E|\\) possible
observations, there are \\(|A|^{O(|E|^{d-1})}\\) distinct depth-d plans,
making the algorithm hopelessly inefficient for larger problems.
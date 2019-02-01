+++
title = "Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2019-02-01T08:12:07+08:00
draft = false
math = true
+++

\#HUGO\_TAGS: machine\_learning


## Making Complex Decisions {#making-complex-decisions}

Earlier, we were concerned with environments with one-shot, episodic
decision problems. Sequential decision problems incorporate utilities,
uncertainty and sensing. These include searching and planning problems
as special cases.


### Markov Decision Process (MDP) {#markov-decision-process--mdp}

A sequential decision problem for a fully observable, stochastic
environment with a Markovian transition model and additive rewards is
called a Markov decision process. It consists of a set of states, with
initial state \\(s\_0\\), a set \\(ACTIONS(s)\\) of actions in each state, a
transition model \\(P(s'|s, a)\\), and a reward function \\(R(s)\\).

A policy, denoted \\(\pi\\), specifies what the agent should do in any state
\\(s\\). This action is denoted by \\(\pi(s)\\). The optimal policy \\(\pi^\*\\) yields the
highest expected utility.

The careful balancing of risk and reward is a characteristic of MDPs
that does not arise in deterministic search problems.


### Utilities over time {#utilities-over-time}

A finite horizon for decision making means that there is a fixed time
\\(N\\) after which nothing matters. In these scenarios, the optimal
action in a given state could change over time, i.e. the optimal
policy is non-stationary.

It turns out that under stationarity, there are only 2 coherent ways
to assign utilities to sequences:

additive rewards
: \\(U\_h([s\_0, s\_1, \dots, s\_n]) = R(s\_0) + R(s\_1) + \dots + R(s\_n)\\)

discounted rewards
: \\(U\_h([s\_0, s\_1, \dots, s\_n]) = R(s\_0) + \gamma \cdot R(s\_1) + \dots +
         \gamma^2 \cdot R(s\_n)\\)

This discount factor \\(\gamma\\) is a number between 0 and 1. Assuming
stationarity has several problems. First, if the environment does not
contain a terminal state, then utilities of undiscounted rewards go to
infinite, and comparing two infinitely state sequences would be
impossible. With discounted rewards, the utility of an infinite
sequence can be made finite.

However, if the environment contains a terminal state, and the agent
is guaranteed to reach a terminal state eventually, then this policy
is called a **proper policy**, and the above issue goes away. Infinite
sequences can be compared in terms of the average reward obtained per
time step.


### Optimal policies and the utilities of states {#optimal-policies-and-the-utilities-of-states}

First, we can derive the expected utility of executing a policy \\(\pi\\) in
\\(s\\):

\begin{equation}
U^\pi (s) = \mathbb{E} \left[ \sum\_{t=0}^\infty \gamma^t R(S\_t) \right]
\end{equation}

where the expectation is with respect to the probability distribution
over state sequences. determined by \\(s\\) and \\(\pi\\). Then $&pi;^\*(s) =
argmax\_&pi; U^&pi; (s)\*.

A consequence of using discounted utilities with infinite horizons is
that the optimal policy is independent of the starting state. This
allows us to compute the true utility of the state as \\(U^{\pi^\*} (s)\\).
The utility function allows the agent to select actions by using the
principle of maximum expected utility from the earlier chapter: \\(\pi^\*(s)
= argmax\_{a \in A(s) } \sum\_{s^{i}} P(s' |s, a)U(s')\\).


### Value Iteration {#value-iteration}

The bellman equation illustrates that the utility of a state is the
immediate reward for that state plus the expected discounted utility
of the next state:

\begin{equation}
U(s) = R(s) + \gamma max\_{a \in A(s)} \sum\_{s'} P(s' | s, a)U(s')
\end{equation}

If there are \\(n\\) possible states, there are \\(n\\) Bellman equations to
solve. However, these equations are non-linear, and cannot be solved
using linear algebra techniques.

Value iteration is an algorithm that is guaranteed to converge to an
equilibrium. The basic idea is to start with arbitrary initial values
for the utilities. We compute the right hand side of the equation, and
update the utility on the left hand side of the equation.

```text
function VALUE-ITERATION(mdp, e) returns a utility function
  inputs: mdp, an MDP with states S, actions A(s), transition model P(s' | s, a), discount \gamma
          e, the maximium error allowed in the utility of any state
  locals: U, U', vectors of utilities for states in S, initially zero
          \delta, the maximum change in utility for any state
  repeat
    U <- U'; \delta <- 0
    for each state s in S do
      U'[s] <- R(s) + \gamma max_{a \in A(s)} \sum_{s'} P(s' | s, a) U[s']
      if |U'[s] - U[s] | > \delta then \delta <- |U'[s] - U[s]|
    until \delta < e(1-\gamma) / \gamma
  return U
```


### Policy Iteration {#policy-iteration}

We have already observed that it is possible to get an optimal policy,
without having accurate utility function estimates.

The policy iteration algorithm exploits this. The algorithm alternates
between 2 steps, beginning at some policy \\(\pi\_0\\):

1.  **Policy evaluation**: given a policy \\(\pi\_i\\), calculate \\(U\_i = U^{\pi\_i}\\),
    the utility of each state if \\(\pi\_i\\) were to be executed
2.  **Policy improvement**: calculate a new MEU policy \\(\pi\_{i+1}\\), using
    one-step look ahead based on \\(U\_i\\):

\begin{equation}
\pi^\* (s) = argmax\_{a \in A(s)} P(s' | s, a) U(s')
\end{equation}

Policy evaluation is simple, because the policy \\(\pi\_i\\) specifies the
action \\(\pi\_i(s)\\) in state \\(s\\). This means we have a simplified version
of the Bellman equation relating the utility of \\(s\\) to the utility of
its neighbours:

\begin{equation}
  U(s) = R(s) + \gamma  \sum\_{s'} P(s' | s, a)U(s')
\end{equation}

These equations are linear and can be quickly solved (in \\(O(n^3)\\) time)
with linear algebra techniques. We can further speed up this process
by performing an approximate policy evaluation. We do this by
performing some number of value iteration steps to update the
utilities:

\begin{equation}
U\_{i+1}(s) \leftarrow R(s) + \gamma \sum\_{s'}P(s'|s, \pi\_i(s))U\_i(s')
\end{equation}

The resulting algorithm is called modified policy iteration, and is
often much more efficient.

```text
function POLICY-ITERATION(mdp) returns a policy
  inputs: mdp, an MDP
  locals: U, vector of utilities for states in S
          \pi, a policy vector indexed by state, initially random
  repeat
    U <- POLICY-EVALUATION(\pi, U, mdp)
    unchanged? <- true
    for each state s in S do
      if max_{a \in A(s)} \sum_{s'} P(s'|s, a) U[s'] > \sum_{s'} P(s'|s, \pi[s])U[s'] then do
        \pi[s] \leftarrow argmax_{a \in A(s)} P(s'|s, a) U[s']
        unchanged <- false
  until
    unchanged?
  return \pi
```

**Asynchronous policy iteration** involves picking a subset of states and
applying either kind of updating (policy improvement or simplified
value iteration) on that subset. Given certain conditions, this is
guaranteed to converge, and the freedom to choose any subset of states
gives us a means to design efficient heuristic algorithms.


### Summary {#summary}

| Problem    | Bellman Equation                                         | Algorithm                   |
|------------|----------------------------------------------------------|-----------------------------|
| Prediction | Bellman Expectation Equation                             | Iterative Policy Evaluation |
| Control    | Bellman Expectation Equation + Greedy Policy Improvement | Policy Iteration            |
| Control    | Bellman Optimality Equation                              | Value Iteration             |


### Partially Observable MDPs (POMDPs) {#partially-observable-mdps--pomdps}

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


### <span class="org-todo todo TODO">TODO</span> Online agents for POMDPs {#online-agents-for-pomdps}


### Monte Carlo Tree Search {#monte-carlo-tree-search}

We are still far from making anything that even resembles a strong AI.
What makes MCTS different from [Minimax](https://en.wikipedia.org/wiki/Minimax)?

Minimax can take an impractical amount of time to do a full search of
the game tree, especially games with high branching factor. Some games
are highly open-ended, with game trees that are highly complex. This
makes it difficult to write an evaluation function for each state.
MCTS is a technique that will give good results for games, and is
domain-independent.

UCB1 constructs statistical confidence intervals:

\begin{equation}
  \bar{x\_i} \pm \sqrt{\frac{2 \ln n}{n\_i}}
\end{equation}

where:

-   \\(\bar{x\_i}\\) is the mean payout for action \\(i\\)
-   \\(n\_i\\) is the number of simulations of action \\(i\\)
-   \\(n\\) is the total number of plays

The strategy is to pick the action with the highest upper bound each time.

How could an AI possibly "plan" ahead when there are so many potential
moves and counter moves in Go?

MCTS builds a _statistics tree_ (detailing value of nodes) that
partially maps onto the entire tree. Statistics tree guides the AI.

MCTS constructs the statistics tree at the starting point.

Selection
: All child nodes have now been visited at least once.
    Now AI can select the best child node.
    -   based on how good the statistics are
    -   how much the child node has been "ignored"

Expansion
: Add a new node that the AI will investigate

Simulation
: starting from position represented by left child node,
    make random moves repeatedly until the game is won or lost

Update
: Depending on win or loss, update left child node in stats
    tree with relevant stats

The parent nodes inherit statistics from child nodes.

The node with the highest number of simulations will be chosen as the
next move.

The first phase, selection, lasts until the statistics necessary to
treat each position reached as a multi-armed bandit problem is
collected.

The second phase, expansion, occurs when the algorithm can longer be
applied. An unvisited child is randomly chosen, and a new record node
is added to the tree of statistics.

After expansion, the remainder of the playout is in phase 3,
simulation. This is done as a typical monte carlo simulation.

When the playout reaches the end, the update phase takes place. All of
the positions visited during this playout have their play count and
their win count incremented.

Some great references for productionized implementations of MCTS
include:

-   [minigo/strategies.py](https://github.com/tensorflow/minigo/blob/master/strategies.py)
-   [minigo/mcts.py](https://github.com/tensorflow/minigo/blob/master/mcts.py)


## Passive Reinforcement Learning {#passive-reinforcement-learning}

We start with a passive learning agent using a state-based
representation in a fully observable environment.

In passive learning, the agent's policy \\(\pi\\) is fixed: in state \\(s\\), it
always executes the action \\(\pi(s)\\). Its goal is simply to learn how
good the policy is -- the utility function \\(U^\pi (s)\\).

The passive learning task is similar to policy evaluation, but the
agent does not know the transition model \\(P(s'|s, a)\\) and the reward
function \\(R(s)\\).

The agent executes a number of trials using the policy \\(\pi\\), and
experiences a sequence of state transitions. At each state its
percepts receives the current state and the reward of the state.

We write the utility as:

\begin{equation}
  U^\pi (s) = E\left[\sum\_{t=0}^\infty \gamma^t R(S\_t) \right]
\end{equation}


### Direct Utility Estimation (MC Learning) {#direct-utility-estimation--mc-learning}

The main idea of direct utility estimation is that the utility of a
state is the expected total reward from that state onward, and each
trial provides a sample of this quantity for each state visited.

Direct utility estimation reduces the reinforcement learning problem
to a supervised inductive learning problem, where each example has the
state as input, and the observed reward-to-go as output.

However, it misses an important source of information: that the
_utility of states are not independent_. This means it misses many
opportunities for learning. For example, if a state has high expected
utility, then neighbouring states should also have high expected
utility.

The utility of each state equals its own reward plus the expected
utility of its successor states: i.e. it obeys the [Bellman Equation](#org5fa6e71)
for a fixed policy.

We can view directed utility estimation as searching for \\(U\\) in a
hypothesis space that is much larger than it needs to be, since it
includes many functions that violate the Bellman equations.


### Adaptive Dynamic Programming {#adaptive-dynamic-programming}

An ADP agent takes advantage of the constraints among the utilities of
states by learning the transition model that connects them and solving
the corresponding MDP using a dynamic programming method.

For a passive learning agent, the task is as simply as plugging in the
learnt transition model and the rewards into the Bellman equations to
calculate the utility of each state.

The task of learning the model is easy, because the environment is
fully observable. This means we have a supervised learning task where
the input is a state-action pair, and the output is the resulting
state. We keep track of how often each action outcome occurs and
estimate the transition probability \\(P(s' | s, a)\\) from the frequency
with which \\(s'\\) is reached when executing \\(a\\) in \\(s\\).

```text
function PASSIVE-ADP_AGENT(percept) returns an action
  inputs: percept, indicating state s' and reward signal r'
  persistent: \pi, a fixed policy
    mdp: MDP with model P, rewards R, and discount \gamma
    U: a table of utilities, initially empty
    N_{sa}: a table of frequencies for each state-action pair
    N_{s'|s,a}: a table of outcome frequencies
    s, a: the previous state and action
  if s' is new then $U[s'] <- r'; R[s'] <- r'
  if s is not null then
    increment N_{sa}[s, a] and N_{s'|s,a}[s', s, a]
    for each t such that N_{s'|s, a}[t,s,a] is nonzero do
      P(t|s, a) <- N_{s'|s, a}[t,s,a] / N_{sa}[s, a]
    U <- POLICY-EVALUATION(\pi, U, mdp)
  if s'.TERMINAL? then s,a <- null else s,a <- s', \pi[s']
  return a
```

<div class="src-block-caption">
  <span class="src-block-number">Code Snippet 1</span>:
  A passive RL agent based on ADP.
</div>

This approach is computationally intractable for large state spaces.
In addition, it uses the maximum-likelihood estimation for learning
the transition model.

A more nuanced approach would be Bayesian reinforcement learning,
which assumes a prior probability \\(P(h)\\) for each hypothesis \\(h\\) about
what the true model is. The posterior probability \\(P(h|e)\\) is obtained
via Bayes' rule. Then \\(\pi^\* = argmax\_\pi \sum\_h P(h|e) u\_h^\pi\\).

Another approach, derived from robust control theory, allows for a set
of possible models \\(H\\) and defines an optimal robust policy as one
that gives the best outcome in the worst case over \\(H\\): \\(\pi^\* =
argmax\_\pi min\_h u\_h^\pi\\).


### Temporal-difference Learning {#temporal-difference-learning}

TD learning involves using the observed transitions to adjust the
utilities such that the constraint equations are met.

When a transition occurs from state \\(s\\) to state \\(s'\\), we apply the
update rule:

\begin{equation}
  U^\pi(s') \leftarrow U^\pi(s) + \alpha (R(s) + \gamma U^\pi(s') -U^\pi(s))
\end{equation}

Where \\(\alpha\\) is the learning rate. The difference in utilities gives rise
to the name temporal-difference.

```text
function PASSIVE-TD-AGENT(percept) returns an action
  inputs: percept, with current state s' and reward r'
  persistent: \pi, a fixed policy
    U, a table of utilities, initially empty
    N_s, a table of frequencies
    s, a, r, the previous state, action and reward

  if s' is new then U[s'] <- r'
  if s is not null then
    increment N_s[s]
    U[s] <- U[s] + \alpha N_s[s] (r + \gamma U[s'] - U[s])
  if s'.TERMINAL? then s, a r <- null else s,a,r <- s', \pi[s'], r'
  return a
```

TD learning learns slower than ADP and shows much higher variability,
but is simpler and requires less computation. TD learning does not
need a transition model to perform updates.

ADP and TD are closely related. Both try to make local adjustments to
the utility estimates in order to make each state "agree" with its
successors. However, TD adjusts a state to agree with its observed
successor, while ADP adjusts the state to agree with all of the
successors that might occur, weighted by their probabilities.

ADP can be made more efficient by approximating the algorithms for
value or policy iteration. For example, the prioritized sweeping
heuristic prefers adjustments to states that have undergone a large
adjustment in their own utility schemes. This enables them to handle
state spaces that are far too large for a full ADP. An approximation
algorithm can use a minimum adjustment size that decreases as the
environment model becomes more accurate, eliminating very long value
iterations that occur early in learning due to large changes in the
model.


## Active Reinforcement Learning {#active-reinforcement-learning}

A passive learning agent has a fixed policy that determines its
behaviour. An active agent must learn what actions to take.

First, the agent will need to learn a complete model with outcome
probabilities for all actions, rather than the model for the fixed
policy. The learning mechanism for the passive ADP agent will work for
this

Next, the agent has a choice of actions. The utilities it learns are
defined by the optimal policy, governed by the [Bellman equations](#org5fa6e71).
Having obtained a utility function for the given  model, the agent can
extract an optimal action by one-step look-ahead to maximise the
expected utility.


### Potential Pitfalls {#potential-pitfalls}

A greedy agent, that picks the best action given the learned model,
very seldom converges to the optimal policy for the environment and
sometimes converges to horrible policies.

This is because the learned model is not the same as the true
environment. What is optimal in the learned model might not be optimal
in the true environment.

An agent therefore has to make a tradeoff between exploitation to
maximise its reward, and exploration to maximise its long-term
well-being. The question on whether there is an optimal exploration
policy is a subfield of statistical decision theory called the bandit
problem.

An agent has to be greedy in the limit of infinite exploration, or
GLIE. This is the scenario where the learned model is the true model.
There are several GLIE schemes, one of the simplest is to have the
agent choose a random action a fraction \\(\frac{1}{t}\\) of the time and
to follow the greedy policy otherwise. This can be extremely slow to
converge.

A more sensible approach is to assign some eight to actions that the
agent has not tried very often,while tending to avoid actions that are
believed to be of low utility. This can be achieved by altering the
constraint equation to assign higher utility estimates to unexplored
state-action pairs.

\begin{equation}
  U^+(s) \leftarrow R(s) + \gamma max\_{a} f\left( \sum\_{s'} P(s' |
    s, a) U^+(s), N(s, a) \right)
\end{equation}

\\(f(u, n)\\) is called the exploration function. It determines how greed
is traded off against curiosity. The function should be increasing in
\\(u\\) and decreasing in \\(n\\).


### Learning an action-utility function {#learning-an-action-utility-function}

An active TD agent is no longer equipped with a fixed policy, so if it
learns a utility function \\(U\\), it will need to learn a model in order
to be able choose an action based on \\(U\\) via one-step look-ahead. The
[update rule for TD](#orgf5ec1d1) remains unchanged. IT can be shown that the TD
algorithm will converge to the same values as ADP as the number of
training sequences tends to infinity.


### Q-learning {#q-learning}

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

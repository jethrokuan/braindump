+++
title = "Reinforcement Learning ⭐"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:27:10+08:00
tags = ["machine-learning"]
draft = false
+++

tags
: [Machine Learning]({{< relref "machine_learning" >}})

Reinforcement Learning is the field of learning and decision-making
under uncertainty. An agent acts with a learnable behaviour policy in
an environment with initially unknown dynamics and reward. The agent
observes the environment's state (sometimes partially: [POMDPs]({{< relref "pomdp" >}})) and
chooses an action.

behaviour
: \\(\Pi(a | s)\\)

action
: \\(a\_t \in A\\)

reward
: \\(r\_{t+1} \in R\\)

state
: \\(s\_{t+1} \in S\\)

dynamics
: \\(T(s\_{t+1} | s\_t, a\_t)\\)

reward
: \\(R(r\_{t+1} | s\_t, a\_t)\\)

The dynamics and rewards here reflect the [markovian assumption]({{< relref "markovian_assumption" >}}).
States can be represented in many ways: in a tabular fashion (state 1
\\(\rightarrow\\) state 2) or as features.


## Key Challenges {#key-challenges}

1.  Exploration vs Exploitation
2.  Function approximation
3.  Credit Assignment


## Making Complex Decisions {#making-complex-decisions}

Earlier, we were concerned with environments with one-shot, episodic
decision problems. Sequential decision problems incorporate utilities,
uncertainty and sensing. These include searching and planning problems
as special cases.


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


### Summary {#summary}

| Problem    | Bellman Equation                                         | Algorithm                   |
|------------|----------------------------------------------------------|-----------------------------|
| Prediction | Bellman Expectation Equation                             | Iterative Policy Evaluation |
| Control    | Bellman Expectation Equation + Greedy Policy Improvement | Policy Iteration            |
| Control    | Bellman Optimality Equation                              | Value Iteration             |


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
utility of its successor states: i.e. it obeys the Bellman Equation
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
defined by the optimal policy, governed by the Bellman Equations.
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
[update rule for TD](#org48e122e) remains unchanged. IT can be shown that the TD
algorithm will converge to the same values as ADP as the number of
training sequences tends to infinity.


## RL Applications {#rl-applications}

Personalizer
: [ICML 2017 Tutorial on Real World Interactive Learning](http://hunch.net/~rwil)

Robotics
: [Deep Reinforcement Learning, Decision Making, and Control](https://sites.google.com/view/icml17deeprl)

Tutoring Systems
: [Reinforcement Learning with People - NIPS 2017 - YouTube](https://www.youtube.com/watch?v=TqT9nIx27Eg)


## Resources {#resources}

-   [Katja Hofmann | Reinforcement Learning: Past, Present, and Future Perspective...](https://slideslive.com/38921493/reinforcement-learning-past-present-and-future-perspectives)


## Related {#related}

-   [§markov\_decision\_process]({{< relref "markov_decision_process" >}})
-   [§mcts]({{< relref "mcts" >}})
-   [§deep\_rl]({{< relref "deep_rl" >}})
-   [§td\_learning]({{< relref "td_learning" >}})
-   [§policy\_gradients]({{< relref "policy_gradients" >}})
-   [§actor\_critic]({{< relref "actor_critic" >}})
-   [§q\_learning]({{< relref "q_learning" >}})

<biblio/rl.bib>


## Backlinks {#backlinks}

-   [Control As Inference]({{< relref "control_as_inference" >}})
-   [Q-Learning]({{< relref "q_learning" >}})
-   [Deep Reinforcement Learning]({{< relref "deep_rl" >}})
-   [Exploration In Reinforcement Learning]({{< relref "exploration_in_rl" >}})
-   [Free-Energy Reinforcement Learning]({{< relref "free_energy_rl" >}})
-   [Inverse Reinforcement Learning]({{< relref "inverse_rl" >}})
-   [Meta Learning]({{< relref "meta_learning" >}})
-   [Generalization In Reinforcement Learning]({{< relref "generalization_in_rl" >}})
-   [A Distributional Code for Value in Dopamine-based Reinforcement Learning]({{< relref "dabney2020_distributional_rl" >}})
-   [Distributed Reinforcement Learning]({{< relref "distributed_rl" >}})
-   [Transfer Learning]({{< relref "transfer_learning" >}})
-   [Human Behaviour As Optimal Control]({{< relref "human_behaviour_as_optimal_control" >}})
-   [Neuroscience and Reinforcement Learning]({{< relref "neuroscience_rl" >}})
-   [Neuroscience and Reinforcement Learning]({{< relref "neuroscience_rl" >}})
-   [Policy Gradients]({{< relref "policy_gradients" >}})
-   [Model-Based Reinforcement Learning]({{< relref "model_based_rl" >}})

+++
title = "Artificial Intelligence"
author = ["Jethro Kuan"]
draft = false
+++

## What is Artificial Intelligence? {#what-is-artificial-intelligence}

Designing agents that act rationally (e.g. through maximising a reward
function).

Humans often act in ways that do not maximise their own benefit
(irrational).


### Acting Humanly: Turing Test {#acting-humanly-turing-test}

A computer would require:

-   natural language processing
-   knowledge representation
-   automated reasoning
-   machine learning


### Thinking Humanly {#thinking-humanly}

Cognitive science brings together computer models and experimental
techniques in psychology to construct testable and provable theories
of the human mind.


### Thinking rationally {#thinking-rationally}

Taking informal knowledge and expressing it in logical terms.


### Acting Rationally {#acting-rationally}

A rational agent is one that acts so as to achieve the best outcome
or,when there is uncertainty, the best expected outcome.

An agent is a function from percept histories to actions, i.e. \\(f: P^\*
\rightarrow A\\). We seek the best-performing agent for a certain task;
must consider computation limits.


## Intelligent Agents {#intelligent-agents}

-   Agents perceive the environment through sensors
-   Agents act upon the environment through actuators


### Rational Agents {#rational-agents}

-   For each possible percept sequence, select an action that is
    expected to maximise its performance measure. The performance
    measure is a function of a given sequence of environment states.
-   Given the evidence provided by the percept sequence and whatever
    built-in knowledge the agent has.
-   Agents can perform actions that help them gather useful information
    (exploration)
-   An agent is _autonomous_ if its behaviour is determined by its own
    experience (with ability to learn and adapt)


### Exploration vs Exploitation {#exploration-vs-exploitation}

Doing actions that modify future percepts (information gathering) is
an important part of rationality. In most scenarios, agents don't know
the entire environment _a priori_.


### Specifying Task Environment (PEAS) {#specifying-task-environment--peas}

-   Performance measure
-   Environment
-   Actuators
-   Sensors


### Properties of Task Environments {#properties-of-task-environments}

Fully observable
: whether an agent's sensors gives it access to
    the complete state of the environment at any given point in time

Deterministic
: if the next state is completely determined by the
    current environment. Otherwise it is **stochastic**.

Episodic
: whether an agents experience is divided into atomic
    episodes. In each episode, an agent receives a percept
    and performs a single action. In **sequential**
    environments short-term actions can have long-term
    consequences. For this reason, episodic environments are
    generally simpler.

Static
: whether the environment can change while the agent is
    deliberating.

Discrete
: whether the state of the environment, how time is
    handled, and the percepts and actions of the agent
    discretely quantized.

Single agent
: in some environments, for example chess, there are
    multiple agents acting in the same environment.
    -   **cooperative:** if the two agents need to work together.
    -   **competitive:** if the two agents are working against each other.

Known
: whether the agent knows the outcome of its actions.


### Table-Driven Agent {#table-driven-agent}

Simple to implement, and works. However, the number of table entries
is exponential in time: \\(\text{#percepts}^\text{time}\\). Hence it is
doomed to failure. The key challenge to AI is to produce rational
behaviour from a small program rather than a vast table.


### Reflex agents {#reflex-agents}

A simple reflex agent is one that selects actions on the basis of the
_current_ percept, ignoring the rest of the percept history. A
_condition-action_ rule is triggered upon processing the current
percept. E.g. **if** the car in front is braking, **then** brake too.

Basing actions on only the current percept can be highly limiting, and
can also lead to infinite loops. Randomized actions of the right kind
can help escape these infinite loops.


### Model-based Reflex Agents {#model-based-reflex-agents}

The agent maintains some **internal state** that depends on percept
history and reflects at least some of the unobserved aspects of the
current state. Information about how the world evolves independently
from the agent is encoded into the agent. This knowledge is called a
**model** of the world, and this agent is hence a **model-based** agent.


### Goal-based agents {#goal-based-agents}

Knowing about the current state of the environment may not be enough
to decide on what to do. Agents may need **goal** information that
describes situations that are desirable. Sometimes goal-based action
selection is straightforward, but in others **searching** and **planning**
are required to achieve the goal. Goal-based agents are flexible
because the knowledge that supports its decisions is represented
explicitly and can be modified, although it is less efficient.


### Utility-based agents {#utility-based-agents}

Goals provide a binary distinction between good and bad states. A more
general performance measure should allow a comparison between world
states according to exactly how good it is to the agent. An agent's
**utility function** is an internalisation of the performance measure.
An agent chooses actions to maximise its expected utility. A
utility-based agents has to model and keep track of its environment.


### Learning Agents {#learning-agents}

A learning agent can be divided into four conceptual components.

learning element
: responsible for making improvements

performance element
: responsible for selecting external actions

problem generator
: suggests actions that will lead to new and
    informative experiences

the learning element takes in feedback from the **critic** on how the
agent is doing and determines show the performance element should be
modified to do better in the future.


### State representations {#state-representations}


#### Atomic Representation {#atomic-representation}

In an atomic representation each state of the world is indivisible,
and has no internal structure. Search, game-playing, hidden Markov
models and Markov decision processes all work with atomic
representations.


#### Factored Representation {#factored-representation}

A factored representation splits up each state into a fixed set of
**variables** or **attributes**, each of which can have a **value**.

Constraint satisfaction algorithms, propositional logic, planning,
Bayesian networks and machine learning algorithms work with factored
representations.


#### Structured Representations {#structured-representations}

Structured representations underlie relational databases and
first-order logic, first-order probability models, knowledge-based
learning and much of natural language understanding.


#### Implications {#implications}

A more expressive representation can capture, at least as concisely, a
everything a more expressive one can capture, plus more. On the other
hand, reasoning and learning become more complex as the expressive
power of the representation increases.


## Problem-Solving {#problem-solving}

Problem-solving agents use _atomic_ representations, as compared to
goal-based agents, which use more advanced factored or structured
representations.

The process of looking for a sequence of actions that reaches the goal
is called _search_. A search algorithm takes a problem as input and
returns a _solution_ in the form of an action sequence.


## Classical Search {#classical-search}

This addresses observable, deterministic, and known environments where
the solution is a sequence of actions.


### How Search Algorithms Work {#how-search-algorithms-work}

Search algorithms consider various possible action sequences. The
possible action sequences start at the initial state form a _search
tree_.

Search algorithms require a data structure to keep track of the search
tree that is being constructed.

state
: state in the state space to which the node corresponds

parent
: the node in the search tree that generated this node

action
: the action that was applied to the parent to generate this node

path-cost
: the cost, traditionally denoted by \\(g(n)\\), of the path
    from the initial state to the node, as indicated by the
    parent pointers


### Measuring Performance {#measuring-performance}

completeness
: is the algorithm guaranteed to find a solution if
    it exists?

optimality
: does the strategy find the optimal solution?

time complexity
: how long does it take to find a solution?

space complexity
: how much memory is required to do the search?


### Uninformed Search Strategies {#uninformed-search-strategies}


#### Breadth-first Search {#breadth-first-search}

The root node is expanded first, then all the successors of the root
node are expanded next, then their successors, and so on.

| performance      | rating       |
|------------------|--------------|
| completeness     | YES          |
| optimal          | NO           |
| time complexity  | \\(O(b^d)\\) |
| space complexity | \\(O(b^d)\\) |

The shallowest node may not be the most optimal node.

The space used in the _explored set_ is \\(O(b^{d-1})\\) and the space
used in the _frontier_ is \\(O(b^d)\\).

In general, exponential-complexity search problems cannot be solved by
uninformed methods for any but the smallest instances.


#### Uniform-cost Search {#uniform-cost-search}

Uniform-cost search expands the node \\(n\\) with the lowest path
cost \\(g(n)\\). The goal test is applied to a node when it is selected
for expansion rather than when it is first generated.

This is equivalent to BFS if all step costs are qual.

| performance  | rating                                                                                      |
|--------------|---------------------------------------------------------------------------------------------|
| completeness | MAYBE                                                                                       |
| optimal      | YES                                                                                         |
| time         | \\(O(b^{1+\lfloor{\frac{C^\*}{\epsilon}}\rfloor})\\), where \\(C^\*\\) is the optimal cost. |
| space        | \\(O(b^{1+\lfloor{\frac{C^\*}{\epsilon}}\rfloor})\\)                                        |

Completeness is guaranteed only if the cost of every step exceeds some
small positive constant \\(\epsilon\\). an infinite loop may occur if
there is a path with an infinite sequence of zero-cost actions.


#### Depth-first Search {#depth-first-search}

Always expands the _deepest_ node in the current frontier of the
search tree.

| performance      | rating                                |
|------------------|---------------------------------------|
| completeness     | YES                                   |
| optimal          | NO                                    |
| time complexity  | \\(O(b^m)\\)                          |
| space complexity | \\(O(b^m)\\), \\(O(m)\\) if backtrack |

The time complexity of DFS may be worse than BFS: \\(O(b^m)\\) might be
larger than \\(O(b^d)\\).

DFS only requires storage of \\(O(bm)\\) nodes, where \\(m\\) is the maximum
depth of any node. **backtracking search** only generates one successor
at a time, modifying the current state description rather than copying
it. Memory requirements reduce to one state description and \\(O(m)\\)
actions.


#### Depth-limited Search {#depth-limited-search}

In depth-limited search, nodes at depth of pre-determined limit \\(l\\)
are treated as if they had no successors. This limit solves the
infinite-path problem.

| performance      | rating                                |
|------------------|---------------------------------------|
| completeness     | YES                                   |
| optimal          | NO                                    |
| time complexity  | \\(O(b^l)\\)                          |
| space complexity | \\(O(b^l)\\), \\(O(l)\\) if backtrack |


#### Iterative Deepening Depth-first Search {#iterative-deepening-depth-first-search}

Key idea is to gradually increase the depth limit: first 0, then
1, then 2... until a goal is found.

{{< figure src="/ox-hugo/screenshot_2018-01-22_15-26-50.png" >}}

\\(N(IDS) = (d)b + (d-1)b^2 + \dots + (1)b^d\\), which gives a time
complexity of \\(O(b^d)\\)

| performance      | rating                                |
|------------------|---------------------------------------|
| completeness     | YES                                   |
| optimal          | NO (unless step cost is 1)            |
| time complexity  | \\(O(b^d)\\)                          |
| space complexity | \\(O(b^d)\\), \\(O(m)\\) if backtrack |

1.  BFS and IDS are complete if \\(b\\) is finite.
2.  UCS is complete if \\(b\\) is finite and step cost is \\(\ge \epsilon\\).
3.  BFS and IDS are optimal if all step costs are identical.


#### Bidirectional Search {#bidirectional-search}

Conduct two simultaneous searches -- one forward from the initial
state, and the other backward from the goal. This is implemented by
replacing the goal test with a check to see whether the frontiers of
two searches intersect. This reduces the time ad space complexity to \\(O(b^{d/2})\\).


### Informed Search Strategies {#informed-search-strategies}


#### Greedy best-first search {#greedy-best-first-search}

_Greedy best-first search_ tries to expand the node that is closest to
the goal, on the grounds that this is likely to lead to a solution
quickly. It evaluates nodes by using just the heuristic function:
\\(f(n) = h(n)\\).

Greedy best-first tree search is incomplete even in a finite state
space. The graph search version is complete in finite spaces, but not
in infinite ones. The worst case time and space complexity is
\\(O(b^m)\\). However, with a good heuristic function, the complexity can
be reduced substantially.


#### A\* search {#a-search}

It evaluates nodes by combining \\(g(n)\\) the cost to reach the node, and
\\(h(n)\\) the cost to get to the goal: \\(f(n) = g(n) + h(n)\\). Since \\(g(n)\\)
gives the path cost from the start node to node \\(n\\), and \\(h(n)\\) is the
estimated cost of the cheapest path from \\(n\\) to the goal,$f(n) = $
estimated cost of the cheapest solution through \\(n\\).

\\(h(n)\\) is an _admissible heuristic_ iff it never overestimates the
cost to reach the goal. For A\*, this means that \\(f(n)\\) would never
overestimate the cost of a solution along the current path.

Admissible heuristics are by nature optimistic because they think the
cost of solving the problem is less than it actually is.

A second, slightly stronger condition is called _consistency_, and is
required only for applications of A\* to graph search. A heuristic
\\(h(n)\\) is _consistent_ iff for every node \\(n\\) and every successor \\(n'\\)
of \\(n\\) generated by any action \\(a\\), the estimated cost of reaching the
goal from \\(n\\) is no greater than the step cost of getting to \\(n'\\) plus
the estimated cost of reaching the goal from \\(n'\\): \\(h(n) \le
c(n,a,n') + h(n')\\). This is a form of the general triangle inequality.

A\* search is complete, optimal and optimally efficient with a
consistent heuristic. The latter means that no other optimal algorithm
is guaranteed to expand fewer nodes than A\*.

However, for most problems, the number of states within the goal
contour search space is still exponential in the length of the
solution.

The _absolute error_ of a heuristic is defined as \\(\Delta = h^\*-h\\),
and the _relative error_ is defined as \\(\epsilon = \frac{h^\*-h}{h\*}\\).
The complexity results depend strongly on the assumptions made about
the state space. For constant step costs, it is \\(O(b^{\epsilon d})\\),
and the effective branching factor is \\(b^\epsilon\\).

A\* keeps all generated nodes in memory, and hence it usually runs out
of space  long before it runs of time. Hence, it is not practical for
large-scale problems.

Other memory-bounded heuristic searches include:

-   iterative-deepening A\* (IDA\*)
-   Recursive best-first search (RBFS)
-   Memory-bounded A\* (MA\*)
-   simplified MA\* (SMA\*)


### Learning to Search Better {#learning-to-search-better}

Each state in a _metalevel state space_ captures the internal
computational state of a program that is searching in an _object-level
state space_. A _metalevel learning_ algorithm can learn from
experiences to avoid exploring unpromising subtrees. The goal of the
learning is to minimise the total cost of problem solving, trading off
computational expense and path cost.


## Heuristic Functions {#heuristic-functions}

If for any node n \\(h\_2(n) \ge h\_1(n)\\), we say that \\(h\_2\\) _dominates_
\\(h\_1\\). Domination translates directly into efficiency: A\* using \\(h\_2\\)
will never expand more nodes than \\(h\_1\\). Hence it is generally better
to use a heuristic function with higher value, while making sure it is
consistent, and computing the heuristic function is computationally
feasible.


### Generating Admissible Heuristics {#generating-admissible-heuristics}


#### From Relaxed Problems {#from-relaxed-problems}

Because the relaxed problem adds edges to the state space, any optimal
solution in the original problem is, by definition, also a solution in
the relaxed problem. Hence, the cost of an optimal solution to a
relaxed problem is an admissible heuristic for the original problem.
Because the derived heuristic is an exact cost for the relaxed
problem, it must obey the triangle inequality and is therefore
consistent.


#### From Subproblems: Pattern Databases {#from-subproblems-pattern-databases}

_Pattern Databases_ store exact solution costs for every possible
subproblem instance. In the case of the 8-puzzle, every possible
configuration of the four tiles and the blank. Each pattern database
yields an admissible heuristic, and these heuristics can be combined
by taking the maximum value. Solutions to subproblems can overlap:
_disjoint pattern databases_ account for this. These work by dividing
the problem in a way that each move affects only one subproblem.


#### From Experience {#from-experience}

Inductive learning methods work best when supplied with _features_ of
a state that are relevant to predicting the state's value. A common
approach to combining features would be through a linear combination:
\\(h(n) = c\_1x\_1(n) + c\_2x\_2(n)\\).

These heuristics satisfy the requirement that \\(h(n) = 0\\) for goal
states, but are not necessarily admissible or consistent.


## Beyond Classical Search {#beyond-classical-search}

Here, we cover algorithms that perform purely _local search_ in the
state space, evaluating and modifying one or more current states
rather than systematically exploring paths from an initial state.
These include methods inspired by statistical physics (simulated
annealing) and evolutionary biology (genetic algorithms).

If an agent cannot predict exactly what percept it will receive, then
it will need to consider what to do under each _contingency_ that its
percepts may reveal.

If the path to the goal doesn't matter, we giht consider a different
class of algorithms, ones that do not worry about the paths at all.
_Local search_ algorithms operate using a single _current node_ and
generally move only to neighbours of that node. Its advantages
include:

1.  They generally use a <span class="underline">constant amount of memory</span>
2.  They can often find <span class="underline">reasonable solutions in large or infinite
    state spaces</span> where systematic algorithms are not suitable.


### Hill-climbing Search {#hill-climbing-search}

The hill-climbing search is a loop that continually moves in the
direction of increasing value.

Consider the 8-queens problem.

Local search algorithms typically use a _complete-state formation_. The
successors of a state are all possible states generated by moving a
single queen to another square in the same column.

We could use a heuristic cost function \\(h\\) equal to the number of
queens that are attacking each other, either directly or indirectly.

The global minimum of this function is zero, which only occurs for
perfect solutions. Hill-climbing algorithms typically choose randomly
among the set of best successors having the lowest \\(h\\).

Hill-climbing algorithms can get stuck for the following reasons:

-   local maxima
-   sequence of local maxima
-   flat local maximum, or _shoulder_, from which progress
    is possible.


#### Variants {#variants}

stochastic hill-climbing
: chooses at random from among the uphill
    moves; the probability of selection can vary with the steepness
    of the uphill move. Usually converges more slowly, but finds
    better solutions.

first-choice hill-climbing
: stochastic hill-climbing with randomly
    generated successors until one is generated that is better than
    the current state. Good when state has many successors.

random-restart hill-climbing
: conducts hill-climbing searches from
    randomly generated initial states, until a goal is found.
    Trivially complete with probability approaching 1.


### Simulated Annealing {#simulated-annealing}

A hill-climbing algorithm that never makes 'downhill' moves towards
states with lower-value is guaranteed to be incomplete, because it can
be stuck on a local maximum.

```text
  function SIMULATED-ANNEALING(problem, schedule)
    inputs: problem, a problem
            schedule, a mapping from time to 'temperature'

    current ← MAKE-NODE(problem, INITIAL-STATE)
    for t = 1 to ∞ do
      T ← schedule(t)
      if T = 0 then return current
      next ← a randomly selected successor of current
      𝞓E ← next.VALUE - current.VALUE
      if 𝞓E > 0 then current ← next
      else current ← next only with probability e^(𝞓E/T)
```


### Local Beam Search {#local-beam-search}

<https://www.youtube.com/watch?v=RLWuzLLSIgw>

Local beam search keeps track of \\(n\\) states rather than just one. It
begins with \\(n\\) randomly generated states, at each step all the
successors of all states are generated. If any one is a goal, the
algorithm halts.

Local-beam search passes useful information between the parallel
search threads (compared to running random-restart \\(n\\) times), quickly
abandoning unfruitful searches and moves its resources to where the
most progress is being made.

Stochastic local beam search chooses \\(n\\) successors at random, with
the probability of choosing a given successor being an increasing
function of its value.


### Genetic Algorithms {#genetic-algorithms}

A _genetic algorithm_ is a variant of stochastic beam search in which
successor states are generated by combining two parent states rather
than by modifying a single state.

GA begins with a set of \\(n\\) randomly generated states, called the
_population_. Each state is also called an _individual_.

The production of the next generation of states is rated by the
objective function, or _fitness function_. A fitness function returns
higher values for better states.

Like stochastic beam search, genetic algorithms combine an uphill
tendency with random exploration and exchange of information among
parallel search threads. _crossover_ in genetic algorithms raises the
level of granularity at which the search operates.

```text
  function GENETIC-ALGORITHM(population, FITNESS-FN) returns an individual
    inputs: population, a set of individuals
            FITNESS-FN, a function that measures the fitness of an
    individual

    repeat
      new_population ← empty set
      for i = 1 to SIZE(population) do
        x ← RANDOM-SELECTION(population, FITNESS-FN)
        y ← RANDOM-SELECTION(population, FITNESS-FN)
        child ← REPRODUCE(x,y)
        if (small random probability) then child ← MUTATE(child)
        add child to new_population
      population ← new_population
    until some individual is fit enough, or enough has elapsed
    return the best individual in population, according to FITNESS-FN

  function REPRODUCE(x,y) returns an individual
    inputs: x,y, parent individuals

    n ← LENGTH(x); c ← random(1,n)
    return APPEND(SUBSTRING(x,1,c), SUBSTRING(y, c+1, n))
```


### Local Search in Continuous Spaces {#local-search-in-continuous-spaces}

One way to avoid continuous problems is simply to _discretize_ the
neighbourhood of each state. Many methods attempt to use the
_gradient_ of the landscape to find a maximum: \\(x \leftarrow x +
\delta \nabla (x)\\), where \\(\delta\\) is a small constant called the _step
size_. For many problems, the _Newton-Raphson_ method is effective. It
solves the roots for equations \\(g(x) = 0\\), by computing a new
estimate: \\(x \leftarrow x - g'(x)/g(x)\\). To find a maximum or minimum
of \\(f\\), we need to find \\(x\\) such that the gradient is zero. In this
case \\(g(\mathbf{x})\\) in Newton's formula becomes \\(\nabla
f(\mathbf{x})\\) and the update equation can be written in matrix-vector
form as:

\begin{align\*}
\mathbf{x} \leftarrow \mathbf{x} - H\_f^{-1}(\mathbf{x})\nabla f(\mathbf{x})
\end{align\*}

where \\(H\_f\\) is the _Hessian_ matrix of second derivatives. For
high-dimensional problems, computing the \\(n^2\\) entries of the Hessian
and inverting it may be expensive, and approximate versions have been
developed.

Local search methods suffer from local maxima, ridges and plateaux
in continuous spaces just as much as in discrete spaces.


### Searching with Non-deterministic Actions {#searching-with-non-deterministic-actions}

When the environment is either partially observable or
non-deterministic, percepts become useful. In a partially observable
environment, every percept helps narrow down the set of possible
states the agent might be in. In a non-deterministic environment,
percepts tell the agent which of the possible outcomes of its actions
has actually occurred. Future percepts cannot be determined in
advance, and the agent's future actions will depend on those future
percepts. The solution to a problem is not a sequence but a
_contingency plan_

The solutions for no-deterministic problems can contain nested
if-then-else statements, meaning they are trees and not sequences.


#### AND-OR search trees {#and-or-search-trees}

A solution for an AND-OR search problem is a subtree that:

1.  includes every outcome branch leaf
2.  specifies one action at each of its OR nodes
3.  includes every outcome branch at each of its AND nodes

<!--listend-->

```text
  function AND-OR-GRAPH-SEARCH(problem) returns a conditional plan, or failure
    OR-SEARCH(problem, INITIAL-STATE, problem, [])

  function OR-SEARCH(state,problem,path) returns a conditional plan, or failure
    if problem, GOAL-TEST(state) then return the empty plan
    if state is on path then return failure
    for each action in problem, ACTIONS(state) do
      plan ← AND-SEARCH(RESULTS(state,action), problem, [state | path])
      if plan ≠ failure then return [action | plan]
    return failure

  function AND-SEARCH(states,problem,path) returns a conditional plan, or failure
    for each s_i in states do
      plan_i ← OR-SEARCH(s_i,problem,path)
      if plan_i = failure then return failure
    return [if s_1 then plan_1 else if s_2 then plan_2 ...]
```

(stop at AIMA 4.4)


## Adversarial Search {#adversarial-search}

Competitive environments, in which the agent's goals are in conflict,
give rise to _adversarial search_ problems.

Game theory views any multi-agent environment as a game, provied that
the impact of each agent on the others is significant.

Games often have large branching factors, and require making some
decision even before computing the optimal decision.

_Pruning_ allows us to ignore portions of the search tree that make no
difference to the final choice, and heuristic evaluation functions
allow us to approximate the true utility of a state without doing a
complete search.

A game can be formally defined as a search problem with the following
elements:

\\(S\_0\\)
: the _initial state_, which specifies how the game is set up
    at the start

\\(Player(s)\\)
: Defines which player has the move in a state

\\(Actions(s)\\)
: Returns the set of legal moves in a state

\\(Result(s,a)\\)
: The transition model, which defines the result of a move

\\(TerminalTest(s)\\)
: Terminal test, which is true when the game is
    over, and false otherwise.

\\(Utility(s,p)\\)
: A utility function defines the numeric value for a
    game that ends in terminal state \\(s\\) for a player
    \\(p\\).

The initial state, \\(Actions\\) function and \\(Result\\) function define the
game tree for the game.


### Optimal Strategy {#optimal-strategy}

The optimal strategy can be determined from the _minimax value_ of
each node (\\(Minimax(n)\\)). The minimax value of a node is the utility
of being in the corresponding state, assuming that players play
optimally from there to the nd of the game. The minimax value of a
terminal state is its utility.

\begin{align}
  Minimax(s) =
  \begin{cases}
    Utility(s), \text{ if } TerminalTest(s) \\\\\\
    max\_{a \in Actions(s)}MINIMAX(Result(s,a)), \text{if Player(s) =
      Max} \\\\\\
    min\_{a \in Actions(s)}MINIMAX(Result(s,a)), \text{if Player(s) = Min}
  \end{cases}
\end{align}

Minimax uses utility function on leaf nodes, backing up through the
tree, setting the node value to be the minimum of the children.


### Alpha-Beta Pruning {#alpha-beta-pruning}

Eliminate parts of the search tree that do not affect decision.


## Classical Planning {#classical-planning}

Problem-solving agents that deal with atomic representations of states
require good domain-specific heuristics to perform well. The hybrid
propositional logical agent can find plans without domain-specific
heuristics because it uses domain-independent heuristics based on the
logical structure of the problem. However, it relies on ground
propositional inference, and suffers when there are large numbers of
actions and states.

**Planning Domain Definition Language (PDDL)** was created in response to
these deficiencies.

Each state is represented as a conjunction of fluents that are ground,
functionless atoms. Database semantics is used, which involves:

closed-world assumption
: all fluents not mentioned are false

unique names assumption
: fluents with different names are distinct

State representations are carefully designed so that they can be
manipulated by set operations or logical inference.

Actions are defined in terms of the **preconditions** and **effects**.
Preconditions and effects are described in terms of a conjunction of
literals.


### Complexities of classical planning {#complexities-of-classical-planning}

**PlanSAT** is the question of whether there exists any plan that solves a
planning problem. **Bounded PlanSAT** asks whether there is a solution of
length k or less.

While the number of states is finite, adding function symbols make
them infinite, making these problems semi-decidable at best. Certain
restrictions can reduce the questions into a P class problem.

However, most agents would not be asked to derive plans for worst-case
problem instances. For many problem domains, bounded PlanSAT is
NP-complete, while PlanSAT is in P.


### State-space search for planning {#state-space-search-for-planning}

The first approach is forward (propogation) state-space search, which
searches forward from the initial state. However, it is inefficient,
for the following reasons:

1.  It tends to explore irrelevant actions
2.  Planning problems tend to have large state spaces, and relatively
    small problems will be an issue without a good heuristic

It turn out that good domain-independent heuristics can be derived for
forward search, which makes it feasible.

Alternatively, we can do a backward (regression) state-space search,
which looks for actions that can lead to the goal. Unlike forward
search, backward search only explores relevant actions, hence has a
low branching factor. However, backward search deals with sets, which
are make it harder to derive good domain-independent heuristics.


### Heuristics for planning {#heuristics-for-planning}

Framing the search problem as a graph where the nodes are states and
the edges are actions. We can think of a number of ways to relax the
problem, generating admissible heuristics:

1.  Add more edges to the graph, making it easier to find a path

The **ignore preconditions heuristic** drops all preconditions from
actions, and every action becomes applicable in every state. We count
the number of actions required such that the union of the action's
effects satisfy the goal. This is called the set-cover problem, which
is unfortunately NP-hard. We can also ignore selected preconditions of
actions.

The ignore delete list heuristic, drops all negative literals in goals
and preconditions. This way, an action cannot undo progress towards
the goal, and each action taken would monotonically progress towards
it.

1.  Grouping multiple nodes together, shrinking the size of the graph

We can reduce the number of states by forming a **state abstraction** -- a
many-to-one mapping from states in the ground representation of the
problem to the abstract representation. For example, one can ignore
some fluents.

The key idea in defining heuristics is **decomposition**: diving a problem
into parts. **Subgoal independence** is the assumption that the cost
of solving a conjunction of subgoals is approximated by the sum of the
costs of solving a subgoal independently.


### Other classical planning approaches {#other-classical-planning-approaches}

We can translate a problem description in PDDL to  a form that can be
processed by SATPlan. The steps are below:

1.  Propositionalize the actions: replace each action schema with a set
    of ground actions formed by substituting constants for each of the
    variables. These ground actions are not part of the translation,
    but will be used in subsequent steps.
2.  Define the initial state: assert \\(F^0\\) for every fluent \\(F\\) in the
    problem's initial state, and \\(\neg F^0\\) for every fluent not mentioned
    in the final state.
3.  Propositionalize the goal: the goal becomes a disjunction over all
    of its ground instances, where variables are replaced by constants.
4.  Add successor-state axioms: For each fluent \\(F\\), add an axiom of
    the form:

\begin{equation}
  F^{t+1} \iff ActionCausesF^t \vee \left( F^t \wedge \neg ActionCausesNotF^t \right)
\end{equation}

Where \\(ActionCausesF\\) is a disjunction of all the ground actions that
have \\(F\\) in their add list, and \\(ActionCausesNotF\\) is a disjunction of
all ground actions that have \\(F\\) in their delete list.

1.  Add precondition axioms: for each ground action \\(A\\), add the axiom
    \\(A^t \iff PRE(A)^t\\), i.e. if an action is taken at time \\(t\\), then the
    preconditions must be true.
2.  Add action exclusion axioms: say that exactly one ground action can
    occur at each step.

<!--listend-->

```text
  function SATPLAN(init, transition, goal, Tmax) returns solution or failure
    ""inputs: init, transition, goal constitute the problem
      description
      Tmax: upper limit for plan length""
    for t = 0 to Tmax do
      cnf <- translate-to-sat(init, transition, goal, t)
      model <- SATSolver(cnf)
      if model is not null then
        return extract-solution(model)
    return failure
```


## Decision Theory {#decision-theory}

Reference: AIMA Chapter 16

Utility theory combines with probability theory to yield a
decision-making agent, that can make rational decisions based on what
it believes and what it wants. This is opposed to goal-based agents,
that make binary decisions between good and bad states.


### Combining beliefs and desires under uncertainty {#combining-beliefs-and-desires-under-uncertainty}

Under nondeterministic, partially observable environments, the result
of an action cannot be represented by a single number. \\(RESULT(\alpha)\\) is
now expressed as a random variable, whose values are the possible
outcome states with corresponding probabilities of occurrence. The
probability of an outcome \\(s'\\), given evidence observations
\\(\mathbb{e}\\), is written \\(P(RESULT(\alpha) = s' | a, \mathbb{e})\\).

The agent's preferences are captured by a **utility function** \\(U(s)\\),
which expresses the desirability of a state. We can calculate the
expected utility of a function as follows:

\begin{equation}
  EU(a | \mathbb{e}) = \sum\_{s'} P(RESULT(\alpha) = s' | a,  \mathbb{e}) U(s')
\end{equation}

The principle of maximum expected utility (MEU) says that a rational
agent should choose the action that maximizes the expected utility. If
an agent acts to maximise a utility function that correctly reflects
all possible outcomes, then it will achieve the highest possible
performance score (averaged across all environments).


### Axioms of Utility Theory {#axioms-of-utility-theory}

To show why MEU is a rational choice, we turn to utility theory.
First, we define notation:

1.  \\(A \succ B\\): the agent prefers \\(A\\) over \\(B\\).
2.  \\(A \sim B\\): the agent is indifferent between \\(A\\) and \\(B\\).
3.  \\(A \succeq B\\): the agent prefers \\(A\\) over \\(B\\), or is indifferent.

The axioms of utility theory are:

orderability
: Exactly one of \\(A \succ B\\), \\(B \succ A\\) or \\(A \sim B\\) holds.

transitivity
: \\((A \succ B) \wedge (B \succ C) \Rightarrow A \succ C\\)

continuity
: \\(A \succ B \succ C \Rightarrow \exist p [p, A; 1-p, C] \sim B\\)

substitutability
: \\(A \sim B \Rightarrow [p, A; 1-p, C] \sim [p, B; 1-p, C]\\)

monotonicity
: \\(A \succ B \Rightarrow (p > q) \iff [p, A; 1-p B] \succ [q, A; 1-q,
                      B]\\)

Decomposability
: \\([p, A; 1-p, [q, B; 1-q, C]] \sim[p, A;(1-p)q, B;
         (1-p)q, C]\\)

von Neumann and Morgenstern showed that following these axioms, it can
be shown that.

1.  **Utility functions exist**. \\(U(A) > U(B) \iff A \succ B\\) and \\((U(A) = U(B)
       \iff A \sim B)\\).
2.  **The utility of a lottery**, can be represented as the sum of
    probability of each outcome, multiplied by the utility of that
    outcome: \\(U([p\_1, S\_1; \dots; p\_n, S\_n]) = \sum\_i p\_iU(S\_i)\\).

Utility functions are not unique: in fact, that are not changed with
affine transformations, of the form \\(U'(s) = aU(s) + b\\). This is
because the agent only needs a preference on the ranking of states,
and the actual value of the utility does not matter.


### Utility assessment and utility scales {#utility-assessment-and-utility-scales}

To build a decision-theoretic system, we must first work out what the
agent's utility function is. This process is called **preference
elicitation**, which involves presenting choices to the agent and using
the observed preferences to pin down the underlying utility function.

We have established above that utility functions are not unique, but
it helps to have a **normalized utility**. Normalized utilities fix the
utility of a "best possible prize" at \\(u\_\top = 1\\) and the "worst possible
prize" at \\(u\_\bot = 0\\).

Given this utility scale, we can assess the utility of a prize \\(S\\), by
asking the agent to choose between \\(S\\) and the standard lottery \\([p,
u\_\top;1-p, u\_\bot]\\). \\(p\\) is adjusted until the agent is indifferent
between \\(S\\) and the lottery. This is done for each prize \\(S\\).


### Multi-attribute utility functions {#multi-attribute-utility-functions}

When outcomes are characterized by two or more attributes, we need a
multi-attribute utility function.


#### Dominance {#dominance}

We say that there is strict dominance of \\(S\_1\\) over \\(S\_2\\) if \\(S\_2\\) is
lower on all attributes as compared to \\(S\_1\\). Under uncertainty, we use
a more useful generalization: **stochastic dominance**.

If \\(A\_1\\) stochastically dominates \\(A\_2\\), then for any monotonically
increasing utility function \\(U(x)\\), the expected utility of \\(A\_1\\) is at
least as high as the expected utility of \\(A\_2\\). We can understand this
via the cumulative distribution. For any action \\(A\_1\\) and \\(A\_2\\), that
lead to probability distributions \\(p\_1(x)\\) and \\(p\_2(x)\\) on the random
variable \\(X\\):

\begin{equation}
  \forall x \int\_{-\infty}^{x} p\_1(x')dx' \le \int\_{-\infty}^{x} p\_2(x')dx'
\end{equation}


#### Preference structure and multi-attribute utility {#preference-structure-and-multi-attribute-utility}

Multi-attribute utility theory is based on the supposition that
preferences of typical agents have structure. This alleviates the
difficulty in expressing a utility function with many attributes and
possible distinct values.

One simple regularity in preference structures is called preference
independence. Two attributes \\(X\_1\\) and \\(X\_2\\) are preferentially
independent if the preference between outcomes \\((x\_1, x\_2, x\_3)\\) and
\\((x\_1', x\_2', x\_3)\\) does not depend on the value of the value \\(x\_3\\) of
attribute \\(X\_3\\).

If all attributes are mutually preferentially independent, then an
agent's preference can be described by maximising the function:

\begin{equation}
  V(x\_1, x\_2, \dots, x\_n) = \sum\_i V\_i(x\_i)
\end{equation}

An example is:

\begin{equation}
V(noise, cost, deaths) = - noise \times 10^4 - cost - deaths \times 10^{12}
\end{equation}

Under uncertainty, the mathematics gets a bit more complicated.
Utility independence extends preference independence to cover
lotteries: a set of attributes \\(\mathbb{X}\\) is utility independent of
a set of attributes \\(\mathbb{Y}\\) if preference between lotteries on
the attributes in \\(\mathbb{X}\\) are independent of the particular
values of the attributes in \\(\mathbb{Y}\\).

Mutual utility independence implies that the agent's behaviour can be
described using a multiplicative utility function. If we denote \\(U\_i\\)
to be \\(U\_i(x\_i)\\), then a 3 attribute utility function can be expressed
as:

\begin{equation}
 U = k\_1U\_1 + k\_2U\_2 + k\_3U\_3 + k\_1k\_2U\_1U\_2 + k\_1k\_3U\_1U\_3 +
 k\_2k\_3U\_2U\_3 + k\_1k\_2k\_3U\_1U\_2U\_3
\end{equation}


#### Decision Networks {#decision-networks}

Decision networks extend Bayesian networks with nodes for actions and
utilities. An example of a decision network is below:

{{< figure src="/ox-hugo/diagnosisDN_2018-09-01_16-50-40.png" >}}

The notation is as such:

chance nodes (oval)
: these represent random variables

decision nodes (rectangles)
: these represent points where the
    decision maker has a choice of actions.

utility nodes (diamonds)
: represent the agent's utility function

A simplified form is used in many cases. The notation remains
identical, but the chance nodes describing the outcome state are
omitted. Rather than representing a utility function on outcome states,
the utility node represents the expected utility associated with each
action. This node is associated with an action-utility function (also
known as Q-function).


#### Information Value Theory {#information-value-theory}

The value of a given piece of information is defined to be the
difference in expected value between the best action before and after
information is obtained.  This is one of the most important parts of
decision-making: knowing what information to obtain.  Information has
value to the extent that it is likely to cause a change of plan and to
the extent that the new plan is significantly better than the old
plan.

Mathematically, the value of perfect information (VPI) is defined as:

\begin{equation}
VPI\_e(E\_j) = \left( \sum\_k P(E\_j = e\_{jk} | \mathbb{e})
  MEU(\alpha\_{e\_{jk}} | \mathbb{e}, E\_j = e\_{jk}) \right) - MEU(\alpha |
\mathbb{e})
\end{equation}

This is obtained by considering the best action (maximum expected
utility) before and after obtaining the information, and averaging it
across all possible values for the new information, using our current
beliefs of its value.

<!--list-separator-->

-  Properties of the value of information

    First, the expected value of information is non-negative.

    \begin{equation}
      \forall \mathbb{e}, E\_j VPI\_{\mathbb{e}} (E\_j) \ge 0
    \end{equation}

    The theorem is about the expected value, and not the real value. This
    means that information can sometimes lead to a plan that is harmful.

    It is important to note that VPI is dependent on the current state of
    information. VPI is not additive in general:

    \begin{equation}
      VPI\_{\mathbb{e}}(E\_j, E\_k) \ne VPI\_{\mathbb{e}}(E\_j) + VPI\_{\mathbb{e}}(E\_k)
    \end{equation}

    VPI is order independent. That is:

    \begin{equation}
      VPI\_{\mathbb{e}}(E\_j, E\_k) = VPI\_{\mathbb{e}}(E\_j) +
      VPI\_{\mathbb{e}, e\_j}(E\_k) = VPI\_{\mathbb{e}}(E\_k) +
      VPI\_{\mathbb{e}, e\_k}(E\_j)
    \end{equation}

<!--list-separator-->

-  Information Gathering Agents

    we can implement a myopic information-gathering agent, by using the
    VPI formula shortsightedly.

    ```text
      function INFORMATION-GATHERING-AGENT(percept) returns an action
        persistent: D, a decision network

      integrate percept into D
      j <- the value that maximises VPI(E_j) / Cost(E_j)
      if VPI(E_j) > Cost(E_j)
        return REQUEST(E_j)
      else return the best action from D
    ```

    If we know the associated cost of observing evidence, it simply
    retrieves the evidence if the cost of observing it is less than the
    value it provides.


## RANDOM {#random}


### Simon's Ant {#simon-s-ant}

Simon, noble prize in economics

> The complexity of the behaviour is the manifestation of the complexity
> of the environment and not the complexity of the program.


## REFILE {#refile}

{{< figure src="/ox-hugo/screenshot_2018-11-09_13-55-33.png" >}}


## Papers {#papers}


### Improving Policy Gradient by Exploring Under-Appreciated Rewards {#improving-policy-gradient-by-exploring-under-appreciated-rewards}

The REINFORCE algorithm minimizes the KL divergence between \\(\pi\_\theta\\)
and \\(\pi^\*\\), the optimal policy. However, learning an optimal policy by
optimizing this direction of the KL is known to be _mode-seeking_.
Hence, it the agent is prone to falling into a local optimum, and miss
out some modes of \\(\pi^\*\\).

Hence, a entropy regularization loss is added to encourage
exploration.

However, this exploration is undirected, and requires a small
regularization coefficient to prevent too much random exploration.

Optimizing in the mean-seeking direction of the KL divergence is to
learn a policy by following:

\begin{equation}
  O\_{RAML}(\theta; \tau) = \mathcal{E}\_{h \sim p(h)}\left\\{ \tau
    \sum\_{a \in A} \pi\_\tau^\* (a | h) \log \pi\_\theta (a | h) \right\\}
\end{equation}

In RL, the reward landscape is unknown, hence sampling from
\\(\pi\_\tau^\*\\) is not straightforward. We can approximate the
expectation with respect to \\(\pi\_\tau^\*\\) by using self-normalized
importance sampling. For importance sampling, one draws \\(K\\) i.i.d
samples \\(\\{ a^{(k)}\\}^{K}\_{k=1}\\) from \\(\pi\_\theta\\) and computes a set
of normalized weights to approximate \\(O\_{RAML}(\theta; \tau | h)\\).

\begin{equation}
O\_{RAML} (\theta; \tau | h) \approx \tau
\sum\_{k=1}^{K}\frac{w\_\tau(a^{(k)} | h)}{\sum\_{m=1}^{K}w\_\tau(a^{(m)}
  | h)} \log \pi\_\theta(a^{(k)} | h)
\end{equation}

where \\(w\_\tau(a^{(k)} | h) \propto \pi\_\tau^\* / \pi\_\theta\\) denotes an
importance weight defined by:

\begin{equation}
  w\_\tau (a^{(k)} | h) = exp \left\\{ \frac{1}{\tau}r (a^{(k)} | h) -
    \log \pi\_\theta (a^{(k)} | h) \right\\}
\end{equation}

One can view the weights as the discrepancy between scaled rewards \\(r /
\tau\\) and the policy's log-probabilities \\(\log \pi\_\theta\\).

In UREX, both the RAML objective and the expected reward objective is
combined and jointly maximized.
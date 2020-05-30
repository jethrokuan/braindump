+++
title = "Monte Carlo Tree Search"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:08:50+08:00
draft = false
+++

## Monte Carlo Tree Search {#monte-carlo-tree-search}

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
\bar{x_i} \pm \sqrt{\frac{2 \ln n}{n_i}}
\end{equation}

where:

- \\(\bar{x_i}\\) is the mean payout for action \\(i\\)
- \\(n_i\\) is the number of simulations of action \\(i\\)
- \\(n\\) is the total number of plays

The strategy is to pick the action with the highest upper bound each time.

How could an AI possibly "plan" ahead when there are so many potential
moves and counter moves in Go?

MCTS builds a _statistics tree_ (detailing value of nodes) that
partially maps onto the entire tree. Statistics tree guides the AI.

MCTS constructs the statistics tree at the starting point.

Selection
: All child nodes have now been visited at least once.
Now AI can select the best child node. - based on how good the statistics are - how much the child node has been "ignored"

Expansion
: Add a new node that the AI will investigate

Simulation
: starting from position represented by left child node,
make random moves repeatedly until the game is won or lost

Update
: Depending on win or loss, update left child node in stats

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

- [minigo/strategies.py](https://github.com/tensorflow/minigo/blob/master/strategies.py)
- [minigo/mcts.py](https://github.com/tensorflow/minigo/blob/master/mcts.py)

## References {#references}

- [Introduction to Monte Carlo Tree Search - Jeff Bradberry](https://jeffbradberry.com/posts/2015/09/intro-to-monte-carlo-tree-search/)
- [A Deep Dive into Monte Carlo Tree Search](http://www.moderndescartes.com/essays/deep%5Fdive%5Fmcts/)

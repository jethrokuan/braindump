+++
title = "Optimization"
author = ["Jethro Kuan"]
lastmod = 2019-01-14T09:12:36+08:00
draft = false
math = true
+++

## What is Convex Optimization? {#what-is-convex-optimization}

Convex optimization is a special class of mathematical optimization
problems, which includes least-squares and linear programming
problems.

There are many advantages to recognizing or formulating a problem as a
convex optimization problem. First, the problem can be solved reliably
and efficiently, using interior-point methods or other special methods
for convex optimization. There are also theoretical or conceptual
advantages of formulating a problem as a convex optimization problem.


## Mathematical Optimization {#mathematical-optimization}

An optimization problem has the form:

\begin{align} \label{dfn:optimization}
  &\text{minimize} &f\_0(x) \\\\\\
  &\text{subject to} &f\_i(x) \le b\_i, i = 1, \dots, m
\end{align}

Here the vector \\(x = (x\_1, \dots, x\_n)\\) is the optimization variable
of the problem, the function \\(f\_0 : \mathbb{R^n} \rightarrow
\mathbb{R}\\) is the objective function, \\(f\_i \mathbb{R^n} \rightarrow
\mathbb{R}\\) are the (inequality) constraint functions, and the
constants \\(b\_1, \dots, b\_m\\) are the limits, or bounds, for the
constraints.

We consider families or classes of optimization problems,
characterized by particular forms of the objective and constraint
functions. The optimization problem is a _linear program_ if the
objective and constraint functions \\(f\_0, \dots, f\_m\\) are linear.

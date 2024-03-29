+++
title = "Gaussian Processes"
author = ["Jethro Kuan"]
draft = false
+++

In supervised learning, we are given training data \\(\mathcal{D}\\), and we need to
learn a function \\(f\\) that can make predictions for all possible input values. To
do this, assumptions need to be made, because there are infinitely many function
consistent with the training data. In general, there are 2 options:

1.  Restricting the class of functions considered
2.  Assigning a prior probability to every possible function

Restricting the class has several issues. First, if the class is too
restrictive, we might not find a function that matches. If a class is not
restrictive enough, we might overfit the training data.

Assigning a prior probability also has problems, because there are an infinite
set of possible functions. This is where Gaussian processes come in.

A Gaussian process is a generalization of the Gaussian probability distribution.
Whereas a probability distribution describes random variables which are scalars
or vectors, a stochastic process governs the properties of functions. One can
think of a function as an extremely long vector, with each entry specifying the
function value \\(f(x)\\) at that input \\(x\\). If one asks only for properties of the
function at a finite number of points, Gaussian processes yield the same answer
ignoring the infinitely many other points.

The properties of a Gaussian process are controlled by its **covariance function**.


## <span class="org-todo todo TODO">TODO</span> [Gaussian Process, not quite for dummies - Yuge Shi](https://yugeten.github.io/posts/2019/09/GP/) {#gaussian-process-not-quite-for-dummies-yuge-shi}


## References {#references}

-   Gaussian Processes for Machine Learning
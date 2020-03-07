+++
title = "Riken AIP Workshop 2019"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:43:48+08:00
draft = false
+++

## Weakly Supervised Classification {#weakly-supervised-classification}


### Motivation {#motivation}

-   Machine learning from big data is already successful
-   In some cases, massive labelled data is not available
-   Classification from limited information


### Supervised Classification {#supervised-classification}

A large number of labeled samples yield better classification
performance.
Optimal convergence rate is \\(O(n^{-\frac{1}{2}})\\).


### Unsupervised Classification {#unsupervised-classification}

Since collecting labelled samples is costly, we can learn a classifier
from unlabelled data. This is equivalent to clustering


### Semi-supervised Classification {#semi-supervised-classification}

-   Use a large number of unlabelled samples and a small number of
    labelled samples.
-   Find a decision boundary along cluster structure induced by
    unlabelled samples.


### Positive Unlabelled Classification {#positive-unlabelled-classification}

Given positive and unlabelled samples:

\begin{equation}
{x\_i^P}\_{i=1}^{n\_P} \sim P(x | y = + 1)
\end{equation}

\begin{equation}
  {x\_i^U}\_{i=1}^{n\_U} \sim P(x)
\end{equation}

Risk of classifier can be decomposed into two terms:

1.  Risk for positive data
2.  Risk for negative data

Since we do not have negative data in the positive unlabelled data in
the PU setting, the risk cannot be directly estimated.

U-density is a mixture of positive and negative densities:

\begin{equation}
  R(f) = \pi E\_{p(x|y=+1)} \left[ l(f(x)) \right] + (1-\pi) E\_{p(x|y=-1)}\left[ l(-f(x)) \right]
\end{equation}

Through this we can find an unbiased risk estimator.

Estimating error bounds, we can show that PU learning can be better
than PN provided a large number of PU data.


### PNU Classification {#pnu-classification}

-   Train PU, PN, and NU classification, and combine them.
-   Unlabelled data always helps without cluster assumptions
-   Use unlabelled data for loss evaluation (reducing the bias), not for
    regularisation.


### Pconf Classification {#pconf-classification}

Only positive data is available:

1.  data from rival companies cannot be obtained
2.  Only successful examples are available

If we have positive data with confidence, we can train a classifier.

Others: Similar-unlabelled etc.


## Fast Computation of Uncertainty in Deep Learning {#fast-computation-of-uncertainty-in-deep-learning}

author
: [Emtiyaz Khan]({{< relref "emtiyaz_khan" >}})

links
: <https://emtiyaz.github.io/>

Uncertainty quantifies the confidence in the prediction of a model,
i.e., how much it does not know.


### Uncertainty in Deep Learning {#uncertainty-in-deep-learning}

\begin{equation}
  p(D|\theta) = \prod\_{i=1}^{N} p(y\_i | f\_\theta (x\_i))
\end{equation}

Data given parameters,  output given NN(input)

1.  Generate a prior distribution \\(\theta \sim p(\theta)\\)


### Approximating Inference with Gradients {#approximating-inference-with-gradients}

\begin{equation}
  p(\theta | D) \approx q(\theta) = N(\theta | \mu, \sigma^2)
\end{equation}

Find the \\(\mu\\) and \\(\sigma^2\\) such that \\(q\\) is close to the posterior distribution.

\begin{equation}
  max L(\mu, \sigma^2) = E\_q\left[ \log \frac{p(\theta)}{q(\theta)} \right] +
  \sum\_{i=1}^N E\_q \left[ \log p(D\_i|\theta) \right]
\end{equation}

Using natural-gradients leads to faster and simpler algorithm than
gradients methods.


## Data-efficient Probabilistic Machine Learning {#data-efficient-probabilistic-machine-learning}

Bryan Low

Gaussian Process (GP) Models for Big Data.


### Gaussian Process {#gaussian-process}

-   Is a rich class of Bayesian, non-parametric models
-   A GP is a collection of rvs any finite subset of which belongs to a
    univariate


### Task Setting {#task-setting}

-   Agent explores unknown environment modelled by GP
-   Every location has a reward


### Lipschitz Continuous Reward Functions {#lipschitz-continuous-reward-functions}

\begin{equation}
  R(z\_t, s\_t) \overset{\Delta}{=}  R\_1(z\_t) + R\_2(z\_t) + R\_3(s\_t)
\end{equation}

-   R\_1 Lipschitz continuous (current measurement)
-   R\_2 Lipschitz continuous after convolution with Gaussian kernel (current measurement)
-   R\_3 Location History, independent of current measurement

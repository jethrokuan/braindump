+++
title = "Topic Modeling"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Machine Learning]({{<relref "machine_learning.md#" >}})

<http://www.cs.columbia.edu/~blei/topicmodeling.html>
[LDA survey - Github](https://github.com/jethrokuan/lda-survey)


## LDA {#lda}

[The Little Book on LDA](https://ldabook.com/)
<https://www.youtube.com/watch?v=FkckgwMHP2s>
<http://www.cs.columbia.edu/~blei/papers/Blei2012.pdf>


#### Dirichlet Distribution {#dirichlet-distribution}

<https://www2.ee.washington.edu/techsite/papers/documents/UWEETR-2010-0006.pdf>

Dirichlet distribution is a family of continuous multivariate
probability distributions parameterized by a vector α of positive
reals.

\begin{equation}
  \theta \sim Dir(\alpha)
\end{equation}

\begin{equation}
  p(\theta) = \frac{1}{\beta(\alpha)} \prod\_{i=1}^n \theta\_i^{\alpha\_i-1} I(\theta \in S)
\end{equation}

Where \\(\theta = (\theta\_1, \theta\_2, \dots, \theta\_n), \alpha = (\alpha\_1, \alpha\_2, \dots, \alpha\_n), \alpha\_i > 0\\) and

\begin{equation}
  S = \left\\{x \in \mathbb{R}^n : x\_i \ge 0, \sum\_{i=1}^{n} x\_i = 1 \right\\}
\end{equation}

and
\\(\frac{1}{\beta(\alpha)} =
\frac{\Gamma(\alpha\_0)}{\Gamma(\alpha\_1)\Gamma(\alpha\_2)\dots\Gamma(\alpha\_n)}\\)

The infinite-dimensional generalization of the Dirichlet distribution
is the Dirichlet process.

The Dirichlet distribution is the conjugate prior distribution of the
categorical distribution (a generic discrete probability distribution
with a given number of possible outcomes) and multinomial distribution
(the distribution over observed counts of each possible category in a
set of categorically distributed observations). This means that if a
data point has either a categorical or multinomial distribution, and
the prior distribution of the distribution's parameter (the vector of
probabilities that generates the data point) is distributed as a
Dirichlet, then the posterior distribution of the parameter is also a
Dirichlet.


#### Exploring a Corpus with the posterior distribution {#exploring-a-corpus-with-the-posterior-distribution}

Quantities needed for exploring a corpus are the posterior
expectations of hidden variables. Each of these quantities are
conditioned on the observed corpus.

Visualizing a topic is done by visualizing the posterior topics
through their per-topic probabilities \\(\hat{\beta}\\).

Visualizing a document uses the posterior topic proportions
\\(\hat{\theta}\_{d,k}\\) and the posterior topic assignments
\\(\hat{z}\_{d,k}\\).

Finding similar documents can be done through the _Hellinger
distance_:

\begin{align\*}
  D\_{d,k} = \sum\_{k=1}^K \left( \sqrt{\hat{\theta}\_{d,k}} - \sqrt{\hat{\theta}\_{f,k}}\right)^2
\end{align\*}


#### Posterior Inference {#posterior-inference}

<!--list-separator-->

-  Mean Field Variational Inference

    Approximate intractable posterior distribution with a simpler
    distribution containing free variational parameters. These parameters
    are fit to approximate the true posterior.

    In contrast to the true posterior, the mean field variational
    distribution for LDA is one where the variables are independent of
    each other, with and each governed by a different variational
    parameter.

    We fit the variational parameters to minimise the KL-divergence to the
    true posterior.

    The general approach to mean-field variational methods - update each
    variational parameter with the parameter given by the expectation of
    the true posterior under the variational distribution - is applicable
    when the conditional distribution of each variable is the exponential
    family.


#### Markov Chains {#markov-chains}

<http://setosa.io/ev/markov-chains/>


#### Shortcomings {#shortcomings}

-   strong, potentially invalid statistical assumptions:
    -   topics have no correlation to one another (dirichlet assumes
        nearly independent)
        -   solution: CTM: use a logistic normal distribution
    -   assumes order of documents don't matter
        -   solution: DTM: use logistic normal distribution to model topics
            evolving over time


## TopicRNN {#topicrnn}

<http://www.columbia.edu/~jwp2128/Papers/DiengWangetal2017.pdf>

In TopicRNN, latent topic models are used to capture global semantic
dependencies so that the RNN can focus its modeling capacity on the
local dynamics of the sequences


## Potential Research Topics {#potential-research-topics}


### <span class="org-todo todo TODO">TODO</span> Visualization of Perplexity for topic models as a potential topic? {#visualization-of-perplexity-for-topic-models-as-a-potential-topic}
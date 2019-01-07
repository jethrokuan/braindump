+++
title = "Statistical Learning"
author = ["Jethro Kuan"]
lastmod = 2019-01-07T18:38:32+08:00
draft = false
math = true
+++

## Introduction {#introduction}

Statistical learning refers to a vast set of tools for _understanding
data_. It involves building a statistical model for predicting, or
estimating, an output based on one or more input.

Our goal is to apply a statistical learning method to the training data
in order to estimate the unknown function \\(f\\). Broadly speaking, most
statistical learning methods for this task can be characterized as
either parametric or non-parametric.


### Parametric Methods {#parametric-methods}

Parametric methods involve a two-step model-based approach:

1.  First, we make an assumption about the functional form, or shape,
    of \\(f\\). For example, one simple assumption is that \\(f\\) is linear in
    \\(X\\):

\begin{equation}
f(X) = \beta\_0 + \beta\_1X\_1 + \dots + \beta\_p X\_p
\end{equation}

This is a linear model, and with this assumption the problem of
estimating \\(f\\) is greatly simplified. Instead of estimating an
arbitrary p-dimensional function \\(f(X)\\), one only needs to estimate
the \\(p+1\\) coefficients \\(\beta\_0, \dots, \beta\_p\\).

After a model has been selected, we need a procedure that uses the
training data to fit or train the model. In the case of the linear
model, we need to estimate the parameters \\(\beta\_0, \beta\_1, \dots,
\beta\_p\\). The most common approach to fitting the model is referred to
as the _(ordinary) least squares_.

The model-based approach just described is referred to as _parametric_;
it reduces the problem of estimating \\(f\\) down to one of estimating a
set of parameters. The potential disadvantage of a parametric approach
is that the model we choose will usually not match the true unknown
form of \\(f\\). If the chosen model is too far from the true \\(f\\), then
our estimate will be poor. Flexible models require a large amount of
parameters, and complex models are also susceptible to overfitting.


### Non-parametric Methods {#non-parametric-methods}

Non-parametric methods do not make explicit assumptions about the
functional form of \\(f\\). Instead, they seek an estimate of \\(f\\) that
gets as close to the data points as possible without being too rough
or wiggly. By avoiding assumptions of a particular form of \\(f\\),
non-parametric approaches can possibly fit the wider range of possible
shapes of \\(f\\). However, they do not reduce the problem of estimating
\\(f\\) to a small number of parameters, and a large number of
observations is required to obtain an accurate estimate for \\(f\\). An
example of a non-parametric model is the [thin-plate spline](https://en.wikipedia.org/wiki/Thin%5Fplate%5Fspline).


### The Trade-Off Between Prediction Accuracy and Model Interpretability {#the-trade-off-between-prediction-accuracy-and-model-interpretability}

{{< figure src="/ox-hugo/screenshot_2019-01-07_16-19-48.png" caption="Figure 1: A representation of the tradeoff between flexibility and interpretability, using different statistical methods. <sup id=\"47f776a94d6687b2efebf468b22650cb\"><a href=\"#james2013introduction\" title=\"James, Witten, Hastie \&amp; Tibshirani, An introduction to statistical learning, Springer (2013).\">james2013introduction</a></sup>" >}}

There are several reasons to choose a restrictive model over a
flexible approach. First, if the interest is mainly in inference,
restrictive models tend to be much more interpretable. For example
linear models make it easy to understand the associations between
individual predictors and the response. Even when predictions are the
only concern, highly flexible models are susceptible to overfitting,
and restrictive models can often outperform them.


### Measuring Quality of Fit {#measuring-quality-of-fit}

In order to evaluate the performance of a statistical learning method
on a given data set, we need some way to measure how well its
predictions actually match the observed data.

In the regression setting, the most commonly-used measure is the mean
squared error (MSE), given by:

\begin{equation} \label{eqn:dfn:mse}
  \mathrm{MSE} = \frac{1}{n} \mathop{\sum}\_{i=1}^{n} (y\_i - \hat{f}(x\_i))^2
\end{equation}

The MSE will be small if the predicted responses are very close to the
true responses.


### Bias-Variance Trade-Off {#bias-variance-trade-off}

It can be shown taht the expected test MSE, for a given value \\(x\_0\\),
can always be decomposed into the sum of 3 fundamental qualities: the
variance of \\(\hat{f}(x\_0)\\), the squared bias of \\(\hat{f}(x\_0)\\), and
the variance of the error terms \\(\epsilon\\):

\begin{equation} \label{eqn:bvtrade}
  \mathrm{E} (y\_0 - \hat{f}(x\_0))^2 = \mathrm{Var}(\hat{f}(x\_0)) + \left[
  \mathrm{Bias}(\hat{f}(x\_0)) \right]^2 + \mathrm{Var}(\epsilon)
\end{equation}

The expected test MSE refers to the average test MSE that we would
obtain if we repeatedly estimated \\(f\\) using a large number of training
sets, and tested each at \\(x\_0\\).

The variance of a statistical learning method refers to the amount by
which \\(\hat{f}\\) would change if we estimated it using a different
training data set. Since the training data are used to fit the
statistical learning method, different training data sets will result
in a different \\(\hat{f}\\). In general, more flexible statistical
methods have higher variance.

Bias refers to the error that is introduced by approximating a
real-life problem, which may be extremely complicated, by a much
simpler model. In general, more flexible approaches have lower bias.


### The Bayes Classifier {#the-bayes-classifier}

When the test error rate is minimized, the classifier assigns each
observation to the most likely class, given its predictor values. This
is known as the Bayes classifier. The Bayes classifier produces the
lowest possible error rate, known as the Bayes error rate, given by:

\begin{equation} \label{eqn:bayes\_error\_rate}
  1 - \mathrm{E} \left( \mathop{\mathrm{max}}\_{j} \mathrm{Pr}(Y = j | X) \right)
\end{equation}

In theory, we would always like to predict qualitative responses using
the Bayes classifier. However, for real data, we do not know the
conditional distribution of \\(Y\\) given \\(X\\), and computing the Bayes
classifier would be impossible.


### K-Nearest Neighbours {#k-nearest-neighbours}

The Bayes classifier serves as the unattainable gold standard against
which to compare other methods. Many approaches attempt to estimate
the conditional distribution of \\(Y\\) given \\(X\\), and then classify the
given observation to the class with highest estimated probability. One
such method is the K-nearest neighbours classifier.

Given a positive integer \\(K\\) and a test observation \\(x\_0\\), the KNN
classifier first identifies the K points in the training data that are
closest to \\(x\_0\\), represented by \\(N\_0\\). It then estimates the
conditional probability for class \\(j\\) as the fraction of points in
\\(N\_0\\) whose response values equal \\(j\\):

\begin{equation} \label{eqn:knn}
  \mathrm{Pr}(Y=j | X = x\_0) = \frac{1}{K} \sum\_{i\in N\_0}I(y\_i = j)
\end{equation}

Finally, KNN applies Bayes rule and classifies the test observation
\\(x\_0\\) to the class with the largest probability.


## The Statistical Learning Framework {#the-statistical-learning-framework}

Consider the problem of classifying a papaya into 2 bins: tasty or not
tasty. We've chosen 2 features:

1.  The papaya's colour, ranging from dark green through orange and red
    to dark brown
2.  The papaya's softness, ranging from rock hard to mushy

The learner's input consists of:

1.  **Domain set**: An arbitrary set, \\(\mathcal{X}\\). This is the set of objects
    that we may wish to label. The domain set in our example will be
    the set of all papayas. Usually, these domain
    represented by a vector of _features_ (like colour and softness). We
    also refer to domain points as _instances_ and to \\(\mathcal{X}\\) as the
    instance space.
2.  **Label set**: The label set is restricted in our example to a
    two-element set, usually {0, 1} or {-1, +1}.
3.  **Training data**: \\(S = ((x\_1, y\_1) \dots (x\_m, y\_m))\\) is a finite
    sequence of pairs in \\(\mathcal{X} \times \mathcal{Y}\\). This is the
    input that the learner has access to. Such labeled examples are
    often called _training examples_. \\(S\\) is also sometimes referred to
    as the _training set_.
4.  **The learner's output**: The learner is requested to output a
    prediction rule \\(h: \mathcal{X} \rightarrow \mathcal{Y}\\). This
    function is also called a _predictor_, a _hypothesis_, or a _classifier_.
    The predictor can be used to predict the label of new domain
    points.
5.  **A simple data-generation model**: This explains how the training data
    is generated. First, we assume that the instances are generated by
    some probability distribution. We denote the probability
    distribution over \\(\mathcal{X}\\) by \\(\mathcal{D}\\). we do not assume
    that the learner knows anything about this distribution.
6.  **Measures of success**: We define the error of a classifier to be the
    probability that it does not predict the correct label on a random
    data point generated by the underlying distribution. That is, the
    error of \\(h\\) is the probability to draw a random instance \\(x\\) from
    \\(\mathcal{D}\\), such that \\(h(x) \ne f(x)\\), where \\(f(x)\\) is the true
    labelling function:

    \begin{equation} \label{eqn:dfn:error}
      L\_{\mathcal{D}, f} (h) \overset{\mathrm{def}}{=} \mathop{P}\_{x \sim \mathcal{D}} \left[ h(x) \ne f(x) \right] \overset{\mathrm{def}}{=}
    \mathcal{D} (\{ x: h(x) \ne f(x) \} )
    \end{equation}

The learner is blind to the underlying probability distribution
\\(\mathcal{D}\\) over the world, and to the labelling function \\(f\\). The
learner can only interact with the environment through the training set.


## Reference Textbooks {#reference-textbooks}

1.  An introduction to statistical learning <sup id="47f776a94d6687b2efebf468b22650cb"><a href="#james2013introduction" title="James, Witten, Hastie \&amp; Tibshirani, An introduction to statistical learning, Springer (2013).">james2013introduction</a></sup>
2.  Understanding Machine Learning <sup id="63e0a08c15f1a264659ec7862354748b"><a href="#Shalev-Shwartz:2014:UML:2621980" title="Shalev-Shwartz \&amp; Ben-David, Understanding Machine Learning: From Theory to Algorithms, Cambridge University Press (2014).">Shalev-Shwartz:2014:UML:2621980</a></sup>

# Bibliography
<a id="james2013introduction"></a>James, G., Witten, D., Hastie, T., & Tibshirani, R., *An introduction to statistical learning* (2013), : Springer. [↩](#47f776a94d6687b2efebf468b22650cb)

<a id="Shalev-Shwartz:2014:UML:2621980"></a>Shalev-Shwartz, S., & Ben-David, S., *Understanding machine learning: from theory to algorithms* (2014), New York, NY, USA: Cambridge University Press. [↩](#63e0a08c15f1a264659ec7862354748b)

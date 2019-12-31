+++
title = "Statistical Learning"
author = ["Jethro Kuan"]
lastmod = 2019-01-18T15:23:52+08:00
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

{{< figure src="/ox-hugo/screenshot_2019-01-07_16-19-48.png" caption="Figure 1: A representation of the tradeoff between flexibility and interpretability, using different statistical methods. <sup id=\"47f776a94d6687b2efebf468b22650cb\"><a href=\"#james2013introduction\" title=\"James, Witten, Hastie \&amp; Tibshirani, An introduction to statistical learning, Springer (2013).\">(James, 2013)</a></sup>" >}}

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


## Classification {#classification}

The linear regression model assumes that the response variable \\(Y\\) is
quantitative. However, in many cases the response variable is
qualitative. Classification encompasses approaches that predict
qualitative responses. 3 of the most widely-used classifiers include:
logistic regression, linear discriminant analysis, and K-nearest
neighbours. More computer-intensive methods include generalized
additive models, trees, random forests, boosting, and support vector
machines.


### Why not Linear Regression? {#why-not-linear-regression}

Encoding non-binary categorical variables as a dummy variable using
integers can lead to a unwanted encoding of a relationship between the
different options. With binary outcomes, linear regression does do a
good job as a classifier: in fact, it is equivalent to linear
discriminant analysis.

Suppose we encode the outcome \\(Y\\) as follows:

\begin{equation}
  Y = \begin{cases}
    0 & \text{if No} \\\\\\
    1 & \text{if Yes} \\\\\\
    \end{cases}
\end{equation}

Then the population \\(E(Y|X = x) = \mathrm{Pr}(Y=1|X=x)\\), which may
seem to imply that regression is perfect for the task. However, linear
regression may produce probabilities less than zero or bigger than
one, hence logistic regression is more appropriate.


### Logistic Regression {#logistic-regression}

Rather than modelling the response \\(Y\\) directly, logistic regression
models the probability that \\(Y\\) belongs to a particular category.

How should we model the relationship between \\(p(X) =
\mathrm{Pr}(Y=1|X)\\) and \\(X\\)? In the linear regression model, we used
the formula:

\begin{equation}
p(X) = \beta\_0 + \beta\_1 X
\end{equation}

This model for \\(p(X)\\) is not suitable because any time a straight line
is fit to a binary response that is coded as a 0 or 1, in principle we
can always predict \\(p(X) < 0\\) for some values of \\(X\\), and \\(p(X) > 1\\)
for others.

In logistic regression, we use the logistic function:

\begin{equation}
  p(X) = \frac{e^{\beta\_0 + \beta\_1 X}}{1 + e^{\beta\_0 + \beta\_1 X}}
\end{equation}

This restricts values of \\(p(X)\\) to be between 0 and 1. A bit of
rearrangement gives:

\begin{equation}
\log \left( \frac{p(X)}{1-p(X)} \right) = \beta\_0 + \beta\_1 X
\end{equation}

And this monotone transformation is called the _log odds_ or _logit_
 transformation of \\(p(X)\\).

We use maximum likelihood to estimate the parameters:

\begin{equation}
  l(\beta\_0, \beta) = \prod\_{i:y\_i=1} p(x\_i) \prod\_{i:y\_i=0} (1 - p(x\_i))
\end{equation}

This likelihood gives the probability of the observed zeros and ones
in the data. We pick \\(\beta\_0\\) and \\(\beta\_1\\) to maximize the
likelihood of the observed data.

As with linear regression, we can compute the coefficient values, the
standard error of the coefficients, the z-statistic, and the p-value.
The z-statistic plays the same role as the t-statistic. A large
absolute value of the z-statistic indicates evidence against the null
hypothesis.


### Multiple Logistic Regression {#multiple-logistic-regression}

It is easy to generalize the formula to multiple logistic regression:

\begin{equation}
\log \left( \frac{p(X)}{1-p(X)} \right) = \beta\_0 + \beta\_1 X\_1 +
\dots + \beta\_p X\_p
\end{equation}

\begin{equation}
p(X) = \frac{e^{\beta\_0 + \beta\_1X\_1 + \dots + \beta\_pX\_p}}{1 + e^{\beta\_0 + \beta\_1X\_1 + \dots + \beta\_pX\_p}}
\end{equation}

Similarly, we use the maximum likelihood method to estimate the
coefficient.


### <span class="org-todo todo TODO">TODO</span> Case Control Sampling {#case-control-sampling}

Case control sampling is most effective when the prior probabilities of the classes are very unequal.


### Linear Discriminant Analysis {#linear-discriminant-analysis}

Logistic regression involves directly modelling \\(\mathrm{Pr}(Y=k|X=x)\\)
using the logistic function. We now consider an alternative and less
direct approach to estimating these probabilities. We model the
distribution of the predictors \\(X\\) separately in each of the response
classes (i.e. given \\(Y\\)), and then use Bayes' theorem to flip these
around into estimates for \\(\mathrm{Pr}(Y=k|X=x)\\).

When these distributions are assumed to be normal, it turns out that
the model is very similar in form to logistic regression.

Why do we need another method?

1.  When the classes are well-separated, the parameter estimates for
    the logistic regression model are surprisingly unstable. LDA does
    not suffer from this issue.
2.  If n is small, and the distribution of the predictors \\(X\\) is
    approximately normal in each of the classes, the LDA model is more
    stable than the logistic regression model.
3.  LDA is more popular when we have more than 2 response classes.

We first state Bayes' theorem, and write it differently for
discriminant analysis:

\begin{equation} {eqn:dfn:bayes}
  \mathrm{Pr}(Y=k|X=x) = \frac{\mathrm{Pr}(X=x|Y=k) \cdot \mathrm{Pr}(Y=k)}{\mathrm{Pr}(X=x)}
\end{equation}

\begin{equation}
  \mathrm{Pr}(Y=k|X=x) = \frac{\pi\_k f\_k(x)}{\sum\_{l=1}^{K}\pi\_lf\_l(x)}
\end{equation}

where \\(f\_k(x) = \mathrm{Pr}(X=x|Y=k)\\) is the density for \\(X\\) in class \\(k\\), and
\\(\pi\_k = \mathrm{Pr}(Y=k)\\) is the prior probability for class \\(k\\).

We first discuss LDA when \\(p = 1\\). The Gaussian density has the form:

\begin{equation}
  f\_k(x) = \frac{1}{\sqrt{2\pi}\sigma\_k}e^{2\frac{1}{2}\left( \frac{x-\mu\_k}{\sigma\_k} \right)^2}
\end{equation}

We can plug this into Bayes formula and get a complicated expression
for \\(p(x)\\). To classify at the value \\(X = x\\), we just need to see
which of \\(p\_k(x)\\) is largest. Taking logs, and discarding terms that
do not depend on \\(k\\), we see that this is equivalent to assigning \\(x\\)
to the class with the largest _discriminant score_:

\begin{equation}
  \partial\_k(x) = x \cdot \frac{numerator}{\mu\_k}{\sigma^2} -
  \frac{\mu\_k^2}{2\sigma^2}+ \log(\pi\_k)
\end{equation}

Note that \\(\partial\_k(x)\\) is a linear function of \\(x\\). If there are
\\(K=2\\) classes, and \\(\pi\_1 = \pi\_2 = 0.5\\), we can see that the decision
boundary becomes \\(x = \frac{\mu\_1 + \mu\_2}{2}\\).

We can estimate the parameters:

\begin{equation}
  \hat{\pi\_k} = \frac{n\_k}{n}
\end{equation}

\begin{equation}
  \hat{\mu\_k} = \frac{1}{n\_k}\sum\_{i:y\_i=k}x\_i
\end{equation}

\begin{equation}
  \hat{\sigma}^2 = \frac{1}{n-K}\sum\_{k=1}^{K}\sum\_{i:y\_i=k} (x\_i - \hat{\mu\_k})^2
\end{equation}

We can extend Linear Discriminant Analysis to the case of multiple
predictors. To do that, we will assume that \\(X = (X\_1, X\_2, \dots,
X\_p)\\) is drawn from a multivariate Gaussian distribution, with a
class-specific mean vector and a common covariance matrix.

The multivariate Gaussian distribution assumes that each individual
predictor follows a one-dimensional normal distribution, with some
correlation between each pair of predictors. Formally, the
multivariate Gaussian density is defined as:

\begin{equation}
  f(x) = \frac{1}{(2\pi)^{p/2|\Sigma|^{1/2}}} \mathrm{exp} \left( -\frac{1}{2}(x
    - \mu)^T \Sigma^{-1}(x - \mu) \right)
\end{equation}

In the case of \\(p > 1\\) predictors, the LDA classifier assumes that the
observations in the kith class are drawn from a multivariate Gaussian
distribution \\(N(\mu\_k, \Sigma)\\), where \\(\Sigma\\) is common to all
classes. With find that the Bayes classifier assigns an observation
\\(X = x\\) to the class for which:

\begin{equation}
  \sigma\_k(x) = x^T \Sigma^{-1}\mu\_k -
  \frac{1}{2}\mu\_k^T\Sigma^{-1}\mu\_k + \log \pi\_k
\end{equation}

The LDA model has the lowest error rate the Gaussian model is correct,
since it approximates the Bayes classifier. However,
misclassifications can still happen, and a good way to visualize them
is through a confusion matrix. The probability threshold can also be
tweaked to reduce the error rates for incorrect classification to a
single class.

The ROC (Receiver Operating Characteristics) curve is a popular
graphic for simultaneously displaying the two types of errors for all
possible thresholds. An ideal ROC curve will hug the top left corner,
so the larger the AUC (Area Under Curve) the better the classifier.
The overall performance of a classifier, summarized over all possible
thresholds, is given by this value.

Varying the classifier threshold also changes its true positive and
false negative rate. These are also called the sensitivity, and 1 -
specificity of the classifier.


### Quadratic Discriminant Analysis {#quadratic-discriminant-analysis}

In LDA with multiple predictors, we assumed that observations are
drawn from a multivariate Gaussian distribution with a class-specific
mean vector and a common covariance matrix. Quadratic Discriminant
Analysis (QDA) assumes that each class has its own covariance matrix.
Under this assumption, the Bayes classifier assigns an observation
\\(X = x\\) to the class for which:

\begin{equation}
  \partial\_k(x) = -\frac{1}{2}(x-\mu\_k)^T \Sigma\_k^{-1}(x - \mu\_k) -
  \frac{1}{2} \log |\Sigma\_k| + \log \pi\_k
\end{equation}

When would one prefer LDA to QDA, or vice-versa? The answer lies in
the bias-variance trade-off. When there are \\(p\\) predictors, estimating
a covariance matrix requires estimating \\(p(p+1)/2\\) variables. In QDA
with \\(K\\) predictors, we need to estimate \\(Kp(p+1)/2\\) parameters, which
can quickly get big. Hence LDA is much less flexible, and has a lower
variance. On the other hand, if the assumption of a common covariance
matrix is bad, then LDA will perform poorly.


### Comparison of Classification Methods {#comparison-of-classification-methods}

Logistic Regression and LDA produce linear decision boundaries. The
only difference between the two approaches is that in logistic
regression the coefficients are estimated using maximum likelihood,
while in LDA the coefficients are approximated via the estimated mean
and variance from a normal distribution.

Since logistic regression and LDA differ only in their fitting
procedures, one might expect the two approaches to give similar
results. Logistic regression can outperform LDA if the Gaussian
assumptions are not met. On the other hand, LDA can show improvements
over logistic regression if they are.

KNN takes a completely different approach from the classifiers seen in
this chapter. In order to make a prediction for an observation \\(X = x\\)
, the \\(K\\) training observations that are closest to \\(x\\) are
identified. Then \\(X\\) is assigned to the class to which the plurality
of these observations belong. Hence KNN is a completely non-parametric
approach: no assumptions are made about the shape of the decision
boundary. KNN does not tell us which predictors are important, but can
outperform LDA and logistic regression if the decision boundary is
highly non-linear.

Though not as flexible as the KNN, QDA can perform better in the
presence of a limited number of training observations, because it does
make some assumptions about the form of the decision boundary.


## Reference Textbooks {#reference-textbooks}

1.  An introduction to statistical learning <sup id="47f776a94d6687b2efebf468b22650cb"><a href="#james2013introduction" title="James, Witten, Hastie \&amp; Tibshirani, An introduction to statistical learning, Springer (2013).">(James, 2013)</a></sup>
2.  Understanding Machine Learning <sup id="63e0a08c15f1a264659ec7862354748b"><a href="#Shalev-Shwartz:2014:UML:2621980" title="Shalev-Shwartz \&amp; Ben-David, Understanding Machine Learning: From Theory to Algorithms, Cambridge University Press (2014).">(Shalev-Shwartz, 2014)</a></sup>

# Bibliography
<a id="james2013introduction"></a>James, G., Witten, D., Hastie, T., & Tibshirani, R., *An introduction to statistical learning* (2013), : Springer. [↩](#47f776a94d6687b2efebf468b22650cb)

<a id="Shalev-Shwartz:2014:UML:2621980"></a>Shalev-Shwartz, S., & Ben-David, S., *Understanding machine learning: from theory to algorithms* (2014), New York, NY, USA: Cambridge University Press. [↩](#63e0a08c15f1a264659ec7862354748b)

+++
title = "Regression"
author = ["Jethro Kuan"]
lastmod = 2019-01-18T21:25:31+08:00
tags = ["statistics"]
draft = false
math = true
+++

## Introduction {#introduction}

Regression analysis is a conceptually simple method for investigating
functional relationships between variables. The relationship is
expressed in the form of an equation or a model connecting the
response or dependent variable and one or more explanatory or
predictor variables.

We denote the response variable by \\(Y\\), and the set of predictor
variables by \\(X\_1, X\_2, \dots, X\_p\\), where \\(p\\) denotes the number of
predictor variables.

The general regression model is specified as:

\begin{equation} \label{dfn:general\_regression}
  Y = f(X\_1, X\_2, \dots, X\_p) + \epsilon
\end{equation}

An example is the linear regression model:

\begin{equation}
  Y = \beta\_0 + \beta\_1X\_1 + \dots + \beta\_pX\_p + \epsilon
\end{equation}

where \\(\beta\_0, \dots, \beta\_p\\) called the regression paramaters or
coefficients, are unknown constants to be estimated from the data.
\\(\epsilon\\) is the random error representing the discrepancy in the
approximation.


### Steps in Regression Analysis {#steps-in-regression-analysis}

**1. Statement of the problem**

Formulation of the problem includes determining the questions to be
addressed.

**2. Selection of Potentially Relevant Variables**

We select a set of variables that are thought by the experts in the
area of study to explain or predict the response variable.

Each of these variables could be _qualitative_ or _quantitative_. A
technique used in casse where the response variable is binary is
called _logistic regression_. If all predictor variables are
qualitative, the techniques used in the analysis of the data are
called the analysis of variance techniques. If some of the predictor
variables are quantitative while others are qualitative, regression
analysis in these cases is called the _analysis of covariance_.

| Type                   | Conditions                                                                                                                            |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Univariate             | Only 1 quantitative RV                                                                                                                |
| Multivariate           | 2 or more quantitative RV                                                                                                             |
| Simple                 | Only 1 predictor variable                                                                                                             |
| Multiple               | 2 or more predictor variables                                                                                                         |
| Linear                 | All parameters enter the equation linearly, possibly after transformation of the data                                                 |
| Non-linear             | The relationship between the response and some of the predictors is non-linear (no transformation to make parameters appear linearly) |
| Analysis of variance   | All predictors are qualitative variables                                                                                              |
| Analysis of covariance | Some predictors are quantitative variables, others are qualitative                                                                    |
| Logistic               | The RV is qualitative                                                                                                                 |

**3. Model specification**

The form of the model that is thought to relate the response variable to
the set of predictor variables can be specified initially by experts
in the area of study based on their knowledge or their objective
and/or subjective judgments.

We need to select the form of the function \\(f(X\_1, X\_2, \dots, X\_p)\\)
in <a name="dfn:general_regression"></a>.

**4. Method of Fitting**

We want to perform parameter estimation or model fitting after
defining the model and collecting the data. the most commonly used
method of estimation is called the _least squares_ method. Other
estimation methods we consider are the maximum likelihood method,
ridge regression and the principal components method.

**5. Model Fitting**

The estimates of the regression parameters \\(\beta\_0, \beta\_1, \dots,
\beta\_p\\) are denoted by \\(\hat{\beta\_0}, \hat{\beta\_1}, \dots,
\hat{\beta\_p}\\). the obtained \\(\hat{Y}\\) denotes the predicted value.

**6. Model Criticism and Selection**

The validity of statistical methods depend on certain assumptions, about
the data and the model. We need to address the following questions:

1.  What are the required assumptions?
2.  For each of these assumptions, how do we determine if they are valid?
3.  What can be done in cases where assumptions do not hold?

{{< figure src="/ox-hugo/screenshot_2019-01-15_13-10-29.png" caption="Figure 1: Flowchart illustrating the dynamic iterative regression process" >}}


## Linear Regression {#linear-regression}

Simple linear regression is a straightforward approach for predicting
a quantitative response \\(Y\\) on the basis of a single predictor
variable \\(X\\). Mathematically, we write this linear relationship as:

\begin{equation} \label{eqn:slr}
  Y \approx \beta\_0 + \beta\_1 X
\end{equation}

We describe this as regressing \\(Y\\) on \\(X\\).

We wish to measure both the direction and strength of the relationship
between \\(Y\\) and \\(X\\). Two related measures, known as the _covariance_ and
the _correlation coefficient_ are developed later.

We use our training data to produce estimates \\(\hat{\beta\_0}\\) and
\\(\hat{\beta\_1}\\) for the model coefficients, and we can predict outputs
by computing:

\begin{equation}
  \hat{y} = \hat{\beta\_0} + \hat{\beta\_1} X
\end{equation}

Let \\(\hat{y\_i} = \hat{\beta\_0} + \hat{\beta\_1}\\) be the prediction of
\\(Y\\) based on the ith value of \\(X\\). Then \\(e\_i = y\_i - \hat{y\_i}\\)
represents the ith _residual_. We can define the residual sum of squares
(RSS) as:

\begin{equation} \label{eqn:dfn:rss}
  \mathrm{RSS} = e\_1^2 + e\_2^2 + \dots + e\_n^2
\end{equation}

The least squares approach chooses \\(\hat{\beta\_0}\\) and \\(\hat{\beta\_1}\\)
to minimise the RSS.

If \\(f\\) is to be approximated by a linear function, then we can write
the relationship as:

\begin{equation}
  Y = \beta\_0 + \beta\_1 X + \epsilon
\end{equation}

where \\(\epsilon\\) is an error term -- the catch-all for what we miss
with this simple model. For example, the true relationship is probably
not linear, and other variables cause variation in \\(Y\\). It is
typically assumed that the error term is independent of \\(X\\).

We need to assess the accuracy of our estimates. How far off will a
single estimation of \\(\hat{\mu}\\) be? In general, we can answer this
question by computing the standard error of \\(\hat{\mu}\\), written as
\\(\mathrm{SE}(\hat{\mu})\\). This is given by:

\begin{equation} \label{eqn:dfn:se}
  \mathrm{Var}(\hat{\mu}) = \mathrm{SE}(\hat{\mu})^2 = \frac{\sigma^2}{n}
\end{equation}

where \\(\sigma\\) is the standard deviation of each of the realizations
\\(y\_i\\) of \\(Y\\).

Standard errors can be used to compute _confidence intervals_. A 95%
confidence interval is defined as a range of values such that with 95%
probability, the range will contain the true unknown value of the
parameter. For linear regression, the 95% confidence interval for
\\(\beta\_1\\) approximately takes the form:

\begin{equation}
  \hat{\beta\_1} \pm 2 \cdot SE(\hat{\beta\_1})
\end{equation}

Standard errors can also be used to perform hypothesis tests on the
coefficients. The most common hypothesis test involves testing the
null hypothesis of:

\begin{equation} \label{eqn:dfn:null\_hyp}
  H\_0 : \mathrm{There is no relationship between X and Y} (\beta\_1 = 0)
\end{equation}

versus the alternative hypothesis:

\begin{equation} \label{eqn:dfn:alt\_hyp}
  H\_a : \mathrm{There is a relationship between X and Y} (\beta\_1 \ne 0)
\end{equation}

To test the null hypothesis, we need to determine whether
\\(\hat{\beta\_1}\\) is sufficiently far from zero that we can be
confident that \\(\beta\_1\\) is non-zero. How far is far enough? This
depends on the accuracy of \\(\hat{\beta\_1}\\), or
\\(\mathrm{SE}(\hat{\beta\_1})\\). In practice, we compute a _t-statistic_,
given by:

\begin{equation} \label{eqn:dfn:t-statistic}
  t = \frac{\hat{\beta\_1} - 0}{\mathrm{SE}(\hat{\beta\_1})}
\end{equation}

which measures the number of standard deviations that \\(\hat{\beta\_1}\\)
is away from 0. If there really is no relationship between \\(X\\) and
\\(Y\\), then we expect that Eq. <a name="eqn:dfn:t-statistic"></a> will have a
t-distribution with \\(n-2\\) degrees of freedom. The t-distribution has a
bell shape and for values of \\(n\\) greater than approximately 30 it is
similar to the normal distribution.

It is a simple matter to compute the probability of observing any
number equal to \\(\lVert t \rVert\\) or larger in absolute value,
assuming \\(\beta\_1 = 0\\). We call this probability the _p-value_. A small
p-value indicates that it is unlikely to observe such a substantial
association between the predictor and the response due to chance.


### Assessing the accuracy of the model {#assessing-the-accuracy-of-the-model}

Once we have rejected the null hypothesis in favour of the alternative
hypothesis, it is natural to want to quantify the extent to which the
model fits the data.


#### Residual Standard Error (RSE) {#residual-standard-error--rse}

The RSE is an estimate of the standard deviation of \\(\epsilon\\). It is
the average amount that the response will deviate from the true
regression line.

\begin{equation} \label{eqn:dfn:rse}
  \mathrm{RSE} = \sqrt{\frac{1}{n-2}\mathrm{RSS}} =
  \sqrt{\frac{1}{n-2} \sum\_{i=1}^{n}(y\_i - \hat{y\_i})^2}
\end{equation}


#### \\(R^2\\) statistic {#r-2--statistic}

The RSE provides an absolute measure of lack of fit of the model to
the data. But since it is measured in the units of \\(Y\\), it is not
always clear what constitutes a good RSE. The \\(R^2\\) statistic provides
an alternative measure of fit. It takes a form of a proportion, and
takes values between 0 and 1, independent of the scale of \\(Y\\).

\begin{equation} \label{eqn:dfn:r\_squared}
  R^2 = \frac{\mathrm{TSS} - \mathrm{RSS}}{\mathrm{TSS}} = 1 - \frac{\mathrm{RSS}}{\mathrm{TSS}}
\end{equation}

where \\(\mathrm{TSS} = \sum(y\_i - \bar{y})^2\\) is the _total sum of
squares_. TSS measures the total variance in the response \\(Y\\), and can
be thought of as the amount of variability inherent in the response
before the regression is performed. Hence, \\(R^2\\) measures the
proportion of variability in \\(Y\\) that can be explained using \\(X\\).

Note that the correlation coefficient \\(r = \mathrm{Cor}(X, Y)\\) is
related to the \\(R^2\\) is the simple linear regression setting: \\(r^2 = R^2\\).


### Multiple Linear Regression {#multiple-linear-regression}

We can extend the simple linear regression model to accommodate
multiple predictors:

\begin{equation}
  Y = \beta\_0 + \beta\_1 X\_1 + \beta\_2 X\_2 + \dots + \beta\_p X\_p + \epsilon
\end{equation}

We choose \\(\beta\_0, \beta\_1, \dots, \beta\_p\\) to minimise the sum of
squared residuals:

\begin{equation}
  \mathrm{RSS} = \sum\_{i=1}^{n} (y\_i - \hat{y\_i})^2
\end{equation}

Unlike the simple regression estimates, the multiple regression
coefficient estimates have complicated forms that are most easily
represented using matrix algebra.

We can answer some important questions using the multiple regression
model:

**1. Is there a relationship between the response and the predictors?**

We are comparing \\(H\_0\\) <a name="eqn:dfn:null_hyp"></a> and \\(H\_a\\)
<a name="eqn:dfn:alt_hyp"></a>, and we do so by computing the _F-statistic_:

\begin{equation} \label{eqn:dfn:f-statistic}
  F = \frac{(\mathrm{TSS} - \mathrm{RSS})/p}{\mathrm{RSS}/(n-p-1)}
\end{equation}

If the linear model is correct, one can show that:

\begin{equation}
E \{RSS/(n-p-1)\} = \sigma^2
\end{equation}

and that provided \\(H\_0\\) is true,

\begin{equation}
E \{(\mathrm{TSS}-\mathrm{RSS})/p\} = \sigma^2
\end{equation}

Hence, when there is no relationship between the response and the
predictors, one would expect the F-statistic to be close to 1. if
\\(H\_a\\) is true, then we expect \\(F\\) to be greater than 1.

**2. Deciding on important variables**

It is possible that all of the predictors are associated with the
response, but it is more often the case that the response is only
related to a subset of the predictors. The task of determining which
predictors are associated is referred to as _variable selection_.
Various statistics can be used to judge the quality of a model. These
include Mallow's \\(C\_p\\), Akaike information criterion (AIC), Bayesian
information criterion (BIC), and adjusted \\(R^2\\).

There are \\(2^p\\) models that contains a subset of \\(p\\) variables. Unless
\\(p\\) is small, we cannot consider all \\(2^p\\) models, and we need an
efficient approach to choosing a smaller set of models to consider.
There are 3 classical approaches for this task:

1.  _Forward selection_: We begin with the null model -- a model that
    contains an intercept but no predictors. We then fit p simple
    linear regressions and add to the null model the variable that
    results in the lowest RSS. We then add to that model the variable
    that results in the lowest RSS for the new two-variable model, and
    repeat.
2.  _Backward selection_: We start with all variables in the model, andd
    remove the variable with the largest p-value -- that is the
    variable that is the least statistically significant. The new
    (p-1)-variable model is fit, and the variable with the largest
    p-value is removed, and repeat.
3.  Mixed selection. This is a combination of forward and
    backward-selection. We once again start with the null model. The
    p-values of the variables can become larger as new variables are
    added to the model. Once the p-value of one of the variables in the
    model rises above a certain threshold, they are removed.

**3. Model Fit**

Two of the most common numerical measures of model fit are the RSE
and \\(R^2\\), the fraction of variance explained.

It turns out that \\(R^2\\) will always increase when more variables are
added to the model, even if those variables are only weakly associated
with the response. This is because adding another variable to the
least squares equations must allow us to fit the training data more
accurately. Models with more variables can have higher RSE if the
decrease in RSS is small relative to the increase in \\(p\\).

**4. Predictions**

Once we have fit the multiple regression model, it is straightforward
to predict the response \\(Y\\) on the basis of a set of values for
predictors \\(X\_1, X\_2, \dots, X\_p\\). However, there are 3 sorts of
uncertainty associated with this prediction:

1.  The coefficient estimates \\(\hat{\beta\_0}, \hat{\beta\_1}, \dots,
       \hat{\beta\_p}\\) are estimates for \\(\beta\_0, \beta\_1, \dots,
       \beta\_p\\).

That is, the least squares plane:

\begin{equation}
  \hat{Y} = \hat{\beta\_0} + \hat{\beta\_1}X\_1 + \dots + \hat{\beta\_p}X\_p
\end{equation}

 is only an estimate for the true
population regression plane:

\begin{equation}
  f(X) = \beta\_0 + \beta\_1 X\_1 + \dots + \beta\_p X\_p
\end{equation}

 This inaccuracy is related to the reducible error. We can compute a
confidence interval in order to determine how close \\(\hat{Y}\\) will be
to \\(f(X)\\).

1.  In practice, assuming a linear model for \\(f(X)\\) is almost always an
    approximation of reality, so there is an additional source of
    potentially reducible error which we call _model bias_.

2.  Even if we knew \\(f(X)\\), the response value cannot be predicted
    perfectly because of the random error \\(\epsilon\\) is the model. How
    mich will \\(Y\\) vary from \\(\hat{Y}\\)? We use prediction intervals to
    answer the question. Prediction intervals are always wider than
    confidence intervals, because they incorporate both the error in
    the estimate for \\(f(X)\\), and the irreducible error.


### Qualitative Variables {#qualitative-variables}

Thus far our discussion had been limited to quantitative variables.
How can we incorporate qualitative variables such as gender into our
regression model?

For variables that take on only two values, we can create a dummy
variable of the form (for example in gender):

\begin{equation}
  x\_i = \begin{cases}
    1 & \text{if ith person is female} \\\\\\
    0 & \text{if ith person is male}
    \end{cases}
\end{equation}

and use this variable as a predictor in the equation. We can also use
the {-1, 1} encoding. For qualitative variables that take on more than
2 values, a single dummy variable cannot represent all values. We can
add additional variables, essentially performing a one-hot encoding.


### Extending the Linear Model {#extending-the-linear-model}

The standard linear regression model provides interpretable results
and works quite well on many real-world problems. However, it makes
highly restrictive assumptions that are often violated in practice.

The two most important assumptions of the linear regression model are
that the relationship between the response and the predictors are:

1.  _additive_: the effect of changes in a predictor \\(X\_j\\) on the
    response \\(Y\\) are independent of the values of the other predictors.
2.  _linear_: the change in the response \\(Y\\) due to a one-unit change in
    \\(X\_j\\) is constant, regardless of the value of \\(X\_j\\)

How can we remove the additive assumption? We can add an interaction
term for two variables \\(X\_i\\) and \\(X\_j\\) as follows:

\begin{equation}
\hat{Y\_2} = \hat{Y\_1} + \beta\_{p+1} X\_i X\_j
\end{equation}

We can analyze the importance of the interaction term by looking at
its p-value. The hierarchical principle states that if we include an
interaction in a model, we should also include the main effects, even
if the p-values associated with their coefficients are not
significant.

How can we remove the assumption of linearity? A simple way is to use
polynomial regression.


### Potential Problems {#potential-problems}

When we fit a linear regression model to a particular data set, many
problems may occur. Most common among these are the following:

1.  Non-linearity of the response-predictor relationships
2.  Correlation of error terms
3.  Non-constant variance of error terms
4.  Outliers
5.  High-leverage points
6.  Collinearity


#### Non-linearity of the Data {#non-linearity-of-the-data}

The assumption of a linear relationship between response and
predictors aren't always true. _Residual plots_ are a useful graphical
tool for identifying non-linearity. This is obtained by plotting the
residuals \\(e\_i = y\_i - \hat{y\_i}\\) versus the predictor \\(x\_i\\). Ideally
the residual plot will show no discernible pattern. The presence of a
pattern may indicate a problem with some aspect of the linear model.

If the residual plots show that there are non-linear associations in
the data, then a simple approach is to use non-linear transformations
of the predictors, such as \\(\log X\\), \\(\sqrt{X}\\) and \\(X^2\\).


#### Correlation of Error Terms {#correlation-of-error-terms}

An important assumption of the linear regression model is that the
error terms, \\(\epsilon\_1, \epsilon\_2, \dots, \epsilon\_p\\) are
uncorrelated.  The standard errors for the estimated regression
coefficients are computed based on this assumption. This is mostly
mitigated by proper experiment design.


#### Non-constant Variance of Error Terms {#non-constant-variance-of-error-terms}

Variances of the error terms may increase with the value of the
response. One can identify non-constant variances in the errors, or
heteroscedasticity, from the presence of a funnel shape in the
residual plot.

{{< figure src="/ox-hugo/screenshot_2019-01-08_15-14-34.png" caption="Figure 2: Left: the funnel shape indicates heteroscedasticity, Right: the response has been log transformed, and there is now no evidence of heteroscedasticity <sup id=\"47f776a94d6687b2efebf468b22650cb\"><a href=\"#james2013introduction\" title=\"James, Witten, Hastie \&amp; Tibshirani, An introduction to statistical learning, Springer (2013).\">(James, 2013)</a></sup>" >}}


#### Outliers {#outliers}

An outlier is a point from which \\(y\_i\\) is far from the value predicted
by the model.  It is atypical for an outlier that does not have an
unusual predictor value to have little effect on the least squares
fit. However, it can cause other problems, such as dramatically
altering the computed values of RSE, \\(R^2\\) and p-values.

Residual plots can clearly identify outliers. One solution is to
simply remove the observation, but care must be taken to first
identify whether the outlier is indicative of a deficiency with the
model, such as a missing predictor.


#### High Leverage Points {#high-leverage-points}

Observations with high leverage have an unusual value for \\(x\_i\\).
High leverage observations typically have a substantial impact on the
regression line. These are easy to identify, by looking for values
outside the normal range of the observations. We can also compute the
leverage statistic. for a simple linear regression:

\begin{equation}
  h\_i = \frac{1}{n} + \frac{(x\_i - \bar{x\_i})^2}{\sum\_{i' =
      1}^n(x\_{i'} - \bar{x})^2}
\end{equation}


#### Collinearity {#collinearity}

Collinearity refers to the situation in which two or more predictor
variables are closely related to one another. The presence of
collinearity can pose problems in the regression context: it can be
difficult to separate out the individual effects of collinear
variables on the response. A contour plot of the RSS associated with
different possible coefficient estimates can show collinearity.

{{< figure src="/ox-hugo/screenshot_2019-01-08_15-22-30.png" caption="Figure 3: Left: the minimum value is well defined, Right: because of collinearity, there are many pairs \\((\beta\_{\text{Limit}}, \beta\_{\text{Rating}})\\) with a similar value for RSS <sup id=\"47f776a94d6687b2efebf468b22650cb\"><a href=\"#james2013introduction\" title=\"James, Witten, Hastie \&amp; Tibshirani, An introduction to statistical learning, Springer (2013).\">(James, 2013)</a></sup>" >}}

Another way to detect collinearity is to look at the correlation
matrix of the predictors. An element of this matrix that is large in
absolute value indicates a pair of highly correlated variables, and
therefore a collinearity problem in the data.

Not all collinearity problems can be detected by inspection of the
correlation matrix: it is possible for collinearity to exist between
three or more variables even if no pairs of variables has a
particularly high correlation. This situation is called
_multicollinearity_. We instead compute the _variance inflation factor_
(VIF). The VIF is the ratio of the variance of \\(\hat{\beta\_j}\\) when
fitting the full model divided by the variance of \\(\hat{\beta\_j}\\) if
fit on its own. The smallest possible value for VIF is 1, indicating a
complete absence of collinearity. As a rule of thumb, a VIF exceeding
values of 5 or 10 indicates a problematic amount of collinearity.

\begin{equation} \label{eqn:dfn:vif}
  \mathrm{VIF}(\hat{\beta\_j}) = \frac{1}{1-R^2\_{X\_j|X\_{-j}}}
\end{equation}

where \\(R^2\_{X\_j|X\_{-j}}\\) is the regression of \\(X\_j\\) onto all of the
other predictors.


## Linear Basis Function Models {#linear-basis-function-models}

We can extend the class of models by considering linear combinations of fixed non-linear functions of the input variables, of the form:

\begin{equation}
  y(\mathbf{x}, \mathbf{w}) = w\_0 + \sum\_{j=1}^{M-1} w\_j
  \phi\_j(\mathbf{x}) = \mathbf{w}^T\mathbf{\phi}(\mathbf{x})
\end{equation}

There are many choices on non-linear basis functions, such as the
Gaussian basis function:

\begin{equation}
  \phi\_j(x) = \mathrm{exp}\left\{ - \frac{(x - \mu\_j)^2}{2s^2} \right\}
\end{equation}

or the sigmoidal basis function:

\begin{equation}
\phi\_j(x) = \sigma\left( \frac{x - \mu\_j}{s} \right)
\end{equation}


## References {#references}

<sup id="a6f25d8e3790a685481657d76f53a002"><a href="#chatterjee06_regres_analy_examp" title="Samprit Chatterjee \&amp; Ali Hadi, Regression Analysis by Example, John Wiley \&amp; Sons, Inc. (2006).">(Samprit Chatterjee, 2006)</a></sup><sup>,</sup><sup id="47f776a94d6687b2efebf468b22650cb"><a href="#james2013introduction" title="James, Witten, Hastie \&amp; Tibshirani, An introduction to statistical learning, Springer (2013).">(James, 2013)</a></sup>


####  {#}

# Bibliography
<a id="james2013introduction"></a>James, G., Witten, D., Hastie, T., & Tibshirani, R., *An introduction to statistical learning* (2013), : Springer. [↩](#47f776a94d6687b2efebf468b22650cb)

<a id="chatterjee06_regres_analy_examp"></a>Chatterjee, S., & Hadi, A. S., *Regression analysis by example* (2006), : John Wiley \& Sons, Inc. [↩](#a6f25d8e3790a685481657d76f53a002)

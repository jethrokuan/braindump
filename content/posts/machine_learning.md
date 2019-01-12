+++
title = "Machine Learning"
author = ["Jethro Kuan"]
lastmod = 2019-01-12T21:49:32+08:00
draft = false
math = true
+++

## When do we need machine learning? {#when-do-we-need-machine-learning}

Two aspects of a given problem may call for the use of programs that
learn and improve on the basis of their "experience":

1.  **The problem's complexity**: some tasks that require elaborate
    introspection that cannot be well-defined in programs, such as
    driving, are ill-suited for coding by hand. Tasks that are beyond
    human capabilities such as the analysis of large datasets also fall
    in this category.
2.  **Adaptivity**: Programmed tools are rigid, while machine learning
    tools allows for adaptation to the environment they interact with.


## The Learning Problem {#the-learning-problem}


### What is Learning? {#what-is-learning}

An agent is said to be _learning_ if it improves its performance P on
task T based on experience/observations/data E. T must be fixed, P
must be measurable, E must exist. See [Learning Agents]({{< relref "artificial_intelligence" >}}).


#### Inductive Bias {#inductive-bias}

The incorporation of prior knowledge biases the learning mechanism.
This is also called _inductive bias_. The incorporation of prior
knowledge is inevitable for the success of learning algorithms (the
no-free-lunch theorem). The stronger the prior knowledge that one
starts the learning process with, the easier it is to learn from
further examples.


### Types of Learning {#types-of-learning}


#### Active vs Passive Learning {#active-vs-passive-learning}

An active learner interacts with the environment at training time,
(e.g. by posing queries or performing experiments), while a passive
learner only observes the information provided by the environment.


#### Online vs Batch Learning {#online-vs-batch-learning}

In online learning, the hypothesis has to be updated each time a new
label is received.


#### Reinforcement Learning {#reinforcement-learning}

Each action in a state has an associated cost and a probability
distribution of the next state.

Goal is to learn a policy (mapping from state to action) that
minimizes the sum of expected current and future costs.


#### Supervised Learning {#supervised-learning}

Since learning involves an interaction between the learner and the
environment, one can divide tasks according to the nature of that
interaction.

Supervised learning describes a scenario in which the training
examples contain significant information that is missing in the unseen
"test examples". In unsupervised learning, there is no distinction
between the training and test data. The goal is to come up with some
summary, or compressed version of that data.

-    Measure of success

    A loss function helps measure our success. Given a set \\(H\\) of
    hypothesis of models, and a domain \\(Z\\), let \\(l\\) be a function from \\(H
      \times Z\\) to non-negative real numbers $l: \\(H \times Z \rightarrow
      \mathbb{R}\_{+}\\).

    The _risk function_ is the expected loss of the hypothesis,

    \begin{equation\*}
      L\_D(h) = E\_{z \sim D}[l(h,z)]
    \end{equation\*}

    We are interested in finding a hypothesis \\(h\\) that has a small risk,
    or expected loss.

-    Empirical Risk Minimisation (ERM)

    -   The training set error is often called the _empirical error_ or
        _empirical risk_.
    -   Given a hypothesis class \\(H\\), finding the hypothesis \\(h \in H\\) that
        minimizes the empirical risk is a simple learning strategy.

-    Assumptions Made ⚠

    1.  One common assumption is that the data in the data generation
        process is independently and identically distributed (IID),
        according to the distribution \\(D\\).

    Q: Given a large enough training set, do you expect the long term test
    error to be similar to the training error?

    -   If IID, then yes
    -   If not, there is likely dependencies, but under certain conditions,
        yes.
        -   If sampling mixes well, it will not take long for D' to look
            like a steady set distribution.
    -   If dependencies are exploited, there is a possibility of attaining
        lower training and test error.


### Is Learning Feasible? {#is-learning-feasible}

The target function \\(f\\) that we want to learn is unknown. The
performance of a hypothesis on the training set \\(D\\) tells us nothing
about the performance on the data outside of \\(D\\).

As long as \\(f\\) is unknown, knowing \\(D\\) cannot exclude any patterns of
\\(f\\) outside of \\(D\\), and the predictions of \\(g\\) would be meaningless.


#### Probabilistic View {#probabilistic-view}

If we accept a probabilistic answer, that is \\(D\\) tells us something
likely about \\(f\\) outside of \\(D\\), then learning is feasible, only with
a small price.

Learning a hypothesis \\(g\\) approximates the target function \\(f\\) well,
i.e. \\(E\_{out}(g) \approx 0\\). However, probabilistic analysis via
Hoeffding's Inequality gives \\(E\_{out}(g) \approx E\_{in}(g)\\).
Therefore, we still need to ensure \\(E\_{in}(g) \approx 0\\).


## Training vs Testing {#training-vs-testing}


### Generalisation Error {#generalisation-error}

We can define generalisation error as the discrepancy between \\(E\_in\\)
and \\(E\_out\\). The Hoeffding Inequality characterises the generalization
error with a probabilistic bound:

\begin{align}
P[|E\_{in}(g) - E\_{out}(g)| > \epsilon] \le 2Me^{-2\epsilon^2N}
\end{align}

Pick a tolerance level \\(\delta\\), and assert with probability
\\(1-\delta\\) that

\begin{align}
  E\_{out}(g) \le E\_{in}(g) + \sqrt{\frac{1}{2N}\ln \frac{2M}{\delta}}
\end{align}

Notice the error bound depends on \\(M\\), the size of the hypothesis
set \\(H\\). Most learning models have infinite \\(H\\), including the simple
perceptron. Hence, to study generalisation in such models, we need to
derive a counterpart that deals with infinite \\(H\\).

Notice that the \\(M\\) factor was obtained by taking the disjunction of
events. Let \\(B\_m\\) be the bad event that \\(|E\_{in}(h\_m) - E\_{out}(h\_m)|
> \epsilon\\). Notice that these bad events are often strongly
overlapping, and the disjunction of these events form a much smaller
area.

The mathematical theory of generalisation hinges on this observation.
Upon accounting for the overlaps of different hypotheses, we will be
able to replace the number of hypotheses \\(M\\) with an effective finite
number, even while \\(M\\) is infinite.


### Growth Function {#growth-function}

The _growth function_ is the quantity that will formalize the
effective number of hypotheses.

Each \\(h \in H\\) generates a dichotomy which is \\(h\\) is \\(-1\\) or \\(h\\) i-
\\(+1\\). We then formally define dichotomies as follows:

\begin{align}
H(x\_1, \dots, x\_n) = \left\{ h(x\_1), h(x\_2), \dots, h(x\_n) | h \in H \right\}
\end{align}


## Concept Learning {#concept-learning}

A concept is a boolean-valued function over a set of input instances
(each comprising input attributes). Concept learning is a form of
supervised learning. Infer an unknown boolean-valued function from
training-examples.


### Hypothesis {#hypothesis}

There is a trade-off between _expressive power_ and smaller
_hypothesis space_. Large hypothesis spaces are bad, because search is
going to take a long time, and also requires more data. Humans exploit
structure in the hypothesis space to guide search and learn faster.

A hypothesis \\(h\\) is consistent with a set of training examples \\(D\\) iff
\\(h(x) = c(x)\\) for all \\(<x,c(x)> \in D\\).


### Inductive Learning {#inductive-learning}

Any hypothesis found to approximate the target function well over a
sufficient large set of **training examples** will also approximate the
target function well over other **unobserved examples**.


### Concept Learning is Search {#concept-learning-is-search}

The goal is to search for a hypothesis \\(h \in H\\) that is consistent
with \\(D\\).


### Exploit Structure in Concept Learning {#exploit-structure-in-concept-learning}

\\(h\_j\\) is more general than or equal to \\(h\_k\\) (denoted \\(h\_j \ge\_{g}
h\_k\\)) iff any input instance \\(x\\) that satisfies \\(h\_j\\) also satisfies
\\(h\_k\\).

This is relation is a **partial order**.


### Find-S Algorithm {#find-s-algorithm}

Intuition: Start with the most specific hypothesis \\(h\\). Whenever it
wrongly classifies a positive training example, we "minimally"
generalize it to satisfy its input instance.


#### Limitations {#limitations}

1.  Can't tell whether Find-S has learnt the target concept
2.  Can't tell when training examples are _inconsistent_
3.  Picks a maximally specific \\(h\\)
4.  Depending on \\(H\\), there may be several solutions


### Version Space {#version-space}

\begin{equation\*}
  VS\_{H,D} = {h \in H | h \text{ is consistent with }D}
\end{equation\*}

-   If \\(c \in H\\), then D can reduce \\(VS\_{H,D}\\) to \\({c}\\).
-   If D is insufficient, then \\(VS\_{H,D}\\) represents the _uncertainty_
    of what the target concept is
-   \\(VS\_{H,D}\\) contains all consistent hypotheses, including maximally
    specific hypotheses

The **general boundary** G of \\(VS\_{H,D}\\) is the set of maximally general
members of \\(H\\) consistent with \\(D\\).

The **specific boundary** S of \\(VS\_{H,D}\\) is the set of maximally general
members of \\(H\\) consistent with \\(D\\).

\begin{equation\*}
  VS\_{H,D} = {h \in H | \exists s \in S \exists g \in G g \ge\_g h
    \ge\_g s }
\end{equation\*}


### List-Then-Eliminate Algorithm {#list-then-eliminate-algorithm}

Iterate through all hypotheses in \\(H\\), and eliminate any hypothesis
found inconsistent with any training example. This algorithm is often
prohibitively expensive.


### Candidate-Elimination Algorithm {#candidate-elimination-algorithm}

Start with most general and specific hypotheses. Each training example
"minimally" generalizes S and specializes G to remove inconsistent
hypotheses from version space.


## Decision Tree Learning {#decision-tree-learning}

_Decision Tree Learning_ is a method of learning which approximates
discrete-valued functions that is robust to noisy data, and is capable
of learning disjunctive expressions

It is most appropriate when:

1.  instances are represented as attribute pairs
2.  the target function has discrete output values
3.  Disjunctive descriptions may be required
4.  The training data may contain errors
5.  The training data may contain missing attribute values


### ID3 algorithm {#id3-algorithm}

ID3 learns decision trees by constructing them top down. Each instance
attribute is evaluated using a statistical test to determine how well
it alone classifies the examples. The best attribute is selected and
used as the test at the root node of the tree.


#### Which is the best attribute? {#which-is-the-best-attribute}

A statistical property called _information gain_ measures how well a
given attribute separates the training examples according to their
target classification.

Information gain is the expected reduction in entropy caused by
partitioning the examples according to this attribute:

\begin{align}
  Gain(S,A) = Entropy(S) - \sum\_{v\in Values(A)}\frac{|S\_v|}{|S|}Entropy(S\_v)
\end{align}

For example:

\begin{align}
  Values(Wind) &= Weak, Strong \\\\\\
  S &= [9+, 5-] \\\\\\
  S\_{Weak} &\leftarrow [6+, 2-] \\\\\\
  S\_{Strong} &\leftarrow [3+, 3-] \\\\\\
  Gain(S, Wind) &= Entropy(S) - \frac{8}{14}Entropy(S\_{Weak}) -
                  \frac{6}{14}Entropy(S\_{Strong}) \\\\\\
               &=0.048
\end{align}


#### Hypothesis Space Search {#hypothesis-space-search}

ID3 can be characterised as searching a space of hypotheses for one
that fits the training examples. The hypothesis space searched is the
set of possible decision trees. ID3 performs a simple-to-complex,
hill-climbing search. The evaluation measure that guides the search is
the information gain measure.

Because ID3's hypothesis space of all decision trees is a complete
space of finite discrete-valued functions, it avoids the risk that the
hypothesis space might not contain the target function.

ID3 maintains only a single hypothesis as it searches through the
space of decision trees. ID3 loses the capabilities that follow from
explicitly representing all consistent hypothesis.

ID3 in its pure form performs no backtracking in its search, and can
result in locally but not globally optimal target functions.

ID3 uses all training examples at each step to make statistically
based decisions, unlike other algorithms that make decisions incrementally.


#### Inductive bias {#inductive-bias}

The inductive bias of decision tree learning is that shorter trees are
preferred over larger trees (Occam's razor). Trees that place high
information gain attributes close to the root are preferred over those
that do not. ID3 can be viewed as a greedy heuristic search for the
shortest tree without conducting the entire breadth-first search
through the hypothesis space.

Notice that ID3 searches a complete hypothesis space incompletely, and
candidate-elimination searches an incomplete hypothesis space
completely. The inductive bias of ID3 follows from its search strategy
(_preference bias_), while that of candidate elimination follows from
the definition of its search space. (_restriction bias_).


#### Why Prefer Shorter Hypotheses? {#why-prefer-shorter-hypotheses}

1.  fewer shorter hypothesis than larger ones, means it's less likely
    to over-generalise


## Density Estimation {#density-estimation}

_Density Estimation_ refers to the problem of modeling the probability
distribution \\(p(x)\\) of a random variable \\(x\\), given a finite set \\(x\_1,
x\_2, \dots, x\_n\\) of observations.

We first look at parametric distributions, which are governed by a
small number of adaptive parameters. In a frequentist treatment, we
choose specific values for the parameters optimizing some criterion,
such as the likelihood function. In a Bayesian treatment, we
introduce prior distributions and then use Bayes' theorem to compute
the corresponding posterior distribution given the observed data.

An important role is played by _conjugate priors_, which yield
posterior distributions of the same functional form.

The maximum likelihood setting for parameters can give severely
over-fitted results for small data sets. To develop a Bayesian
treatment to this problem, we consider a form of prior distribution
with similar form as the maximum likelihood function. this property is
called _conjugacy_. For a binomial distribution, we can choose the
beta distribution as the prior.


## Unsupervised Learning {#unsupervised-learning}

In unsupervised learning, given a training set \\(S = \left(x\_1, \dots,
 x\_m\right)\\), without a labeled output, one must construct a "good"
model/description of the data.

Example use cases include:

-   clustering
-   dimension reduction to ind essential parts of the data and reduce
    noise (e.g. PCA)
-   minimises description length of data


### K-means Clustering {#k-means-clustering}

Input: \\(\{x^{(1), x^{(2)}, x^{(3)}, \dots, x^{(m)}}\}\\).

1.  Randomly initialize cluster centroids.
2.  For all points, compute which cluster centroid is the closest.
3.  For each cluster centroid, move centroids to the average points
    belonging to the cluster.
4.  Repeat until convergence.

K-means is guaranteed to converge. To show this, we define a
distortion function:

\begin{equation}
  J(c, \mu) = \sum\_{i=1}^m || x^{(i)} - \mu\_{c^{(i)}}||^2
\end{equation}

K means is coordinate ascent on J. Since \\(J\\) always decreases, the
algorithm converges.


### Gaussian Mixture Model {#gaussian-mixture-model}

By Bayes' Theorem:

\begin{equation}
P(X^{(i)}, Z^{(i)}) = P(X^{(i)} | Z^{(i)})P(Z^{(i)})
\end{equation}

\begin{equation}
Z^{(i)} \sim \text{multinomial}(\phi)
\end{equation}

\begin{equation}
X^{(i)} | Z^{(j)} \sim \mathcal{N}(\mu\_j, \Sigma\_j)
\end{equation}


### Expectation Maximization {#expectation-maximization}

<https://www.cs.utah.edu/~piyush/teaching/EM%5Falgorithm.pdf>

The EM algorithm is an efficient iterative procedure to compute the
Maximum Likelihood (ML) estimate in the presence of missing or hidden
data.

Each iteration of the EM algorithm consists of two processes: The
E-step, and the M-step. In the expectation, or E-step, the missing da
ta are estimated given the observed data and current estimate of the
model par ameters. This is achieved using the conditional
expectation, explaining the choice of terminology.

In the M-step, the likelihood function is maximized under th e
assumption that the missing data are known. The estimate of the
missing data f rom the E-step are used in lieu of the actual missing
data.

Convergence is assured since the algorithm is guaranteed to
increase the likelihood at each iteration.

{{< figure src="/ox-hugo/screenshot_2018-04-03_10-56-25.png" >}}

For mixture of Gaussians:

Repeat until convergence:

1.  E-step
    -   guess values of \\(Z^{(i)}\\)
    -   Let \\(w\_j^{(i)} := P(Z^{(i)=j|X^{(i), \phi, \mu, \Sigma}})\\)
2.  M-step
    -   \\(\phi\_j := \frac{1}{m}\sum\_{i=1}^m w\_j^{(i)}\\)
    -   \\(\mu\_j := \frac{\sum\_{i=1}^m w\_j^{(i)}x^{(i)}}{\sum\_{i=1}^m w\_j^{(i)}}\\)
    -   ...


## Refile {#refile}


### Data Compression {#data-compression}

In _lossy compression_, we seek to trade off code length with
reconstruction error.

In _vector quantization_, we seek a small set of vectors \\({z\_i}\\) to
describe a large dataset of vectors \\({x\_i}\\), such that we can
represent each \\(x-i\\) with its closest approximation in \\({z\_i}\\) with
small error. (Clustering problem)

In _transform coding_, we transform the data, usually using a linear
tranformation. The data in the transformed domain is quantized,
usually discarding the small coefficients, corresponding to removing
some of the dimensions.


### Generative Learning Algorithms {#generative-learning-algorithms}

Discriminative algorithms model \\(p(y | x)\\) directly from the training
set.

Generative algorithms model \\(p(y | x)\\) and \\(p(y)\\). Then \\(argmax\_y
p(y|x) = argmax\_y \frac{p(x|y)p(y)}{p(x)} = argmax\_y p(x|y)p(y)\\).


#### Multivariate Normal Distribution {#multivariate-normal-distribution}

A multivariate normal distribution is parameterized by a mean vector
\\(\mu \in R^n\\) and a covariance matrix \\(\Sigma \in R^{n \times n}\\), where \\(\Sigma \ge
0\\) is symmetric and positive semi-definite.


#### <span class="org-todo todo TODO">TODO</span> Gaussian Discriminant Analysis {#gaussian-discriminant-analysis}

In Gaussian Discriminant Analysis, p(x | y) is distributed to a
[multivariate normal distribution](#multivariate-normal-distribution).

\begin{align}
  y &\sim Bernoulli(\phi) \\\\\\
  x|y = 0 &\sim N(\mu\_0, \Sigma) \\\\\\
  x|y = 1 &\sim N(\mu\_1, \Sigma)
\end{align}

We can write out the distributions:

\begin{align}
  p(y) &= \phi^y (1 - \phi)^{1-y} \\\\\\
  p(x | y = 0) &= \frac{1}{(2\pi)^{n/2}|\Sigma|^{n/2}} exp \left( - \frac{1}{2} (x - \mu\_0)^T \Sigma^{-1}(x - \mu\_0) \right) \\\\\\
  p(x | y = 1) &= \frac{1}{(2\pi)^{n/2}|\Sigma|^{n/2}} exp \left( - \frac{1}{2} (x - \mu\_1)^T \Sigma^{-1}(x - \mu\_1) \right)
\end{align}

Then, the log-likelihood of the data is:

\begin{align}
  l(\phi, \mu\_0, \mu\_1, \Sigma) &= \log \prod\_{i=1}^m p(x^{(i)}, y^{(i)}; \mu\_0, \mu\_1, \Sigma) \\\\\\
  &= \log \prod\_{i=1}^m p(x^{(i) }| y^{(i)}; \mu\_0, \mu\_1, \Sigma)p(y^{(i)}; \phi)
\end{align}

We maximize \\(l\\) with respect to the parameters.


## Riken AIP Workshop {#riken-aip-workshop}


### Weakly Supervised Classification {#weakly-supervised-classification}


#### Motivation {#motivation}

-   Machine learning from big data is already successful
-   In some cases, massive labelled data is not available
-   Classification from limited information


#### Supervised Classification {#supervised-classification}

A large number of labeled samples yield better classification
performance.
Optimal convergence rate is \\(O(n^{-\frac{1}{2}})\\).


#### Unsupervised Classification {#unsupervised-classification}

Since collecting labelled samples is costly, we can learn a classifier
from unlabelled data. This is equivalent to clustering


#### Semi-supervised Classification {#semi-supervised-classification}

-   Use a large number of unlabelled samples and a small number of
    labelled samples.
-   Find a decision boundary along cluster structure induced by
    unlabelled samples.


#### Positive Unlabelled Classification {#positive-unlabelled-classification}

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


#### PNU Classification {#pnu-classification}

-   Train PU, PN, and NU classification, and combine them.
-   Unlabelled data always helps without cluster assumptions
-   Use unlabelled data for loss evaluation (reducing the bias), not for
    regularisation.


#### Pconf Classification {#pconf-classification}

Only positive data is available:

1.  data from rival companies cannot be obtained
2.  Only successful examples are available

If we have positive data with confidence, we can train a classifier.

Others: Similar-unlabelled etc.


### Fast Computation of Uncertainty in Deep Learning {#fast-computation-of-uncertainty-in-deep-learning}

Emtiyaz Khan

Uncertainty quantifies the confidence in the prediction of a model,
i.e., how much it does not know.


#### Uncertainty in Deep Learning {#uncertainty-in-deep-learning}

<https://emtiyaz.github.io/>

\begin{equation}
  p(D|\theta) = \prod\_{i=1}^{N} p(y\_i | f\_\theta (x\_i))
\end{equation}

Data given parameters,  output given NN(input)

1.  Generate a prior distribution \\(\theta \sim p(\theta)\\)


#### Approximating Inference with Gradients {#approximating-inference-with-gradients}

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


### Data-efficient Probabilistic Machine Learning {#data-efficient-probabilistic-machine-learning}

Bryan Low

Gaussian Process (GP) Models for Big Data.


#### Gaussian Process {#gaussian-process}

-   Is a rich class of Bayesian, non-parametric models
-   A GP is a collection of rvs any finite subset of which belongs to a
    univariate


#### Task Setting {#task-setting}

-   Agent explores unknown environment modelled by GP
-   Every location has a reward


#### Lipschitz Continuous Reward Functions {#lipschitz-continuous-reward-functions}

\begin{equation}
  R(z\_t, s\_t) \overset{\Delta}{=}  R\_1(z\_t) + R\_2(z\_t) + R\_3(s\_t)
\end{equation}

-   R\_1 Lipschitz continuous (current measurement)
-   R\_2 Lipschitz continuous after convolution with Gaussian kernel (current measurement)
-   R\_3 Location History, independent of current measurement


## The Natural Language Decathlon: Multitask Learning as Question Answering: Richard Socher {#the-natural-language-decathlon-multitask-learning-as-question-answering-richard-socher}

[pawper](https://einstein.ai/static/images/pages/research/decaNLP/decaNLP.pdf)

-   Joint work with Bryan McCann, Nitish Keskar and Caiming Xiong


### Limits of Single-task Learning {#limits-of-single-task-learning}

-   We can hill climb to local optima if \\(|dataset| > 100 \times C\\)
-   For more general model, we need continuous learning in a single model

For pre-training in NLP, we're still stuck at the word vector level.
This compared to vision, where most of the model can be pre-trained,
only retraining the final few layers.


### Why has weight & model sharing not happened so much in NLP? {#why-has-weight-and-model-sharing-not-happened-so-much-in-nlp}

1.  NLP requires many types of reasoning: logical, linguistic etc.
2.  Requires short and long-term memory
3.  NLP has been divided into intermediate and separate tasks to make
    progress (Benchmark chasing in each community)
4.  Can a single unsupervised task solve it all? No, language clearly
    requires supervision in nature.


### Motivation for Single Multitask model {#motivation-for-single-multitask-model}

1.  Step towards AGI
2.  Important building block for:
    1.  Sharing weights
    2.  Transfer learning
    3.  Zero-shot learning
    4.  Domain adaptation
3.  Easier deployment in production
4.  Lowering the bar for anybody to solve their NLP task

End2end model vs parsing as intermediate step (e.g. running POS tagger
first).


### The 3 equivalent supertasks of NLP {#the-3-equivalent-supertasks-of-nlp}

Any NLP task can be mapped to these 3 super tasks:

1.  Language Modeling
2.  Question Answering
3.  Dialogue


### Multitask learning as QA {#multitask-learning-as-qa}

-   Question Answering
-   Machine Translation
-   Summarization
-   NLI
-   Sentiment Classification
-   Semantic Role Labeling
-   Relation Extraction

Meta supervised learning: {x, y} to {x, t, y}


### Designing a model for decaNLP {#designing-a-model-for-decanlp}

-   No task-specific modules or parameters because task ID assumed to be unavailable

{{< figure src="/ox-hugo/screenshot_2018-10-02_14-52-23.png" >}}

1.  Start with a context
2.  Ask a question
3.  Generate answer one at a time by
    1.  Pointing to context
    2.  Pointing to question
    3.  Choosing a word


### Learnings {#learnings}

-   Transformer Layers yield benefits in single-task and multitask
    setting
-   QA and SRL have strong connections
-   Pointing to the question is essential, despite the task being just
    classification for some subtasks
-   Mulitasking helps a lot with zero-shot tasks

(Latest version of the paper coming out soon -- ICLR 2018)


### Training Strategies {#training-strategies}

-   Fully Joint
-   Curriculum learning doesn't work
-   Anti-curriculum training works instead
    -   Start with a really hard task


## Structuring Data Science Projects {#structuring-data-science-projects}

Cookiecutter Data Science provides a decent project structure, and
uses the ubiquitous build tool `Make` to build data projects. <sup id="e0ca383893600291ac5eca0f379984fb"><a href="#home_cookiec_data_scien" title="@misc{home_cookiec_data_scien,
  author =       {DrivenData},
  howpublished =
                  {https://drivendata.github.io/cookiecutter-data-science/},
  note =         {Online; accessed 06 January 2019},
  title =        {Home - Cookiecutter Data Science},
  year =         {2019},
}">home_cookiec_data_scien</a></sup>

```text
├── LICENSE
├── Makefile           <- Makefile with commands like `make data` or `make train`
├── README.md          <- The top-level README for developers using this project.
├── data
│   ├── external       <- Data from third party sources.
│   ├── interim        <- Intermediate data that has been transformed.
│   ├── processed      <- The final, canonical data sets for modeling.
│   └── raw            <- The original, immutable data dump.
│
├── docs               <- A default Sphinx project; see sphinx-doc.org for details
│
├── models             <- Trained and serialized models, model predictions, or model summaries
│
├── notebooks          <- Jupyter notebooks. Naming convention is a number (for ordering),
│                         the creator's initials, and a short `-` delimited description, e.g.
│                         `1.0-jqp-initial-data-exploration`.
│
├── references         <- Data dictionaries, manuals, and all other explanatory materials.
│
├── reports            <- Generated analysis as HTML, PDF, LaTeX, etc.
│   └── figures        <- Generated graphics and figures to be used in reporting
│
├── requirements.txt   <- The requirements file for reproducing the analysis environment, e.g.
│                         generated with `pip freeze > requirements.txt`
│
├── setup.py           <- Make this project pip installable with `pip install -e`
├── src                <- Source code for use in this project.
│   ├── __init__.py    <- Makes src a Python module
│   │
│   ├── data           <- Scripts to download or generate data
│   │   └── make_dataset.py
│   │
│   ├── features       <- Scripts to turn raw data into features for modeling
│   │   └── build_features.py
│   │
│   ├── models         <- Scripts to train models and then use trained models to make
│   │   │                 predictions
│   │   ├── predict_model.py
│   │   └── train_model.py
│   │
│   └── visualization  <- Scripts to create exploratory and results oriented visualizations
│       └── visualize.py
│
└── tox.ini            <- tox file with settings for running tox; see tox.testrun.org
```

Stripe's approach <sup id="77ac83a13ddf56f053f1ba225873677d"><a href="#dan_reprod" title="@misc{dan_reprod,
  author =       {Dan Frank},
  howpublished = {https://stripe.com/blog/reproducible-research},
  note =         {Online; accessed 06 January 2019},
  title =        {Reproducible research: Stripe's approach to data
                  science},
  year =         {2016},
}">dan_reprod</a></sup> still primarily uses Jupyter notebooks, but
has 2 main points. First, they strip the results from the Jupyter
notebooks before committing. Second, they ensure that the notebooks
can be reproduced on the work laptops and on their cloud infrastructure.


## [Scalable Bayesian Inference](https://videoken.com/embed/0HXpnG%5FWnlI) {#scalable-bayesian-inference}

There is an increasingly immense literature focused on big data. Most
of the focus has been on optimization methods. Rapidly obtaining a
point estimate even when sample size \\(n\\) & overall "size" of data is
immense. There has been a huge focus on specific settings - e.g.
linear regression, labelling images, etc. This leads to many people
working on similar problems, while critical open problems remain
untouched.

The end goal is having general probabilistic inference algorithms for
complex data, and being able to handle arbitrarily probability models.
We want algorithms to be scalable to huge data, and also be able to
accurately quantify uncertainty.


### Classical Posterior Approximations {#classical-posterior-approximations}

-   In conjugate models, one can express the posterior in simple form -
    e.g. as a multivariate Gaussian
-   In more complex settings, one can approximate the posterior using
    some tractable class of distributions
-   Large sample Gaussian approximations:

\begin{equation}
  \pi\_n(\theta|Y^{(n)}) \approx N(\hat{\mu}\_s, \Sigma\_n)
\end{equation}

This is also known as the Bayesian central limit theorem (Bernstein
von Mises). This relies on:

-   sample size \\(n\\) being large relative to the number of parameters
    \\(p\\)
-   Likelihood being smooth and differentiable
-   True value of \\(\theta\_0\\) in interior of parameter space
-   Related class of approximations include the Laplace approximation
    -   Do well to approximating first and second moments, whereas
        variational Bayes may have trouble with 2nd moment


### Alternative Analytic approximations {#alternative-analytic-approximations}

-   We can define some approximating class \\(q(\theta)\\), which may be
    something like a product of exponential family distributions.
-   We could think to define some discrepancy between \\(q(\theta)\\) and
    \\(\pi\_n(\theta)\\), e.g. KL divergence.
-   This forms the basis of variational Bayes, expectation-propagation
    and related methods.
-   Optimize parameters to minimize discrepancy

See [ICML 2018 Tutorial](http://www.tamarabroderick.com/tutorial%5F2018%5Ficml.html) by Tamara Broderick for an overview. In
general, we have no clue how accurate the approximation is. See also
<sup id="2c492bb886c456a5902b643d9a6547e6"><a href="#pati17_statis_optim_variat_bayes" title="Pati, Bhattacharya, Yang \&amp; Yun, On Statistical Optimality of Variational Bayes, {CoRR}, v(), (2017).">pati17_statis_optim_variat_bayes</a></sup>.


### Markov Chain Monte Carlo {#markov-chain-monte-carlo}

Accurate analytic approximations to the posterior have proven elusive
outside of narrow settings. MCMC and other posterior sampling
algorithms provide an alternative.

MCMC: sequential algorithm to obtain correlated draws from the
posterior, and bypasses the need to approximate the marginal
likelihood.

Often, samples are more useful than an analytic form anyway.

We can get MCMC-based summaries of the posterior for any functional
\\(f(\theta)\\). As the number of samples \\(T\\) increases, these summaries
become more accurate. MCMC constructs a Markov chain with stationary
distribution \\(\pi\_n(\theta|Y^{(n)})\\). A _transition kernel_ is carefully
chosen and iterative sampling proceeds. Most MCMC algorithms types of
Metropolis-Hastings (MH):

1.  \\(\theta^\* \sim g(\theta^{(\t-1)})\\) sample a proposal
    (\\(\theta^{(t)}\\) is a sample at step t)
2.  Accept a proposal by letting \\(\theta^{(t)} = \theta^\*\\) with
    probability

\begin{equation}
  \mathrm{min} \left\{ 1, \frac{\pi(\theta^\*)L(Y^{(n)}|\theta)}{pi(\theta^{(t-1)})L(Y^{(n)}|\theta^{(t-1)})\}} \frac{g(\theta^{(t-1)})}{g(\theta^\*)}\right\}
\end{equation}

We want to design efficient MH algorithms by choosing good proposals
\\(g\\). \\(g(\cdot)\\) can depend on the previous value of \\(\theta\\) and on
the data but not on further back samples - except in adaptive MH.

For example, in Gibbs sampling, let \\(\theta = (\theta\_1, \dots,
\theta\_p)'\\) we draw subsets of \\(\theta\\) from their exact conditional
posterior distributions fixing the other.

In random walk, \\(g(\theta^{(t-1)})\\) is a distribution centered on
\\(\theta^{(t-1)}\\) with a tunable covariance.

In HMC/Langevin, we exploit gradient information to generate samples
far from \\(\theta^{(t-1)}\\) having high posterior density.

**MCMC & Computational Bottlenecks**

Time per iteration of MCMC increases with the number of parameters and
unknowns, and also the increase with sample size \\(n\\). This is due to
the cost of sampling proposal & calculating acceptance probability.
This is similar to costs that occur in most optimization algorithms.

MCMC does not produce independent samples from the posterior
distribution \\(\pi\_n(\theta)\\). These draws are auto-correlated, and as the
level of correlation increases, the information provided by each
sample decreases. "Slow mixing" Markov chains have highly
autocorrelated draws.

A well designed MCMC algorithm with a good proposal should ideally
exhibit rapid convergence and mixing.

Embarrassingly Parallel MCMC e.g. <sup id="fe703421bbe5a5c7e4c07c7126a629f3"><a href="#pmlr-v38-srivastava15" title="Sanvesh Srivastava, Volkan Cevher, Quoc Dinh \&amp; David Dunson, {WASP: Scalable Bayes via barycenters of subset posteriors}, 912--920, in in: {Proceedings of the Eighteenth International Conference on Artificial Intelligence and Statistics}, edited by Guy Lebanon \&amp; Vishwanathan, PMLR (2015)">pmlr-v38-srivastava15</a></sup><sup>,</sup><sup id="3c24d71d7ae6f354df816d37ea172f1a"><a href="#li16_simpl_scalab_accur_poster_inter_estim" title="Li, Srivastava, Dunson \&amp; , Simple, Scalable and Accurate Posterior Interval  Estimation, {CoRR}, v(), (2016).">li16_simpl_scalab_accur_poster_inter_estim</a></sup>

We can replace expensive transition kernels with approximations <sup id="ab108353672c4542f6a76b91c9eebcbc"><a href="#johndrow15_optim_approx_markov_chain_bayes_infer" title="Johndrow, Mattingly, , Mukherjee \&amp; Dunson, Optimal Approximating Markov Chains for Bayesian  Inference, {CoRR}, v(), (2015).">johndrow15_optim_approx_markov_chain_bayes_infer</a></sup>. for
example, we approximate a conditional distribution in Gibbs sampler
with a Gaussian or using a subsample of data, vastly speeding up MCMC
sampling in high-dimensional settings.


### Robustness in Big Data {#robustness-in-big-data}

In standard Bayesian inference, it is assumed that the model is
correct. Small violations of this assumption sometimes have a large
impacts, particularly in large datasets. The ability to carefully
modelling assumptions decreases for big/complex data. This appeals to
tweaking the Bayesian paradigm to be inherently more robust.


### High-p problems {#high-p-problems}

-   There is a huge literature proposing different penalties: adaptive
    lasso, fused lasso, elastic net, etc.
-   In general, these methods only produce a sparse point estimate are
    dangerous scientifically, and there are many errors in interpreting
    the zero vs non-zero elements
-   Parallel Bayesian literature on shrinkage priors - horseshoe,
    generalized double Pareto, Dirichlet-Laplace, etc.

What's an appropriate \\(\pi(\beta)\\) for the high dimensional vector of
coefficients? Most commonly used is a local-global scale mixture of
Gaussians. <sup id="c5f035041f058fd1352e35f072c0a5d4"><a href="#johndrow17_bayes_shrin_at_gwas_scale" title="Johndrow, Orenstein, \&amp; Bhattacharya, Bayes Shrinkage At Gwas Scale: Convergence and  Approximation Theory of a Scalable Mcmc Algorithm  for the Horseshoe Prior, {CoRR}, v(), (2017).">johndrow17_bayes_shrin_at_gwas_scale</a></sup>


###  {#}

# Bibliography
<a id="home_cookiec_data_scien"></a>DrivenData,  (2019). *Home - cookiecutter data science*. Retrieved from [https://drivendata.github.io/cookiecutter-data-science/](https://drivendata.github.io/cookiecutter-data-science/). Online; accessed 06 January 2019. [↩](#e0ca383893600291ac5eca0f379984fb)

<a id="dan_reprod"></a>Frank, D. (2016). *Reproducible research: stripe's approach to data science*. Retrieved from [https://stripe.com/blog/reproducible-research](https://stripe.com/blog/reproducible-research). Online; accessed 06 January 2019. [↩](#77ac83a13ddf56f053f1ba225873677d)

<a id="pati17_statis_optim_variat_bayes"></a>Pati, D., Bhattacharya, A., & Yang, Y., *On statistical optimality of variational bayes*, CoRR, *()*,  (2017).  [↩](#2c492bb886c456a5902b643d9a6547e6)

<a id="pmlr-v38-srivastava15"></a>Srivastava, S., Cevher, V., Dinh, Q., & Dunson, D., *WASP: Scalable Bayes via barycenters of subset posteriors*, In G. Lebanon, & S. V. N. Vishwanathan, Proceedings of the Eighteenth International Conference on Artificial Intelligence and Statistics (pp. 912–920) (2015). San Diego, California, USA: PMLR. [↩](#fe703421bbe5a5c7e4c07c7126a629f3)

<a id="li16_simpl_scalab_accur_poster_inter_estim"></a>Li, C., Srivastava, S., & Dunson, D. B., *Simple, scalable and accurate posterior interval estimation*, CoRR, *()*,  (2016).  [↩](#3c24d71d7ae6f354df816d37ea172f1a)

<a id="johndrow15_optim_approx_markov_chain_bayes_infer"></a>Johndrow, J. E., Mattingly, J. C., Mukherjee, S., & Dunson, D., *Optimal approximating markov chains for bayesian inference*, CoRR, *()*,  (2015).  [↩](#ab108353672c4542f6a76b91c9eebcbc)

<a id="johndrow17_bayes_shrin_at_gwas_scale"></a>Johndrow, J. E., Orenstein, P., & Bhattacharya, A., *Bayes shrinkage at gwas scale: convergence and approximation theory of a scalable mcmc algorithm for the horseshoe prior*, CoRR, *()*,  (2017).  [↩](#c5f035041f058fd1352e35f072c0a5d4)

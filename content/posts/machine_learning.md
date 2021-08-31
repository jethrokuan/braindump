+++
title = "Machine Learning"
author = ["Jethro Kuan"]
draft = false
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


## Training vs Testing {#training-vs-testing}

-   [Generalisation Error]({{<relref "generalization_error.md#" >}})


### Growth Function {#growth-function}

The _growth function_ is the quantity that will formalize the
effective number of hypotheses.

Each \\(h \in H\\) generates a dichotomy which is \\(h\\) is \\(-1\\) or \\(h\\) i-
\\(+1\\). We then formally define dichotomies as follows:

\begin{align}
H(x\_1, \dots, x\_n) = \left\\{ h(x\_1), h(x\_2), \dots, h(x\_n) | h \in H \right\\}
\end{align}


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

Input: \\(\\{x^{(1), x^{(2)}, x^{(3)}, \dots, x^{(m)}}\\}\\).

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
[Multivariate Normal Distribution](#multivariate-normal-distribution).

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


## The Natural Language Decathlon: Multitask Learning as Question Answering: Richard Socher {#the-natural-language-decathlon-multitask-learning-as-question-answering-richard-socher}

[paper](https://einstein.ai/static/images/pages/research/decaNLP/decaNLP.pdf)

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
uses the ubiquitous build tool `Make` to build data projects. ([DrivenData, n.d.](#orgf21419f))

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

Stripe's approach ([Frank, n.d.](#org4604a90)) still primarily uses Jupyter notebooks, but
has 2 main points. First, they strip the results from the Jupyter
notebooks before committing. Second, they ensure that the notebooks
can be reproduced on the work laptops and on their cloud infrastructure.


## Bibliography {#bibliography}

<a id="orgf21419f"></a>DrivenData. n.d. “Home - Cookiecutter Data Science.” <https://drivendata.github.io/cookiecutter-data-science/>.

<a id="org4604a90"></a>Frank, Dan. n.d. “Reproducible Research: Stripe’s Approach to Data Science.” <https://stripe.com/blog/reproducible-research>.
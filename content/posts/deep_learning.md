+++
title = "Deep Learning"
author = ["Jethro Kuan"]
draft = false
+++

## Definition {#definition}

A class of machine learning algorithm that uses a cascade of multiple
layeprs of non-linear processing units for feature extraction and
transformation


## Introduction {#introduction}

Sensory perception is plagued with large amounts of nuisance
variation. Nuisance variables are task-dependent and can be implicit.
How do we deal with nuisance variation in the input?

The holy grail of machine learning is to learn a _disentangled
representation_ that factors out variation in the sensory input into
meaningful intrinsic degrees of freedom.

selective
: sensitive to task-relevant (target) features

invariant
: robust to task-irrelevant (nuisance) features

multi-task
: useful for many different tasks

Deep learning solves this central problem in representation learning
by introducing representations that are expressed in terms of other,
simpler representations. Deep learning enables the computer to build
complex concepts out of simpler concepts.

The key inspiration from neuroscience is to build up feature
selectivity and tolerance over multiple layers in a hierarchy.


## Model/task categorisation {#model-task-categorisation}

supervised learning
: input -> otuput, learning the pattern from
    labeled training data

unsupervised learning
: learning to differentiate/cluster
    unlabeled data

reinforcement learning
: learning from trial-and-error through rewards


## Bayesian probability {#bayesian-probability}

<https://www.quora.com/For-a-non-expert-what-is-the-difference-between-Bayesian-and-frequentist-approaches/answer/Jason-Eisner>
The quantification of the expression of uncertainty. We can make
precise revisions of uncertainty in light of new evidence.

In the example of polynomial curve fitting, it seems reasonable to
apply the frequentist notion of probability to the random values of
the observed variables. However, we can use probability theory to
describe the uncertainty in model parameters, and the choice of model
itself.

We can evaluate the uncertainty in model parameters `w` after we have
observed some data `D`. \\(p(D|w)\\) is called the _likelihood function_.

The posterior probability is proportional to `likelihood x prior`.
Model parameters `w` are chosen to maximise the likelihood function
\\(p(D|w)\\). Because the negative log-likelihood is a monotonically
decreasing function, minimising it is equivalent to maximising
likelihood.


## Universal Approximation Theorem {#universal-approximation-theorem}

<https://en.wikipedia.org/wiki/Universal%5Fapproximation%5Ftheorem>
A feed-forward network with a single hidden layer containing a finite
number of neurons can approximate continuous functions on compact
subsets of the real space.


## Measure Theory {#measure-theory}


### Kullback-Leiber (KL) divergence {#kullback-leiber--kl--divergence}

The KL divergence is 0 iff P and Q are the same distribution in
discrete variables, and equal almost everywhere in continuous
variables. Because the KL divergence is non-negative and measures the
difference between the two distributions, it is soften conceptualised
as some sort of distance, but it is not a true measure, because it is
not symmetric.


### Cross Entropy {#cross-entropy}

Minimising the cross entropy with respect to Q is equivalent to
minimising the KL divergence.


## Object Detection {#object-detection}

-   Region Proposal Networks find blobby regions that are likely to
    contain objects, and are relatively fast to run
    -   e.g. Selective Search, gives about 2000 region proposals in a few
        seconds on CPU.
    -   <https://ivi.fnwi.uva.nl/isis/publications/bibtexbrowser.php?key=UijlingsIJCV2013&bib=all.bib>
-   R-CNN uses a RPN like selective search to generate region proposals,
    followed by a convnet and an SVM on top to predict image labels.
    There is also a bounding box regression loss, which predicts
    correction to the proposals generated.
-   Fast R-CNN passes the image through a convnet, and run the RPN to
    generate image proposals on a particular feature map of the image.
    These crops go through a RoI pooling layer.
-   Faster R-CNN trains the region proposal network, and is jointly
    trained with 4 losses:
    -   RPN classify object/not object
    -   RPN regress box coordinates
    -   Final classification score (object classes)
    -   Final object coordinates


### Detection Without Proposals: YOLO / SSD {#detection-without-proposals-yolo-ssd}

Within each grid cell:

-   Regress from each of the B base boxes to a final box with 5 numbers:
    dx, dy, dh, dw, confidence
-   Predict scores for each of C classes (including background as a
    class)

Output: \\(7 \* 7 \*(5\*B + C)\\)


## Learning Rates {#learning-rates}


### Learning Rate Annealing {#learning-rate-annealing}

Decay learning rate after several iterations...

Also: SGDR with cyclic learning rate, restores high learning rate
after several iterations to try to find local minima that is largely
flat, and doesn't change so much in any direction. (Generalises
better)


## Reinforcement Learning {#reinforcement-learning}

<https://towardsdatascience.com/introduction-to-various-reinforcement-learning-algorithms-i-q-learning-sarsa-dqn-ddpg-72a5e0cb6287>


## How Companies use Deep Learning {#how-companies-use-deep-learning}


### ViSenze {#visenze}

Visenze's primary product is their Visual Search (reverse image
search).

Initially, they started out with a similar model to our approach:
Train a CNN, read encodings before the FC layer, use it to perform NN
search.

Now their pipeline is as follows:
Query time -> object detection -> Extract Features -> Nearest Neighbours -> Ranked Results
Offline training -> Detection Model -> Embedding models -> Nearest Neighbours
Index time -> Objects -> Extract Features -> Search Index
(Compression/Hash Model)

Object detection followed the trends in research papers:

1.  R-CNN
2.  Fast-CNN
3.  Faster-CNN
4.  YOLO/SSD
5.  DSOD (Current)

Model performance is based of standard IR metrics: They are using DCG
score for evaluating their reverse image search. This requires a lot
of manual annotation.

Models are trained offline using physical purchased GPUs.

Deployment: Kubernetes on AWS, with generally small CPU servers.
Overall latency is less than 200ms.


#### Things they focused on as a company {#things-they-focused-on-as-a-company}

1.  Tooling:
    1.  Annotation System
        1.  Complete annotation is crucial to detection training
    2.  Training System
        1.  Make it easy to change hyperparameters and retrain models
        2.  Abstract away need for knowing deep learning
        3.  Platform for tracking metrics
    3.  Querylog pipeline
        1.  Take user input as training data
    4.  Evaluation System
        1.  Both automatic evaluation via metrics and manual (AB testing)
            is done before release
        2.  Visualisations via T-SNE to see if clusters remain the
            same/make sense, when new learnings are added: **learning
            without forgetting**
2.  Business:
    1.  Attend to customer requirements: e.g. if a company wants to sell
        hats, model needs to be trained to detect hats, and these
        learnings need to be added to the existing model without
        affecting data earlier


#### Visual Embeddings Used {#visual-embeddings-used}

At Visenze, they use multiple embeddings in different feature spaces
to measure similarity. The results are then combined before returned.
The 4 main embeddings are:

1.  Exact matches (same item)
    1.  Trained with siamese network with batched triplet loss
        (typically used in face recognition, but seems to work well with
        product classification)
2.  Same Category
    1.  Domain specific labels have been most helpful in achieving
        state-of-the-art accuracy
        1.  e.g for fashion, sleeve length, jeans length etc.
3.  Similar Categories


#### Lessons Learnt {#lessons-learnt}

1.  Taxonomy Coverage
2.  Training Data Coverage
    1.  Obtaining training data from one source only can lead to severe
        bias (e.g. detecting watermarks and using it as feature)
3.  Overfitting
4.  Continuous Improvement (Learning Without Forgetting)
5.  Bad-case driven development
    1.  Be quick to identify hard negatives, and add in similar
        negative samples into training data to improve accuracy
6.  Image quality, rotation
7.  Re-ranking based on customer


## Key Open Questions about Deep Learning Systems {#key-open-questions-about-deep-learning-systems}

1.  How and why do they work? Can we derive their structure from first
    principles? Can we compress/explain the myriad empirical
    observations/best practices about deep nets?
2.  Can we shed new light on the hidden representations of objects? Can
    we generate new theories and testable predictions for both
    artificial/real neuroscience?
3.  Why do they fail? How to improve them? How to alleviate their
    intrinsic limitations?
4.  Can we guide the search for better
    architectures/algorithms/performance in applied DL?


### Concrete Theoretical Questions {#concrete-theoretical-questions}

1.  What are the implicit modelling assumptions?
2.  What is the inference task and algorithm?
3.  What is the learning algorithm?
4.  Can we generate new testable predictions for artificial/real nets?
5.  What modeling assumptions are being violated in failures? How can
    we improve the models, tasks and algorithms?


## ConvNets from First Principles {#convnets-from-first-principles}

There are many architectures, but just a few key operations and
objectives:

-   2D (De)Convolution, Spatial max-(un)pooling, ReLu, Skip-connections
-   Batch Normalization
-   DropOut, Noise Corruption
-   Data Augmentation
-   Objectives: XEnt, NLL, Reconstruction Error, Mutual Information

We focus on the properties conserved across all species of Convnets.


### Finding a generative model {#finding-a-generative-model}

We reverse engineer a Convnet by building a generative model

1.  Define a generative model that captures nuisance variation
2.  Recast feed-forward propogation in a DCN as MAP inference of the
    full latent configuration -> generative classifier
3.  Apply a _discriminative relaxation_ -> discriminative classifier
4.  Learn the parameters via Batch Hard EG Algorithm -> SGD-Backprop
    Training of a DCN
5.  Use new generative model to address limitations of DCNs: top-down
    inference, learning from unlabeled data, hyperparameter
    optimization


## Variational Inference and Deep Learning {#variational-inference-and-deep-learning}

<https://www.youtube.com/watch?v=h0UE8FzdE8U>

Optimizers work well with sums, not products. We want to be able to
calculate gradients on a subset of examples and have reasonable
confidence for convergence.

Latent variables give our model structure and can make training more
tractable. With latent variables \\(\bar{z}\\), we have:

\begin{equation}
  p(x) = \sum\_z p(x,z) =  \sum\_z p(x | z)p(z)
\end{equation}

Putting log-likelihood and latent variables together, we get:

\begin{equation}
L = \sum\_i \log \left( \sum\_z p(x\_i, z)\right)
\end{equation}

Usually, we want to sample one example and one value for the latent
variable at a time, for tractable optimization. This only works for a sum.

We compare the above structure with this equation:

\begin{equation}
L = \sum\_i \left( \sum\_z \log p(x\_i, z)\right)
\end{equation}

Intuitively the new equation says that every latent variable value
needs to do a good job of explaining the data


### Derivation of the Variational Bound {#derivation-of-the-variational-bound}

\begin{equation}
  p(x) = \sum\_i \log (\sum\_z p(x\_i, z))
\end{equation}

\begin{equation}
p(x) = \sum\_i \log(\sum\_z \frac{q(z|x\_i) p(x\_i, z)}{q(z|x\_i)})
\end{equation}

By Jensen's Inequality (concavity of the log function),

\begin{equation}
p(x) \ge \sum\_i \sum\_z q(z|x\_i) \log \frac{p(x\_i, z)}{q(z|x\_i)}
\end{equation}

\begin{equation}
  p(x) \ge \sum\_i q(z|x\_i) \sum\_z \log (p(x\_i | z)) + \log \frac{p(z)}{q(z|x\_i)}
\end{equation}

\begin{equation}
  p(x) \ge \mathbb{E}\_{z \sim q(z|x\_i)} \log (p(x\_i | z)) - KL(q(z|x\_i) || p(z))
\end{equation}

The first term is the conditional likelihood of our observation if we
used a sampled z value from the approximated posterior \\(q(z | x)\\). The
second term is a divergence between the approximate posterior and the
prior. This is often well defined.


### Variational Autoencoder {#variational-autoencoder}

We can show that a special type of autoencoder corresponds to this
lower bound, where \\(q(z | x)\\) is the encoder and \\(p(x|z)\\) is the
decoder. The first term is the usual reconstruction objective for
autoencoders. The second term is a special KL term which pulls the
bottleneck closer to a prior.

In the simplest case, we make both \\(q(z|x)\\) and \\(p(z)\\) independent
Gaussians:

\begin{equation}
  KL(q(z|x\_i) || p(z)) = \sum\_j \mu\_j^2 + \sigma\_j^2 - \log(\sigma\_j^2)
\end{equation}

\\(q(z|x)\\) has parameters \\(\mu\\) and \\(\sigma\\) which are just outputs from our
encoder. \\(p(z)\\) is a prior distribution with \\(\mu = 0\\) and \\(\sigma = 1\\).

The bottleneck can't remember spatial information, and optimizing for
\\(p(x|z)\\) puts heavy emphasis on exact recovery of spatial information.
Solutions involve removing the bottleneck, or replacing the prior
\\(p(z)\\) with one that has more structure.
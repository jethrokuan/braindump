+++
title = "SSNLP Conference Notes"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:28:15+08:00
draft = false
+++

tags
: [Natural Language Processing]({{< relref "nlp" >}})

## AliNLP: the Text Processing Engine that Powers Alibaba's Business Applications {#alinlp-the-text-processing-engine-that-powers-alibaba-s-business-applications}

- Linlin Li

AliNLP is a large-scale NLP technology platform for the entire Alibaba
ecosystem.

- Utilizes behaviour data instead of demanding human annotations of
  NLP algorithms
- Utilizing multiple correlated tasks for improving effectiveness of
  individual tasks of the complex Alibaba eco-system

NLP Data:

- language dictionary
- token & POS corpus
- Entity Corpus
- Treebank
- Sentiment Corpus
- News Category Corpus
- Word Relation Graph
- Knowledge Graph

NLP Foundations:

- Lexical Analysis
- Syntactical Analysis
- Semantic Analysis
- text Analysis
- Deep Learning
  - Word2vec
  - Graph2vec

Challenges in Chinese word segmentation application

- Limited amount of human annotated training data
- Frequent appearance of out-of-vocabulary words

- Taobao has billions of user search logs available
  - auto semi-annotated data

Multi-task learning : Combine human annotated data and automatically

### Machine Reading Comprehension {#machine-reading-comprehension}

- Aim at answering a question about a given domain/paragraph
- Using IR based selection method to choose the relevant document/paragraph
- No Pre-knowledge or FAQ needed

Encode Layer (BiLSTM) -> Attention Layer -> Match Layer (Bilinear
Match) -> Output Layer (Pointer Network)

Used in AliMe, Timi, Lazada Chatbot

## Ido Dagan: {#ido-dagan}

News Tweet Illustration: What is being said here?

Structured Knowledge Graphs (freebase knowledge graph)

"Natural Representations": Open IE - isolates propositions as
predicate--argument tuple

QA-SRL: Question answering - semantic role labeling

Each QA pair represents one predicate-argument relation
QA roles: Gunman takes own life after killing thrtee in Wisconsin spa
shooting. Form QASemDep Graph.

co-referring nodes/edges collapsed.

## Noah Smith: Synchretizing Structured and Learned Representations {#noah-smith-synchretizing-structured-and-learned-representations}

- Broad-coverage semantic parsing: baselines
- Building SCAFFOLD from alternative tasks
- Putting a SPIGOT on the pipeline

### NL Semantics : Two Operationalizations {#nl-semantics-two-operationalizations}

1.  dependencies: a graph, entities/concepts/events as nodes,
    relations as edges
    - Turboparser (Martins et al)
    - JAMR (Flanigan et. al)
2.  spans: segmentation into labeled parts

Both associate words with predicates and arguments

### Linguistic Structure Prediction {#linguistic-structure-prediction}

x -> differentiable -> y (conventional NN)
x -> differentiable -> \\(argmax\_{y\in Y}S^Ty\\) -> structured output
(input text) -> (part representations) -> dynamic programming/spanning
tree/inference method (trained with loss e.g. hinge loss)

[Neurboparser](https://github.com/Noahs-ARK/NeurboParser)
Open SESAME

joint learning
Use low-rank, sparse tensors
Promoting sparsity :

\begin{equation}
\lambda \sum\_{y_i, z_j \in C} \left|S\left( y_i, z_j \right) \right|
\end{equation}

gave 14x speedup

[Greedy, Joint Syntactic-Semantic Parsing with Stack LSTMs](https://arxiv.org/abs/1606.08954)

Structured Attention, Straight-through estimator (Hinton 2012)

SPIGOT (structured projection of intermediate gradients)

\\(\hat{Z}\\), the convex hull of intermediate parses

Sentence as graph vs sentence as sequence

dependency tree vs dependency semantics

## Automatic Essay Scoring {#automatic-essay-scoring}

- Regression, classification, preference ranking
  - Prompt Independent Features
    - length, syntax, style etc.
  - Argumentation Features
    - argument components
    - argument relations
- Neural Models
  - No need for feature engineering: word (vectors) as features
  - Hard to interpret results

Essay scoring engines provides no feedback to the student on how to
improve the essay.

## Question Answering & QANet {#question-answering-and-qanet}

-end-to-end models

SQuAD dataset

<https://github.com/facebookresearch/DrQA>

### Base Model {#base-model}

[BiDAF](https://allenai.github.io/bi-att-flow/)

- Idea #1: Combine Convolution and Self-Attention
- Convolution: Captures local context
  - But Global interaction requires \\(O(\log_kN)\\) layers, and
    interactions become weaker as it goes deeper

Position Encoding -> repeat(Separable Convolution) -> Self Attention
-> Feed Forward

Augmentation:

- NMT, en - de -en to get new QA pair

Deep Embedding through transfer learning:

- <https://thegradient.pub/nlp-imagenet/>
- ELMo (words have different embeddings depending on context)

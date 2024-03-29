+++
title = "Math Problem-solving with Machine Learning"
author = ["Jethro Kuan"]
draft = false
+++

## Papers {#papers}


### Measuring Mathematical Problem Solving With the MATH Dataset {#measuring-mathematical-problem-solving-with-the-math-dataset}

This paper is primarily a dataset paper. It introduces two datasets:

1.  MATH dataset: A challenging dataset (12,500 problems) which contains
    questions, and step-by-step solutions, with answers in boxes
    -   Problems are categorized into seven subjects, and classified into 5
        difficulties
    -   Question figures encoded using [Asymptote language](https://asymptote.sourceforge.io/) to allow language models
        to learn to read/generate them.
2.  AMPS dataset: Large dataset for pretraining
    -   100,000 problems from Khan Academy exercises
    -   5 million problems generated from Mathematica scripts to help model learn
        mathematics fundamentals

Language models achieve poor accuracies on the MATH dataset (2.9% to 6.9%): it
requires the models to learn advanced problem-solving techniques. Human
performance is also relatively poor on the dataset (40% for non-advanced
students, 90% for IMO medallist).


#### Model Training {#model-training}

GPT-2 pretrained on AMPS using the standard autoregressive language modelling
objective.

Fine-tuned model trained to output both solution and answer. Inputs are equal
mix of:

-   <P> Final Answer: <Answer>
-   <P> Full Solution: <Solution>

This allows the model to output both answer and solution based on prompt tuning.
NOTE: Seems similar to T5's text-to-text format.

Evaluation is performed by computing the probability that a correct answer has
higher confidence than an incorrect answer (AUROC). Large models are more
overconfident.


#### Key Findings {#key-findings}

1.  Accuracy increases slowly as model size increases: **suggests the need
    for algorithmic improvements**
2.  Pretraining on AMPS results in ~25% increase in relative accuracy, suggesting
    that algorithmically generated questions can be a useful pretraining step
3.  Having model generate step-by-step solution _decreases_ resulting accuracy
    -   Possibly because incorrect generation can derail the model
4.  Training the models with partially observed solutions is useful, but not by
    much: only when the model sees 99% of the solutions is able to output the
    answer with high accuracy.


### Entailment as Few-Shot Learner {#entailment-as-few-shot-learner}


#### Key Idea {#key-idea}

Reformulate NLP tasks into entailment tasks. Example inputs:

> sentence [SEP] It was great
> sentence [SEP] It is World news
> sentence [SEP] sentence2

The authors also introduce data augmentations to increase the size of the training data, augmenting existing limited annotated data. Consider one-sentence and two-sentence tasks:
`S1 [SEP] It is CLS` and `S1 [SEP] S2`

Positive samples:

-   Augment S1 slightly, add `S1 [SEP] S1'`, or `S1 [SEP] S2`. Similar for S2.

Negative samples:

-   Change S1 drastically, add `S1 [SEP] S1'`, or `S1 [SEP] S2`. Similar for S2.
-   Randomly sample R1, R2 from different dataset, and add `R1 [SEP] R2`.
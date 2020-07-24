+++
title = "Self-supervised Learning"
author = ["Jethro Kuan"]
lastmod = 2020-07-23T23:25:18+08:00
slug = "self_supervised_learning"
draft = false
+++

[Prediction is the Essence of Intelligence]({{< relref "prediction_is_the_essence_of_intelligence" >}})

## Self-supervised Learning vs Other Learning Paradigms {#self-supervised-learning-vs-other-learning-paradigms}

In self-supervised learning, the machine predicts any part of its input for any observed part. For example, it may predict future frames in videos. This results in a lot of feedback.

In [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}}), the machine predicts a scalar reward given weak feedback once in a while. Since there is very little feedback, it seems impossible to learn any complex representations in a short amount of time.

See [LeCun's Cake Analogy]({{< relref "lecun_cake_analogy" >}}).

## Image-based {#image-based}

Exemplar-CNN creates surrogate training dataset with unlabeled image patches. Surrogate classes are created by applying image transformations, such as rotation.

Another class of tasks involve extracting multiple patches from a single image, and asking the model to predict the relationship between the patches.

The model can also be tasked to perform colorization: coloring a grayscale input image.

## Video-based {#video-based}

Any visual representation learned for the same object across close frames should be close in the latent feature space. For example, applying a triplet loss on patches of motion (compared to a random patch).

Another common task is to validate the order of frames. Training frames can be sampled from high-motion windows in order (a,b,c,d,e). Positive tuples such as (b,c,d) can be formed, and negative tuples like (b,a,d), (b,e,d) can be created.

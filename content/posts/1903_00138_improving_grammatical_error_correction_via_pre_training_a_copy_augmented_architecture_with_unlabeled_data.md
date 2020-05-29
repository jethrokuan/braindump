+++
title = "Improving Grammatical Error Correction via Pre-Training a Copy-Augmented Architecture with Unlabeled Data"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:02:17+08:00
slug = "improving_grammatical_error_correction_via_pre_training_a_copy_augmented_architecture_with_unlabeled_data"
draft = false
+++

source
: <https://arxiv.org/abs/1903.00138>

## Grammatical Error Correction {#grammatical-error-correction}

Unlike translation, GEC only changes several words of the source sentence -- roughly 80% can be copied from the source sentence.

## Key Ideas {#key-ideas}

- Leverage unlabelled data by training denoising autoencoders.
- Add 2 multi-task for copy-augmented architecture:
  - token labeling task
  - sentence-level copying task

The copying mechanism enables training a model with a small vocabulary, as it can copy unchanged and out-of-vocabulary words from the source input tokens.

## Architecture {#architecture}

Transformer encodes source sentence with stack of L identical blocks, each of them applies multi-head self-attention over the source tokens followed by a position-wise feedforward layer to produce its context aware hidden state. The decoder is the same architecture as the encoder, with an additional attention layer over the encoder's hidden states.

\begin{equation}
h\_{1 \ldots N}^{s r c}=\text {encoder }\left(L^{s r c} x\_{1 \dots N}\right)
\end{equation}

\begin{equation}
h\_{t}=\operatorname{decoder}\left(L^{\text{train}} y\_{t-1 \ldots 1}, h\_{1 \ldots N}^{s r c}\right)
\end{equation}

\begin{equation}
P\_{t}(w)=\operatorname{softmax}\left(L^{\text{train}} h\_{t}\right)
\end{equation}

{{< figure src="/ox-hugo/screenshot2020-03-09_21-56-59_.png" >}}

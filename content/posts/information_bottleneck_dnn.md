+++
title = "Information Bottleneck in Deep Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:22+08:00
draft = false
+++

The information bottleneck theory was recently used to study Deep
Neural Networks. Shwartz-Ziv and Tishby proposed that the information
bottleneck expresses the tradeoff between the mutual information
measures \\(I(X,T)\\) and \\(I(T,Y)\\)
([Shwartz-Ziv and Tishby, n.d.](#org0104bc6)).

\\(I(X,T)\\) and \\(I(X,Y)\\) quantifies the amount of information that the
layer contains about the input and output respectively.

## Key Findings from ([Shwartz-Ziv and Tishby, n.d.](#org0104bc6)) {#key-findings-from--shwartz-ziv-and-tishby-n-dot-d-dot--org0104bc6}

1.  Most of the training epochs are spent on compression of the input
    to efficient representation, and not on fitting the training labels
2.  Th representation compression phase begins when training errors
    become small, and SGD epochs change from a fast drift to a smaller
    training error into a stochastic relaxation or random diffusion,
    constrained by the training error value.
3.  The converged layers lie on or very close to the Information
    Botteneck (IB) theoretical bound, and the maps from the input to
    any hidden layer and from this hidden layer to the output satisfy
    the IB self-consistent equations.
4.  The generalization-through-noise mechanism is unique to DNNs
5.  The training time is dramatically reduced when adding more layers,
    _hence the main advantage of adding layers is computational_??

TL;DR: SGD has 2 phases: ERM, and representation compression. The
latter phase is an explanation for the lack of overfitting in DL.

## Bibliography {#bibliography}

<a id="org0104bc6"></a>Shwartz-Ziv, Ravid, and Naftali Tishby. n.d. “Opening the Black Box of Deep Neural Networks via Information.” <http://arxiv.org/abs/1703.00810v3>.

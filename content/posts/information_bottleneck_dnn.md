+++
title = "Information Bottleneck in Deep Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:19:10+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Spike Train Mutual Information]({{< relref "spike_train_mutual_information" >}})

The information bottleneck theory was recently used to study Deep
Neural Networks. Shwartz-Ziv and Tishby proposed that the information
bottleneck expresses the tradeoff between the mutual information
measures \\(I(X,T)\\) and \\(I(T,Y)\\)
<a id="00d0d7c9b0a8cde4ee312e0caa42f584" href="#shwartz-ziv17_openin_black_box_deep_neural">(Shwartz-Ziv \& Tishby, 2017)</a>.

\\(I(X,T)\\) and \\(I(X,Y)\\) quantifies the amount of information that the
layer contains about the input and output respectively.

## Key Findings from <a id="00d0d7c9b0a8cde4ee312e0caa42f584" href="#shwartz-ziv17_openin_black_box_deep_neural">(Shwartz-Ziv \& Tishby, 2017)</a> {#key-findings-from}

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

# Bibliography

<a id="shwartz-ziv17_openin_black_box_deep_neural" target="_blank">Shwartz-Ziv}, R., & Tishby, N., _Opening the black box of deep neural networks via information_, CoRR, _()_, (2017). </a> [↩](#00d0d7c9b0a8cde4ee312e0caa42f584)

### Backlinks {#backlinks}

- [Spike Train Mutual Information]({{< relref "spike_train_mutual_information" >}})

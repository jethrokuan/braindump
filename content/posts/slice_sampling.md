+++
title = "Slice Sampling"
author = ["Jethro Kuan"]
draft = false
+++

Slice sampling has similarities to [Gibbs sampling]({{<relref "gibbs_sampling.md" >}}), [Rejection Sampling]({{<relref "rejection_sampling.md" >}})
and the [Metropolis-Hastings method]({{<relref "metropolis_hastings.md" >}}). The advantage over simple
[Metropolis-Hastings]({{<relref "metropolis_hastings.md" >}}) methods is that it is robust to the choice of
parameters. Like rejection sampling, it asymptotically draws samples
from volume under the curve \\(p^\star(x)\\).

A good treatment of slice sampling can be found in Mackay's Book
[Information Theory, Inference and Learning Algorithms](http://www.inference.org.uk/itprnn/book.pdf).

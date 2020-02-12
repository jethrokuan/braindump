+++
title = "Slice Sampling"
author = ["Jethro Kuan"]
lastmod = 2020-02-12T23:34:51+08:00
draft = false
+++

Slice sampling has similarities to [gibbs sampling]({{< relref "gibbs_sampling" >}}), [rejection sampling]({{< relref "rejection_sampling" >}})
and the [Metropolis-Hastings method]({{< relref "metropolis_hastings" >}}). The advantage over simple
[Metropolis-Hastings]({{< relref "metropolis_hastings" >}}) methods is that it is robust to the choice of
parameters. Like rejection sampling, it asymptotically draws samples
from volume under the curve \\(p^\star(x)\\).

A good treatment of slice sampling can be found in Mackay's Book
[Information Theory, Inference and Learning Algorithms](http://www.inference.org.uk/itprnn/book.pdf).

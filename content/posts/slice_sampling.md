+++
title = "Slice Sampling"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:08:59+08:00
draft = false
+++

Slice sampling has similarities to [Gibbs sampling]({{< relref "gibbs_sampling" >}}), [Rejection Sampling]({{< relref "rejection_sampling" >}})
and the [Metropolis-Hastings method]({{< relref "metropolis_hastings" >}}). The advantage over simple
[Metropolis-Hastings]({{< relref "metropolis_hastings" >}}) methods is that it is robust to the choice of
parameters. Like rejection sampling, it asymptotically draws samples
from volume under the curve \\(p^\star(x)\\).

A good treatment of slice sampling can be found in Mackay's Book
[Information Theory, Inference and Learning Algorithms](http://www.inference.org.uk/itprnn/book.pdf).

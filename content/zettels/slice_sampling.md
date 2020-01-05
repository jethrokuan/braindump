+++
title = "Slice Sampling"
author = ["Jethro Kuan"]
lastmod = 2020-01-05T23:09:26+08:00
draft = false
math = true
+++

Slice sampling has similarities to [§gibbs\_sampling]({{< relref "gibbs_sampling" >}}),
[§rejection\_sampling]({{< relref "rejection_sampling" >}}) and the [§metropolis\_hastings]({{< relref "metropolis_hastings" >}}) method. The advantage
over simple [§metropolis\_hastings]({{< relref "metropolis_hastings" >}}) methods is that  it is robust to the
choice of parameters. Like rejection sampling, it asymptotically draws
samples from volume under the curve \\(p^\star(x)\\).

A good treatment of slice sampling can be found in Mackay's Book
[Information Theory, Inference and Learning Algorithms](http://www.inference.org.uk/itprnn/book.pdf).

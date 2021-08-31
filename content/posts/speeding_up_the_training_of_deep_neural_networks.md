+++
title = "Speeding Up the Training of Deep Neural Networks"
author = ["Jethro Kuan"]
draft = false
+++

Distributed training architectures rely on two concepts: [all-reduce]({{<relref "all_reduce.md#" >}}) or a
[parameter server]({{<relref "parameter_servers.md#" >}}).


## BytePS Jiang et al., n.d. {#byteps-jiang-et-al-dot-n-dot-d-dot}

BytePS provides a unifying framework for [All-reduce]({{<relref "all_reduce.md#" >}}) and [parameter server]({{<relref "parameter_servers.md#" >}})
architectures, showing communication optimality. Intra-machine communication is
optimized. It also proposes a "Summation Service", which accelerates DNN
training by running gradient summation on CPUs, while performing parameter
updates on GPUs.
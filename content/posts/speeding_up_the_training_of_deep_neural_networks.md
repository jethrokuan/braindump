+++
title = "Speeding Up the Training of Deep Neural Networks"
author = ["Jethro Kuan"]
draft = false
+++

Distributed training architectures rely on two concepts: [all-reduce]({{< relref "all_reduce" >}}) or a
[parameter server]({{< relref "parameter_servers" >}}).

## BytePS ([Jiang et al., n.d.](#org813854c)) {#byteps--jiang-et-al-dot-n-dot-d-dot--org813854c}

BytePS provides a unifying framework for [All-reduce]({{< relref "all_reduce" >}}) and [parameter server]({{< relref "parameter_servers" >}})
architectures, showing communication optimality. Intra-machine communication is
optimized. It also proposes a "Summation Service", which accelerates DNN
training by running gradient summation on CPUs, while performing parameter
updates on GPUs.

## Bibliography {#bibliography}

<a id="org813854c"></a>Jiang, Yimin, Yibo Zhu, Chang Lan, Bairen Yi, Yong Cui, and Chuanxiong Guo. n.d. “A Unified Architecture for Accelerating Distributed DNN Training in Heterogeneous GPU/CPU Clusters.” In _14th USENIX Symposium on Operating Systems Design and Implementation (OSDI 20)_, 463–79. USENIX Association. <https://www.usenix.org/conference/osdi20/presentation/jiang>.

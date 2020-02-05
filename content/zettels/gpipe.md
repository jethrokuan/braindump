+++
title = "Gpipe"
author = ["Jethro Kuan"]
lastmod = 2020-02-05T23:05:18+08:00
draft = false
+++

Gpipe is a scalable pipeline parallelism library published by Google
Brain, which allows for efficient training of large, memory-consuming
models <a id="f5a07e10ad91af167044009928ccf64f" href="#huang18_gpipe">(Huang et al., 2018)</a>. Pipeline parallelism allows for
[§fast\_nn\_training]({{< relref "fast_nn_training" >}}).

In Gpipe, neural networks with sequential layers are partitioned
across accelerators. The pipeline parallelism divides each input
mini-batch into smaller micro-batches, enabling different accelerators
to work on different micro-batches simultaneously. This is especially
useful in [§large\_batch\_training]({{< relref "large_batch_training" >}}).

{{< figure src="/ox-hugo/screenshot2020-02-05_23-05-00_.png" >}}

# Bibliography
<a id="huang18_gpipe" target="_blank">Huang, Y., Cheng, Y., Bapna, A., Firat, O., Chen, M. X., Chen, D., Lee, H., …, *Gpipe: efficient training of giant neural networks using pipeline parallelism*, CoRR, *()*,  (2018). </a> [↩](#f5a07e10ad91af167044009928ccf64f)

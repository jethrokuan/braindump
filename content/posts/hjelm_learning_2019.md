+++
title = "hjelm_learning_2019: Learning deep representations by mutual information estimation and maximization"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:58+08:00
draft = false
+++

## Learning deep representations by mutual information estimation and maximization {#hjelm_learning_2019}

### Local MI Maximization {#local-mi-maximization}

Maximizing [Mutual Information]({{< relref "mutual_information" >}}) between the input and output may not be useful for the task. Trivial pixel-level noise is useless for image classification. By maximizing the average mutual information between the high-level representation and local patches of the image, one can encourage the encoding aspects of data that is shared across patches.

+++
title = "chen_big_2020: Big Self-Supervised Models are Strong Semi-Supervised Learners"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T15:37:52+08:00
draft = false
+++

## Big Self-Supervised Models are Strong Semi-Supervised Learners {#chen_big_2020}

### Key Idea {#key-idea}

The paper proposes a three-step semi-supervised learning framework for visual data

1.  unsupervised or self-supervised pretraining using a modified [SimCLR]({{< relref "chen20_simpl_framew_contr_learn_visual_repres" >}})
2.  Supervised fine-tuning
3.  Distillation using unlabeled data

    {{< figure src="/ox-hugo/screenshot_20200708_153337.png" >}}

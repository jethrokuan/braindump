+++
title = "Byron Boots - Perspectives on Machine Learning and Robotics"
author = ["Jethro Kuan"]
slug = "byron_boots_perspectives_on_machine_learning_and_robotics"
draft = false
+++

Robotics can be approached from 3 different perspectives.

{{< figure src="/ox-hugo/screenshot2020-07-15_17-17-27_.png" >}}


## Machine Learning works because of structure {#machine-learning-works-because-of-structure}

1.  In function/policy class
2.  In objective function
3.  In datasets
4.  In optimization

And robotics also has a lot of structure. How do we make choices for our ML
algorithms to exploit this structure?


## How should robots learn? {#how-should-robots-learn}

[Empirical Risk Minimization]({{<relref "erm.md#" >}}) is too strong: data is not i.i.d, not batched, not
in the model class. Solution: use online learning, that makes minimal
assumptions.

Online learning has simple derivations, insights from optimization, and may
suggest better algorithms.

Model Predictive Control is an effective approach to handling challenging
dynamic environments with simple models, because it allows for local
optimization of simple policies.

[Reinforcement Learning]({{<relref "reinforcement_learning.md#" >}}) can learn complex policies, and is often state-of-the-art
in simulated environments and games. However, the algorithms are data-hungry,
and the objective function is non-convex and difficult to optimize.

[Imitation Learning]({{<relref "imitation_learning.md#" >}}) provides a general way to accelerate policy learning, by
leveraging models/simulators and experts. We can leverage surrogate objective
functions that are easier to optimize.
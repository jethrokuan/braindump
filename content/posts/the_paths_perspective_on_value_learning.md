+++
title = "The Paths Perspective on Value Learning"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:08:49+08:00
slug = "the_paths_perspective_on_value_learning"
draft = false
+++

source
: <https://distill.pub/2019/paths-perspective-on-value-learning/>

author
: [Sam Greydanus]({{< relref "sam_greydanus" >}})

[Temporal Difference Learning]({{< relref "td_learning" >}}) can be viewed as expanding the agent's experience
by merging trajectories.

TD averages over more trajectories than Monte Carlo methods, because there are
never fewer simulated trajectories than real trajectories. This explains why TD
learning outperforms Monte Carlo in tabular environments.

However, with function approximators, Monte Carlo and TD can make bad value
updates. TD learning **amplifies these errors dramatically**.

Great article explaining why TD learning can be beneficial, and when it can be
harmful.

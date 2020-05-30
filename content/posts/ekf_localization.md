+++
title = "EKF Localization"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:08:17+08:00
draft = false
+++

tags
: [Robot Localization]({{< relref "robot_localization" >}}), [Markov Localization]({{< relref "markov_localization" >}}), [Grid & Monte Carlo Localization]({{< relref "grid_mc_localization" >}})

## EKF localization {#ekf-localization}

EKF localization assumes that the map is represented by a collection
of features. At any point in time \\(t\\), the robot gets to observe a
vector of ranges and bearings to nearby features:
\\(z\_{t}=\left\\{z\_{t}^{1}, z\_{t}^{2}, \ldots\right\\}\\).

The easiest localization algorithm assumes all features are uniquely
identifiable, although this assumption can be corrected for. This
problem is called the unknown correspondence problem. One solution is
the maximum likelihood correspondence, where one determines the most
likely value of the correspondence and uses that value.

Maximum likelihood correspondence is brittle when there are many
equally likely hypotheses for the correspondence variable. This is
skirted around by choosing landmarks that are sufficiently distinct or
far apart, and making sure that the robot's uncertainty is small.

### Practical Considerations {#practical-considerations}

efficient search
: it is computationally expensive to loop through
all landmarks \\(k\\) in the map. There are often simple tests to
identify plausible candidate landmarks.

mutual exclusion
: a key assumption is the independence of feature
noise, which enabled us to process individual features sequentially,
avoiding an exponential search. This resulted in being able to
assign the same landmark in the map with multiple values. However,
this is invalid by default in some sensors, such as cameras. Knowing
this mutual exclusion can significantly reduce the search space.

outliers
: Outliers are not addressed in the algorithm.

information
: EKF localization uses a subset of all available
information (processed features) to localize. In addition EKF is
unable to process negative information (lack of a feature).

These methods are furthermore unable to solve global localization and
the kidnapped robot problem.

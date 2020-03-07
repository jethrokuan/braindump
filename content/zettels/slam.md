+++
title = "Simultaneous Localization and Mapping (SLAM)"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:43:21+08:00
draft = false
+++

In SLAM, the robot acquires a map of its environment while
simultaneously localizing itself relative to this map. It is a
significantly more difficult problem compared to [§robot\_localization]({{< relref "robot_localization" >}})
and [§occupancy\_grid\_mapping]({{< relref "occupancy_grid_mapping" >}}).

There are 2 main forms of SLAM:

Online SLAM
: estimating the posterior over the momentary pose
    along with the map: \\(p(x\_t, m | z\_{1:t}, u\_{1:t})\\)

full SLAM
: posterior over the entire path \\(x\_{1:t}\\) along with the
    map: \\(p(x\_{1:t}, m | z\_{1:t}, u\_{1:t})\\)

The online SLAM algorithm is the result of integrating out past poses
in the full SLAM problem


## EKF SLAM {#ekf-slam}

EKF SLAM uses a number of approximations and limiting assumptions:

Feature-based maps
: Maps are composed of a small number of point
    landmarks. The method works well when the landmarks are relatively unambiguous.

Gaussian Noise
: The noise in motion and perception is assumed to
    be Gaussian.

Positive Measurements
: It can only process positive sightings of
    landmarks, ignoring negative information.


### SLAM with Known Correspondence {#slam-with-known-correspondence}

The key idea is to integrate landmark coordinates into the state
vector. This corresponds to the continuous portion of the SLAM
problem. EKF SLAM combines the state vector as such:

\begin{aligned}
  y\_{t} &=\left(\begin{array}{c}{x\_{t}} \\ {m}\end{array}\right)
\end{aligned}

and calculates the online posterior:

\begin{equation}
  p\left(y\_{t} | z\_{1: t}, u\_{1: t}\right)
\end{equation}


### EKF SLAM with Unknown Correspondences {#ekf-slam-with-unknown-correspondences}

It uses an incremental maximum likelihood estimator to determine
correspondences.


### Feature Selection and Map Management {#feature-selection-and-map-management}

EKF SLAM requires several additional techniques to be robust in
practice. First, one needs to deal with outliers in the measurement
space. One technique is to maintain a provisional landmark list.
Instead of adding the landmark immediately, it is added to this list,
and when the uncertainty has shrunk after repeated observations of the
landmark, it is added in.


## EIF SLAM {#eif-slam}

Unlike EKF SLAM, the extended information form SLAM algorithm (EIF
SLAM) solves the full SLAM problem. EIF represents the posterior
gaussian in its canonical representation form, with the precision
matrix and information state vector ([§information\_filter]({{< relref "information_filter" >}})).

EIF SLAM is also not incremental: it calculates posteriors over a
robot path. It is best suited for problems where a map needs to be
built from data of fixed size, and can afford to hold the data in
memory until the map is built.

Suppose we are given a set of measurements \\(z\_{1:t}\\) with associated
correspondence variables \\(c\_{1:t}\\), and a set of controls \\(u\_{1:t}\\).
Then the EIF SLAM algorithm operates as follows:

1.  Construct the information matrix and information vector fromt he
    joint space of robot poses \\(x\_{1:t}\\) and map \\(m = \\{m\_j\\}\\).
2.  Each measurement leads to a local update of \\(\Omega\\) and \\(\xi\\).
    This is because information is an additive quantity.

The key insight is that information is sparse. Specifically,

-   Measurements provide information of a feature relative to the
    robot's pose at the time of measurement, forming constraints between
    pairs of variables.
-   Motion provides information between two subsequent poses, also
    froming constraints

EIF SLAM records all this information, through links that are defined
between poses and features, and pairs of subsequent poses. However, this
information representation does not provide estimates of the map or
robot path.

Maps are recovered via an iterative procedure involving 3 steps:

1.  Construction of a linear information form through Taylor expansion
2.  Reduction of this linear information form
3.  Solving the resulting optimization problem


### Sparse EIF SLAM {#sparse-eif-slam}

The sparse EIF SLAM only maintains a posterior over the present robot
pose and the map. Hence, they can be both run online, and are
efficient. Unlike EKFs, they also maintain information representation
of all knowledge.

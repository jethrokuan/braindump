+++
title = "Odometry Motion Model"
author = ["Jethro Kuan"]
lastmod = 2019-12-08T22:28:29+08:00
draft = false
math = true
+++

The odometry model uses the relative information of the robot's
internal odometry. While both the [§velocity\_motion\_model]({{< relref "velocity_motion_model" >}}) and the
odometry motion model suffer from drift and slippage, the velocity
motion model additionally suffers from the mismatch between the actual
motion controller and the mathematical model. Odometry information are
only available in retrospect, making the model unusable for planning.

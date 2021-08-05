+++
title = "Robot Grasping"
author = ["Jethro Kuan"]
draft = false
+++

Humans are able to perform dexterous manipulation of everyday, unseen objects
with their limbs. Yet, it remains a challenge for robots to perform grasping and
manipulation of objects.

A typical robot grasp detection system can consist of 3 components.

Object localization
: determining the target object's location

Object Pose Estimation
: obtaining a target object's 6D pose in the scene

[Grasp Estimation]({{<relref "grasp_estimation.md#" >}})
: Estimating the grasp pose in the camera's coordinate frame


## Challenges {#challenges}

1.  The robot needs to adapt to changes in the environment.
2.  The robot is susceptible to noise and errors in the environment, in control,
    in perception, and perturbations to the robot itself.


## Grasping Approaches {#grasping-approaches}

Dexterous manipulation
: manipulation with fingers

Enveloping grasps
: formed by wrapping both fingers and palm around object

    Enveloping grasps have superior stability. Grasping Simulators such as
    (GraspIt!) have been made available for theoretical research.


## Closed-loop Grasping {#closed-loop-grasping}

Execution time is the primary reason why grasping systems remain open-loop.
However, closed-loop control via visual feedback is desirable because they are
able to adapt to dynamic environments, and require less precise position control
or camera calibration. (NO\_ITEM\_DATA:morrisonClosingLoopRobotic2018) uses neural network
to synthesize a grasp quality image in real-time to achieve closed-loop
grasping.


## Bibliography {#bibliography}

NO\_ITEM\_DATA:morrisonClosingLoopRobotic2018
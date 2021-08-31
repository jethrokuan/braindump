+++
title = "Grasp Estimation"
author = ["Jethro Kuan"]
slug = "grasp_estimation"
draft = false
+++

Grasp estimation is the task of estimating the 6D gripper pose in camera
coordinates. Grasps can be categorized into the 2D planar grasp, or the 6DoF
grasp. For 2D planar grasps, the grasp is constrained from one direction, so the
6D gripper pose can be simplified into a 3D representation, which includes the
2D in-plane position and 1D rotation angle. For 6DoF grasps the gripper can
grasp the object from various angles.


## Evaluating Grasp Contact Points {#evaluating-grasp-contact-points}

The first category of methods sample candidate grasp contact points, and use
analytical methods or deep learning methods to evaluate the quality of the
grasp. This relies on prior knowledge such as object geometry and physics
models. Dex-net 2.0 uses deep learning methods to plan grasps
NO\_ITEM\_DATA:mahlerDexNetDeepLearning2017.

Other methods such as in NO\_ITEM\_DATA:morrisonClosingLoopRobotic2018a generate pixel-wise
grasp affordance maps
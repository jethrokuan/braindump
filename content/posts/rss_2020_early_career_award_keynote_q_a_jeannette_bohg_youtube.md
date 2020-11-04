+++
title = "RSS 2020, Early Career Award Keynote + Q&A: Jeannette Bohg - YouTube"
author = ["Jethro Kuan"]
draft = false
+++

## Meta {#meta}

source
: <https://www.youtube.com/watch?v=yD%5F0lUYo5fI&feature=emb%5Ftitle>

title
: A Tale of Success and Failure in Robot Grasping and Manipulation

related
: [Robot Grasping]({{<relref "robot_grasping.md" >}})

## Motivation {#motivation}

Why can a human so easily perform the task of grasping an object, and why is
this behaviour so hard to replicate on a robot?

## Approaches {#approaches}

1.  Grasp point detection as a classification problem (+ shape context)
    - Pros: no object models, no precise contact points (Bohg 12, Niekum et. al 19)
    - Cons: Open loop does not work, avoiding collisions is constraining, 2d grasping points are not enough

## Continuous Feedback and re-planning {#continuous-feedback-and-re-planning}

Three architectures:

1.  Sense-plan-act
2.  Locally Reactive Control (no lookahead)
3.  Reactive planning

Reactive planning produces policies by fusing data coming in at different
frequencies, and is able to replan in an uncertain, changing environment

## Exploit the environment {#exploit-the-environment}

Learn to alter the environment to scaffold manipulation (Learning to Scaffold
the Development of Robot Manipulation skills). This results in more robust robot
manipulation, and faster learning.

## Action representations matter {#action-representations-matter}

A good grasp depends on both the object and the gripper. (see UniGrasp)

Robot hand representation is learnt using an autoencoder, minimizing the Chamfer distance.

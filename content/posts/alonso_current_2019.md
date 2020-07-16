+++
title = "alonso_current_2019: Current Research Trends in Robot Grasping and Bin Picking"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:18:16+08:00
draft = false
+++

## Current Research Trends in Robot Grasping and Bin Picking {#alonso_current_2019}

### [Robot Grasping]({{< relref "robot_grasping" >}}) {#robot-grasping--robot-grasping-dot-md}

### Traditional Bin-picking Approaches {#traditional-bin-picking-approaches}

Most algorithms rely on segmentation of RGB-D data. 3D object recognition is
done by matching 3D data to their known CAD models. [Interactive Closest Point]({{< relref "interactive_closest_point" >}})
can be used to calculate the alignment and best fitting of a cloud of points
with respect to a reference CAD model.

A fast voting scheme similar to the Generalized Hough Transform can be used improving the performance of [ICP]({{< relref "interactive_closest_point" >}}).

### Deep Learning Methodologies for Bin Picking {#deep-learning-methodologies-for-bin-picking}

Deep Learning approaches used RGB-D images as input, and are able to predict
grasp success and generalize to novel objects.

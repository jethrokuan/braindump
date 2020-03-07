+++
title = "Google Cartographer"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:26:17+08:00
draft = false
+++

## System Overview {#system-overview}

Google Cartographer provides a real-time solution for indoor mapping
in the form of a sensor-equipped backpack that generates 2D grid maps
with a \\(r = 5cm\\) resolution <a id="2f17dae383ca00706c908bf72f9b4e21" href="#googlecartographer">(Wolfgang Hess et al., 2016)</a>. It is built to
scale to large maps, where previous approaches face issues. For
example, particle filter SLAM ([Simultaneous Localization and Mapping
(SLAM)]({{< relref "slam" >}})) approaches become resource intensive as maps become large,
since each particle filter must maintain a representation of the full
system state in each particle.

Laser scans are inserted into a submap at the best estimated position,
which is assumed to be sufficiently accurate for short periods of
time. Scan matching happens against a recent submap, so it only
depends on recent scans, and the error of pose estimates in the world
accumulates.

To cope with this accumulation of error, _pose optimization_ is run
regularly. When a submap is finished (i.e. no new scans are added in),
it takes part in scan matching for loop closure. All finish submaps
and scans are automatically considered for loop closure. If they are
close enough based on current pose estimates, a scan matcher tries to
find the scan in the submap, and if a good match is found within the
currently estimated pose, it is added as a loop closing constraint to
the optimization problem.

{{< figure src="/ox-hugo/high_level_system_overview2019-11-05_14-15-55_.png" >}}

# Bibliography
<a id="googlecartographer" target="_blank">Hess, W., Kohler, D., Rapp, H., & Andor, D., *Real-time loop closure in 2d lidar slam*, In , 2016 IEEE International Conference on Robotics and Automation (ICRA) (pp. 1271–1278) (2016). : .</a> [↩](#2f17dae383ca00706c908bf72f9b4e21)


## Backlinks {#backlinks}

-   [Robotics]({{< relref "robotics" >}})

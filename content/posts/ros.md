+++
title = "Robot Operating System (ROS)"
author = ["Jethro Kuan"]
lastmod = 2019-10-16T16:26:12+08:00
draft = false
math = true
+++

## Introduction to ROS {#introduction-to-ros}


### What is ROS? <a id="b049e1028daa027cae7888fe4de0456c" href="#nilil_ros_introd_ros_wiki" title="@misc{nilil_ros_introd_ros_wiki,
  author =       {nil},
  howpublished = {http://wiki.ros.org/ROS/Introduction},
  note =         {Online; accessed 15 October 2019},
  title =        {ROS/Introduction - ROS Wiki},
  year =         {nil},
}">@misc{nilil_ros_introd_ros_wiki,
  author =       {nil},
  howpublished = {http://wiki.ros.org/ROS/Introduction},
  note =         {Online; accessed 15 October 2019},
  title =        {ROS/Introduction - ROS Wiki},
  year =         {nil},
}</a> {#what-is-ros-a-id-b049e1028daa027cae7888fe4de0456c-href-nilil-ros-introd-ros-wiki-title-misc-nilil-ros-introd-ros-wiki-author-nil-howpublished-http-wiki-dot-ros-dot-org-ros-introduction-note-online-accessed-15-october-2019-title-ros-introduction-ros-wiki-year-nil-misc-nilil-ros-introd-ros-wiki-author-nil-howpublished-http-wiki-dot-ros-dot-org-ros-introduction-note-online-accessed-15-october-2019-title-ros-introduction-ros-wiki-year-nil-a}

-    Left     :B_column:

    -   Meta-operating system, providing low level services:
        -   process communication over a network
        -   device control
        -   hardware abstraction
    -   Distributed framework of processes

-    Right     :B_column:

    {{< figure src="/ox-hugo/ros-logo_2019-10-15_16-56-35.jpg" >}}


### Why use ROS? {#why-use-ros}

-   "Lightweight" framework that speeds up large-scale robotic
    development
-   Many libraries developed on top of this framework that can be
    reused:
    -   Physics simulation ([Gazebo](http://gazebosim.org/))
    -   Movement + Navigation ([ROS navigation](http://wiki.ros.org/navigation))


### ROS Concepts {#ros-concepts}

-    Computational Graph

    -   All computation is organized as a peer-to-peer network of communicating
        processes.

-    Nodes

    -   Processes that perform any form of computation.
    -   Nodes can communicate with one another.
    -   Example of nodes:
        -   Publish sensor readings
        -   Receiving teleop commands and running them
    -   Written with ROS client libraries ([rospy](http://wiki.ros.org/rospy), [roscpp](http://wiki.ros.org/roscpp))

-    Master (Primary) Node

    -   Provides name registration, node lookup to all nodes in the
        computational graph.
    -   Enables communication between nodes.

-    Parameter Server

    -   "Distributed" key-value store: all nodes can access data stored in
        these keys.

-    Topics

    -   Nodes communicating via the publish-subscribe semantics do so by
        publishing and subscribing to topics.
    -   Every topic has a name, e.g. `/sensors/temp1`
    -   No access permissions

-    Services

    -   Request-response semantics (think Web servers)
    -   Requests are blocking


### Example Computational Graph {#example-computational-graph}

{{< figure src="/ox-hugo/newspirit.png" >}}


## Getting Started With ROS {#getting-started-with-ros}


### ROS Environment Setup {#ros-environment-setup}

Here I assume you have the ROS environment set up. If not, see [the
appendix](#ros-installation).


### Creating a ROS Workspace {#creating-a-ros-workspace}

Catkin is ROS' package manager, built on top of CMake.

```bash
mkdir -p ~/catkin_ws/src        # Create the directories
cd ~/catkin_ws/                 # Change to the directory
catkin_make                     # Initial setup
```


### Exploring ROS bash commands [^fn:1] {#exploring-ros-bash-commands}

-    rospack

    `rospack find` locates ROS packages.

    ```bash
    rospack find roscpp # /opt/ros/melodic/share/roscpp
    ```

-    roscd

    roscd changes you to the directory of the ros package.

    ```bash
    roscd roscpp
    pwd # /opt/ros/melodic/share/roscpp
    ```


### Creating a ROS package {#creating-a-ros-package}

We use the convenience script `catkin_create_pkg` to instantiate our package.

```bash
cd ~/catkin_ws/src
catkin_create_pkg workshop std_msgs rospy roscpp
# Created file workshop/CMakeLists.txt
# Created file workshop/package.xml
# Created folder workshop/include/workshop
# Created folder workshop/src
# Successfully created files in /home/jethro/catkin_ws/src/workshop. Please adjust the values in package.xml.
```


### What's in a ROS package? {#what-s-in-a-ros-package}

```text
workshop
    CMakeLists.txt          # Build instructions
    include                 # For cpp deps, if any
       workshop
    package.xml             # Details about the package
    src                     # Contains source code
```


### Starting ROS {#starting-ros}

We initialize the ROS master node with `roscore`.

```bash
roscore

# ...
# process[master]: started with pid [16206]
# ROS_MASTER_URI=http://jethro:11311/

# setting /run_id to 05bf8c5e-efed-11e9-957b-382c4a4f3d31
# process[rosout-1]: started with pid [16217]

```

To kill it, press `Ctrl-C` in the same terminal.


### ROS Nodes {#ros-nodes}

-    rosnode

    rosnode let's us inspect available nodes:

    ```bash
    rosnode list                    # /rosout
    rosnode info /rosout
    ```

    What happens if master is not running?

    ```bash
    rosnode list               # ERROR: Unable to communicate with master!
    ```

-    Running a ROS node

    A ROS package may contain many ROS nodes.

    ```bash
    rosrun turtlesim <TAB>
    # draw_square        mimic              turtlesim_node     turtle_teleop_key
    ```

    ```bash
    rosrun turtlesim turtlesim_node
    # [ INFO] [1571214245.786246078]: Starting turtlesim with node name /turtlesim
    # [ INFO] [1571214245.790986159]: Spawning turtle [turtle1] at x=[5.544445], y=[5.544445], theta=[0.000000]
    ```

    Exercise: reinspect the node list.


## Appendix {#appendix}


### ROS Installation {#ros-installation}

-    Ubuntu

    Follow the instructions on ROS Wiki. <a id="74cf41bb1b0292dffcecca4fe9f40ef7" href="#nilil_instal_ubunt_ros_wiki" title="@misc{nilil_instal_ubunt_ros_wiki,
      author =       {nil},
      howpublished = {http://wiki.ros.org/melodic/Installation/Ubuntu},
      note =         {Online; accessed 16 October 2019},
      title =        {melodic/Installation/Ubuntu - ROS Wiki},
      year =         {nil},
    }">@misc{nilil_instal_ubunt_ros_wiki,
      author =       {nil},
      howpublished = {http://wiki.ros.org/melodic/Installation/Ubuntu},
      note =         {Online; accessed 16 October 2019},
      title =        {melodic/Installation/Ubuntu - ROS Wiki},
      year =         {nil},
    }</a>


## References {#references}

# Bibliography
<a id="nilil_ros_introd_ros_wiki"></a>nil,  (nil). *Ros/introduction - ros wiki*. Retrieved from [http://wiki.ros.org/ROS/Introduction](http://wiki.ros.org/ROS/Introduction). Online; accessed 15 October 2019. [↩](#b049e1028daa027cae7888fe4de0456c)

<a id="nilil_instal_ubunt_ros_wiki"></a>nil,  (nil). *Melodic/installation/ubuntu - ros wiki*. Retrieved from [http://wiki.ros.org/melodic/Installation/Ubuntu](http://wiki.ros.org/melodic/Installation/Ubuntu). Online; accessed 16 October 2019. [↩](#74cf41bb1b0292dffcecca4fe9f40ef7)

[^fn:1]: Almost all bash commands have tab completion!

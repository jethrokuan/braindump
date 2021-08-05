+++
title = "zhu_ev-flownet_2018: EV-FlowNet: self-supervised optical flow estimation for event-based cameras"
author = ["Jethro Kuan"]
draft = false
+++

## EV-FlowNet: self-supervised optical flow estimation for event-based cameras {#zhu_ev-flownet_2018}


### Event data is well-suited for Optical Flow Estimation {#event-data-is-well-suited-for-optical-flow-estimation}

By directly measuring the precise time at which the pixel changes, the event stream encodes fine-grained motion information. For example, optical flow can be estimated from a local window around each event in a linear fashion.


### Key Ideas {#key-ideas}

The authors propose a novel representation of event data, as an image with
channels representing the number of events, and the latest timestamp at each
polarity at each pixel. This preserves spatial relationships between events,
while maintaining the most recent temporal information at each pixel, and
providing a fixed number of channels for any event stream.

They also introduced a [Self-supervised Learning]({{<relref "self_supervised_learning.md#" >}}) method, using a photometric loss
as a supervisory signal, without supervision from ground-truth flow.


### Event Representation {#event-representation}

The event stream is represented as a 4 channel image:

1.  Number of positive polarity events
2.  Number of negative polarity events
3.  Timestamp of most recent positive event
4.  Timestamp of most negative event

This is similar to "Event-based Time Surfaces" ([Lagorce et al., n.d.](#org034dfbb)) and "Timestamp Images" ([Park et al., n.d.](#orgc2a76f8))


## Bibliography {#bibliography}

<a id="org034dfbb"></a>Lagorce, Xavier, Garrick Orchard, Francesco Galluppi, Bertram E. Shi, and Ryad B. Benosman. n.d. “HOTS: A Hierarchy of Event-Based Time-Surfaces for Pattern Recognition” 39 (7):1346–59. <https://doi.org/10.1109/TPAMI.2016.2574707>.

<a id="orgc2a76f8"></a>Park, Paul K. J., Baek Hwan Cho, Jin Man Park, Kyoobin Lee, Ha Young Kim, Hyo Ah Kang, Hyun Goo Lee, et al. n.d. “Performance Improvement of Deep Learning Based Gesture Recognition Using Spatiotemporal Demosaicing Technique.” In _2016 IEEE International Conference on Image Processing (ICIP)_, 1624–28. <https://doi.org/10.1109/ICIP.2016.7532633>.
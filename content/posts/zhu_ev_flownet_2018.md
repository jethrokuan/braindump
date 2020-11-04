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

They also introduced a [Self-supervised Learning]({{<relref "self_supervised_learning.md" >}}) method, using a photometric loss
as a supervisory signal, without supervision from ground-truth flow.

### Event Representation {#event-representation}

The event stream is represented as a 4 channel image:

1.  Number of positive polarity events
2.  Number of negative polarity events
3.  Timestamp of most recent positive event
4.  Timestamp of most negative event

This is similar to "Event-based Time Surfaces" (NO_ITEM_DATA:lagorce_hots_2017) and "Timestamp Images" (NO_ITEM_DATA:park_performance_2016)

## Bibliography {#bibliography}

NO_ITEM_DATA:lagorce_hots_2017

NO_ITEM_DATA:park_performance_2016

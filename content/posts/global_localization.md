+++
title = "Global Localization"
author = ["Jethro Kuan"]
lastmod = 2019-11-29T00:21:12+08:00
draft = false
math = true
+++

Localization is the problem of estimating the robots coordinates in an
external reference frame from sensor data, using a map of the
environment.

The robot's momentary estimate (belief) is represented by a
probability density function over the space of all locations. A
uniform distribution as prior represents maximal uncertainty.

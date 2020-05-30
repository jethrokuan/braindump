+++
title = "Building a PC"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:09:31+08:00
slug = "building_a_pc"
draft = false
+++

## What's the difference between SYS_FAN and PUMP_FAN sockets? {#what-s-the-difference-between-sys-fan-and-pump-fan-sockets}

Pump fans normally run at 100% all the time. Sys fans are either
constant or can be set to scale with overall system temperature.

4 pin fan headers work through pulse width modulation (PWM) whereby
the controller is alternating very quickly between 0% voltage and 100%
voltage (I think it's 12 volt max, but I'm not sure so I'm using
percentages) to give the illusion of a voltage between the two. It
changes the duration of the pulses (hence pulse width) in order to
tend more towards full or zero voltage. I.e. 1 part zero and three
parts full voltage would come across as 75% voltage.

3 pin fan headers actually change the voltage itself between zero and
full voltage (9 volts for 75%).

The reason 4 pin is generally considered better is that the fan motors
are spec'd to work at a single voltage (12 volt) and so supplying with
a smaller voltage via a 3 pin doesn't have them operating the best
they can. Additionally, most motors have a minimum voltage just to
start spinning (edit, think static friction because that's basically
what it is), so you lose a lot of the low end fan speeds. With a 4 pin
header, the fan can just get a short burst of full voltage to spin at
low speeds within spec of the motor.

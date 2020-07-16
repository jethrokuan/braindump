+++
title = "GDC Vault - Exploring the Tech and Design of 'Noita'"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:20+08:00
draft = false
+++

speaker
: [Petri Purho]({{< relref "petri_purho" >}})

company
: [Nolla Games]({{< relref "nolla_games" >}})

tags
: [Game Design]({{< relref "game_design" >}})

Noita uses a very simple falling sand simulation algorithm, liquids and gases are implemented similarly.

Rigid bodies use a marching square algorithm.

How to simulate all pixels in a big world? Multi-threading! The world is divided into \\(64 \times 64\\) chunks. Each chunk keeps a dirty rectangle, containing all the pixels that need to be simulated.

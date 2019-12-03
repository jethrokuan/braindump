+++
title = "Playing Atari with Deep RL"
author = ["Jethro Kuan"]
lastmod = 2019-12-03T18:20:48+08:00
draft = false
math = true
+++

## Preprocessing Steps {#preprocessing-steps}

1.  Obtain raw pixels of size \\(210 \times 160\\)
2.  Grayscale and downsample to \\(110 \times 84\\)
3.  Crop representative \\(84 \times 84\\) region
4.  Stack the last 4 frames in history to form the \\(84 \times 84 \times
       4\\) input


## Training Method {#training-method}

DQN with Experience Replay

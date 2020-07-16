+++
title = "Variational Autoencoders"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:57:05+08:00
draft = false
+++

## Links {#links}

- [matthewvowels1/Awesome-VAEs](https://github.com/matthewvowels1/Awesome-VAEs)

## Variational Auto-encoder noise as encouraging code vectors to be far apart {#variational-auto-encoder-noise-as-encouraging-code-vectors-to-be-far-apart}

The VAE noise causes data points in the Z-space to be fuzzy, and may cause overlap. To minimize reconstruction error, the code vectors want to move away from each other. This doesn't help!

So additional constraints are added to the system:

- Minimize square distances of balls to origin
- Make centre of mass zero
- Make size of balls close to 1 in each dimension

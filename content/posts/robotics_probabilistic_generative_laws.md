+++
title = "Robotics Probabilistic Generative Laws"
author = ["Jethro Kuan"]
lastmod = 2019-11-29T15:09:09+08:00
tags = ["robotics"]
draft = false
math = true
+++

## Notation {#notation}

\\(x\_t\\)
: world state at time \\(t\\)

\\(z\_t\\)
: measurement data at time \\(t\\) (e.g. camera images)

\\(u\_t\\)
: control data (change of state in the environment) at time
    \\(t\\)


## State Evolution {#state-evolution}

\begin{equation}
  p(x\_t | x\_{0:t-1} z\_{1:t-1}, u\_{1:t})
\end{equation}


## State Transition Probability {#state-transition-probability}

\begin{equation}
  p(x\_t | x\_{0:t-1} z\_{1:t-1}, u\_{1:t}) = p ( x\_t | x\_{t-1}, u\_t)
\end{equation}

The world state at the previous time-step is a sufficient summary of
all that happened in previous time-steps.


## Measurement Probability {#measurement-probability}

\begin{equation}
  p(z\_t | x\_{0:t}, z\_{1:t-1}, u\_{1:t}) = p(z\_t | x\_t)
\end{equation}

The measurement at time-step \\(t\\) is often just a noisy projection of
the world state at time-step \\(t\\).

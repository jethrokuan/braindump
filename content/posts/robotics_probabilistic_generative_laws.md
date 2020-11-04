+++
title = "Robotics Probabilistic Generative Laws"
author = ["Jethro Kuan"]
tags = ["robotics"]
draft = false
+++

## Notation {#notation}

\\(x_t\\)
: world state at time \\(t\\)

\\(z_t\\)
: measurement data at time \\(t\\) (e.g. camera images)

\\(u_t\\)
: control data (change of state in the environment) at time
\\(t\\)

## State Evolution {#state-evolution}

\begin{equation}
p(x_t | x\_{0:t-1} z\_{1:t-1}, u\_{1:t})
\end{equation}

## State Transition Probability {#state-transition-probability}

\begin{equation}
p(x_t | x\_{0:t-1} z\_{1:t-1}, u\_{1:t}) = p ( x_t | x\_{t-1}, u_t)
\end{equation}

The world state at the previous time-step is a sufficient summary of
all that happened in previous time-steps.

## Measurement Probability {#measurement-probability}

\begin{equation}
p(z_t | x\_{0:t}, z\_{1:t-1}, u\_{1:t}) = p(z_t | x_t)
\end{equation}

The measurement at time-step \\(t\\) is often just a noisy projection of
the world state at time-step \\(t\\).

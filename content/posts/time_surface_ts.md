+++
title = "Time Surface"
author = ["Jethro Kuan"]
slug = "time_surface_ts"
draft = false
+++

Defined in (NO_ITEM_DATA:lagorce_hots_2017)

Say we have a stream of visual events:

\begin{equation}
e v\_{i}=\left[\mathbf{x}\_{\mathbf{i}}, t\_{i}, p\_{i}\right]^{T}, \quad i \in \mathbb{N}
\end{equation}

where \\(ev\_{i}\\) is the ith event, and consists of a location \\(\mathbf{x}\_{\mathbf{i}}\\), time \\(t\_{i}\\) and polarity \\(p\_{i} \in \\{-1, 1\\}\\).

Time surface \\(S\_{i}\\) of event \\(ev\_{i}\\) keeps track of the activity surrounding the spatial location \\(\mathbf{x}\_{\mathbf{i}}\\).

We define the time-context \mathcal{T}<sub>i</sub>(\mathbf{u}, p) around an incoming event \\(ev\_{i}\\) as the array of most recent event times at \\(t\_{i}\\) for the pixels in the \\((2R+1) \times (2R+1)\\) square neighbourhood centered at \\(\mathbf{x}\_{\mathbf{i}}\\) as:

\begin{equation}
\mathcal{T}\_{i}(\mathbf{u}, p)=\max \_{i \leq i}\left\\{t\_{j} \mid \mathbf{x}\_{\mathbf{j}}=\left(\mathbf{x}\_{\mathbf{i}}+\mathbf{u}\right), p\_{j}=p\right\\}
\end{equation}

where \\(u\_{x,y} \in \\{-R, \dots, R\\}\\). Then \\(S\_{i}(\mathbf{u}, p)\\) is the obtained by applying an exponential decay kernel with time constant \\(\tau\\) on \\(\mathcal{T}\\):

\begin{equation}
\mathcal{S}\_{i}(\mathbf{u}, p)=e^{-\left(t\_{i}-\mathcal{T}\_{i}(\mathbf{u}, p)\right) / \tau}
\end{equation}

The time surface provides dynamic spatiotemporal context around an event, and the exponential decay expands the activity of passed events and provides information about the history of the activity in the neighbourhood.

## Bibliography {#bibliography}

NO_ITEM_DATA:lagorce_hots_2017

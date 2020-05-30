+++
title = "Temporal Difference Learning"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:09:14+08:00
draft = false
+++

Observe samples \\(\left(s_t, a_t, r_t, s\_{t+1} \right)\\). If value
estimates are accurate, the following must hold:

\begin{equation}
V(s_t) = r_t + \gamma V(s\_{t+1})
\end{equation}

If not, there is a TD error:

\begin{equation}
\gamma = r_t + \gamma V(s\_{t+1}) - V(s_t)
\end{equation}

To learn better estimates - minimize $&gamma; $ TD(0):

\begin{equation}
V(s) \leftarrow V(s) + \alpha \left( r_t + \gamma V(s\_{t+1}) - V(s_t) \right)
\end{equation}

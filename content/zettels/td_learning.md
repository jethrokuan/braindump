+++
title = "Temporal Difference Learning"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:42:45+08:00
draft = false
+++

Observe samples \\(\left(s\_t, a\_t, r\_t, s\_{t+1} \right)\\). If value
estimates are accurate, the following must hold:

\begin{equation}
  V(s\_t) = r\_t + \gamma V(s\_{t+1})
\end{equation}

If not, there is a TD error:

\begin{equation}
  \gamma = r\_t  + \gamma V(s\_{t+1}) - V(s\_t)
\end{equation}

To learn better estimates - minimize $&gamma; $ TD(0):

\begin{equation}
  V(s) \leftarrow V(s) + \alpha \left( r\_t + \gamma V(s\_{t+1}) - V(s\_t) \right)
\end{equation}

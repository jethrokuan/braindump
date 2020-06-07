+++
title = "LU Decomposition"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:26:40+08:00
draft = false
+++

The key problem of [Linear Algebra]({{< relref "linear_algebra" >}}) is solving the equation \\(Ax=b\\). We know that
with Gaussian elimination, we can decompose \\(A = LU\\), where \\(L\\) is a
lower-triangular matrix and \\(U\\) is an upper triangular matrix. An example speaks
a thousand words:

\begin{equation}
A x=\left[\begin{array}{ccc}{2} & {1} & {1} \\ {4} & {-6} & {0} \\ {-2} & {7} & {2}\end{array}\right]\left[\begin{array}{l}{u} \\ {v} \\ {w}\end{array}\right]=\left[\begin{array}{c}{5} \\ {-2} \\ {9}\end{array}\right]=b
\end{equation}

We have that:

\begin{equation}
U x=\left[\begin{array}{ccc}{2} & {1} & {1} \\ {0} & {-8} & {-2} \\ {0} & {0} & {1}\end{array}\right]\left[\begin{array}{l}{u} \\ {v} \\ {w}\end{array}\right]=\left[\begin{array}{c}{5} \\ {-12} \\ {2}\end{array}\right]=c
\end{equation}

And the process from getting from A to U is \\(GFEA = U\\):

\begin{equation}
G F E=\left[\begin{array}{ccc}
{1} & {} & {} \\\\\\
{} & {1} & {} \\\\\\
{} & {1}& {1}
\end{array}\right]
\left[\begin{array}{ccc}
{1} & {} & {} \\\\\\
{} & {1} & {} \\\\\\
{1} & {} & {1}
\end{array}\right]
\left[\begin{array}{ccc}
{1} & {} & {1} \\\\\\
{-2} & {1} & {} \\\\\\
{} & {} & {1}\end{array}\right]
=\left[\begin{array}{ccc}
{1} & {} & {} \\\\\\
{-2} & {1} & {} \\\\\\
{-1} & {1} & {1}
\end{array}\right]
\end{equation}

We have that \\(E^{-1} F^{-1} G^{-1} U= LU = A\\):

\begin{equation}
E^{-1} F^{-1} G^{-1}=\left[
\begin{array}{ccc}
{1} & {} & {}\\\\\\
{2} & {1} & {} \\\\\\
{} & {} & {1}
\end{array}\right]
\left[\begin{array}{ccc}
{1} & {} & {} \\ {} & {1} & {} \\ {-1} & {} & {1}
\end{array}\right]
\left[\begin{array}{ccc}
{1} & {} & {} \\\\\\
{} & {1} & {} \\\\\\
{} & {-1} & {1}\end{array}\right]=
\left[\begin{array}{ccc}{1} & {} & {} \\ {2} & {1} & {} \\ {-1} & {-1} & {1}\end{array}\right]=L
\end{equation}

The \\(A = LU\\) decomposition is exactly the matrix that solves \\(Ax=b\\).
Each triangular system requires \\(\frac{n^2}{2}\\) steps each, compared
to the \\(O(n^3)\\) system of factoring \\(A\\).

The triangular factorization can be written \\(A = LDU\\) where \\(L\\) and
\\(U\\) have 1s on the diagonal, and \\(D\\) is the diagonal matrix of pivots:

\begin{equation}
A=\left[\begin{array}{ll}{1} & {2} \\ {3} & {4}\end{array}\right]=\left[\begin{array}{ll}{1} & {1} \\ {3} & {1}\end{array}\right]\left[\begin{array}{rr}{1} & {2} \\ {} & {-2}\end{array}\right]=\left[\begin{array}{ll}{1} \\ {3} & {1}\end{array}\right]\left[\begin{array}{ll}{1} & {} \\ {} & {-2}\end{array}\right]\left[\begin{array}{ll}{1} & {2} \\ {} & {1}\end{array}\right]=L D U
\end{equation}

This factorization is uniquely determined by \\(A\\).

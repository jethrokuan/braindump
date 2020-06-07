+++
title = "Linear Algebra"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:28:19+08:00
draft = false
+++

### Backlinks {#backlinks}

- [LU Decomposition]({{< relref "lu_decomposition" >}})
- [Computer Vision]({{< relref "computer_vision" >}})

## Definitions {#definitions}

A matrix of dimensions M-by-N looks like:

\begin{equation}
A = \begin{bmatrix}
a\_{11} & a\_{12} & \dots & a\_{1N} \\\\\\
a\_{21} & a\_{22} & \dots & a\_{2N} \\\\\\
\vdots & \vdots & \vdots & \vdots \\\\\\
a\_{M1} & a\_{M2} & \dots & a\_{MN}
\end{bmatrix}
\end{equation}

Its transpose flips the dimensions. In the below example transposing a
N-by-1 matrix makes it a 1-by-N matrix.

\begin{equation}
a^T= \left[ a\_1, a\_2, \dots, a\_N \right]
\end{equation}

The magnitude of a vector is given by \\(\left| a \right| = \sqrt{a_1^2 +
a_2^2 + \dots + a_n^2}\\).

## Linear Independence {#linear-independence}

A set of vectors \\(\mathbf{x}\\) is linearly dependent if there exist a set of
scalars \\(\mathbf{\alpha}\\), not all zero, such that \\(\sum\_{i=1}^m \alpha_i x_i = 0\\).
If the only way to satisfy the equation is to have \\(\alpha_i = 0 \forall i\\), then
the set of vectors \\(\mathbf{x}\\) is linearly independent.

## Span {#span}

The "span" of \\(\hat{v}\\) and \\(\hat{w}\\) is the set of all their linear
combinations:

\begin{equation}
a \hat{v} + b \hat{w}
\end{equation}

## Basis {#basis}

The basis of a vector space is a set of linearly independent vectors
that span the full space.

If \\(\mathbf{v}\\) is the basis set, then any N-by-1 vector \\(x\\) can be
written as \\(x = \sum^n\_{i=1}c_i v_i\\) for some scalar \\(c_i\\).

## Special Matrices {#special-matrices}

diagonal matrix
: a matrix with all off-diagonal entries equal to 0.

identity matrix
: A diagonal matrix with diagonal entries equal to 1.

symmetric matrix
: \\(A = A^T\\)

skew symmetric matrix
: \\(A = -A^T\\)

## Matrix properties {#matrix-properties}

- \\((AB)^-1 = B^-1 A^{-1}\\)
- \\((AB)^T = B^T A^T\\)
- \\((A^{-1})^T = (A^T)^{-1}\\)
- \\(A^{-1}A = I\\)
- \\((AB)C = A(BC)\\)
- \\(A(B+C) = AB + AC\\)
- \\((B+C)D = BD + CD\\)

## Solutions to linear systems {#solutions-to-linear-systems}

Given the matrix \\(A\\) and vector \\(b\\), the problem \\(Ax=b\\) has a solution
iff the vector \\(b\\) can be expressed as a linear combination of the
columns of \\(A\\). If \\(A\\) is a square matrix and is invertible, then the
solution is \\(x = A^{-1}b\\).

If \\(A\\) is a rectangular matrix of size M-by-N, and if \\(A^T A\\) is
invertible (square and full rank), then the linear least squares
solution to \\(x\\) is given by \\(x = (A^T A)^{-1} A^T b\\).

## Matrices as Linear Transformations {#matrices-as-linear-transformations}

A transformation is linear if it fulfills two properties:

1.  All lines remain lines (they don't get curved)
2.  The origin is fixed.

Under a linear transformation, grid lines remain parallel and evenly
spaced. This property allows us to compute the transformed vector,
only by recording how the basis vectors are transformed.

{{< figure src="/ox-hugo/screenshot_2018-08-25_14-32-57.png" >}}

## Matrix Multiplication as Composition {#matrix-multiplication-as-composition}

Often, we want to describe the effects of multiple linear
transformations composed together, for example, a rotation, followed
by a shear. The composition of linear transformations is also a linear
transformation, and can be described with a single matrix (see above).

{{< figure src="/ox-hugo/screenshot_2018-08-25_14-36-56.png" >}}

{{< figure src="/ox-hugo/screenshot_2018-08-25_14-41-53.png" >}}

Hence, we can think about matrix multiplication as computing where the
final basis vectors land.

## Determinant {#determinant}

The fact that linear transformations leave grid lines parallel and
evenly spaced, means that the area of each unit square is scaled by the
same amount.

The determinant of a transformation is the amount of scaling of area
of a unit square. If the determinant is negative, then the orientation
of the resulting grid space is reversed.

{{< figure src="/ox-hugo/screenshot_2018-08-25_15-28-49.png" >}}

In 3D space, the determinant is the volume of the parallelpiped.

\begin{equation}
det \left( \begin{bmatrix}
a & b & c \\\\\\
d & e & f \\\\\\
g & h & i \\\\\\
\end{bmatrix} \right) = a \cdot det \left( \begin{bmatrix}
e & f \\\\\\
h & i
\end{bmatrix} \right)

- b \cdot det \left( \begin{bmatrix}
  d & f \\\\\\
  g & i
  \end{bmatrix} \right)

* c \cdot det \left( \begin{bmatrix}
  d & e \\\\\\
  g & h
  \end{bmatrix} \right)
  \end{equation}

## Matrices for solving linear equations {#matrices-for-solving-linear-equations}

{{< figure src="/ox-hugo/screenshot_2018-08-25_15-40-10.png" >}}

Suppose we want to compute \\(\vec{x}\\) such that \\(A\vec{x} = \vec{v}\\).
Then we can compute the inverse of the matrix \\(A\\), which corresponds
to the inverse transformation. For example if \\(A\\) were to rotate the
grid space clockwise 90 degrees, then the inverse of \\(A\\) would be to
rotate the grid space anti-clockwise 90 degrees: \\(\vec{x} = A^{^{-1}}
\vec{v}\\).

Suppose the determinant of the transformation is 0. Then we know that
it does not have an inverse. However, solutions can still exist.

## Rank {#rank}

The rank is the number of dimensions of the output of the
transformation. It is easy to see that the maximum rank of the
transformation is the original dimensions of the matrix. Rank
corresponds to the maximal number of linearly independent columns of
\\(A\\).

- \\(r(AB) \le r(A)\\)
- \\(r(AB) \le r(B)\\)
- \\(r(AB) \le \text{min}(r(A), r(B))\\)

## Column Space {#column-space}

The column space of the matrix \\(A\\) is the set of all possible outputs of
\\(A \vec{v}\\). It is also the span of all the columns.

## Dot Product {#dot-product}

The dot product \\(\vec{w} \cdot \vec{v}\\) can be viewed as the
\\((\text{length of projected vector }\vec{x}) \cdot (\text{length of
}\vec{x})\\).

We can think of \\(1 \times 2\\) matrices as projection matrices, where the
first column indicates where \\(\hat{i}\\) lands, and the second column
indicates where \\(\hat{j}\\) lands. Suppose we have a vector \\(\hat{i}\\),
and we want to project it onto \\(\hat{\mu}\\). By symmetry, it's the same
value as when \\(\hat{\mu}\\) is projected onto \\(\hat{i}\\). However, this is
just the \\(x\\) coordinate value of \\(\hat{\mu}\\).

{{< figure src="/ox-hugo/screenshot_2018-08-25_16-03-15.png" >}}

Hence, \\(\hat{i}\\) and \\(\hat{j}\\) land at \\(\mu_x\\) and \\(\mu_y\\) respectively. We
can easily see the duality between matrix-vector product and dot
product here.

{{< figure src="/ox-hugo/screenshot_2018-08-25_16-05-08.png" >}}

\begin{equation}
a \cdot b = |a||b| \cos \theta
\end{equation}

sometimes, this is also notated as

\begin{equation}
\langle u, v \rangle = \sum\_{i=1}^{d}u_i v_i = u^T v
\end{equation}

## Cross Product {#cross-product}

The cross product of \\(\vec{v}\\) and \\(\vec{w}\\), denoted \\(\vec{v} \times
\vec{w}\\) is a vector. The vector has length equal to the area of a
parallelogram obtained by duplicating and shifting the two vectors.
The sign of the cross product is determined using the right-hand rule.
This vector is perpendicular to the parallelogram.

{{< figure src="/ox-hugo/screenshot_2018-08-25_16-29-46.png" >}}

{{< figure src="/ox-hugo/screenshot_2018-08-25_16-33-08.png" >}}

We want to find the dual vector \\(\hat{p}\\) that corresponds to the
cross product.

{{< figure src="/ox-hugo/screenshot_2018-08-25_16-39-00.png" >}}

## How to translate a matrix {#how-to-translate-a-matrix}

Suppose someone uses a different coordinate system (i.e. different
basis vectors), which we can represent with a matrix:

\begin{equation}
\begin{bmatrix}
2 & -1 \\\\\\
1 & 1
\end{bmatrix}
\end{equation}

Suppose then that we want to apply a linear transformation to a vector
in her coordinate system. In the case of a rotation 90 degrees
anti-clockwise, it would be represented in a matrix as:

\begin{equation}
\begin{bmatrix}
0 & -1 \\\\\\
1 & 0
\end{bmatrix}
\end{equation}

In the "default" basis vector coordinate system. What does this
transformation look like in the new coordinate system? Given some
vector \\(\hat{v}\\) in the other language. First, we translate the
vector into one in the default language:

\begin{equation}
\begin{bmatrix}
2 & -1 \\\\\\
1 & 1
\end{bmatrix}
\hat{v}
\end{equation}

Then, we apply the transformation to the vector in the default
language:

\begin{equation}
\begin{bmatrix}
0 & -1 \\\\\\
1 & 0
\end{bmatrix}
\begin{bmatrix}
2 & -1 \\\\\\
1 & 1
\end{bmatrix}
\hat{v}
\end{equation}

Then, we apply to the inverse of the change in basis matrix, to return
the vector to the other language:

\begin{equation}
\begin{bmatrix}
2 & -1 \\\\\\
1 & 1
\end{bmatrix}^{-1}
\begin{bmatrix}
0 & -1 \\\\\\
1 & 0
\end{bmatrix}
\begin{bmatrix}
2 & -1 \\\\\\
1 & 1
\end{bmatrix}
\hat{v}
\end{equation}

This form \\(A^{{-1}}MA\\) is frequently encountered when dealing with
eigenvectors and eigenvalues.

## Eigenvectors and eigenvalues {#eigenvectors-and-eigenvalues}

Consider the span of a particular vector, that is, the set of vectors
obtainable by applying a scaling constant to it. Some vectors remain
on their own span, even with linear transformations.

These vectors are called _eigenvectors_, and the value of the scaling
constant is called the _eigenvalue_. Mathematically, this is expressed
as:

\begin{equation}
A \hat{v} = \lambda \hat{v}
\end{equation}

Consider a 3D rotation. If we can find an eigenvector for this 3D
transformation, then we have found the axis of rotation.

\begin{equation}
\sum\_{i=1}^{n} \lambda_i = trace(A)
\end{equation}

\begin{equation}
\prod\_{i=1}^{n}\lambda_i = \lvert A \rvert
\end{equation}

Eigenvectors corresponding to different eigenvalues are linearly
independent.

Eigenvectors of a real symmetric matrix are orthogonal and real.

## Null Space {#null-space}

The null space of a matrix \\(A\\) consists of all vectors \\(x\\) such that
\\(Ax = 0\\). if \\(A\\) is rank-deficient, then there is a non-zero solution
for \\(x\\).

## Singular Value Decomposition {#singular-value-decomposition}

Given an input data matrix \\(A\\) consisting of \\(m\\) documents and \\(n\\)
terms, we can decompose it into 3 matrices.

\begin{equation}
A\_{[m \times n]} = U\_{[m \times r]} \Sigma\_{[r \times r]} V\_{[n
\times r]}^T
\end{equation}

\\(U\\) are left singular vectors of size \\(m \times r\\), which we can think of
as \\(m\\) documents and \\(r\\) concepts. \\(\Sigma\\) is a \\(r \times r\\) diagonal matrix,
representing the strength of each concept, where \\(r\\) is the rank of
the matrix \\(A\\). \\(V\\) stores the right singular vectors, consisting of
\\(n\\) terms and \\(r\\) concepts.

{{< figure src="/ox-hugo/screenshot_2018-08-25_17-26-42.png" >}}

It is always possible to decompose a real matrix \\(A\\) into \\(A = U \Sigma
V^T\\), where:

1.  \\(U\\), \\(\Sigma\\), and \\(V\\) are unique
2.  \\(U\\) and \\(V\\) are column orthonormal: \\(U^T U = I\\), \\(V^T V = I\\)
3.  \\(\Sigma\\) is diagonal, and entries are positive, sorted in decreasing
    order.

The entries on the diagonal of \\(\Sigma\\) are known as the singular values,
and they are the squareroots of the eigenvalues of both \\(AA^T\\) and \\(A^T
A\\). The number of non-zero singular values equals to the rank of \\(A\\).

SVD can be used to solve linear equations of the form \\(Ax = b\\), where
\\(A\\) is known, and \\(b\\) is the zero-vector. We can do a SVD of \\(A\\) and
write the solution for \\(x\\):

\begin{equation}
U \Sigma V^T x = 0
\end{equation}

If A is full-rank, then \\(x\\) must be the zero-vector. Else, \\(x\\) has a
non-zero solution equal to the linear combination of the last few rows
of \\(V^T\\) corresponding to zero singular values.

{{< figure src="/ox-hugo/screenshot_2018-11-18_17-32-26.png" >}}

## References {#references}

1.  [Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE%5Fab)
2.  [Lecture 47 - Singular Value Decomposition | Stanford University](https://www.youtube.com/watch?v=P5mlg91as1c)
3.  [Immersive Linear Algebra](http://immersivemath.com/ila)

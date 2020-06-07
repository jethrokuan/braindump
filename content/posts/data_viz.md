+++
title = "Data Visualization"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:26:23+08:00
draft = false
+++

## References {#references}

- [Course website](http://www.cad.zju.edu.cn/home/vis-summer-school-2018/)
- [The Grammar of Graphics](https://book.douban.com/subject/10123863/)
- [A Layered Grammar Of Graphics](https://www.tandfonline.com/doi/abs/10.1198/jcgs.2009.07098)

## Program {#program}

{{< figure src="/ox-hugo/program2_2018-07-30_09-16-28.png" >}}

## Tools {#tools}

<http://antv.alipay.com>

## How do people use visualization? {#how-do-people-use-visualization}

- verification
- analysis
- exploration/discovery
- presentation/storytelling
- art/aesthetics

## Provenance {#provenance}

The steps the user take in the process of visual exploration/analysis
and the resulting visualizations and findings

We use provenance for:

- recall
- reuse and replicate
- Sharing
- Meta-analysis

Capture:

- datasets
- visualization and insight
- interaction

## Visual Interaction Techniques {#visual-interaction-techniques}

- Selecting/Highlighting/Brushing
- Using Lasso to update linked views
- sidebars for interactive filtering

## A well-designed interactive visualization interface should show the following {#a-well-designed-interactive-visualization-interface-should-show-the-following}

Visualize
: use effective visual encodings

Filter
: reduce visible data to relevant items

Select
: Retrieve details about interesting items

Navigate
: Pan, zoom, change view

<https://github.com/juba/scatterD3>
DeepTree
<http://www.visualcomplexity.com/vc/>

## Visual Design and Encoding - Westermann {#visual-design-and-encoding-westermann}

> The purpose of visualization is **insight**, not pictures. - Schneiderman

### Why use Interactivity? {#why-use-interactivity}

1.  Handle data complexity
2.  A single static view can show only one aspect of data

> Overview first, zoom and filter, then details-on-demand

### Why depend on vision? {#why-depend-on-vision}

1.  Visual system is high-bandwidth channel to brain

### Pre-attentive Processing {#pre-attentive-processing}

- Sequential vs. Parallel processing (popout)
- Combination of channels usually requires serial search
- Difficult if no unique visual property of the target

### Gestalt Principles {#gestalt-principles}

{{< figure src="/ox-hugo/th_2018-07-30_09-47-57.jpeg" >}}

Representations should be _correct_, _accurate_ and _truthful_.

To bring up a change, you must attend to it. (Change blindness)

### Visual Design {#visual-design}

A good visualization depends on:

1.  data types
2.  context of the data
3.  tasks to perform e.g. identify trends
4.  questions to answer
5.  messages to deliver

\begin{equation}
\text{Lie Factor} = \frac{\text{Size of effect shown in
graphic}}{\text{Size of effect in data}}
\end{equation}

Bad visualizations do not allow you to recover original data from the
visualization. Keep proportions and relative sizes.

maximize data-ink ratio

<!--list-separator-->

- Steven's Psychological Power Law

  <https://en.wikipedia.org/wiki/Stevens%27s%5Fpower%5Flaw>

  ![](/ox-hugo/th_2018-07-30_11-04-03.jpeg)
  Steven's psychophysical power law:

  \begin{equation}
  \text{Perceived sensation} = \text{Physical Intensity}^T
  \end{equation}

  Compensating for human's over/underestimation:

  {{< figure src="/ox-hugo/screenshot_2018-07-30_11-09-25.png" >}}

  Difficult to focus on one channel when multiple channels are
  presented. (Redudancy is bad!)

  Visual mapping - Separable vs integral visual channels

  - Color + position
  - Color + size
  - Width + height
  - Red + green\* Unfiled
  - <https://en.wikipedia.org/wiki/Tutte%5Fembedding>
  - Reingold-Tilford Algorithm
    - <https://stackoverflow.com/questions/13128750/what-are-the-step-to-the-reingold-tilford-algorithm-and-how-might-i-program-it>
  -

## Scientific Data Visualization - Stefan Bruckner {#scientific-data-visualization-stefan-bruckner}

### Types of Visualization {#types-of-visualization}

1.  Volume Visualization
    - Visualization of scalar fields
    - Important in medicine, biology, geoscience, engineering, ...
2.  Flow Visualization
    - Visualization of Vector Fields
    - Data typically from computational fluid dynamics (CFD)
      simulations

### Data Representation {#data-representation}

- Inherent Spatial Domain?
  - Yes: Do we recycle data space or not
  - No: Select which representation space
- What dimension is used for what?
  - Relationship data space <=> data attributes
  - Available display space (2D/3D)
  - Where is the focus?
  - Where can you abstract?

### Grids {#grids}

- Common way of storing datasets of field type (scalar, vector, tensor
  fields)
- Typically a high-performance, space-efficient representation
- Data is organized in **cells** which contain **samples**.
- Often used to define an interpolation function that defines data
  values between samples leading to a **continuous representation**.

- Which data orginazation is optimal?
- Where does the data come from?
- Is there an explicit neighbourhood relationship?
- How is the neighborhood information stored?
- How is navigation within the data possible?
- Calculations within the data possible?
- Are the data structured?

<!--list-separator-->

- Regular Grid

  - Orthogonal, equidistant grid
  - Sample distances not equal
  - Implicit neighborhood-relationship

<!--list-separator-->

- Rectilinear Grid

  - Orthogonal grid
  - Varying sample distances (\\(x[i], y[j]\\) given)
  - Allows you to place more samples in areas that are more important to
    you, not wasting storage in uninterested areas

<!--list-separator-->

- Curvilinear Grid

  - Non-orthogonal grid
  - Grid-points explicitly given (\\(x[i,j]\\))
  - Implicit neighborhood relationship

<!--list-separator-->

- Block-structured Grid

  - Combination of structured grids

<!--list-separator-->

- Unstructured Grid

  - Grid-points and connections arbitrary
  - Grid-points and neighborhood explicitly given
  - Cells: tetrahedra

<!--list-separator-->

- <span class="org-todo todo TODO">TODO</span> Other Grids SUMMARY OF GRID TYPES

  - Non-cartesian Coordinates

<!--list-separator-->

- Scattered Data

  - Grid-free data

  > Interesting to look at dimensionality of data space, vs dimensionality
  > of data attributes

<!--list-separator-->

- Data Enhancement

  - Filtering
  - Resampling
  - Data derivation
  - Data interpolation

<!--list-separator-->

- Data, Visualization, Interaction

  - Coupling varies considerably
    - Data Generation (data acquisition)
      - Mesaurement, simulation, modelling
      - Can take very long, and be very costly
    - Visualization (rest of visualization pipeline)
      - Data enhancement, viz mapping, rendering
      - Depending on implementation, fast/slow
    - Interaction
      - How can the user intervene, vary parameters

<!--list-separator-->

- Interactive Steering

  - Simulation and modelling generate data "on the fly"
  - Allows real-time insight of the data
  - User can interfere with the simulation, and change the design of the
    simulations

<!--list-separator-->

- Volume Visualization

  - the visualization of 3D scalar fields
  - Mapping 3D -> 2D
  - Projection (e.g. MIP), slicing, volume rendering
  - Volume data is 3Dx1D data
  - Scalar data, 3D data space, space filling
  - User wants to gain insight into 3D data, find structures of special
    interest + context

   <!--list-separator-->

  - Organization of Volume Data

    1.  Cartesian or Regular grid
        1.  CT/MR, often dx=dy<dz
        2.  Data enhancement: iso-stack-calculation
    2.  Curvilinear, unstructured grid

<!--list-separator-->

- Challenges

  - So much information, so few pixels
  - How to identify and enhance relevant features in the data.
  - Speed and interaction very important

<!--list-separator-->

- Voxels vs Cells

  - pixels = picture element, voxels = volume element
  - A voxel is a point sample in 3D, not necessarily interpolated
  - Cell is a cube primitive, and the corners are 8 voxels. Values in
    cell use interpolation.

<!--list-separator-->

- Linear Interpolation

  - Current GPUs automatically do trilinear interpolation of 3D textures

<!--list-separator-->

- Evaluating Quality of Reconstruction

  - Marshner-Lobb function is a common test signal to evaluate the
    quality of reconstruction filters
  - Signal has a high amount of energy near its Nyquist frequency

<!--list-separator-->

- Classification

  - Using data values, gradiant and curvature, segment data into
    multiple semantic regions
  - Often semi-automatic or fully manual
  - Automatic approximation: transfer functions
    - Simplest example of 1D transfer function: data value -> color

<!--list-separator-->

- Visualization Approaches

  Slicing
  : display of 2D cross sections

  Indirect Volume Rendering
  : Extraction of an intermediate representation

  Direct Volume Rendering
  : Direct display of representation

<!--list-separator-->

- <span class="org-todo todo TODO">TODO</span> Isosurface Similarity

<!--list-separator-->

- Visualization in the Spatial Domain

   <!--list-separator-->

  - Slicing

    - Reduce the dimensionality of 3D t o2D by showing a cross section
    - Usually without a transfer function
    - Orthogonal slicing often used to slice along anatomical planes
      in medical imagery
    - Oblique slicing has arbitrary slice orientation, often used in
      an multi-planar reformation (MPR) setup.
    - Curved slices often tailored towards specific applications,
      e.g. visualization of blood vessels.

   <!--list-separator-->

  - Direct Volume Rendering

    - Dense representation of underlying scalar field: transfer function
      defines visible structure.
    - Image order (ray casting) fast and easy to implement, and are well
      supported by current GPUs
    - Object order (splatting, texture slicing) also supported by older
      GPUs, but difficult to skip non-visible regions. Easy to skip...(?)
    - Nowadays: shading/classification after interpolation/resampling
    - post/pre-interpolative classification order

   <!--list-separator-->

  - Ray Tracing vs Ray Casting

    Ray tracing
    : method from image generation, usig ray-object
    intersection and tracing secondary rays.

    Ray casting
    : no objects, density values in 3D, only viewing rays.

   <!--list-separator-->

  - Shading

    lambertian reflection
    : light reflected equally in all directions

    specular reflection
    : light reflected more in one direction

    Make structures in volume data sets more realistic by applying an
    illumination model

    - Shade each sample in the volume like a surface: [Blinn-Phong
      illumination model](https://en.wikipedia.org/wiki/Blinn%25E2%2580%2593Phong%5Fshading%5Fmodel) commonly used.
    - Use normalized gradient vector as estimation for surface normal.

<!--list-separator-->

- Indirect Volume Rendering

  - Extract an intermediate representation from the volume (geometric
    surface), then use traditional rendering methods
  - Cuberille regards each xovel as a little cube, classify as either
    part of the object or not.

  {{< figure src="/ox-hugo/th_2018-07-31_11-00-07.jpeg" >}}

  [Marching Cubes](https://en.wikipedia.org/wiki/Marching%5Fcubes) is a standard method for the extraction of isosurfaces
  from volume data

### Flow Visualization {#flow-visualization}

- Airplane/ship/car design
- Weather simulation
- Medicine (blood flows etc.)
- Gaseous, liquid flow
- Flow models: Differential Equation Systems (ODEs)
- Common techniques for solving Navier-Stokes equations:
  1.  Lagrangian approach (particle-based)
      1.  Treat the fluid as discrete particles, and apply interaction
          forces.
      2.  Pros: momentum conservation/more intuitive, and fast, no
          linear equation solving
      3.  Cons: connectivity information/surface reconstruction
  2.  Eulerian approach
      1.  Discretize the domain using finite differences
      2.  Use the operator splitting technique to solve each term separately
      3.  Pros: derivative approximation, adaptive time step/solver
      4.  Cons: memory usage & speed, grid artifact/resolution limitation.

## Data Visualization of Text Data - Jaegul Choo {#data-visualization-of-text-data-jaegul-choo}

### Overview {#overview}

1.  Vector encoding techniques of text
    1.  Bag-of-words vectors and word embedding
2.  Basic text visualization techniques
    1.  Word cloud, wordle, word tree, phrase nets, ThemeRiver
3.  Topic Modeling
    1.  Non-negative matrix factorization
    2.  UTOPIAN and visual analytic systems
4.  Dimension reduction
    1.  Multidimensional scaling and tSNE
    2.  Interactive dimension reduction techniques and systems
5.  Interactive visualization of deep learning
    1.  Toolkits: Tensorboard, Embedding Projector, Visdom
    2.  Advanced visual analytics systems: CNNVis, LSTMVis, DeepEyes

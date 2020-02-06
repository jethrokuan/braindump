+++
title = "CMake"
author = ["Jethro Kuan"]
lastmod = 2020-02-06T12:39:53+08:00
draft = false
+++

tags
: [§c\_lang]({{< relref "c_lang" >}}), [§cplusplus]({{< relref "cplusplus" >}})


## Introduction {#introduction}

The start to end process according to CMake looks like this:

{{< figure src="/ox-hugo/screenshot_2019-01-18_02-45-29.png" >}}

CMake starts with a human-readable file called `CMakeLists.txt` that
defines what should be built and how, what tests to run and what
packages to create. This file is platform-independent.

Typically the project separates the source directory and the binary
directory. The source directory is kept tightly under version control.

In-source builds are arrangements where the source and build
directories are the same. Having build outputs intermixed with source
files leads to significant clutter. This makes working with version
control systems more difficult.

Hence, the preference is to have an out-of-source build arrangement.
The build directory will be called `build`.


## Generating Project Files {#generating-project-files}

Running CMake reads the `CMakeLists.txt` file, and creates project files
in the build directory. The developer selects the type of project file
to be created by choosing a particular project file generator.

{{< figure src="/ox-hugo/screenshot_2019-01-18_02-52-58.png" >}}


## Best Practices {#best-practices}

1.  [Avoid globbing for listing source files](https://stackoverflow.com/questions/1027247/is-it-better-to-specify-source-files-with-glob-or-each-file-individually-in-cmak)

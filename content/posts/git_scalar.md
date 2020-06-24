+++
title = "Git Scalar"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:58+08:00
slug = "git_scalar"
draft = false
+++

tags
: [Git]({{< relref "git" >}})

Git has trouble handling large repositories. This problem is resolved
using [VFS for Git]({{< relref "vfs_for_git" >}}). This is essentially a wrapper around GVFS,
replacing the `git` command.

## 1. Focusing on Files that Matter {#1-dot-focusing-on-files-that-matter}

`scalar clone` uses Git's sparse-checkout feature in cone mode,
cloning a subset of the Git repositories' files. Scalar uses Git's
updated index file format, which reduces the size of the Git index.
The Git index is a list of every tracked path at current HEAD.

With Scalar, the populated size is at most as large as the number of
files in tracked files.

Scalar also configures the Git repository to work better with modified
files using [Git's fsmonitor feature](https://git-scm.com/docs/githooks#%5Ffsmonitor%5Fwatchman). Without this, Git needs to scan
the entire working directory to find which paths were modified.

## 2. Reducing Object Transfer {#2-dot-reducing-object-transfer}

The [VFS for Git]({{< relref "vfs_for_git" >}}) protocol reduces object transfer.

## 3. Reducing Waiting for Expensive Operations {#3-dot-reducing-waiting-for-expensive-operations}

1.  Disable auto Git garbage collection by setting `gc.auto=0`, and run
    do incremental GC instead.
2.  Periodically run git fetch
3.  Write the commit graph using [the incremental format](https://github.com/git/git/blob/5b0ca878e008e82f91300091e793427205ce3544/Documentation/technical/commit-graph.txt#L139-L319)
4.  Cleanup loose objects
5.  Git multi-pack-files to efficiently pack and store Git objects. It
    does some sort of reference counting: unreferenced pack-files can
    be deleted.

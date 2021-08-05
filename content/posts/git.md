+++
title = "Git"
author = ["Jethro Kuan"]
draft = false
+++

## Links {#links}


### <span class="org-todo todo TODO">TODO</span> [Understanding Git Conceptually](https://www.sbf5.com/~cduan/technical/git/) {#understanding-git-conceptually}


### <span class="org-todo todo TODO">TODO</span> [GitHub - pluralsight/git-internals-pdf: PDF on Git Internals](https://github.com/pluralsight/git-internals-pdf) {#github-pluralsight-git-internals-pdf-pdf-on-git-internals}


## Git Internals {#git-internals}


### Content of .git folder {#content-of-dot-git-folder}

Git stores snapshots (exact content of the files) at the point of a commit.

```sh
ls .git
```

The content is stored in the objects sub-directory. There are 4 kinds
of objects:

blob
: used for storing the contents of a single file

tree
: contains references to other blobs or subtrees

commit
: contains reference to another tree object and some other
    information (author, committer etc.)

tag
: Another reference to a commit object


## Git Branching Models {#git-branching-models}

[A successful Git branching model » nvie.com](https://nvie.com/posts/a-successful-git-branching-model/)


## VFS for Git {#vfs-for-git}

VFS for Git is a virtualized filesystem used to bypass assumptions
about repository size, allowing Git repositories to scale up to large
repositories.

With GVFS, an initial clone downloads a set of pack-files containing
only commits and trees. These objects are sufficient for generating a
view of the working directory, and examining the commit history with
git log.

GVFS allows dynamically downloading objects as needed.
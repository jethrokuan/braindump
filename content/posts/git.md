+++
title = "Git"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:02:33+08:00
draft = false
+++

tags
: [Unix]({{< relref "unix" >}}), [Version Control]({{< relref "version_control" >}})

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

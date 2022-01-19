+++
title = "Building a Zettelkasten with Org-roam"
author = ["Jethro Kuan"]
tags = ["article"]
draft = false
+++

As promised, this is how I personally use Org-roam to maintain my Zettelkasten.
This is both a setup guide, as well as a stream of thought. (not quite sure
what's the best platform for a Q&amp;A yet).


## Background {#background}

Org-roam provides functionality on top of Org-mode that streamlines note-taking
and linking between notes. I use it primarily to help:

1.  "Organize" my notes
2.  Find or create notes (via `org-roam-node-find`)
3.  Link various notes together (via `org-roam-node-insert`)

Professionally I'm a Machine Learning Engineer at Abnormal Security. I try to
keep up with recent developments in tech, and occasionally read technical papers
relevant to my field or area of work. As a (serious) hobby I'm playing the
guitar, and I'm also trying to integrate portions of my Zettelkasten into my
music study.


## Basic Setup {#basic-setup}

As per Luhmann's original implementation, I have two slipboxes.

The first slipbox is the **reference slipbox**. It contains zettels that contain
information from various sources I consume (books, articles, papers etc.). Each
zettel points back to the original source.

The second slipbox, for the lack of a better name, is the **main slipbox**. It
contains my own ideas and concepts, extracted from the material I read. They
often point back to reference slipbox zettels.

Finally, I have an inbox file, where unprocessed ideas are captured.

```text
.
├── articles
├── daily
├── main
├── reference
└── biblio.bib
```

<div class="src-block-caption">
  <span class="src-block-number">Code Snippet 1</span>:
  My org-roam-directory structure. Each slipbox is contained in their own folder. My daily journal notes, and written articles are also in their own folder.
</div>

(Show directory structure)

Rationale:

-   It is important to maintain a strict distinction between what's an original
    thought and what's from an external source
-   It is also important to know where information from your zettels come from, so
    it is possible to attribute appropriately, and also to use it to dig deeper

I want to keep my Zettelkasten pristine (high signal to noise ratio). This is
why I don't use dailies: dailies often provide little value when reread, unlike
zettels that are kept high quality.


## Writing a Reference Zettel {#writing-a-reference-zettel}

I use Zotero with BetterBibTex. All my references are auto-exported into bib
file. Each reference zettel should have a ROAM_KEY corresponding to the
reference material. It is often desirable to also include specific locations
(e.g. page numbers) just in case.

Andy has a nice livestream on how he processes a review paper, that is worth
watching.


## Writing a Zettel {#writing-a-zettel}

Zettels are created using Org-roam's capture system. I have 3 capture templates:

Zettels begin as unrefined pieces of notes. These are marked as drafts, and
should be constantly reviewd and refined. Once I'm satisfied with a zettel, I
remomve the draft tag.


## Guiding Principles {#guiding-principles}


### Not Everything Needs To Be Done In Emacs {#not-everything-needs-to-be-done-in-emacs}

One common complaint about Org-roam is mobile support: it is non-trivial to get
Emacs up and running on mobile, and even then adding notes on the fly is not so
easy.

There is also a strong desire for Org-roam to develop a solid publishing
workflow. There are projects that are work-in-progress, but they all take
significant amount of setup. Zettelkastens are not meant for public consumption.
Notes should be written for yourself and yourself only. Published materials
should be a thoughtful composition of multiple zettels, with a healthy injection
of your own summaries.

My initial motivation for publishing my notes was twofold. First, then I'd
occasionally point friends to things I mention, but more often than not the
zettels I had written were gibberish to them, since they were written for me.
Second, I thought it'd be good to be able to review zettels on the go. I find
that this was generally suboptimal use of my time.

As an alternative, I am exploring using spaced repetition to deepen my
understanding of the zettels I have written.

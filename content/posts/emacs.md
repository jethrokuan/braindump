+++
title = "Emacs"
author = ["Jethro Kuan"]
lastmod = 2018-12-05T19:40:28+08:00
draft = false
math = true
+++

## Why Emacs? {#why-emacs}


### Flexibility {#flexibility}

Emacs Lisp makes it a joy to extend, attracting a large community of
lisp hackers. Case in point: Amazon's Customer Service application
Mailman was built in Emacs Lisp.

<https://sites.google.com/site/steveyegge2/tour-de-babel>


### Uniform Interface {#uniform-interface}

Everything is text, everything is in a buffer. Keyboard movements work
everywhere, no surprises.


### Emacs has everything you need {#emacs-has-everything-you-need}

-   Web Browser (eww)
-   IRC Client (erc/irc)
-   Email Client (mu4e/notmuch/gnus)
-   Emacs X Window Manager (exwm)
-   File Browser (dired)
-   doctor?


## How I use Emacs {#how-i-use-emacs}

-   [ ] emacsclient
-   [ ] Development workflow
    -   [ ] TRAMP (cte.comp.nus.edu.sg)
    -   [ ] Magit
    -   [ ] Wgrep
-   [ ] Living inside Emacs: Org-mode
    -   [ ] Getting Things Done
    -   [ ] Reading Email
    -   [ ] Keeping up with the news: RSS Feeds
    -   [ ] Reading Papers
    -   [ ] Writing School Notes


## Undo {#undo}

There is no redo. Add a non-editing command to undo the undo, eg.
\`C-g\`. In that way \`C-g C-\_\` performs a redo.

<http://stackoverflow.com/questions/3527142/how-do-you-redo-changes-after-undo-with-emacs>


## Deleting Windows ^M (CR) characters {#deleting-windows-m--cr--characters}

Simply run `M-x delete-trailing-whitespaces`


## Swiper {#swiper}

To enter thing-at-point into the mini-buffer, use `M-n`. This calls
`ivy-next-history-element`.


## Org-mode {#org-mode}


### Speed keys {#speed-keys}

<https://emacs.stackexchange.com/questions/33310/how-to-use-org-mode-speed-commands-speed-keys>


## Themes {#themes}

List of great low-contrast themes I've used:

-   [zenburn](https://github.com/bbatsov/zenburn-emacs)
-   [tao](https://github.com/11111000000/tao-theme-emacs)
-   [monotropic](https://github.com/caffo/monotropic-theme)
-   [apropospriate](https://github.com/waymondo/apropospriate-theme)
-   [sanity-inc-tomorrow](https://github.com/purcell/color-theme-sanityinc-tomorrow)
-   [doneburn](https://github.com/manuel-uberti/doneburn-theme)
-   [softstone](https://github.com/mswift42/soft-stone-theme)

+++
title = "Talks: Emacs Lisp Development Tips with John Wiegley"
author = ["Jethro Kuan"]
draft = false
+++

## Interactive debugging {#interactive-debugging}

-   In debug buffer: `e` to evaluate any lisp expression in stack-frame
-   use `(debug)` to enter debugger
-   `eldoc-mode` to show operation


## Profiling {#profiling}

-   `elp-instrument-function`
-   `elp-instrument-package`


## Speeding up Functions {#speeding-up-functions}

-   mutation in place:
    -   `nconc`
    -   `nreverse`
    -   `setcar`
    -   `setcdr`
+++
title = "PDF Nup"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Pdf Tools]({{<relref "pdf_tools.md#" >}})

This puts several pages of a PDF together. `2x1` is a particularly
common combination.

```bash
alias p2x1="pdfnup --nup 2x1 --landscape --suffix '2x1' --batch "
```
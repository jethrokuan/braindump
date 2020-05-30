+++
title = "PDF Nup"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:08:28+08:00
draft = false
+++

tags
: [Pdf Tools]({{< relref "pdf_tools" >}})

This puts several pages of a PDF together. `2x1` is a particularly
common combination.

```bash
alias p2x1="pdfnup --nup 2x1 --landscape --suffix '2x1' --batch "
```

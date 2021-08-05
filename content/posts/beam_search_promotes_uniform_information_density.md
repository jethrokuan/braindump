+++
title = "Beam Search Promotes Uniform Information Density"
author = ["Jethro Kuan"]
draft = false
+++

Using beam search for text generation shockingly produces text better than using
exact search, despite the high search error rate. Why is this so?

Beam search has an inductive bias that promotes uniform information density
(UID). This bias is paramount in producing text that humans prefer. There is
also a strong relationship between UID and metrics like BLEU.

The uniform information density hypothesis has roots in cognitive science, and
it states:

> Within the bounds defined by grammar, speakers prefer utterances that distribute
> information uniformly across the signal (information density). Where speakers
> have a choice between several variants to encode their message, they prefer the
> variant with more uniform information density (ceteris paribus)

That is, humans prefer sentences that distribution their information more
uniformly.

Beam search can then be formulated as regularized decoding. Their experiments
show that encouraging UID allieviates the text degradation that occurs when
using high beam widths.

(NO\_ITEM\_DATA:meisterIfBeamSearch2020)


## Bibliography {#bibliography}

NO\_ITEM\_DATA:meisterIfBeamSearch2020
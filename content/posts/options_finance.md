+++
title = "Options (Finance)"
author = ["Jethro Kuan"]
draft = false
+++

Options may be written on any kind of underlying assets, such as stocks, bonds,
commodities or [futures]({{<relref "futures_contract.md#" >}}). There are 2 basic types of options:

call options
: these give the holder the right to buy

put options
: these give the holder the right to sell the underlying asset in
    the future at a specified strike price

The writer of the option has the obligation to sell (call) or buy (put) the
asset. For European options, this right can only be exercised at the date of
maturity, but for American options the rights can be exercised at any time until
the date of maturity. Options are traded regularly on exchanges.

Because the holder has no obligation to exercise the right, while the writer
does, this asymmetry results in an intrinsic cost the holder has to pay the
writer.
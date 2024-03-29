+++
title = "BitTorrent"
author = ["Jethro Kuan"]
draft = false
+++

## What is BitTorrent? {#what-is-bittorrent}

When a file is made available using HTTP, all upload cost is placed on
the hosting machine. BitTorrent redistributes the cost of upload
to downloaders.

The BitTorrent protocol faces some issues:

1.  Simply figuring out which peers have what parts of the file and
    where they should be sent is difficult to do without incurring a
    huge overhead.
2.  Real deployments face large churn rates, with peers staying
    connected for only a few minutes.
3.  The strategy for allocating upload to users needs to be fair
    (proportional to download rate).


## How does BitTorrent work? {#how-does-bittorrent-work}


### Deployment {#deployment}

A static `.torrent` file is placed on a web server, containing
information about the file, its length, name, hashing information, and
the tracker.

A simple protocol layered on top of HTTP allows downloaders to send
information about what file is downloading, and the tracker will
respond with contact information for peers which are downloading the
same file. To make the file available, the downloader which happens to
have the complete file (the seed) must be started.

The tracker's primary responsibility is helping peers find each other.
The standard tracker algorithm is to return a random list of peers,
since random graphs have good robustness properties. Many peer
selection algorithms result in a power law graph, which can get
segmented after a small amount of churn.

In order to keep track of which peers have what, BitTorrent cuts files
into pieces of fixed size, typically a quarter megabyte. Each
downloader reports to all its peers what pieces it has. To verify data
integrity, the SHA1 hash of each piece is included in the `.torrent`
file.


### Pipelining {#pipelining}

When transferring data over TCP, like BitTorrent does, it is important
to always have several requests pending at once, to avoid a delay in
pieces being sent. BitTorrent facilitates this by breaking piecse
further into sub-pieces over the wire, typically several kilobytes in
size, and always keeping some number, typically five, requests
pipelined at once. Every time a sub-piece arrives a new request is
sent. This can reliably saturate most connections.


### Piece selection {#piece-selection}

Selecting pieces to download in good order is important for good
performance.

The _strict priority_ policy is that once a single sub-piece has been
requested, the remaining sub-pieces from that sub-piece should be
requested before any other piece.

The _rarest first_ policy suggests downloading pieces which fewest of
their own peers have first. When the downloading starts, the peer has
nothing to upload, so it's important to get a complete piece as
quickly as possible. The choice of the first piece is random, an this
is an exception to the rarest first policy, applying only to the first
piece a peer has downloaded.

Sometimes a piece will be requested from a peer with slow transfer
rates. To reduce delay in finishing a download, BitTorrent sends
requests for sub-pieces from all peers. Cancels are sent to peers for
sub-pieces have already arrived to reduce bandwidth wastage, but in
practice, this wastage is small.


### Choking Algorithms {#choking-algorithms}

BitTorrent does no central resource allocation. Peers are responsible
for maximizing their own download rate. The choking algorithm in
BitTorrent is not part of the wire protocol, but is necessary for good
performance. It should aim to:

-   utilize all available resources
-   provide reasonable download rates for everyone
-   be somewhat resistant to peers only downloading and not uploading

Pareto efficiency is the concept where no two counterparties can make
an exchange and both be happier. BitTorrent achieves pareto efficiency
by using a more fleshed out version of tit-for-tat. Peers reciprocate
uploading to peers which upload to them, with the goal of at any time
having several connections which are actively transferring in both
directions.

Each BitTorrent peer always chokes on a fixed number of peers (default
is four). This approach allows TCP's built-in congestion control to
reliably saturate upload capacity.

Decisions as to which peer to unchoke are based strictly on download
rate. The current implementation uses a rolling 20-second average. To
avoid rapidly choking and unchoking peers, BitTorrent peers
recalculate who they want to choke once every 10 seconds, and leave
the situation as s until the 10 second period is up. This period is
sufficient for TCP to ramp up transfers to full capacity.

The current protocol of simply uploading to peers which provide the
best download rate would suffer from having no method of discovering
if currently unused connections are better than the ones being used.
Optimistic unchoking unchokes a peer regardless of the current
download rate. Which peer to optimistically unchoke is rotated every
third rechoke period (30 seconds). This period is sufficient for the
upload to reach full capacity, for thte download to reciprocate, and
the download to get to full capacity.

Occasionally a BitTorrent peer will be choked by all peers which it
was formerly downloading from. In such cases it will usually continue
to get poor download rates, until an optimistic unchoke finds better
peers. To mitigate this problem, when over a minute goes sby without
getting a single piece from a particular peer, BitTorrent assumes it
is snubbed by that peer, and doesn't upload to it except as an
optimistic unchoke, which causes download rates to recover much more
quickly.

Once a peer is done downloading it no longer has useful
download rates to decide which peers to upload to The current
implementation then switches to preferring peres which it has better
upload rates to.

The current scaling bottleneck in the real world seems to be the
bandwidth overhead of the tracker.


## References {#references}

-   [Incentives Build Robustness in BitTorrent](http://bittorrent.org/bittorrentecon.pdf)
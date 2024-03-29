+++
title = "System Design"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Software Engineering]({{<relref "software_engineering.md#" >}}), [Coding Interview Cheatsheet]({{<relref "coding_interview_cheatsheet.md#" >}})


## Basics {#basics}

1.  SQL, noSQL
2.  Concurrency
    -   Threads, deadlock, starvation
    -   read/write locks
3.  Networking
    -   Routers/Switches
    -   TCP vs UDP
4.  File Systems
    -   OS, file system, database
    -   levels of caching in modern OS


## Terminologies {#terminologies}


### Replication {#replication}

Replication refers to frequently copying the data across multiple
machines. Post replication, multiple copies of the data exists across
machines. This might help in case one or more of the machines die due
to some failure.


### Consistency {#consistency}

Assuming you have a storage system which has more than one machine,
consistency implies that the data is same across the cluster, so you
can read or write to/from any node and get the same data. Eventual
consistency : Exactly what the name suggests. In a cluster, if
multiple machines store the same data, an eventual consistent model
implies that all machines will have the same data eventually. Its
possible that at a given instance, those machines have different
versions of the same data ( temporarily inconsistent ) but they will
eventually reach a state where they have the same data.


### Availability {#availability}

In the context of a database cluster, Availability refers to the
ability to always respond to queries ( read or write ) irrespective of
nodes going down.


### Partition Tolerance {#partition-tolerance}

In the context of a database cluster, cluster continues to function
even if there is a “partition” (communications break) between two
nodes (both nodes are up, but can’t communicate).


### Vertical scaling and Horizontal scaling {#vertical-scaling-and-horizontal-scaling}

In simple terms, to scale horizontally is adding more servers. To scale
vertically is to increase the resources of the server ( RAM, CPU,
storage, etc. ). Example: Lets say you own a restaurant which is now
exceeding its seating capacity. One way of accomodating more people (
scaling ) would be to add more and more chairs (scaling vertically).
However since the space is limited, you won’t be able to add more
chairs once the space is full. Another way of scaling would be to open
new branches of the restaurant ( horizontal scaling ). Source :
<http://stackoverflow.com/questions/5401992/what-does-scale-horizontally-and-scale-vertically-mean>


### Sharding {#sharding}

With most huge systems, data does not fit on a single machine. In such
cases, sharding refers to splitting the very large database into
smaller, faster and more manageable parts called data shards.


## CAP Theorem {#cap-theorem}

It is impossible to simultaneously guarantee the following:

1.  Consistency
2.  Availability
3.  Partition Tolerance


## Approaching System Design Questions {#approaching-system-design-questions}

1.  Feature Clarification (2 minutes)
2.  Estimations
    1.  Does the data fit in one machine/database?
    2.  Can the cache fit on one machine/database?
3.  Design Goals
    1.  Can data loss be tolerated?
4.  Skeleton of design
    1.  Discuss high-level components; go into deep dive only on request


## Caching {#caching}


### Types {#types}

1.  Write-through -  write to both cache and db at the same time,
    before confirming write completion
    -   Write latency is higher
    -   but re-reading writes and reads is fast
2.  Write-around - write to db, missing cache
    -   cache must fetch reads from db on first try
    -   higher read latency
3.  Write-back - I/O completion sent when data written to cache
    -   cache writes to db
    -   might lose data
    -   allieviated with replicates


### Implementing LRU caching {#implementing-lru-caching}

Hashtable + Doubly-linked list
Key -> Pointer to node in doubly linked list
Each time it is accessed, move node to head of doubly-linked list
Evicting keys:
If adding new item, and it is full, remove tail of list,


## SAS/SSD {#sas-ssd}

1.  used for I/O over SATA (7.5krpm)


## Implementing TinyURL {#implementing-tinyurl}


### Feature Clarification {#feature-clarification}

1.  Shorten a URL
2.  Expand a slug into a URL
3.  Allow users to pick a custom URL


### Data Estimation {#data-estimation}

1.  Assume tinyURL load, 100M new writes per month
2.  Then, in 5 years, 6B writes.
3.  To handle 6B slugs, assuming we're using [A-z][a-z][0-9] 62^k > 6\*10^9
4.  slugs need just 6 characters, 6 bytes.
    1.  Slugs will take up 36GB.
5.  Assume 500 bytes for a URL, URLs will take up 3TB.
    1.  It is reasonable to store all of this on a single machine.
    2.  But large amounts of reads and writes going to one machine can
        cause deadlock
    3.  Master-slave replication


### Design Goals {#design-goals}

| Latency | Consistency | Availability |
|---------|-------------|--------------|
| Yes     | Yes         | C > A        |


### Design API {#design-api}

-   shortenURL(url)
-   expandURL(hash)


#### Computing the Hash {#computing-the-hash}

convert\_to\_base\_62(md5(url + salt))[:6]


#### Stateless application servers {#stateless-application-servers}

load balancers ensure application is available when a server dies, and
client knows which server to talk to


## Implementing Search {#implementing-search}


## Implementing a distributed key-store {#implementing-a-distributed-key-store}

1.  Data can't fit onto one machine
2.  So now the choice is between consistency and availability
3.  Perform some estimations
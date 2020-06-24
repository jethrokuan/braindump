+++
title = "Databases"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:08:34+08:00
tags = ["database"]
draft = false
+++

### Backlinks {#backlinks}

- [Designing Data-Intensive Applications]({{< relref "designing_dataintensive_applications" >}})

## How `JOINs` work {#how-joins-work}

- `JOIN` are essentially nested loops.
- Multiple techniques are used to improve the performance of `JOIN`.
- When datasets are small or no appropriate index is being maintained,
  query planners will likely decide to use memory to make queries run
  faster. The query executor can build hash tables (or sort records in
  memory, or ...) and use `HashJoin` or `MergeJoin` to more efficiently join
  the two operands according to the join-condition in the query.
- Maintaining index data structures like B-Trees up to date allows
  Nested Loop algorithm to run much faster even when the dataset
  doesn’t conveniently fit in memory. Indexed JOINs take time
  proportional to the size of the result and are not affected by the
  size of the tables.

Understanding the three classical `JOIN` algorithms – `NestedLoop`,
`HashJoin`, `MergeJoin` – how they take advantage of different indexes and
how they behave when there is no index can give you a lot of insight
on how databases run queries. ([Carvalho 2019](#org81bbafb))

## Bibliography {#bibliography}

<a id="org81bbafb"></a>Carvalho, Felipe Oliveira. 2019. “Demystifying JOIN Algorithms.”

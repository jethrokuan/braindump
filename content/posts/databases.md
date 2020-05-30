+++
title = "Databases"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T02:57:21+08:00
tags = ["database"]
draft = false
+++

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
on how databases run queries. <a id="766d0b6e63144f3c2a5a9dff8e644056" href="#felipe_demys_join_algor">(Carvalho, 2019)</a>

# Bibliography

<a id="felipe_demys_join_algor" target="_blank">Carvalho, F. O., _Demystifying JOIN algorithms_, , _()_, (2019). </a> [↩](#766d0b6e63144f3c2a5a9dff8e644056)

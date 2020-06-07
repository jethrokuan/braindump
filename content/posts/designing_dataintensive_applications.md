+++
title = "Designing Data-Intensive Applications"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:26:28+08:00
slug = "designing_dataintensive_applications"
draft = false
+++

tags
: [System Design]({{< relref "system_design" >}}), [Databases]({{< relref "databases" >}}), [Hadoop]({{< relref "hadoop" >}})

author
: [Martin Kleppmann]({{< relref "martin_kleppmann" >}})

## Preface {#preface}

- Data abstractions are well-built (databases, etc.) but the
  boundaries are blurring
- Design decisions are highly centered around data requirements (both
  functional and non-functional requirements)
- How to build reliable, scalable, and maintainable applications

## Data Models {#data-models}

- Prevalence of SQL
- NoSQL has benefits of being schemaless (lower impedence mismatch)
  and storage locality, when fetching whole documents
  - joins are poorly implemented, can't access nested item in document efficiently
- Graph DBs implement many-to-many relationships well, also somewhat schemaless

## Database Implementation {#database-implementation}

### SSTable {#sstable}

SSTables keep key-value pairs sorted by key, which allows efficient
key-value lookups and range queries. They use a log-structure indexes
to break the database down into segments, and always writes segments
sequentially.

- When a write comes in, add it into an in-memory balanced data
  structure (e.g. [Red-Black Tree]({{< relref "red_black_tree" >}})). This is sometimes referred to as a _memtable_.
- When the memtable becomes too big, write it out onto disk as an
  SSTable file. The SSTable file becomes the most recent segment of
  the database.
- In order to serve a read request, the key is searched for in the
  memtable, then in the most recent on-disk segment, and so-on.
- From time to time, a merging and compaction process in the
  background combines segment files, and discards overwritten or
  deleted values.
- In most cases, a log is kept in addition to the current memtable, to
  restore the memtable during crashes. On a writeout, the current log
  is also discarded.

### LSM-Trees {#lsm-trees}

SSTables form the backbone of LSM-trees.

The algorithm can be slow when looking up a key that does not exist in
the database, because it will have to look through the _memtable_ and
all segments before returning. Most database implementations such a
[LevelDB](https://github.com/google/leveldb) and [RocksDB](https://github.com/facebook/rocksdb) use a [Bloom Filter]({{< relref "bloom_filter" >}}), which is a memory-efficient
data structure for approximating the contents of a set.

### B-Trees {#b-trees}

B-trees also keep key-value pairs sorted by key. Rather than the
log-structured index, B-trees break the database down into fixed
blocks or pages, traditionally 4kb in size, and read or write one page
at a time.

Each page can be identified using an address or location, which allows
one page to refer to another. These page references allow the
construction of a tree of pages. B-trees are grown by splitting a page
into 2 sub-pages.

A fundamental difference between B-trees and LSM-trees is that B-trees
overwrite the page on disk with new data, whereas LSM-trees append to
files and never modify files in place.

B-trees are made reliable via a write-ahead log: an append-only file
to which every B-tree modification must be written to before it can be
applied on the pages of the tree itself.

### Comparing LSM-trees and B-trees {#comparing-lsm-trees-and-b-trees}

As a rule of thumb, LSM-trees are faster for writes (append-only),
while B-trees are faster for reads. Reads are slower for LSM-trees
because it has to look through multiple data structures to obtain the
data. However, B-trees must write the data twice (to the write-ahead
log, and to the tree itself).

Log-structured indexes also rewrite data multiple times, due to
repeated compaction and merging of the SSTables. This is known as
write amplification, and can wear out the hard disk.

LSM-trees have better compression, B-trees suffer from some
fragmentation due to portions of pages being unused.

LSM-trees suffer from some performance degradation during the
compaction process, interfering with ongoing reads and writes. Also,
the bigger the database gets, the more disk bandwidth required for
compaction.

### Indexes {#indexes}

Both B-trees and LSM-trees can be used to build secondary indexes. The
value of the index can be a reference to the row stored elsewhere, or
the value of the row itself.

If using the reference method, the rows are typically stored in a heap
file, in no particular order. The heap file approach avoids
duplicating data when multiple secondary indexes are present. If the
performance penalty of this extra lookup is too big, it can be
desirable to store the row directly within the index.

### Multi-dimensional Indexes {#multi-dimensional-indexes}

Spatial indexes such as R-trees are typically used here.

### Full-text-search and Fuzzy Indexes {#full-text-search-and-fuzzy-indexes}

Full-text search engines commonly allow a search for one word to be
expanded to include synonyms of the word, or ignore grammatical
variations.

This requires a small in-memory index that is a sparse collection of
some of the keys. In Lucene, this in-memory index is a Levenshtein
automaton, which supports efficient search for words within a given
edit distance.

### Column-oriented Storage {#column-oriented-storage}

Most OLTP databases are row-oriented: values for the full row are
stored in the same location. Column-oriented storage store all the
values from each column together. If each column is stored in a
separate file, a query only needs to read and parse those columns that
are used in that query.

In addition, column-oriented storage is good for compression.

How do columnar databases deal with slow writes? Vertica uses
LSM-trees. All writes first go into an in-memory store, where they are
added to a sorted tructure and prepared for writing to disk. When
enough writes are accumulated, they are merged with the column files.

Many column-oriented databases store (replicate) their data in
different sort orders. This is the equivalent to having multiple
sort-indexes. Different sort orders cater to different types of
queries.

### Materialized Views {#materialized-views}

An aggregate function, such as `COUNT`, `SUM`, `AVG`, `MIN` or `MAX`
in SQL, are commonly used in queries. Materialized views are actual
copies of these results, written to disk, whereas virtual views are
just shortcuts to writing the queries.

Data cubes are a special case of these materialized views. Aggregation
is done by collapsing dimensions of the cube. These materialized views
make certain queries very fast. However, data cubes are limited in
their capability: they cannot perform queries for dimensions that are
not part of the data cube.

## Encoding and Evolution {#encoding-and-evolution}

One key goal is evolvability: systems that can adapt to change. This
includes schema changes. Schema-on-read databases don't enforce a
schema, so the database can contain a mixture of older and newer data
written at different times. For a system to continue running smoothly,
we need to maintain compatibility in both directions:

Forward compatibility
: newer code can read data that was written b
y old code

Backward compatibility
: older code can read data that was written
by newer code

Backward compatibility is not hard to achieve, but forward
compatibility requires older code to ignore additions made by a newer
version of the code.

Programs often work with data in 2 representations:

1.  In-memory, where data is kept in data structures optimized for
    efficient access and manipulation by the CPU
2.  A self-contained sequence of bytes (e.g. JSON), used to write data
    to a file, or send over a network

Encoding and decoding is the task of translating between these
representations.

Textual formats like JSON and XML are popular, but do not provide
great compression ratio. Binary formats such as MessagePack provide
much better compression ratio. Both Thrift and Protocol Buffers
require a schema for any data that is encoded. An example of a Thrift
interface definition looks like:

```thrift
struct  Person {
  1: required string username,
  2: optional i64 number,
  3: optional list<string> interests
}
```

A code generation tool takes these definitions, and generate classes
that implement this schema in various programming languages.

### Schema Evolution {#schema-evolution}

In Thrift and Protobuf, one can only add new fields to the schema, and
not remove them. This ensures that a field's tag always refers to the
same field name.

Avro is another binary encoding format that's different from Protocol
Buffers or Thrift. Avro encodes data using a _writer's schema_ and
decodes data using a _reader's schema_. These schemas do not need to
be the same, they only have to be compatible. Avro's library
resolves the differences between the two schema.

Avro is used in the context of Hadoop, for storing large files
containing millions of records, all encoded with the same schema. The
writer's schema is stored at the beginning, along with all these
records.

### Dataflow {#dataflow}

There are 3 main scenarios where data encodings are important:

1.  Databases, process of writing toand reading from the database
2.  RPC and REST APIs, where the client encodes a request, the server
    decodes the request and encodes a response, and finally the client
    decodes the response
3.  Asynchronous message passing (message brokers, actors) where nodes
    communicate by passing messages encoded and decoded by the sender
    or receipient

+++
title = "Designing Data-Intensive Applications"
author = ["Jethro Kuan"]
lastmod = 2020-02-23T21:43:53+08:00
slug = "designing_dataintensive_applications"
draft = false
+++

tags
: [System Design]({{< relref "system_design" >}}), [Databases]({{< relref "databases" >}}), [Hadoop]({{< relref "hadoop" >}})

author
: [Martin Kleppmann]({{< relref "20200223173656_martin_kleppmann" >}})


## Preface {#preface}

-   Data abstractions are well-built (databases, etc.) but the
    boundaries are blurring
-   Design decisions are highly centered around data requirements (both
    functional and non-functional requirements)
-   How to build reliable, scalable, and maintainable applications


## Data Models {#data-models}

-   Prevalence of SQL
-   NoSQL has benefits of being schemaless (lower impedence mismatch)
    and storage locality, when fetching whole documents
    -   joins are poorly implemented, can't access nested item in document efficiently
-   Graph DBs implement many-to-many relationships well, also somewhat schemaless

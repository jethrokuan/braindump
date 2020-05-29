+++
title = "Java"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:02:11+08:00
draft = false
+++

tags
: [§prog\_lang]({{< relref "prog_lang" >}})

## Hash Table {#hash-table}

Default java implementation:

1.  `hashCode` returns memory location of the object
2.  Every object hashes to a different location

### Long {#long}

```java
  public int hashCode() {
      return (int) (value ^ (value >> 32));
  }
```

### String {#string}

```java
  public int hashCode() {
      int h = hash; // only caluclate hash once
      if (h == 0 && count > 0) { // empty = 0
          int off = offset;
          char val[] = value;
          int len = count;
          for (int i = 0; i < len; i++) {
              h = 31*h + val [off++];
          }
          hash = h;
          }
          return h;
  }
```

```nil
hash = s[0] * 31^(n-1)
      + s[1] * 32^(n-2)
```

## Add vs Offer {#add-vs-offer}

<http://stackoverflow.com/questions/15591431/difference-between-offer-and-add-in-priority-queue-in-java>

The two functions come from two different interfaces that
PriorityQueue implements:

- add() comes from Collection.
- offer() comes from Queue.

For a capacity-constrained queue, the difference is that add() always
returns true and throws an exception if it can't add the element,
whereas offer() is allowed to return false if it can't add the
element.

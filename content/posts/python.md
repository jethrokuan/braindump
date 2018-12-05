+++
title = "Python"
author = ["Jethro Kuan"]
lastmod = 2018-12-05T19:40:34+08:00
draft = false
math = true
+++

## Python Default Values {#python-default-values}

<http://effbot.org/zone/default-values.htm>

Python executes some very interesting behaviour with regards to
default values:

```python
def a(v=[]):
    v.append(1)
    print(v)

a()
a()
a()
a()
```

Why does this happen? Default parameter values are always evaluated
when, and only when, the “def” statement they belong to is executed.
Also note that “def” is an executable statement in Python, and that
default arguments are evaluated in the “def” statement’s environment.
If you execute “def” multiple times, it’ll create a new function
object (with freshly calculated default values) each time.


## Python  Data Structure Libraries {#python-data-structure-libraries}


### Heap {#heap}

Heaps are provided by the `heapq` library in python.

```python
import heapq

a = [1,2,3,4,5,6]
# Heapq defaults to min heap
heapq.heapify(a) # makes a into a min heap object
heapq.heappop(a)

heapq._heapify_max(a) # Makes a into max heap
heapq._heappop_max(a)

```


### Priority Queue {#priority-queue}

[Reference](https://docs.python.org/3/library/queue.html)

The `queue` module provides FIFO, LIFO and Priority Queues. Among them,
`queue.PriorityQueue` is perhaps the most commonly used in interview
questions.

`class queue.PriorityQueue(maxsize=0)`

```python
import queue
pq = queue.PriorityQueue()

pq.put((10, 'ten'))
pq.put((1, 'one'))
pq.put((5, 'five'))

x = []
while not pq.empty():
    print(pq.get())
```


## Python Libraries {#python-libraries}


### Bisect {#bisect}

<https://docs.python.org/2/library/bisect.html>


## Strings {#strings}

Some important string operators and functions are:

-   s[3]
-   len(s)
-   s + t
-   s[2:4]
-   s in t
-   s.strip()
-   s.startswith(prefix)
-   s.endswith(prefix)
-   s.split(',')
-   3 \* '01'
-   ','.join(["A","B","C"])
-   s.tolower()

Strings are immutable, so operations create new array of characters
that are then assigned back to s.


## Python Nifty Tricks {#python-nifty-tricks}


### Tilde Operator {#tilde-operator}

The tilde operator `~` is the bit-wise complement operator, and it
essentially calculates the `-x-1.` This comes in useful in arrays, where
\\(s[~x] = s[-x-1]\\). An example usage would be the \\(O(n)\\) time
palindrome function:

```python
def is_palindrome(s):
    return all(s[i] == s[~i] for i in range(len(s) // 2))
```


### For loop else clause {#for-loop-else-clause}

`for` loop has `else` clause, that runs when the for loop successfully
completes without `break`.


### String translation tables {#string-translation-tables}

`str.maketrans` creates a translation table that makes string
substitution quick.


### Checking if character unique in string {#checking-if-character-unique-in-string}

`s.index(x) == s.rindex(x)` to check if character is only one in the string

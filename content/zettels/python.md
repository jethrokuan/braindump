+++
title = "Python"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:42:49+08:00
tags = ["python", "proglang"]
draft = false
+++

Python is an interpreted, general-purpose, high-level [programming
language]({{< relref "prog_lang" >}}). Some properties of Python include:

-   whitespaces being significant
-   dynamically-typed
-   garbage-collected


## Python Books {#python-books}


### <span class="org-todo todo TODO">TODO</span> [Fluent Python](https://www.goodreads.com/book/show/22800567-fluent-python?ac=1&from%5Fsearch=true&qid=Fo3rzgCJBZ&rank=1) {#fluent-python}


### <span class="org-todo todo TODO">TODO</span> [Effective Python](https://www.goodreads.com/book/show/23020812-effective-python) {#effective-python}


### <span class="org-todo todo TODO">TODO</span> [High Performance Python](https://www.goodreads.com/book/show/17802644-high-performance-python?ac=1&from%5Fsearch=true&qid=IniMBn35h2&rank=1) {#high-performance-python}


## Setting up Python Environment {#setting-up-python-environment}

If not using [Nix/NixOS]({{< relref "nix" >}}), versioning Python is (in my opinion best)
handled with [pyenv](https://github.com/pyenv/pyenv). Some further packages may need to be installed to
build a full Python distribution:

```bash
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev libbz2-dev
```

Package management is traditionally accomplished via pip, but [poetry](https://github.com/python-poetry/poetry)
is getting more popular.


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


## Python Data Structures {#python-data-structures}


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


### Strings {#strings}

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


## Tricks {#tricks}


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


## Reference Python Applications {#reference-python-applications}

-   [mahmoud/awesome-python-applications](https://github.com/mahmoud/awesome-python-applications)


## Style Guides {#style-guides}

-   [styleguide | Style guides for Google-originated open-source projects](https://google.github.io/styleguide/pyguide.html)
-   [psf/black](https://github.com/psf/black)


## Optimizing Python {#optimizing-python}

-   [Gregory Szorc's Digital Home | What I've Learned About Optimizing Python](https://gregoryszorc.com/blog/2019/01/10/what-i've-learned-about-optimizing-python/)


## Profiling Python {#profiling-python}

-   [benfred/py-spy: Sampling profiler for Python programs](https://github.com/benfred/py-spy)

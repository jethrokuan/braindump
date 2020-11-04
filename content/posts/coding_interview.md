+++
title = "Coding Interview Preparation"
author = ["Jethro Kuan"]
draft = false
+++

## Data Structures Review {#data-structures-review}

Integers in Python

### <span class="org-todo todo TODO">TODO</span> How Primitive Types are represented in {#how-primitive-types-are-represented-in}

1.  Python
2.  C++

### Primitive Types {#primitive-types}

Integers in Python 3 are unbounded -- the maximum integer
representable is a function of available memory. The constant
`sys.maxsize` can be used to find the word-size. Bounds on floats are
specified in `sys.float_info`.

<!--list-separator-->

- Bit Manipulation

  Computing the parity of a word.

  ```python
    def parity(x):
        result = 0
        while x:
            result ^= x & 1
            x >>= 1
        return result
  ```

  `x &` x - 1= Drops the lowest set bit of x.

  The parity of 11011111 is the same as the parity of 1101 XORed with 1111.

  ```python
    def parity(x):
        x ^= x >> 32
        x ^= x >> 16
        x ^= x >> 8
        x ^= x >> 4
        x ^= x >> 2
        x ^= x >> 1
        return x & 0x1
  ```

  With time complexity of \\(O(\log n)\\).

<!--list-separator-->

- Swapping Bits

  ```python
    def swap_bits(x, i, j):
        if (x >> i) & 1 != (x >> j) & 1: # if ith and jth bits differ
            bit_mask = (1 << i) | (1 << j)
            x ^= bit_mask
        return x

  ```

<!--list-separator-->

- Cheatsheet

  | expression | output                           |
  | ---------- | -------------------------------- |
  | x & x - 1  | clears the lowest set bit of x   |
  | x & ~(x-1) | extracts the lowest set bit of x |

### Arrays {#arrays}

Arrays are contiguous blocks of memory, usually used to represent
sequences.

Insertion into a full array can be handled by resizing, allocating a
new array with additional memory and copying over the entries from the
original array.

### Linked List {#linked-list}

```python
  class ListNode(object):
      def __init__(self, data=0, next_node=None):
          self.data = data
          self.next = next_node
```

```python
  def search_list(L, key):
      while L and L.data != key:
          L = L.next
      return L
```

```python
  def insert_after(node, new_node):
      new_node.next = node.next
      node.next = new_node
```

```python
  def delete_after(node):
      # Need to make sure there is something after to delete
      if node.next:
          node.next = node.next.next
```

### Queues {#queues}

#### Queues with Circular Buffer {#queues-with-circular-buffer}

```python
  class Queue:
      SCALING_FACTOR = 2

      def __init__(self, capacity):
          self._entries = [None] * capacity
          self._head = self._tail = self._num_queue_elements = 0

      def enqueue(self, x):
          if self._num_queue_elements == len(self._entries):
              # Need to resize
              self._entries = (
                  self._entries[self._head:] + self._entries[:self._head])
              self._head, self._tail = 0, self._num_queue_elements
              self._entries += [None] * (len(self._entries) * Queue.SCALING_FACTOR)

          self._entries[self._tail] = x
          self._tail = (self._tail + 1) % self._num_queue_elements
          self._num_queue_elements += 1

      def dequeue(self, x):
          if not self._num_queue_elements:
              raise IndexError("Empty queue")

          self._num_queue_elements -= 1
          ret = self._entries[self._head]
          self._head = (self._head + 1) % len(self._entries)
          return ert

      @property
      def size(self):
          return self._num_queue_elements
```

## Common Questions {#common-questions}

### Find kth largest in array {#find-kth-largest-in-array}

| position | ease | box | interval | due |
| -------- | ---- | --- | -------- | --- |


```python
  import operator

  # The numbering starts from one, i.e., if A = [3, 1, -1, 2]
  # find_kth_largest(1, A) returns 3, find_kth_largest(2, A) returns 2,
  # find_kth_largest(3, A) returns 1, and find_kth_largest(4, A) returns -1.
  def find_kth_largest(k, A):
      def find_kth(comp):
          # Partition A[left:right + 1] around pivot_idx, returns the new index of
          # the pivot, new_pivot_idx, after partition. After partitioning,
          # A[left:new_pivot_idx] contains elements that are "greater than" the
          # pivot, and A[new_pivot_idx + 1:right + 1] contains elements that are
          # "less than" the pivot.
          #
          # Note: "greater than" and "less than" are defined by the comp object.
          #
          # Returns the new index of the pivot element after partition.
          def partition_around_pivot(left, right, pivot_idx):
              pivot_value = A[pivot_idx]
              new_pivot_idx = left
              A[pivot_idx], A[right] = A[right], A[pivot_idx]
              for i in range(left, right):
                  if comp(A[i], pivot_value):
                      A[i], A[new_pivot_idx] = A[new_pivot_idx], A[i]
                      new_pivot_idx += 1
              A[right], A[new_pivot_idx] = A[new_pivot_idx], A[right]
              return new_pivot_idx

          left, right = 0, len(A) - 1
          while left <= right:
              # Generates a random integer in [left, right].
              pivot_idx = random.randint(left, right)
              new_pivot_idx = partition_around_pivot(left, right, pivot_idx)
              if new_pivot_idx == k - 1:
                  return A[new_pivot_idx]
              elif new_pivot_idx > k - 1:
                  right = new_pivot_idx - 1
              else:  # new_pivot_idx < k - 1.
                  left = new_pivot_idx + 1

          raise IndexError('no k-th node in array A')

      return find_kth(operator.gt)
```

### Boyer-Moore String Search Algorithm {#boyer-moore-string-search-algorithm}

The problem is to find a occurrences of string `p` in `t`. The pattern `p`
is preprocessed, learning from character comparisons to skip pointless
alignments.

1.  Try alignments in left-to-right order
2.  Try character comparisons in right-to-left order

**Bad character rule**: Upon mismatch, skip alignments until (a) mismatch
becomes a match (b) `p` moves past mismatched character

```text
  T: GCTTCTGCTATCTCTC
  P: CCTTTTGC
         ^ mismatch (right-to-left character comparison)
      ^ earliest C to make mismatch match
         CCTTTTGC
```

**Good suffix rule**: Let `t` = matched by inner loop; skip until (a) there
are no mismatches between `p` and `t`, or (b) `p` moves past `t`

Another linear-time string search algorithm is the [Rabin-Karp
algorithm](https://en.wikipedia.org/wiki/Rabin%25E2%2580%2593Karp%5Falgorithm), which uses a rolling hash.

### Delete Duplicates in Linked List {#delete-duplicates-in-linked-list}

```python
  def deleteDuplicates(A):
      head = A
      while A:
          while A.next and A.next.val == A.val:
              A.next = A.next.next
          A = A.next
      return head
```

### Longest Increasing Subsequence (LIS) {#longest-increasing-subsequence--lis}

\\(O(n^2)\\) solution involves dynamic programming. Let \\(L[i]\\) be the
length of the LIS ending at index \\(i\\), such that \\(arr[i]\\) is the last
element of the LIS.

Then \\(L(i) = 1 + max(L[j])\\) where \\(0 < j < i\\) and \\(arr[j] < arr[i]\\) or
\\(L[i] = 1\\) if no such \\(j\\) exists.

```python
  def longest_increasing_subsequence(arr):
      l = len(arr)
      # Initialize LIS
      lis = [1] * l

      for i in range(1, l):
          for j in range(0, i):
              if arr[i] > arr[j]:
                  lis[i] = max(lis[i], lis[j] + 1)

      return max(lis)
```

### Generating a Random Sample {#generating-a-random-sample}

```python
  import random

  def random_sample(k, A):
      """Generates a rondom subset of size k from array A."""
      for i in range(k):
          r = random.randint(i, len(A)-1)
          A[i], A[r] = A[r], A[i]
      return A[:k]
```

### Generate a random sample from a stream {#generate-a-random-sample-from-a-stream}

The basic idea is that given the `n+1` element, and a random subset of
size `k`, where `k<n`, then that element should belong to that new subset
with probability `k/(n+1)`.

```python
  import random

  def online_random_sample(it, A):
      # Stores the first k elements
      sampling_results = list(itertools.islice(it, k))

      num_seen_so_far = k
      for x in it:
          num_seen_so_far += 1
          idx_to_replace = random.randrange(num_seen_so_far)
          if idx_to_replace < k:
              sampling_results[idx_to_replace] = x

      return sampling_results
```

### Checking sub-sequence {#checking-sub-sequence}

```python
  def is_subsequence(st, seq):
      it = iter(st)
      return all(c in it for c in seq)

  print(is_subsequence("hello", "el"))
  print(is_subsequence("hello", "no"))
```

### Flatten a List {#flatten-a-list}

```python
  def flatten(arr):
      return [item for sublist in l for item in sublist]
```

### has two sum {#has-two-sum}

```python
  def has_two_sum(A, t):
      i, j = 0, len(A) - 1

      while i <= j:
          if A[i] + A[j] == t:
              return True
          elif A[i] + A[j] < t:
              i += 1
          else:  # A[i] + A[j] > t.
              j -= 1
      return False
```

has three sum is the same, sort the array and run has two sum.

### Big Integer Multiply {#big-integer-multiply}

```python
  def multiply(num1, num2):
      sign = -1 if (num1[0] < 0) ^ (num2[0] < 0) else 1
      num1[0] = abs(num1[0])
      num2[0] = abs(num2[0])
      result = [0] * (len(num1) + len(num2))
      for i in reversed(range(len(num1))):
          for j in reversed(range(len(num2))):
              result[i + j + 1] += num1[i] * num2[j]
              result[i + j] += result[i + j + 1] // 10
              result[i + j + 1] %= 10

      # remove starting 0s
      result = result[next((
          i for i, x in enumerate(result) if x != 0), len(result)):] or [0]
      result[0] *= sign
      return result
```

### Next Permutation {#next-permutation}

| position | ease | box | interval | due |
| -------- | ---- | --- | -------- | --- |


```python
  def next_permutation(perm):

      # Find the first entry from the right that is smaller than the entry
      # immediately after it.
      inversion_point = len(perm) - 2
      while (inversion_point >= 0
             and perm[inversion_point] >= perm[inversion_point + 1]):
          inversion_point -= 1
      if inversion_point == -1:
          return []  # perm is the last permutation.

      # Swap the smallest entry after index inversion_point that is greater than
      # perm[inversion_point]. Since entries in perm are decreasing after
      # inversion_point, if we search in reverse order, the first entry that is
      # greater than perm[inversion_point] is the entry to swap with.
      for i in reversed(range(inversion_point + 1, len(perm))):
          if perm[i] > perm[inversion_point]:
              perm[inversion_point], perm[i] = perm[i], perm[inversion_point]
              break

      # Entries in perm must appear in decreasing order after inversion_point,
      # so we simply reverse these entries to get the smallest dictionary order.
      perm[inversion_point + 1:] = reversed(perm[inversion_point + 1:])
      return perm
```

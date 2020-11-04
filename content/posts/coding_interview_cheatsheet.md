+++
title = "Coding Interview Cheatsheet"
author = ["Jethro Kuan"]
slug = "coding_interview_cheatsheet"
draft = false
+++

## Arrays {#arrays}

### Dutch Flag Partition {#dutch-flag-partition}

```python
  RED, WHITE, BLUE = range(3)

  # Time: O(n)
  # Space: O(1)
  def dutch_flag_partition(pivot_index, A):
      pivot = A[pivot_index]
      # First pass: group elements smaller than pivot

      smaller = 0
      for i in range(len(A)):
          if A[i] < pivot:
              A[i], A[smaller] = A[smaller], A[i]
              smaller += 1

      # Second pass: group elements larger than pivot
      larger = len(A) - 1
      for i in range(len(A)):
          if A[i] < pivot:
              break
          elif A[i] > pivot:
              A[i], A[larger] = A[larger], A[i]
              larger -= 1
```

## Linked List {#linked-list}

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

### Reverse Sublist {#reverse-sublist}

```python
  def reverse_sublist(L, start, finish):
      dummy_head = sublist_head = ListNode(0, L)
      for _ in range(1, start):
          sublist_head = sublist_head.next

      sublist_iter = sublist_head.next
      for _ in range(finish - start):
          temp = sublist_iter.next
          sublist_iter.next, temp.next, sublist_head.next = (
              temp.next, sublist_head.next, temp
          )

      return dummy_head.next
```

### Test Cycle {#test-cycle}

```python
  def has_cycle(head):
      def cycle_len(end):
          start, step = end, 0
          while True:
              step += 1
              start = start.next
              if start is end:
                  return step

      fast = slow = head

      while fast and fast.next and fast.next.next:
          slow, fast = slow.next, fast.next.next
          if slow is fast:
              it = head
              for _ in range(cycle_len(slow)):
                  it = it.next

              it2 = head

              while it is not it2:
                  it = it.next
                  it2 = it2.next
              return it

      return None
```

## Stacks {#stacks}

```python
stack = []
stack.append(a)
stack.pop()

```

### Building with Sunset View {#building-with-sunset-view}

```python
  def examine_buildings_with_sunset(it):
      BuildingWithHeight = collections.namedtuple("BuildingWithHeight", ("id", "height"))

      candidates = []

      for idx, building_height in enumerate(it):
          while candidates and building_height >= candidates[-1].height:
              candidates.pop()
          candidates.append(BuildingWithHeight(idx, building_height))

      return [candidate.id for candidate in reversed(candidates)]

```

## Queues {#queues}

Queue supports 2 operations, enqueue and dequeue. Queues can be
implemented with a linked list. Doubled ended queues support
insertions and deletions from both ends (doubly-linked list).

```python
  collections.deque()

  q.append(x)
  q.appendleft(x)
  q.pop()
  q.popleft()
```

## Binary Trees {#binary-trees}

### Traversal {#traversal}

```python
  def traverse(tree):
      if tree:
          print(f"preorder {tree.data}")
          traverse(tree.left)
          print(f"inorder {tree.data}")
          traverse(tree.right)
          print(f"{postorder {tree.data}}")
```

### Height Balanced {#height-balanced}

```python
  def is_balanced(tree):
      BalanceStatus = collections.namedtuple("BalanceStatus", ("balanced", "height"))

      def check_balanced(tree):
          if not tree:
              return BalanceStatus(True, -1) # Base case

          left = check_balanced(tree.left)
          if not left.balanced:
              return BalanceStatus(False, 0)

          right = check_balanced(tree.right)
          if not right.balanced:
              return BalanceStatus(False, 0)

          is_balanced = abs(left.height - right.height) <= 1
          height = max(left.height, right.height) + 1
          return BalanceStatus(is_balanced, height)

      return check_balanced(tree).balanced
```

### Find Successor {#find-successor}

Successor is leftmost element in node's right subtree.

```python
  def successor(node):
      if node.right:
          node = node.right:
          while node.left:
              node = node.left
          return node

      while node.parent and node.parent.right is node:
          node = node.parent

      return node.parent
```

## Heaps {#heaps}

Python provides min-heap via `heapq`.

- \\(O(\log n)\\) insertions
- \\(O(1)\\) min element
- \\(O(\log n)\\) deletion of min element

<!--listend-->

```python
  heapq.heapify(L)                # elements in L to heap in-place
  heapq.nlargest(k, L)
  heapq.nsmallest(k, L)           # k largest (smallest) elements in L
  heapq.heappush(h, e)            # pushes new element onto heap
  heapq.heappop(h)                # pops smallest element from heap
  heapq.heappushpop(h, a)         # pushes a on heap and pops and returns smallest element
  e = h[0]                        # return min element
```

### Merge k sorted arrays {#merge-k-sorted-arrays}

```python
  min_heap = []
  sorted_array_iters = [iter(x) for x in sorted_arrays]

  for i, it in enumerate(sorted_arrays_iters):
      first_element = next(it, None)
      if first_element is not None:
          heapq.heappush(min_heap, (first_element, i))

  result = []

  while min_heap:
      smallest, smallest_i = heapq.heappop(min_heap)
      smallest_iter = sorted_array_iters[smallest_i]
      result.append(smallest)
      next_element = next(smallest_iter, None)
      if next_element is not none:
          heapq.heappush(min_heap, (next_element, smallest_i))
  return result

```

## Searching {#searching}

```python
  def binary_search(t, A):
      L, R = 0, len(A) - 1
      while L <= R:
          M = (L + R) // 2
          if A[M] < t:
              L = M + 1
          elif A[M] = t:
              return M
          else:
              R = M - 1
      return -1
```

## Sorting {#sorting}

```python
  class Student(object):
      def __init__(self, name, gpa):
          self.name = name
          self.gpa = gpa

      def __lt__(self, other):
          return self.name < other.name


  students_by_name = sorted(students)
  students.sort(key = lambda: student: student.gpa) # in-place
```

## Binary Search Trees {#binary-search-trees}

- \\(O(\log n)\\) insertion
- \\(O(\log n)\\) deletion
- \\(O(\log n)\\) lookup
- \\(O(\log n)\\) find

## Graph {#graph}

```python
  def dfs(node):
      seen = {}
      stack = [node]
      while stack:
          n = stack.pop()
          for x in n.neighbours:
              if x not in seen:
                  stack.append(s)
```

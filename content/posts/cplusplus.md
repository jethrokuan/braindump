+++
title = "C++"
author = ["Jethro Kuan"]
lastmod = 2018-12-05T19:39:25+08:00
draft = false
math = true
+++

## Modern C++ {#modern-c}

Follow the guidelines:
<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md>


### Use non-member begin and end {#use-non-member-begin-and-end}

non-member begin and end supports more containers, such as arrays.

```c++
vector<int> v;
int a[100];

// C++98
sort(v.begin(), v.end());
sort(&a[0], &a[0] + sizeof(a)/sizeof(a[0]));

// C++11
sort( begin(v), end(v) );
sort( begin(a), end(a) );
```


### Lambda functions {#lambda-functions}

variables get passed through the square brackets.

```c++
const int factor = 2;

std::for_each(myVec.begin(), myVec.end(), [factor](int& elem){
  elem *= factor;
});
```


### using {#using}

using is like typedef, but has less quirks.

```c++
using Month = int;

class Date {
    // ...
public:
    Month month() const;  // do
    int month();          // don't
    // ...
};
```


### avoid `endl` {#avoid-endl}

The endl manipulator is mostly equivalent to '\n' and "\n"; as most
commonly used it simply slows down output by doing redundant flush()s.
This slowdown can be significant compared to printf-style output.


### Prefer using STL array or vector instead of a C array {#prefer-using-stl-array-or-vector-instead-of-a-c-array}

C arrays are less safe, and have no advantages over array and vector.
For a fixed-length array, use std::array, which does not degenerate to
a pointer when passed to a function and does know its size. Also, like
a built-in array, a stack-allocated std::array keeps its elements on
the stack. For a variable-length array, use std::vector, which
additionally can change its size and handles memory allocation.


## Array Decaying {#array-decaying}

It's said that arrays "decay" into pointers. A C++ array declared as
int numbers [5] cannot be re-pointed, i.e. you can't say numbers =
0x5a5aff23. More importantly the term decay signifies loss of type and
dimension; numbers decay into int\* by losing the dimension information
(count 5) and the type is not int [5] any more.

<http://stackoverflow.com/questions/1461432/what-is-array-decaying>


## cin/cout vs scanf/printf {#cin-cout-vs-scanf-printf}

cin/cout is actually faster; but C++ slows it down to sync it with
C-style io. If using only one style (cin), you can achieve greater IO
speed with:

```c++
std::ios::sync_with_stdio(false);
```


## hypot {#hypot}

hypot(x,y) -> sqrt(x^2 + y^2)


## fgets {#fgets}

```c++
char *fgets(char *str, int n, FILE *stream)
```

```c++
char str[100];
fgets(str, 100, stdin);
```


## Algorithms in C++ {#algorithms-in-c}

<http://www.techiedelight.com/data-structures-and-algorithms-interview-questions-stl/>


## Books to read {#books-to-read}

<http://stackoverflow.com/questions/388242/the-definitive-c-book-guide-and-list>

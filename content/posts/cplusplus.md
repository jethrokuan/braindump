+++
title = "C++"
author = ["Jethro Kuan"]
lastmod = 2019-01-25T08:26:05+08:00
tags = ["proglang", "c++"]
draft = false
math = true
+++

## What is C++ {#what-is-c}

C++ is a compiled language. For a program to run, its source text has
to be processed by a compiler, producing object files, which are
combined by a linker yielding an executable program. An executable
program is created for a specific hardware/system combination, and is
not portable.

The ISO C++ standard defines 2 kinds of entities:

1.  Core language features, such as built-in types and loops
2.  Standard-library components, such as containers (vector and map)
    and IO operations

C++ is statically typed: the type of each entity must be known to the
compiler at its point of use.


## References vs Pointers {#references-vs-pointers}

A reference is similar to a pointer, except that you don't need to use
a prefix \* to access the value referred to by the reference. In
addition, a reference cannot be made to refer to a different object
after its initialization.

```c++
int count_x(const char* p, char x) {
  if (p == nullptr) return 0;
  int count = 0;
  for (; *p != 0; ++p) {
    if (*p == x) {
      ++count;
    }
  }
  return count;
}
```


## C++ Guidelines {#c-guidelines}

Follow the guidelines:
<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md>


### Use General `{}` style declarations {#use-general-style-declarations}

```c++
int i1 = 7.8; // i1 becomes 7
int i2 {7.8}; // error: floating-point to integer conversion
```

The old `=` style is traditional and dates back to C. Conversions that
lose information, are allowed and implicitly applied. These are the
price paid for C compatibility.


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


### On Namespacing {#on-namespacing}

[How do you properly use namespaces in C++? - Stack Overflow](https://stackoverflow.com/questions/41590/how-do-you-properly-use-namespaces-in-c)


### RAII {#raii}

Resource Acquisition Is Initialization or RAII, is a C++ programming
technique which binds the life cycle of a resource that must be
acquired before use (allocated heap memory, thread of execution, open
socket, open file, locked mutex, disk space, database
connection—anything that exists in limited supply) to the lifetime of
an object. <sup id="f0a899f30af8b1c819a39ca7a6c5c42b"><a href="#cppref_raii" title="@misc{cppref_raii,
  author =       {nil},
  howpublished = {https://en.cppreference.com/w/cpp/language/raii},
  note =         {Online; accessed 25 January 2019},
  title =        {RAII - cppreference.com},
  year =         {nil},
}">@misc{cppref_raii,
  author =       {nil},
  howpublished = {https://en.cppreference.com/w/cpp/language/raii},
  note =         {Online; accessed 25 January 2019},
  title =        {RAII - cppreference.com},
  year =         {nil},
}</a></sup>

The basic idea is that class destructors are always called when a
particular instance of an object goes out of scope. This allows for
automatic releasing of resources that will never be referenced.

For `shared_ptr`, the class object contains a pointer to the object, and
a reference count for the number of pointers with access to the object
at the pointer. Once this reference count hits 0, the object is
released.

For `unique_ptr`, there is no reference count within the class. once
this unique\_ptr goes out of scope, the object at the pointer is
released. For this reason, `unique_ptr` are more lightweight than
`shared_ptr`, and cannot be copied. `unique_ptr` can only be moved.


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


## Books to read {#books-to-read}

<http://stackoverflow.com/questions/388242/the-definitive-c-book-guide-and-list>


## Links {#links}

-   [C++ Patterns](https://cpppatterns.com/)

# Bibliography
<a id="cppref_raii"></a>nil,  (nil). *Raii - cppreference.com*. Retrieved from [https://en.cppreference.com/w/cpp/language/raii](https://en.cppreference.com/w/cpp/language/raii). Online; accessed 25 January 2019. [↩](#f0a899f30af8b1c819a39ca7a6c5c42b)

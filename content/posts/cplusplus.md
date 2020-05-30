+++
title = "C++ Language"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T02:52:28+08:00
draft = false
+++

tags
: [Programming Languages]({{< relref "prog_lang" >}})

## What is C++ {#what-is-c-plus-plus}

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

## C++ Guidelines {#c-plus-plus-guidelines}

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
an object. <a id="f0a899f30af8b1c819a39ca7a6c5c42b" href="#cppref_raii">(nil, nil)</a>

The basic idea is that class destructors are always called when a
particular instance of an object goes out of scope. This allows for
automatic releasing of resources that will never be referenced.

For `shared_ptr`, the class object contains a pointer to the object, and
a reference count for the number of pointers with access to the object
at the pointer. Once this reference count hits 0, the object is
released.

For `unique_ptr`, there is no reference count within the class. once
this unique_ptr goes out of scope, the object at the pointer is
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

## Smart pointers {#smart-pointers}

Here's a summary of smart-pointers and their semantics. [value_ptr](https://github.com/loopperfect/valuable) is
not in the stdlib, but is available as a C++ library.

{{< figure src="/ox-hugo/screenshot_2019-02-24_17-27-51.png" caption="Figure 1: Tabular summary of smart pointers" >}}

### shared_ptr {#shared-ptr}

The main advantage of shared pointers is that, we should not worry
about calling delete or cleaning the memory in an explicit manner. The
shared pointer will take care of it once it goes out of scope. To
create a `shared_ptr`, use `make_shared`. It's fast in memory allocation
compared to `new`. <a id="1ec5400d7db9917f3d3dfe2a47aff3b0" href="#codesbay_codes_cplus_smart">(CodesBay, nil)</a>

```cpp
class Sample {
public:
  Sample() { cout << "Constructor make_shared" << endl; }
  ~Sample() { cout << "Destructor make_shared" << endl; }
};
int main() {
  shared_ptr<Sample> sp = make_shared<Sample>();
  return 0;
}
```

### unique_ptr {#unique-ptr}

Like shared_ptr<>, there is no need to call delete or clean the memory
in an explicit manner. The unique pointer will take care of it once it
goes out of scope. `shared_ptr<>` maintains reference counts where more
than one shared_ptr<> can refer to a single object.

This is prevented by `unique_ptr<>` and the reason behind naming it as
unique. In `unique_ptr<>`, one and only one `unique_ptr<>` has the
ownership of the Object and manages its lifetime. <a id="1ec5400d7db9917f3d3dfe2a47aff3b0" href="#codesbay_codes_cplus_smart">(CodesBay, nil)</a>

### std::move {#std-move}

In unique_ptr, std::move is used to transfer the ownership from one
unique_ptr to another, which is otherwise not possible.

For shared_ptr, std::move prevents the increment and immediate
decrement of the reference count, making it an optimization. It's not
strictly necessary. <a id="b8b43c9917af7c2b3e7ddd0097b735e0" href="#so_why_move_shared_ptr">(nil, 2019)</a>

## not_null {#not-null}

not_null is available in GSL, and with compile-time guarantees that a
pointer is not null. <a id="f3bb84ae744282d41f1759fcf6309eeb" href="#17_bartek">(Bartek, 2017)</a>

## Books to read {#books-to-read}

<http://stackoverflow.com/questions/388242/the-definitive-c-book-guide-and-list>

## Links {#links}

- [C++ Patterns](https://cpppatterns.com/)

# Bibliography

<a id="cppref_raii" target="_blank">nil, , _RAII - cppreference.com_, , _()_, (nil). </a> [↩](#f0a899f30af8b1c819a39ca7a6c5c42b)

<a id="codesbay_codes_cplus_smart" target="_blank">CodesBay, , _GitHub - CodesBay/CplusPlusSmartPointer: This repository contains description of C++11 and C++14 Smart Pointers Trilogy of sharedptr, uniqueptr and weakptr_, , _()_, (nil). </a> [↩](#1ec5400d7db9917f3d3dfe2a47aff3b0)

<a id="so_why_move_shared_ptr" target="_blank">nil, , _C++ - Why would I std::move an std::sharedptr? - Stack Overflow_, , _()_, (2019). </a> [↩](#b8b43c9917af7c2b3e7ddd0097b735e0)

<a id="17_bartek" target="_blank">Bartek, , _Bartek's coding blog: How notnull can improve your code?_, , _()_, (2017). </a> [↩](#f3bb84ae744282d41f1759fcf6309eeb)

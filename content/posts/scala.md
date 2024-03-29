+++
title = "Scala"
author = ["Jethro Kuan"]
draft = false
+++

## Introduction to Scala {#introduction-to-scala}

Scala's primary signature is its blend of object-oriented and
functional programming concepts.

Scala allows easy addition of new types. For example, Scala's actor
model for concurrency is implemented as an abstraction on top of Java
threads.

Object-oriented programming provides structure, that allows scaling up
to large programs. Every value is an object, and every operation is a
method call. Scala uses _traits_ to compose objects. Traits act like
interfaces in Java, but can also have method implementations and even
fields.

In Scala, functions are first-class values -- they can be passed as
arguments to other functions, be returned as results from functions,
or be stored in variables. First-class functions provide a convenient
means of abstracting over operations and creating new control
structures.

Many of Scala's operations map input values to output values, rather
than mutate the data in place. Scala libraries define many more
immutable data types on top of those found in the Java APIs.


### Why Scala? {#why-scala}

1.  Scala has seamless interoperability with Java, compiling to JVM
    bytecode. This means that it often has Java-like runtime performance.

2.  Scala is concise: (1) it avoids boilerplate (2) it provides tooling
    to define powerful libraries to factor out common behaviour

3.  Scala is statically typed: it allows one to combine types, and hide
    details of types with abstract types


## Basic Scala {#basic-scala}

{{< figure src="/ox-hugo/screenshot_2019-05-31_22-00-22.png" >}}

Arrays are accessed with parantheses in Scala: `a(0)`.  This is
because arrays are simply instances of classes like any other class in
Scala. Scala will transform the code into an invocation of a method
named `apply` on that variable: `a.apply(0)`. Accessing an element of an
array in Scala is a method call like any other.

Similarly, `a(0) = 1` gets translated to `a.update(0, 1)`.

[Scaladoc: scala.collection.mutable.List](https://www.scala-lang.org/api/2.12.3/scala/collection/immutable/List.html)
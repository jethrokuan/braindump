+++
title = "Python"
author = ["Jethro Kuan"]
draft = false
+++

Python is an interpreted, general-purpose, high-level programming language. Some
properties of Python include:

-   whitespaces being significant
-   dynamically-typed
-   garbage-collected


## Python Import Resolution {#python-import-resolution}

Say you have a Python import statement:

```python
import abc
```

Python will look up the following in order:

1.  [sys.modules](https://docs.python.org/3/library/sys.html#sys.modules): this is the cache containing previously imported modules
2.  built-in modules
3.  [sys.path](https://docs.python.org/3/library/sys.html#sys.path): Usually includes the current directory


## Python Default Parameter Values {#python-default-parameter-values}

source
: [Default Parameter Values in Python](http://effbot.org/zone/default-values.htm)

Python has interesting behaviour for default values:

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


## <span class="org-todo todo TODO">TODO</span> Python Decorators {#python-decorators}


## Books {#books}


### <span class="org-todo todo TODO">TODO</span> [Fluent Python](https://www.goodreads.com/book/show/22800567-fluent-python?ac=1&from%5Fsearch=true&qid=Fo3rzgCJBZ&rank=1) {#fluent-python}


### <span class="org-todo todo TODO">TODO</span> [Effective Python](https://www.goodreads.com/book/show/23020812-effective-python) {#effective-python}


### <span class="org-todo todo TODO">TODO</span> [High Performance Python](https://www.goodreads.com/book/show/17802644-high-performance-python?ac=1&from%5Fsearch=true&qid=IniMBn35h2&rank=1) {#high-performance-python}


## <span class="org-todo todo TODO">TODO</span> Links {#links}

-   [mahmoud/awesome-python-applications](https://github.com/mahmoud/awesome-python-applications)
-   [styleguide | Style guides for Google-originated open-source projects](https://google.github.io/styleguide/pyguide.html)
-   [psf/black](https://github.com/psf/black)
-   [Gregory Szorc's Digital Home | What I've Learned About Optimizing Python](https://gregoryszorc.com/blog/2019/01/10/what-i've-learned-about-optimizing-python/)
-   [benfred/py-spy: Sampling profiler for Python programs](https://github.com/benfred/py-spy)
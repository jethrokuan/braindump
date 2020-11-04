+++
title = "Python Default Parameter Values"
author = ["Jethro Kuan"]
draft = false
+++

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

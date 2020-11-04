+++
title = "Python Import Resolution"
author = ["Jethro Kuan"]
draft = false
+++

Say you have a Python import statement:

```python
import abc
```

Python will look up the following in order:

1.  [sys.modules](https://docs.python.org/3/library/sys.html#sys.modules): this is the cache containing previously imported modules
2.  built-in modules
3.  [sys.path](https://docs.python.org/3/library/sys.html#sys.path): Usually includes the current directory

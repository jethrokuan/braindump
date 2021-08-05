+++
title = "Game API Design"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Software Engineering]({{<relref "software_engineering.md#" >}})


## Core Tenets from Handmade (NO\_ITEM\_DATA:handmade\_how\_to\_write\_better) {#core-tenets-from-handmade--no-item-data-handmade-how-to-write-better}


### Maximize portability {#maximize-portability}

-   Write in C99 if possible
-   Try to avoid:
    -   compiler extensions
-   Do:
    -   Use the C standard library
    -   Undef macros that should not be exposed to the end user
    -   Prefix names to avoid collisions
    -   Write the interface in C


### Be easy to build {#be-easy-to-build}

-   Don't use a custom build system
-   Make build system optional
-   Allow people to compile from source
-   Minimize dependencies
-   don't allocate memory or handle resources for the user
-   be const correct
-   always ask for the size of buffers


### Be easy to integrate {#be-easy-to-integrate}

-   Consider error codes or result structs that must be handled at
    runtime
-   Keep error code/reason in struct

<!--listend-->

```C
  ParsePNGFileResult result = ParsePNGFile(png_file_data);
  if (result.error) { /* handle error */ }
```


## Bibliography {#bibliography}

NO\_ITEM\_DATA:handmade\_how\_to\_write\_better
+++
title = "Game API Design"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:09+08:00
draft = false
+++

tags
: [Software Engineering]({{< relref "software_engineering" >}})

## Core Tenets from Handmade ([Handmade 2019](#orgcb9397e)) {#core-tenets-from-handmade--handmade-2019--orgcb9397e}

### Maximize portability {#maximize-portability}

- Write in C99 if possible
- Try to avoid:
  - compiler extensions
- Do:
  - Use the C standard library
  - Undef macros that should not be exposed to the end user
  - Prefix names to avoid collisions
  - Write the interface in C

### Be easy to build {#be-easy-to-build}

- Don't use a custom build system
- Make build system optional
- Allow people to compile from source
- Minimize dependencies
- don't allocate memory or handle resources for the user
- be const correct
- always ask for the size of buffers

### Be easy to integrate {#be-easy-to-integrate}

- Consider error codes or result structs that must be handled at
  runtime
- Keep error code/reason in struct

<!--listend-->

```C
  ParsePNGFileResult result = ParsePNGFile(png_file_data);
  if (result.error) { /* handle error */ }
```

## Bibliography {#bibliography}

<a id="orgcb9397e"></a>Handmade. 2019. “How to Write Better (Game) Libraries | Handmade.Network Wiki.”

+++
title = "Game API Design"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Software Engineering]({{<relref "software_engineering.md" >}})

## Core Tenets from Handmade ([Handmade, n.d.](#orga879038)) {#core-tenets-from-handmade--handmade-n-dot-d-dot--orga879038}

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

<a id="orga879038"></a>Handmade. n.d. “How to Write Better (Game) Libraries | Handmade.Network Wiki.” <https://handmade.network/wiki/7138-how%E2%82%9Co%5F%7Bw%7Drite%5F%7Bb%7Detter%5F%7Bg%7Dame%E2%82%97ibraries>.

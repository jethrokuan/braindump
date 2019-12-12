+++
title = "Game API Design"
author = ["Jethro Kuan"]
lastmod = 2019-12-12T19:45:28+08:00
draft = false
math = true
+++

## Core Tenets from Handmade <a id="9eba6e4f7d26bb0e67deeb10da2c68db" href="#handmade_how_to_write_better" title="@misc{handmade_how_to_write_better,
  author =       {Handmade},
  howpublished =
                  {https://handmade.network/wiki/7138-how_to_write_better_game_libraries},
  note =         {Online; accessed 12 December 2019},
  title =        {How to write better (game) libraries |
                  handmade.network Wiki},
  year =         {2019},
}">@misc{handmade_how_to_write_better,
  author =       {Handmade},
  howpublished =
                  {https://handmade.network/wiki/7138-how_to_write_better_game_libraries},
  note =         {Online; accessed 12 December 2019},
  title =        {How to write better (game) libraries |
                  handmade.network Wiki},
  year =         {2019},
}</a> {#core-tenets-from-handmade-a-id-9eba6e4f7d26bb0e67deeb10da2c68db-href-handmade-how-to-write-better-title-misc-handmade-how-to-write-better-author-handmade-howpublished-https-handmade-dot-network-wiki-7138-how-to-write-better-game-libraries-note-online-accessed-12-december-2019-title-how-to-write-better--game--libraries-handmade-dot-network-wiki-year-2019-misc-handmade-how-to-write-better-author-handmade-howpublished-https-handmade-dot-network-wiki-7138-how-to-write-better-game-libraries-note-online-accessed-12-december-2019-title-how-to-write-better--game--libraries-handmade-dot-network-wiki-year-2019-a}


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

# Bibliography
<a id="handmade_how_to_write_better"></a>Handmade,  (2019). *How to write better (game) libraries | handmade.network wiki*. Retrieved from [https://handmade.network/wiki/7138-how_to_write_better_game_libraries](https://handmade.network/wiki/7138-how_to_write_better_game_libraries). Online; accessed 12 December 2019. [↩](#9eba6e4f7d26bb0e67deeb10da2c68db)

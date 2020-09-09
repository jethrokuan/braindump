[![Netlify Status](https://api.netlify.com/api/v1/badges/d6b49afd-cd07-4714-87d1-bc8e8239068f/deploy-status)](https://app.netlify.com/sites/braindump-jethrokuan/deploys)

# Jethro's Braindump

This braindump is generated via [ox-hugo][ox-hugo] and uses the
[cortex][cortex] theme.

The org files used to generate the markdown files are also hosted here
for posterity. They can be found in [the org folder][org].

## Installation instructions

Install [hugo][hugo]. E.g., on a Mac with Homebrew:

    $ brew install hugo

Make sure the submodule containing the Hugo theme is installed:

    $ git submodule init
    $ git submodule update

Now run hugo to generate the files (find them in `/public`):

    $ hugo

Or run the following to get an immediately browsable website on localhost:

    $ hugo serve

[hugo]: https://gohugo.io/
[ox-hugo]: https://github.com/kaushalmodi/ox-hugo
[cortex]: https://github.com/jethrokuan/cortex
[org]: https://github.com/jethrokuan/braindump/tree/master/org

# Er.

A configurable blog theme for Hugo, with elements inspired by [this blog](https://aranair.github.io/posts/). 

## Features
- produces an Atom feed at `feed.xml`(taken from [this discussion](https://github.com/comfusion/after-dark/issues/32)). It generates the latest 15 posts by default.
- Open graph tags
- tag and category pages
- table of contents for your posts (from [tocbot](https://github.com/tscanlin/tocbot))
- renders Math with MathJaX
- tag cloud on big screens

## Configurations

### Favicon

You can put your favicon at `static/favicon.ico`, the theme will automatically look for it there. If you want to choose a different path, please set the `favicon` parameter in `[params]` in the config. 

### Atom feed

In order to enable Atom feed (instead of RSS), put this in your `config.toml`:

```toml
[outputs]
home = ["HTML", "Atom"]

[mediaTypes]
[mediaTypes."application/atom"]
suffix = "xml"

[outputFormats.Atom]
mediaType = "application/atom"
baseName = "feed"
isPlainText = false

disableKinds = ['RSS']
```
### Customize the colors

This theme uses [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables), and if you want to change the colours on this theme, you can override the `variables.css` in `layouts/partials/css`. This is loaded before the theme css. 

### Google analytics

Google analytics tracking code can be added to `config.toml` like this:

```toml
googleAnalytics = "UA-123-45"
```

### Markdown TOC

Table of contents is activated by default, if it detects markdown headings. To turn it off, just add `toc = false` in the frontmatter. Alternatively, you can turn off contents page for the whole site by setting `showtoc = false` under the `[params]` section of `config.toml`, like this:
```toml
[params]
showtoc = false
```

### Math rendering

Math rendering is off by default, can be turned on for individual posts or pages by setting `math = true` in the frontmatter.

### Tag cloud

Tag cloud is shown by default. To disable, add `showTagCloud = false` under the `[params]` section, similar to `showtoc`. You can also configure the maximum number of tags you want to show in your tag cloud, using the `maxTags` key under `[params]`. This number is 50 by default. 

### back to top button

Back to top button is also shown by default. To disable, add `showScrollToTop = false` under `[params]`. 

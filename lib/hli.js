/* From https://github.com/clarketm/hugo-lunr-indexer */
const fs = require("fs");
const glob = require("glob");
const matter = require("gray-matter");
const toml = require("toml");
const removeMd = require("remove-markdown");
const striptags = require("striptags");
const path = require("path");

class HugoLunrIndexer {
  constructor() {
    this.list = [];
    this.input = "content/**";
    this.output = "public/lunr.json";
    this.language = "toml";

    // Input
    if (~process.argv.indexOf("-i")) {
      this.setInput(process.argv[process.argv.indexOf("-i") + 1]);
    }
    // Output
    if (~process.argv.indexOf("-o")) {
      this.setOutput(process.argv[process.argv.indexOf("-o") + 1]);
    }
    // Language
    if (~process.argv.indexOf("-l")) {
      this.setLanguage(process.argv[process.argv.indexOf("-l") + 1]);
    }
    // Delimiter
    if (~process.argv.indexOf("-d")) {
      this.setDelimiter(process.argv[process.argv.indexOf("-d") + 1]);
    }

    this.baseDir = path.dirname(this.input);
  }

  setInput(input) {
    this.input = input;
  }

  setOutput(output) {
    this.output = output;
  }

  setLanguage(language) {
    this.language = language;
  }

  setDelimiter(delimiter) {
    this.delimiter = delimiter;
  }

  setLanguageConfig(language, delimiter) {
    switch (true) {
      case language.toLowerCase() === "yaml":
        this.delimiter = delimiter || "---";
        this.languageConfig = {
          delims: this.delimiter,
          lang: "yaml"
        };
        break;
      default:
      case language.toLowerCase() === "toml":
        this.delimiter = delimiter || "+++";
        this.languageConfig = {
          delims: this.delimiter,
          lang: "toml",
          engines: {
            toml: toml.parse.bind(toml)
          }
        };
        break;
    }
  }

  index(input, output, language, delimiter) {
    if (input) {
      this.input = input;
    }

    if (output) {
      this.output = output;
    }

    if (language) {
      this.language = language;
    }

    if (delimiter) {
      this.delimiter = delimiter;
    }

    this.setLanguageConfig(this.language, this.delimiter);
    this.list = [];
    this.stream = fs.createWriteStream(this.output);
    this.readDirectory(this.input);
    this.stream.write(JSON.stringify(this.list, null, 4));
    this.stream.end();
  }

  readDirectory(path) {
    const files = glob.sync(path);
    const len = files.length;

    for (let i = 0; i < len; i++) {
      const stats = fs.lstatSync(files[i]);
      if (!stats.isDirectory()) {
        this.readFile(files[i]);
      }
    }
    return true;
  }

  readFile(filePath) {
    const ext = path.extname(filePath);
    const meta = matter.read(filePath, this.languageConfig);
    let plainText;

    if (meta.data.draft === true) {
      return;
    }

    if (ext === ".md") {
      plainText = removeMd(meta.content);
    } else {
      plainText = striptags(meta.content);
    }

    let uri = "/" + filePath.substring(0, filePath.lastIndexOf("."));
    uri = uri.replace(this.baseDir + "/", "");

    if (meta.data.slug !== undefined) {
      uri = path.dirname(uri) + "/" + meta.data.slug;
    }

    if (meta.data.url !== undefined) {
      uri = meta.data.url;
    }

    let tags = [];

    if (meta.data.tags !== undefined) {
      tags = meta.data.tags;
    }

    const item = {
      uri: uri,
      title: meta.data.title,
      content: plainText,
      tags: tags
    };

    this.list.push(item);
  }
}

hli = new HugoLunrIndexer();
hli.index();

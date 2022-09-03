#!/usr/bin/env python3

import glob
from pathlib import Path

files = glob.glob("org/**/*.org")

IS_DOOM_EMACS = True
EMACS_COMMAND = "emacs --batch -l ~/.emacs.d/init.el -l publish.el --eval \"(jethro/publish \"$in\")\""
DOOM_EMACS_COMMAND = "~/.emacs.d/bin/doomscript publish.doom $in"

with open('build.ninja', 'w') as ninja_file:
    ninja_file.write(f"""
rule org2md
  command = {DOOM_EMACS_COMMAND if IS_DOOM_EMACS else EMACS_COMMAND}
  description = org2md $in
""")
    
    for f in files:
        path = Path(f)
        output_file = f"content/posts/{path.with_suffix('.md').name}"
        ninja_file.write(f"""
build {output_file}: org2md {path}
""")

import subprocess
subprocess.call(["ninja"])

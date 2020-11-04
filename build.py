#! /usr/bin/env nix-shell
#! nix-shell -i python3 -p python3 ninja

import glob
from pathlib import Path

files = glob.glob("org/*.org")

with open('build.ninja', 'w') as ninja_file:
    ninja_file.write("""
rule org2md
  command = emacs --batch -l ~/.emacs.d/init.el -l publish.el --eval \"(jethro/publish \\"$in\\")"
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

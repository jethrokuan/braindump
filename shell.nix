with import <nixpkgs> {};

pkgs.mkShell {
  buildInputs = with pkgs; [
    hugo
  ];
  shellHook = ''
    alias start="hugo server -D --navigateToChanged"
  '';
}

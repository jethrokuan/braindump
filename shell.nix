with import <nixpkgs> {};

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    nodePackages.prettier
    hugo
  ];
  shellHook = ''
    alias start="hugo server"
  '';
}

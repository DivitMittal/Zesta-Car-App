{
  description = "Car License flake";

  outputs = inputs: let
    inherit (inputs.flake-parts.lib) mkFlake;
  in
    mkFlake {inherit inputs;} {
      systems = builtins.import inputs.systems;
      imports = [inputs.treefmt-nix.flakeModule];
      perSystem.treefmt = {
        projectRootFile = "flake.nix";

        flakeCheck = false;

        programs = {
          #typos.enable = true;
          ## Nix
          alejandra.enable = true;
          deadnix.enable = true;
          statix.enable = true;
          ## JSON/JS
          prettier.enable = true;
          ## Python
          black.enable = true;
        };
      };
    };

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
}

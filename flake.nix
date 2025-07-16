{
  description = "Website Devshell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {inherit system;};
      in
        with pkgs; {
          devShells.default = mkShell {
            buildInputs = [
              # Project Tools
              zsh # the shell
              ripgrep # just for the sake of highlighting
              tailwindcss_4
              nodejs
              docker # for running contanairing
              docker-compose # for running the containers
              qemu # for emulating ARM64
              git # version management
              nodePackages.typescript # typescript
              pnpm_10 # faster package management
              nodePackages.prettier # formatter
              # eslint
              eslint
              eslint_d
              # these help on nixos with potential deps errors
              # though might be unrelated to next.js
              llvmPackages_latest.llvm
              llvmPackages_latest.bintools
              llvmPackages_latest.lld
              openssl
              pkg-config
              zlib.out
              xorriso
              grub2
              cmake
              gcc
            ];

            shellHook = ''
              # set root path
              ROOT=$(pwd)

              # setup dependencies for frontend
              echo "Setup dependencies"
              pnpm install --silent
              echo "Nodejs updates: $(pnpm outdated)"
              echo ""

              # run in dev mode
              pnpm dev &>/dev/null 2>&1 &
              echo "Frontend started in dev mode."

              # run zsh in order to pause exec
              zsh

              # cleanup everything after running exit (quitting zsh shell)
              echo "Cleaning up..."
              # kill server
              killall tailwindcss &>/dev/null 2>&1
              killall pnpm &>/dev/null 2>&1
              killall node &>/dev/null 2>&1
              killall next-server &>/dev/null 2>&1
              echo "Server shutdown."
              echo "Exited"
              exit
            '';

            TO_EMAIL = "contact@adriancrismaruc.com";
            FROM_EMAIL = "contact@adriancrismaruc.com";
			NEXT_PUBLIC_SITE_URL = "https://adriancrismaruc.com";
          };

          # HACK: these don't actually have any effect (I don't think so at least), but they are here so you know what you need to do in your config
          # Docker setup
          user.extraGroups = ["docker"];

          virtualisation = {
            docker = {
              enable = true;
              autoPrune.enable = true;
              enableOnBoot = mkDefault false;
            };
          };

          # Emulating other architectures
          boot.binfmt.emulatedSystems = ["aarch64-linux" "x86_64-windows" "i686-linux"];
        }
    );
}

{
  description = "Portfolio Devshell";

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
              tailwindcss
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
              		 # ROOT=$(pwd)

              		 # setup dependencies for frontend
              # 		 echo "Setup dependencies for frontend"
              # 		 # npm install --silent
              # 		 # echo "Nodejs updates: $(npm update --dry-run | rg --color=never 'in \d+')"
              # 		 cd $ROOT
              # 		 echo ""
              #
              # 		 # setup dependencies for backend lambda
              # 		 echo "Setup dependencies for backend"
              # 		 cd $ROOT/backend/lambda
              # 		 cargo build --quiet --keep-going --profile dev &>/dev/null 2>&1 && echo "Cargo build local dev dependencies: OK" || echo "Cargo build local dev dependencies: FAIL"
              # 		 cargo lambda build --quiet --keep-going --arm64 --profile dev &>/dev/null 2>&1 && echo "Cargo build ARM64 dev dependencies: OK" || echo "Cargo build ARM64 dev dependencies: FAIL"
              # 		 echo "Cargo updates: $(cargo outdated --depth 1 --workspace --root .)"
              # 		 cd $ROOT
              # 		 echo ""
              #
              # 		 # run redis
              # 		 cd $ROOT/deployment/dev/redis
              # 		 docker compose up -d --quiet-pull &>/dev/null 2>&1
              # 		 echo "Redis started."
              # 		 cd $ROOT
              # 		 sleep 2 # make sure redis is up
              #
              # # run stripe forward
              # stripe listen --forward-to localhost:8080/webhook/stripe > /dev/null 2>&1 &
              #
              # 		 # run frontend (website) in dev mode
              # 		 cd $ROOT/frontend
              # 		 source ./scripts/set_dev_env.sh
              # 		 poetry run ./scripts/run_dev.sh &>/dev/null 2>&1
              # 		 echo "Frontend started in dev mode."
              # 		 cd $ROOT
              #
              # 		 # run zsh in order to pause exec and set some aliases
              # 		 ./scripts/zshi.sh "source scripts/aliases.zsh"
              #
              # 		 # cleanup everything after running exit (quitting zsh shell)
              # 		 echo "Cleaning up..."
              # 		 # stop redis
              # 		 cd deployment/dev/redis
              # 		 dokcer compose down &>/dev/null 2>&1
              # 		 cd ../../..
              # 		 echo "Redis shutdown."
              # 		 # kill frontend
              # 		 killall tailwindcss &>/dev/null 2>&1
              # 		 killall flask &>/dev/null 2>&1
              # killall esbuild &>/dev/null 2>&1
              # 		 echo "Frontend shutdown."
              # 		 echo "Exited"
              # 		 exit
            '';
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

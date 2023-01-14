# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/typescript-node/.devcontainer/base.Dockerfile

ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}


RUN su node -c "npm install -g pnpm"

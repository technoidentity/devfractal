# Getting Started

## Install pnpm

This repository uses [pnpm workspaces](https://pnpm.io/workspaces). Install
[pnpm](https://pnpm.io/installation) if you haven't already. If you have `node`
installed, you can install `pnpm` with the following command:

```bash
npm install -g pnpm
```

## Setup repository

Clone the repository and checkout the `develop` branch.

```bash
git clone git@github.com:technoidentity/devfractal.git --branch=develop # or
git clone https://github.com/technoidentity/devfractal.git --branch=develop
cd devfractal
```

## Contributing

Create a branch, install dependencies and build libraries:

```bash
git checkout -b <your-branch-name>
pnpm install
pnpm build:libs
```

Branch names should be descriptive. For example, if you are working on issue
#123, your branch name could be something like this:

```bash
git checkout -b fix-123-login-form-validation
```

or

```bash
git checkout -b feat-123-safer-queries
```

Your commit messages should be descriptive as well. DO NOT include feat/fix in
commit messages. DO NOT mention issue numbers in commit messages. You could
mention both in commit description. Follow the advice from
[tpope's note on commit messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

## Common commands

Look at the project's `package.json` "scripts" section to understand what these
scripts do.

Build libraries:

```bash
pnpm build:libs
```

In any project, you should be able to run the following commands.

type check your code:

```bash
pnpm types:dev
```

Check lint errors with the following command

```bash
pnpm lint
```

Build a library:

```bash
pnpm build
```

To run app(development server):

```bash
pnpm dev
```

Once you are done with your changes, run the following command to check if your
code is ready to be merged and send a PR to the `develop` branch.

```bash
pnpm validate
```

Your PR should mention the issue number in the description. For example, if you
are working on issue #123, your PR description should be something like this:

```md
Fixes #123

<description>
```

```md
Closes #123

<description>
```

You must maintain linear history. Please use `rebase` to incorporate any changes
from develop branch before sending a PR.

```bash
git checkout develop
git pull
git checkout <my-branch-name>
git rebase develop # fix any rebasing issues
git push -u origin <my-branch-name>
```

If you already have pushed changes to remote(origin), you might need

```bash
git pull --rebase
git push
```

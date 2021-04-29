# ILM

Development on ILM app

## Clone this repository

```bash
git clone https://github.com/pervezfunctor/ilm.git
```

*Optional*: If you have completed [SSH key setup](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account), you should clone using the  
following URL instead:

```bash
git clone git@github.com:pervezfunctor/ILM.git
```

## Prepare your app for development

```bash
  cd ILM/app
  git checkout -b <YOUR_BRANCH_NAME_HERE>
  yarn
  yarn validate
```

## Open code in VS Code

You can now open VS Code and start the https/development server

```bash
  code .
  # you can run this command in the terminal inside VS Code
  yarn start
```

## Pushing your changes

After you make commits and are ready to send pull request, please do the  
following:

```bash
  yarn && yarn validate  # fix any validation errors
  # git add ...
  # git commit ...
  git checkout master
  git pull
  git checkout <YOUR_BRANCH_NAME_HERE>
  git rebase master
```

If you get any merge conflicts, fix them and then run `git add .` &  
`git rebase --continue` to proceed. You can undo the rebase process using  
`git rebase --abort` if you don't know how to fix the conflicts.  

Once the conflicts have been resolved and rebase is complete, you can push the  
branch to Github:

```bash
 git push -u origin <YOUR_BRANCH_NAME_HERE>
```

Go to ILM project on Github to create a pull request.

## Clean up merged branches

Let us say your branch that got merged with `master` on Github is called  
`12-add-greet`. You can clean it up using the following commands.

```bash
git checkout master
# deletes your branch from your computer; if you an error here, it's probably
# not safe to delete the branch yet
git branch -d 12-add-greet
# deletes your branch from Github
git push origin --delete 12-add-greet
```

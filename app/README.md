# ILM

## Development on ILM App

1. Clone this repository

`git clone https://github.com/pervezfunctor/ilm.git`

2. Prepare your app for development

```
  cd app
  git checkout -b <YOUR_BRANCH_NAME_HERE>
  yarn
  yarn validate
```

3. You can now open vscode and start https server(development server)

```
  code .
  yarn start
```

4. After you make commits and ready to send pull request, please do the
   following

```
  git rebase master
  yarn
  yarn validate
  git push
```

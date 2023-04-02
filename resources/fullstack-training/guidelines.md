# Guidelines

1. Always make sure you rebase your branch with the latest changes from the main
   branch every morning.

   2. Also make sure, as soon as you rebase your branch to run the following
      command

```bash
pnpm install
```

2. Make sure prettier is working in vscode. If not, install the prettier
   extension.

3. Make sure you have no typescript errors. You can check type errors with the
   following command. Only use `any` as a last resort.

4. Make sure to use `zod` specifications to validate input errors which can't be
   enforced by typescript.

```bash
pnpm types
```

4. Make sure you don't have any eslint errors. If you do, fix them. Install the
   eslint extension if you don't have it. Run the following command to check for
   eslint errors.

```bash
pnpm lint
```

5. Make sure you have a test for every function you write. Also make sure you
   have no test failures. Run the following command to check for test failures.

```bash
pnpm test
```

6. Always write test cases for boundary conditions. Some examples are empty
   arrays or empty objects, 0, '', and where needed null, undefined, etc.

7. Unless you need state, prefer `Iterable` to arrays.

8. Prefer using higher order functions like `map`, `filter`, `reduce`
   over for loops.

9. Prefer using higher order functions like `map`, `filter`, `reduce`
   over for loops.

10. Prefer for-of loop to iterate over iterables including arrays and sets.

11. Use for-of(over Object.keys) instead for-in loop.

12. Prefer readonly arrays and readonly objects

13. Almost always specify return types for functions.

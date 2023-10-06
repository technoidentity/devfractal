### Typescript Best Practices

#### functional programming

1. Use immutable values everywhere.

2. Use `immer` for mutative operations.

3. Almost always making types `readonly`, including arrays.

4. Almost always use pure functions.

5. Remember that local mutation is fine.

#### Type safety

1. Make sure all code is strongly typed.

2. Use null coalescing operator(`??`) and optional chaining(`?.`) to deal with
   undefined.

3. Avoid type assertions(`as`). Use `zod` instead.

4. Avoid `any`. Use `zod` and `tiny-invariant` to assert assumptions and to fix
   type safety issues.

5. When necessary use `unknown` instead of `any`.

6. `any` is fine with generic constraints.

#### Javascript

1. Almost always specify return types for functions, especially reusable
   functions.

2. Use `Iterable/IterableIterator` instead of arrays wherever possible,
   especially as parameters and returning values from reusable functions.

3. Remember generator functions return mutable Iterables.

4. Return arrays as mutable(`T[]`) from reusable functions.

5. Always return tuples as const(`readonly [Foo, Bar]`).

6. Prefer for-of loops over for loops. Use for-of(over `Object.keys`) instead of
   for-in loop. Also, avoid `forEach``.

7. Avoid invariants in library code.

8. Prefer using objects as parameters to functions instead of multiple
   parameters.

### Asynchrony

1. Prefer async/await to promise chaining with `then`.

2. Throw exceptions. Don't use `catch`.

3. Prefer `for await of` and async iterable where possible.

4. Avoid floating promises.

5. Always handle promise errors at boundaries. Create and use a reusable layer
   for handling errors at boundaries.

### React Best Practices

1. Use React.ComponentProps type for HTML elements and React components.

2. Organize folders by feature(domain) instead of by type(components, hooks,
   routes etc).

3. Use Suspense. Use Loading components judiciously.

4. Use Error Boundaries. Use `react-error-boundary`. Use `react-error-overlay`
   for dev.

5. Make sure you have Suspense/ErrorBoundary components judiciously placed at
   strategic locations. Generally always use both at the same place.

6. Throw exceptions. Handle them appropriately at error boundaries, for example
   at the page level. Use `showBoundary` function from `react-error-boundary` to
   throw exceptions from event handlers.

7. Reusable components should be controlled components.

8. Prefer uncontrolled components for page-level components or 'app' components.

9. Always use `key` attribute for lists.

10. Nearly never use `useEffect`, if you do, always encapsulate it.

11. Prefer event handlers for side effects, avoid `useEffect`.

12. Understand the advantages of colocation.

13. Don't use any `Javascript/Typescript` in JSX, except the following

    1. Simple one-line lambda expressions.
    2. Conditional operators(&&, ||, ??) and ternary operator
    3. Higher order function `map`.

14. Don't put a lot of `Javascript/Typescript` in components. Use hooks instead.

### React State Management Best Practices

1. Avoid redux.

2. Avoid state as much as possible. Prefer storing state in `route`, use
   `loader/action` or `react-query` for server state.

3. Avoid `Context`.

4. Retain view state in components using `state` function.

5. If state transitions are as simple as updating a single field, use
   `useUpdateState`.

6. use `state` function to avoid stale closures problems. In rare cases use
   `useEvent`.

7. Retain shared state in a parent component. Use `state` function and do prop
   drilling. If necessary, use `tree` state.

8. For page state use URL, use `global-state` only when necessary.

9. You can use `Context` for sharing rarely changing values like theme or
   creating an HTML-like API. Use `tree`.

10. For global state use `global-state` library and signals.

11. Store rarely changing config state in context.

12. Store auth state in context.

13. Avoid using useState. Use state function library or use useReducer

14. Use `useInt`, `useString` etc for storing one-off primitive values.

15. Avoid `useEffect` for the synchronizing state. Use `useSignal` instead.

16. Don't synchronize the state with props. Use `key` attribute instead.

### React Performance

1. Split components according to state, to avoid unnecessary renders.

2. Store state in the component close to where it is used.

3. Use `useMemo` for expensive computations.

4. Use `useEvent` for callbacks where necessary.

5. Use the `children` trick to avoid rerenders when necessary.

6. Prefer `lazy` loading pages.

7. Use virtual lists for rendering large lists.

8. Split actions and values in separate contexts.

9. Use `useDeferredEvent` for transitions or avoid flickering due to `Suspense`.
   Use `useDeferredValue` when necessary.

### Server State Management

1. Manipulate server state with either `@tanstack/react-query` or
   `react-router`\`s `loader` and `action`.

2. Identify queries and mutations cohesion.

3. Don't fetch in top-level components unless avoiding waterfalls is necessary.
   Always fetch exactly where needed.

4. Try fixing waterfalls with react-router's 'loader' and/or react-query's
   `useQueries`.

5. If possible, centralize query objects passed to react-query.

6. Identify all queries affected by mutations and invalidate them.

7. When using mutations, consider optimistic updates.

8. Use `useTransition`/`useDeferredEvent` and loading indicators with
   `isPending`.

9. Use toasts for failed optimistic mutations.

10. Prefer pagination to infinite scrolling.

### External Systems

1. Use `zod` for all API call responses.

2. Use `zod` for pathnames, search params, local storage etc.

3. Use `zod` for form validation.

4. Prefer `form` HTML element for API mutations.

5. Use `zod` to parse `FormData`.

### CSS

1. Avoid margin. Consider using `gap` more often.

2. Use semantic HTML where possible.

3. Avoid using Tailwind’s square bracket notation as much as possible.

4. Avoid using specific color values.

5. Avoid png files.

6. Do not inline `svg` code.

7. Use flexbox components for components and simple layouts.

8. Use css grid for page layouts or complex layouts.

9. Use `cn`(`clsx`) for conditional styling.

10. Allow overriding styles using `className` for reusable components.

11. Consider using `cva` for creating reusable components with lot's of
    variations.

12. Make sure you split your components similar to how you split your functions.

13. Use `ui` library for at least form controls, date picker, Card, Dialog etc,
    wherever accessibility is important.

### playwright

1. Follow
   [playwright best practices](https://playwright.dev/docs/best-practices).

2. Use locator.fill instead of locator.type.

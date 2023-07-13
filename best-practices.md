### Typescript Best Practices

1. Use immutable values.
2. Prefer making types `readonly`, including arrays.
3. Prefer pure functions.
4. Local mutation is fine.
5. Use Iterable/IterableIterator instead of arrays wherever possible. Especially
   as arguments and return from reusable functions.
6. Remember generator functions return mutable Iterables.
7. Return arrays as mutable from reusable functions.
8. Always return tuples as const.
9. Make sure all code is strongly typed.
10. Avoid type assertions(`as`). Use `zod` instead.
11. Use null coalescing operator(`??`) and optional chaining(`?.`) to deal with
    undefined. Or use `tiny-invariant`/`zod`.
12. Avoid `any`. Use `unknown` instead.
13. When in doubt, use `zod` for runtime type checking.
14. When in doubt, use `tiny-invariant` for runtime assertions.
15. Prefer for-of loops over for loops.
16. Use for-of(over Object.keys) instead of for-in loop.
17. Prefer for-of over foreach.
18. Almost always specify return types for functions.
19. Use `zod` and `tiny-invariant` to assert assumptions and to fix typesafety.
    issues. Never use `any`.
20. Generally, avoid invariants in library code.

## Asynchrony

1. Prefer async/await to promises.
2. Prefer for await of and async iterables where possible.
3. Avoid floating promises.
4. Always handle promise errors at boundaries. Create and use a reusable layer
   for handling errors at boundaries.

### React Best Practices

1. Use React.ComponentProps for HTML elements and React components.
2. Organize folders by feature(domain) instead of by type(components, hooks,
   routes etc).
3. Use Suspense. Use Loading components judicisously.
4. Use Error Boundaries. Use `react-error-boundary`. Use `react-error-overlay`
   for dev.
5. Make sure you have Suspense/ErrorBoundary components judiciously placed at
   strategic locations.
6. Throw exceptions. Handle them appropriately at error boundaries, for example
   at the page level. Use `react-error-boundary` to throw exceptions from event
   handlers.
7. Reusable components should be controlled components.
8. Prefer uncontrolled components for page level components or 'app' components.
9. Always use `key` attribute for lists.
10. Nearly never use useEffect, if you do, always encapsulate it.
11. Prefer event handlers for side effects. Not useEffect.
12. Understand the advantages of colocation.

### React State Management Best Practices

1. Avoid redux.
2. Retain view state in components.
3. Retain shared state in a parent component.
4. Retain sub tree state in context especially if need UI API like html.
5. For page state use url. Use Jotai only if needed, avoid context.
6. For global state use global-state library and signals.
7. Store rarely changing config state in cotext.
8. Store auth state in context.
9. Avoid using useState. Use local-state library or use useReducer
10. If using useState, use function form of setState: setFoo(old => old / 2)
11. Avoid stales closures problem. use `useEvent`.
12. Avoid useEffect for synchronizing state. Use `useSignal` instead.
13. Don't synchronize state with props. Use `key` attribute trick instead.
14. Remember each component is nothing more than a 'pure render' and 'side
    effects' using hooks. Effects include state, asynchrony(event handlers, API
    calls), external world like local storage.

### React Performance

1. Split components according to state, to avoid unnecessary renders.
2. Store state in component close to where it is used.
3. Use `useMemo` for expensive computations.
4. Use `useEvent` for callbacks where necessary.
5. Use `children` trick to avoid rerenders when necessary.
6. Consider `lazy` loading.
7. Use virtual list for large lists.
8. Split actions and values in separate contexts.

### Fetch

1. Fetch data either using `@tanstack/react-query` or use `react-router``s
   loader and mutations.
2. Identity queries and mutation cohesion.
3. Don't fetch in the top level components unless avoiding waterfalls is
   necessary. Always fetch exactly where needed.
4. Try fixing waterfalls with react-router's 'loader'.
5. Or use Suspense with ` react-query``s  `useQueryies`.
6. If possible, centralize query objects passed to react-query.
7. Identify all queries effected by mutations and invalidate them.
8. Prefer `loaders` to `useQuery` where possible.
9. When using mutations, consider optimistic update.
10. Use useTransistion and loading indicators.
11. Use toasts for failed mutations.
12. Prefer pagination to infinite scrolling.

### External World

3. Use `zod` for all API call responses.
4. Use `zod` for pathnames, query params, local storage etc.
5. Use `zod` for form validation.
6. Use `form` for all API mutations.
7. Use `zod` to parse FormData.

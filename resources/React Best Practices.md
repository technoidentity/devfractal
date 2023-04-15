React State Management Best Practices

1. Retain view state in component
2. Retain shared state in parent component
3. Prefer useReducer
4. Retain sub tree external UI API in context
5. For page state use context or jotai
6. Use Jotai for app state
7. Store config state in context
8. If using useState, use function form of setState: setFoo(old => old / 2)
9. Nearly never use useEffect, if you do, always encapsulate it
10. Remember each component is pure render and effects

_Note: Effects include asynchrony(event handlers, ajax), external world and
state_

React Best Practices

1. Use Suspense. Use Loading components judicisously
2. Use Error Boundaries. Use `react-error-boundary`. Use `react-error-overlay`
   for dev
3. Throw exceptions. Handle them appropriately at error boundaries, for example
   at the page level.
4. Avoid using useState. Either use useReducer or signals.
5. Avoid redux.
6. Fetch data either using `@tanstack/react-query` or use `react-router``s
   loader and mutations.
7. Don't fetch in the top level components. Always fetch exactly where needed.
8. If needed, centralize query objects passed to react-query.
9. Use `zod` and `tiny-invariant` to assert assumptions and to fix typesafety
   issues. Never use `any`.
10. Avoid useEffect for synchronizing state. Use `useSignal` instead.
11. Understand the benefits of colocation.
12. Drop 'momoent'. Use 'dayjs'.
13. Drop 'create-react-app'. Use 'vite'.
14. Use 'prettier' consistently. Have a cd step for linting and typechecking.

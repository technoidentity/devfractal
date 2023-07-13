# Devfractal

`devfractal` is a library for creating web applications using react and node. It
has the following goals.

1. to help you write good software by default, software that's simple, correct,
   generic and fast.

2. to be kind to developers of all skill levels.

3. best practices must be simpler to follow than to break. Best practices will
   be based on current wisdom of the react community.

4. not to reinvent the wheel unless required. Most of the utilities are thin
   wrappers over popular modern libraries.

### `local-state` library

1.  **state**: Use this when you have complex state management.

    - You will avoid a lot of pitfalls with react like stale closures.
    - state management is separated from the component, allowing components to
      be simpler.
    - event handlers are safer, simpler and faster(avoid rerenders).
    - based on useReducer.
    - uses immer.

2.  **useEvent**: no need to worry about useCallback or dependency array.

3.  **tree**: same as **state**, except you could share state within a tree.
    Avoids all pitfalls of using `Context`.

4.  hooks for collections: `useArray`, `useSet`, `useMap` for rare occasions
    where performance is everything.

    - Internally maintains a mutable collection. You don't have to worry about
      it as behaves the same as an immutable collection and works well with the
      react model.

5.  hooks for simpler scenarios: `useInt`, `useBoolean` etc and `useUpdate` when
    you need **state** but doesn't have any logic.

### `global-state` library

1.  Simple **atom/computed/action** abstraction remaining closer to true
    reactive model.

2.  **slice**: similar to **state** above, only global.

3.  Avoids lots of issues with atom-based libraries like jotai.

4.  **hooks-based API**: You could easily construct an excellent hook-based API,
    where **state** could be
    - shared in a tree of components
    - used for a complex reusable component
    - global

### `endpoint` abstraction

**path** and **endpoints** as zod specifications would allow making router,
server-side API and client-side API access functions safer(static as well as
runtime typesafe) and simpler. These abstractions will help you in the following
libraries.

### `query-state` library

1. Uses `@tanstack/react-query`, so comes with all of its advantages.

2. No need to worry about spinners/loaders or error handling in every component.
   Just worry about the happy path.

3. Safe **http** operations, currently using `redaxios` and `zod`.

4. Safe query operations.

5. **Optimistic updates**: Also supports mutations by returning descriptions.

6. **queryState** similar to slice and state

7. Good defaults for **queryClient** and **QueryProvider**.

8. Integrates react-router's **loader** and **query** so that you get all of the
   benefits of **loader** as well as `react-query`.

9. queries and mutations based on endpoint abstraction.

10. rest API abstraction using path, and endpoint abstraction. Allows
    declarative API access

### `router` library

1. route abstraction. Allows safe and declarative configuration of routes.

2. public and protected routes.

3. safe access to params and search.

4. `routerState` is similar to state/slice.

5. queries and mutations using endpoint abstraction.

### `validator` library

simplified and generic validation helpers using zod. This will allow many of the
following scenarios. Strict zod validation is usually not suitable.

## `forms` library(mantine based)

1. Integrate state, validation and above UI components.
2. Support common patterns for forms.

## `table` library(mantine based)

1. client-side table.

2. server-side table.

3. Support most common operations like filtering, ordering, selection, and
   actions etc.

4. Allow both paging and infinite scrolling.

5. Fast rendering, even with thousands of rows.

6. Fast data manipulation, even with hundreds of thousands of rows.

### `fn` library

1. Support lazy evaluation of higher-order functions

2. Support most common functions including database-like operations

3. Support for internalization of dates through adobe date library

### `spec` library

1. Common abstractions to use specifications using zod. This has small helpers
   which will allow you to write software similar to Eiffel.

2. Makes your pure functions safer by allowing you to satisfy the specification
   accurately.

### `remix` helpers

1. Helpers for creating actions.

2. Helpers for forms and form validations.

3. Abstractions for responses and **json** transformers.

### Error handling support

1. Almost all abstractions are designed with error handling in mind and strive
   to be safe using zod specifications.

2. Wrap up almost every external system to allow for zod specification
   validations. All of your code will be typesafe.

3. Support `Result` abstraction from the functional world for complex error
   handling scenarios.

4. Integrate exception handling with **result** using Scala like abstraction
   **Try**.

_Lots of examples are available and are planned for all of the above
abstractions._

## Partial implementation

### `ui` library

1. Use headless components for accessible components: radix-ui.

2. Integrate with a tailwind for themeable and extensible components

3. Use shadcn/ui for most `ui` components.

### `server`(mini trpc) library

1. Use `endpoint` abstraction to implement server-side calls using express.

2. query/path and body validation.

3. Automatic Error handling similar to Java/C# frameworks.

4. Typsafe client code which always remains in sync with the server API. Similar
   to `trpc`.

## Planned

### `ui-form` library

Integration of form and ui library.

### `ui-table` library

Integration of table and `ui` libraries.

### `auth` library

1. Support authentication and authorization.

2. Support abstractions for both server-side as well as client-side.

3. RBAC: role-based authorization and control.

### `router` library

- safe route paths

## Starter projects

1. All of the above libraries and best practices will be made available through
   starter projects, including vite, express, remix, and next.

2. Have a single configuration file to configure all libraries. Think theme but
   for code.

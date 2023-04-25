### Correctness

1.  Make sure the code is simple and there's no unnecessary complexity.
2.  Make sure data is either immutable or not shared.
3.  All global data should be immutable.
4.  Mutability is handled through pointers.
5.  Make sure the code is as strongly typed as possible. There are no uses of
    'top' type like 'any' or 'object'.
6.  MAke sure computations are pure functions. There are no side effects like
    mutating global state or making network requests.
7.  Make sure effect functions have no computation/logic.

### Error Handling

1. Make sure application level code throws exceptions on error. Have exception
   handlers placed at strategic locations.

2. Make sure invariants are in place. For eg: all arguments are validated. Make
   sure these errors are not usually handled as they are not recoverable.

3. Make sure all recoverable errors are properly handled. Use of Result type is
   encouraged and try/catch is discouraged.

4. Make sure absence of value is represented using Option type.

5. Make sure all data from external world, like user input, network requests,
   etc are fully validated. All validation must happen at boundaries.

### Generic

1. Make sure reusbale code is extracted into functions and modules.

2. Make sure reusable code is well typed, well tested and well documented. These
   functions usually should not include invariants. Use result type to raise
   errors.

3. Create reusable best practices patterns in code. It should be simpler to
   follow best practices than to not follow them.

4. Make sure existing internal reusable libraries are used instead of
   duplicating code.

### Concurrency

1. Use single ownership model, or immutable data structures.
2. Make sure there are no blocking functions.
3. Make sure there is no shared mutable state.
4. Make sure there are no locks. Unless it's very low level code and it's local.
5. Use simple Tasks where possible for asynchronous tasks(io or compute). Return
   Futures/Tasks/Promises.
6. DO NOT create threads. Use Tasks(or threadpools) instead.
7. Prefer channels or async enumerable if available.
8. Make sure asynchronous code and parallel code are separated.

### Testing

1.  Make sure all complex code has accompanying tests.
2.  Make sure all user facing API's have integration tests.
3.  Make sure all developer facing API's have unit tests.

### Performance

1.  Make sure there are no obvious performance concerns.
2.  Make sure algorithms with right time complexity are used.
3.  Make sure immutability doesn't cause serious performance concerns.

### Make sure the code passes all CI/CD checks.

1.  Make sure the code is formatted correctly.
2.  Make sure the code passes all unit and integrations tests.
3.  Make sure the code passes all linting checks.
4.  Make sure the code passes all typesafety checks.

### Metrics

Make sure code quality metrics are no worse. This includes things like

1. code coverage,
2. cyclomatic complexity
3. code duplication

### Miscellaneous

1. See if there are any naming inconsistencies.

2. Are comments essential? Can the code be simplified instead?

3. Make sure third party libraries included are essential. Discourage use of
   libraries that are not essential.

4. If any configuration is needed, make sure it's well documented in README.

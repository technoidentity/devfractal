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

*Note: Effects include asynchrony(event handlers, ajax), external world and state*

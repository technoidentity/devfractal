export function createStore<T>(reducer: Function, initial: T) {
  let state = initial
  let listeners: Function[] = []
  return {
    dispatch(...args: any[]) {
      state = reducer(state, ...args)
      listeners.forEach(l => l(state))
    },
    subscribe(listener: any) {
      listeners.push(listener)
    },
    unsubscribe(listener: Function) {
      listeners = listeners.filter(l => l !== listener)
    },
    getState() {
      return state
    },
  }
}

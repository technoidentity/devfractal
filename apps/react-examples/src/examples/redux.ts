type Fn = (...args: any[]) => any
export function createStore<T>(reducer: Fn, initial: T) {
  type Listener = (state: T) => void
  let state = initial
  let listeners: Listener[] = []
  return {
    dispatch(...args: any[]) {
      state = reducer(state, ...args)
      listeners.forEach(l => l(state))
    },

    subscribe(listener: any) {
      listeners.push(listener)
    },

    unsubscribe(listener: Fn) {
      listeners = listeners.filter(l => l !== listener)
    },

    getState() {
      return state
    },
  }
}

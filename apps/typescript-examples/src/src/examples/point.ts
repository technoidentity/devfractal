export function point(_x = 0, _y = 0) {
  const moveBy = (dx: number, dy: number) => {
    _x += dx
    _y += dy
  }
  const distanceFromOrigin = () => Math.sqrt(_x * _x + _y * _y)
  const x = () => _x
  const y = () => _y

  return { x, y, moveBy, distanceFromOrigin }
}

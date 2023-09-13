export type Rect = {
  kind: 'rect'
  width: number
  height: number
}

export type Circle = {
  kind: 'circle'
  radius: number
}

export type Triangle = {
  kind: 'triangle'
  base: number
  height: number
}

export type Shape = Rect | Circle | Triangle

export function area(shp: Shape): number {
  switch (shp.kind) {
    case 'circle':
      return shp.radius * shp.radius * 3.14
    case 'rect':
      return shp.width * shp.height
    case 'triangle':
      return shp.base * shp.height * 0.5
  }
}

import type { ComponentProps, ComponentType } from 'react'
import { memo } from 'react'

export const safeMemo: <
  Component extends ComponentType<any>,
  P = ComponentProps<Component>,
>(
  c: Component,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
) => Component = memo

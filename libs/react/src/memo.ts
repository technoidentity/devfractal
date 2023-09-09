import type { ComponentProps, ComponentType } from 'react'
import React from 'react'

export const memo: <
  Component extends ComponentType<any>,
  P = ComponentProps<Component>,
>(
  c: Component,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
) => Component = React.memo

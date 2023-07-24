import React from 'react'

type ForwardRef = <T, P = object>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
) => (props: P & React.RefAttributes<T>) => React.ReactNode

export const forwardRef = React.forwardRef as ForwardRef

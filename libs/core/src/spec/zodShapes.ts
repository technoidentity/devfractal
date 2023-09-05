import { z } from 'zod'

// @TODO: ZodEFfect not handled?

// partial() is not supported

type ZodShapes =
  | z.ZodRawShape
  | z.ZodDefault<any>
  | z.ZodObject<any, any>
  | z.ZodNullable<any>
  | z.ZodOptional<any>
  | z.ZodReadonly<any>
  | z.ZodEffects<any>

export type UnwrapZodShape<T extends ZodShapes> = T extends z.ZodRawShape
  ? T
  : T extends z.ZodOptional<z.ZodObject<infer U>>
  ? U
  : T extends z.ZodNullable<z.ZodObject<infer U>>
  ? U
  : T extends z.ZodReadonly<z.ZodObject<infer U>>
  ? U
  : T extends z.ZodEffects<z.ZodObject<infer U>>
  ? U
  : T extends z.ZodObject<infer U>
  ? U
  : T extends z.ZodOptional<infer U>
  ? UnwrapZodShape<U>
  : T extends z.ZodNullable<infer U>
  ? UnwrapZodShape<U>
  : T extends z.ZodReadonly<infer U>
  ? UnwrapZodShape<U>
  : T extends z.ZodEffects<infer U>
  ? UnwrapZodShape<U>
  : never

export const unwrapZodShape = <T extends ZodShapes>(
  type: T,
): UnwrapZodShape<T> => {
  if (type instanceof z.ZodObject) {
    return type.shape
  }

  if (type instanceof z.ZodOptional) {
    return unwrapZodShape(type.unwrap())
  }

  if (type instanceof z.ZodNullable) {
    return unwrapZodShape(type.unwrap())
  }

  if (type instanceof z.ZodDefault) {
    return unwrapZodShape(type.removeDefault())
  }

  if (type instanceof z.ZodReadonly) {
    return unwrapZodShape(type._def.innerType)
  }

  if (type instanceof z.ZodEffects) {
    return unwrapZodShape(type._def.schema)
  }

  return type as any
}

type ZodFields =
  | z.ZodDefault<any>
  | z.ZodNullable<any>
  | z.ZodOptional<any>
  | z.ZodTypeAny

export type RemoveReadonly<T extends ZodFields> = T extends z.ZodReadonly<
  infer U
>
  ? U
  : T

export type UnwrapZodField<T extends ZodFields> = T extends z.ZodNullable<
  infer U
>
  ? UnwrapZodField<U>
  : T extends z.ZodOptional<infer U>
  ? UnwrapZodField<U>
  : T extends z.ZodDefault<infer U>
  ? UnwrapZodField<U>
  : T extends z.ZodTypeAny
  ? T
  : never

// Readonly must be last for this to work

export const unwrapZodField = <T extends ZodFields>(
  type: T,
): UnwrapZodField<RemoveReadonly<T>> => {
  if (type instanceof z.ZodReadonly) {
    return unwrapZodField(type._def.innerType)
  }

  if (type instanceof z.ZodOptional) {
    return unwrapZodField(type.unwrap())
  }

  if (type instanceof z.ZodNullable) {
    return unwrapZodField(type.unwrap())
  }

  if (type instanceof z.ZodDefault) {
    return unwrapZodField(type.removeDefault())
  }

  return type as any
}

export const getUnwrappedField = <
  T extends ZodShapes,
  Field extends keyof UnwrapZodShape<T>,
>(
  type: T,
  field: Field,
): UnwrapZodField<RemoveReadonly<UnwrapZodShape<T>[Field]>> => {
  const rawShape = unwrapZodShape(type)
  return unwrapZodField(rawShape[field])
}

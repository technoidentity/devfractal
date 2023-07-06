import { z } from 'zod'

export type ZodShapes =
  | z.ZodRawShape
  | z.ZodDefault<any>
  | z.ZodObject<any, any>
  | z.ZodNullable<any>
  | z.ZodOptional<any>
  | z.ZodOptional<z.ZodNullable<any>>

type UnwrapZodShape<T extends ZodShapes> = T extends z.ZodRawShape
  ? T
  : T extends z.ZodOptional<z.ZodNullable<z.ZodObject<infer U>>>
  ? U
  : T extends z.ZodNullable<z.ZodObject<infer U>>
  ? U
  : T extends z.ZodOptional<z.ZodObject<infer U>>
  ? U
  : T extends z.ZodDefault<z.ZodObject<infer U>>
  ? U
  : T extends z.ZodObject<infer U>
  ? U
  : never

const unwrapZodShape = <T extends ZodShapes>(type: T): UnwrapZodShape<T> => {
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

  return type as any
}

export type ZodFields =
  | z.ZodTypeAny
  | z.ZodDefault<any>
  | z.ZodNullable<any>
  | z.ZodOptional<any>
  | z.ZodOptional<z.ZodNullable<any>>

type UnwrapZodField<T extends ZodFields> = T extends z.ZodOptional<
  z.ZodNullable<infer U>
>
  ? U
  : T extends z.ZodNullable<infer U>
  ? U
  : T extends z.ZodOptional<infer U>
  ? U
  : T extends z.ZodDefault<infer U>
  ? U
  : T extends z.ZodTypeAny
  ? T
  : never

const unwrapZodField = <T extends ZodFields>(type: T): UnwrapZodField<T> => {
  if (type instanceof z.ZodObject) {
    return type.shape
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

export const getunwrappedField = <
  T extends ZodShapes,
  Field extends keyof UnwrapZodShape<T>,
>(
  type: T,
  field: Field,
): UnwrapZodField<UnwrapZodShape<T>[Field]> => {
  const rawShape = unwrapZodShape(type)
  return unwrapZodField(rawShape[field])
}

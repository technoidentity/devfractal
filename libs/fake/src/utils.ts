import { z } from "zod";

export const isZodTypeDef = <T extends z.ZodTypeDef>(schemaDef:z.ZodTypeDef,):schemaDef is T => "typeName" in schemaDef ;
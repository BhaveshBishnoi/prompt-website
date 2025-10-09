import { z } from "zod";

export function parseWithZod<TSchema extends z.ZodTypeAny>(schema: TSchema, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    const error = new Error(message);
    (error as any).status = 400;
    throw error;
  }
  return result.data as z.infer<TSchema>;
}



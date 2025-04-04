import { z, ZodSchema } from "zod";
import { CreateClientOptions, Response } from "./lib/types.js";

export function createClient<C extends object = {}>({
  middleware,
  context,
  onError,
}: CreateClientOptions<C>) {
  return function createServerAction<S extends ZodSchema, R = undefined>(
    schema: S,
    handler: (values: z.infer<S>, context: C) => Promise<Response<S, R>>,
  ) {
    return async function serverAction(
      prev: Response<S, R>,
      data: FormData,
    ): Promise<Response<S, R>> {
      if (middleware) {
        const m = await middleware();

        if (m) {
          return {
            ok: false,
            message: m.message,
          };
        }
      }

      // map the form data to object
      const obj = Object.fromEntries(data);
      const parsed = schema.safeParse(obj);

      if (!parsed.success) {
        return {
          ok: false,
          errors: parsed.error.flatten().fieldErrors,
        };
      }

      if (context) {
        const c = await context();

        if (c) {
          return handler(parsed.data, c).catch((e) => {
            if (onError) onError(e);

            return { ok: false };
          });
        }
      }

      return handler(parsed.data, {} as C).catch((e) => {
        if (onError) onError(e);

        return { ok: false };
      });
    };
  };
}

import { z, ZodSchema } from "zod";
import {
  CreateClientOptions,
  CreateServerActionOptions,
  Response,
} from "./lib/types.js";

export function createClient({ middleware }: CreateClientOptions) {
  return function createServerAction<S extends ZodSchema>(
    schema: S,
    handler: (
      values: z.infer<S>,
      options?: CreateServerActionOptions,
    ) => Promise<Response<S>>,
    options?: CreateServerActionOptions,
  ) {
    return async function serverAction(
      prev: Response<S>,
      data: FormData,
    ): Promise<Response<S>> {
      if (middleware) {
        const middlewareResponse = middleware();

        if (middlewareResponse) {
          return {
            ok: false,
            response: middlewareResponse.message,
            values: options?.clear ? {} : prev.values,
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
          values: options?.clear ? {} : prev.values,
        };
      }

      return handler(parsed.data, options);
    };
  };
}

import { z, ZodSchema } from "zod";

// RESPONSE
export type ErrorResponse<S extends ZodSchema> = {
  ok: false;
  message?: string;
  errors?: { [K in keyof z.infer<S>]?: string[] };
  values?: Partial<z.infer<S>>;
};

export type SuccessResponse<R> = {
  ok: true;
} & (R extends undefined ? {} : { response: R });

export type Response<S extends ZodSchema, R = undefined> =
  | ErrorResponse<S>
  | SuccessResponse<R>;

// MIDDLEWARE
export type MiddlewareResponse = {
  message: string;
} | void;

// CLIENT
export interface CreateClientOptions<C extends object = {}> {
  middleware?: () => Promise<MiddlewareResponse>;
  context?: () => Promise<C>;
  onError?: (e: unknown) => Promise<void>;
}

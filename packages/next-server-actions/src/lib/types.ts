import { z, ZodSchema } from "zod";

// RESPONSE
export type Response<S extends ZodSchema, R = unknown> = {
  ok: boolean;
  response?: R;
  message?: string;
  errors?: { [K in keyof z.infer<S>]?: string[] };
  values?: Partial<z.infer<S>>;
};

// MIDDLEWARE
export type MiddlewareResponse = MiddlewareBreakResponse | void;

interface MiddlewareBreakResponse {
  message: string;
}

// CLIENT
export interface CreateClientOptions<C extends object = {}> {
  middleware?: () => Promise<MiddlewareResponse>;
  context?: () => Promise<C>;
  onError?: (e: unknown) => Promise<void>;
}

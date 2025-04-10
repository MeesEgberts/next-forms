import { z, ZodSchema } from "zod";

// RESPONSE
export type Response<S extends ZodSchema, R = object> = {
  ok: boolean;
  message?: string | { title: string; description: string };
  errors?: { [K in keyof z.infer<S>]?: string[] };
  values?: Partial<z.infer<S>>;
  response?: R;
};

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

// this is new
export interface CreateServerActionOptions {
  clear?: boolean;
}

import { z, ZodSchema } from "zod";

// RESPONSE
export type Response<S extends ZodSchema> = {
  ok: boolean;
  response?: string;
  errors?: { [K in keyof z.infer<S>]?: string[] };
  values?: Partial<z.infer<S>>;
};

// MIDDLEWARE
export type MiddlewareResponse = MiddlewareBreakResponse | void;

interface MiddlewareBreakResponse {
  message: string;
}

// CLIENT
export interface CreateClientOptions {
  middleware?: () => MiddlewareResponse;
}

export interface CreateServerActionOptions {
  clear?: boolean;
}

"use server";

import { createServerAction } from "../utils/server-actions";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signIn = createServerAction<typeof schema>(
  schema,
  async (values) => {
    return { ok: true, values };
  },
  { clear: false },
);

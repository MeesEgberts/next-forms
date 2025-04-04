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
    // return a message that can display in the UI
    return { ok: false, message: "error message" };
  },
);

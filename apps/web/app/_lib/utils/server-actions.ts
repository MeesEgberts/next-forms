import { createClient } from "next-forms";

export const createServerAction = createClient({
  middleware: () => {
    const isAuthenticated = false; // replace with actual authentication logic

    if (!isAuthenticated) {
      return {
        message: "unauthorized",
      };
    }
  },
});

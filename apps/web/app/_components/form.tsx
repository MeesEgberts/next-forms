"use client";

import Form from "next/form";
import { useActionState, useEffect } from "react";
import { signIn } from "../_lib/actions/example";

export function ExampleForm() {
  const [state, action, pending] = useActionState(signIn, {
    ok: false,
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Form action={action}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />

      <br />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />

      <hr />

      <button type="submit" disabled={pending}>
        Submit
      </button>
    </Form>
  );
}

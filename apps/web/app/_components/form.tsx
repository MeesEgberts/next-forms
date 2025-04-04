"use client";

import Form from "next/form";
import { useActionState } from "react";
import { signIn } from "../_lib/actions/sign-in";

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, {
    ok: false,
  });

  return (
    <Form action={action}>
      {!state.ok && state.message && <p>{state.message}</p>}

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />

      <br />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />

      <hr />

      <button type="submit">Submit</button>
    </Form>
  );
}

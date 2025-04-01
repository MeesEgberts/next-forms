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
      {!state.ok && state.response && <p>{state.response}</p>}

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      {state.errors?.email?.map((error) => <p key={error}>{error}</p>)}

      <br />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />

      <hr />

      <button type="submit">Submit</button>
    </Form>
  );
}

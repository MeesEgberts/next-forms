"use client";

import Form from "next/form";
import { useActionState } from "react";
import { signIn } from "../_lib/actions/example";

export function ExampleForm() {
  const [state, action, pending] = useActionState(signIn, {
    ok: false,
  });

  return (
    <Form action={action} noValidate>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      {state.errors?.email?.map((error) => (
        <p key={error} style={{ color: "red" }}>
          {error}
        </p>
      ))}
      <br />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      {state.errors?.password?.map((error) => (
        <p key={error} style={{ color: "red" }}>
          {error}
        </p>
      ))}
      <hr />

      <button type="submit" disabled={pending}>
        Submit
      </button>
    </Form>
  );
}

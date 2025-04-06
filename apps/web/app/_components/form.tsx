"use client";

import Form from "next/form";
import { useActionState } from "react";
import { signIn } from "../_lib/actions/sign-in";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@web/app/_components/form-field";
import { Input } from "@web/components/ui/input";
import { Button } from "@web/components/ui/button";

type Schema = {
  email: string;
  password: string;
};

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, {
    ok: false,
  });

  return (
    <Form action={action} className="grid gap-4 mx-auto max-w-2xl py-12">
      {!state.ok && state.message && <p>{state.message}</p>}
      <FormField<Schema> name="email" errors={state.errors}>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input name="email" type="email" />
        </FormControl>
        <FormMessage />
      </FormField>

      <FormField<Schema> name="password" errors={state.errors}>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input name="password" type="password" />
        </FormControl>
        <FormMessage />
      </FormField>

      <hr />

      <Button type="submit">Submit</Button>
    </Form>
  );
}

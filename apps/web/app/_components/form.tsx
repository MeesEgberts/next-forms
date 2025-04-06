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
import { FormData } from "@web/app/_lib/definitions/sign-in";
import { Button } from "@web/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, {
    ok: false,
  });

  return (
    <Form action={action} className="grid gap-4 mx-auto max-w-2xl py-12">
      <FormField<FormData> name="email" errors={state.errors}>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input name="email" type="email" />
        </FormControl>
        <FormMessage />
      </FormField>

      <FormField<FormData> name="password" errors={state.errors}>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Select name="fruit">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
        </FormControl>
        <FormMessage />
      </FormField>

      <hr />

      <Button>Submit</Button>
    </Form>
  );
}

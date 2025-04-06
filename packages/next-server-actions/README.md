# next-server-actions 📝

**Type-safe server action handling for Next.js — effortless server action validation with Zod, built-in middleware, and great developer ergonomics.**

`next-server-actions` is a lightweight utility designed to make working with [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) easier and more enjoyable. It provides a clean API for managing form submissions, validation, middleware, and error handling — all with minimal boilerplate.

---

## ✨ Features

- ✅ **Server Action Integration** – Built specifically for Server Actions in Next.js
- ⚠️ **Field & Form-Level Errors** – Handle validation like a pro
- 🔄 **Loading State Management** – Easily show loading indicators during submission
- 🔐 **Middleware Support** – Add authentication, authorization, or custom checks per action
- 🔁 **DRY-Friendly** – Avoid repeating boilerplate in your server logic

---

## Table of contents

- [Getting Started](#getting-started)
- [Middleware](#middleware)
- [Context](#context)
- [shadcn/ui](#shadcnui)

---

## Getting Started

### 1. Installation

```bash
npm install next-server-actions
```

### 2. Create a reusable server action client

This creates a `createServerAction()` function that can be reused for all your form actions

```ts
import { createClient } from "next-server-actions";

export const createServerAction = createClient({
  // Optional: add middleware here (e.g. auth, logging, etc.)
});
```

### 3. Define a Zod schema and server action

This validates the form on the server using the schema before executing any logic.


```ts
"use server";

import { createServerAction } from "../utils/server-actions";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signIn = createServerAction(schema, async (values) => {
  // Your login logic here
  return { ok: true };
});
```

### 4. Use the server action in your component

This uses `useActionState` to bind your form to the server action.

```tsx
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
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />

      <br />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />

      <hr />

      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
}
```

---

## Middleware

Middleware allows you to intercept and validate requests **before** they reach your server action logic. This is useful for enforcing authentication, role-based access control, or other custom request checks.

---

### Adding Middleware

You can define middleware by using the `middleware` option when creating your server action client. This function runs before your server action executes and can return a response to short-circuit the action—for example, if a user is not authenticated.

```ts
import { createClient } from "next-server-actions";

export const createServerAction = createClient({
  middleware: async () => {
    // replace with your auth logic
    const isAuthenticated = false;

    if (!isAuthenticated) {
      return { message: "unauthorized" };
    }
  },
});
```

If the middleware returns an object, the corresponding action will **not** run. Instead, that object will be returned as the response to the client.

### Handling Middleware Responses in the UI

The returned `message` (or other fields) can be accessed via the `state` from `useActionState`—just like a regular action response.

```tsx
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
      {/* Form-level error from middleware */}
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
```

---

## Context

The `context` feature allows you to inject shared data into all your server actions.

For example, instead of calling `getUser()` in every individual action, you can call it once in the `context` function. The returned object will be automatically passed as the **second argument** to all server actions.

This helps reduce duplication and keeps your action logic clean and focused.

---

### Defining Context

You can define a shared context using the `context` option when creating your server action client. The `context` function must return an object, which can contain any data your server actions might need.

```ts
import { createClient } from "next-server-actions";
import { getUser } from "../../_data/get-user";

export const createServerAction = createClient({
  context: async () => {
    const user = await getUser();

    return { user };
  }
});
```

---

### Accessing Context in Actions

The context object you return becomes the **second argument** in all server action handlers.

```ts
"use server";

import { createServerAction } from "../utils/server-actions";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signIn = createServerAction<typeof schema>(
  schema,
  // highlight-next-line
  async (values, { user }) => {
    // Your login logic using the context-provided user
    return { ok: true };
  },
);
```

With this setup, you only need to define logic like `getUser()` once, making your actions more reusable and maintainable.

## shadcn/ui

Easily integrate server actions with your UI using shadcn/ui components.

👉 [Check out the simple guide](https://next-server-actions-docs.vercel.app/docs/next/UI/shadcn)

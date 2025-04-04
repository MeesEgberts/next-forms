# next-server-actions 📝

**Simple, declarative form handling for Next.js Server Actions**

`next-server-actions` is a lightweight utility designed to make working with [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) easier and more enjoyable. It provides a clean API for managing form submissions, validation, middleware, and error handling — all with minimal boilerplate.

---

## ✨ Features

- ✅ **Server Action Integration** – Built specifically for Server Actions in Next.js
- ⚠️ **Field & Form-Level Errors** – Handle validation like a pro
- 🔄 **Loading State Management** – Easily show loading indicators during submission
- 🔐 **Middleware Support** – Add authentication, authorization, or custom checks per action
- 🔁 **DRY-Friendly** – Avoid repeating boilerplate in your server logic

---

## 🚀 Getting Started

Install the package:

```bash
npm install next-server-actions
# or
yarn add next-server-actions
```

Create a form handler:

```tsx
// app/_lib/utils/server-actions.ts
import { createClient } from 'next-server-actions';

export const createServerAction = createClient({
   // Optional: add middleware here (e.g. auth, logging, etc.)
});
```

Use it in a server action:

```tsx
// app/_lib/actions/sign-in.ts
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

---

## 🧪 Example App

A demo app is coming soon. Stay tuned!

---

## 💡 Inspiration

Built out of real-world pain points when working with Next.js forms, server actions, and session handling. `next-server-actions` aims to reduce boilerplate and make developer experience delightful again.

---

## 📦 License

MIT © [Mees Egberts](https://github.com/MeesEgberts)

---

## 🙌 Contributing

PRs, issues, and suggestions are always welcome! If you’ve got ideas to improve the developer experience, feel free to open a discussion or start coding.


---

Let me know if you’d like to include badges (e.g., NPM, build status), a changelog section, or instructions for local development!
"use client";

import { ComponentProps, createContext, useContext, useId } from "react";
import { cn } from "@web/lib/utils";
import { Label } from "@web/components/ui/label";
import { Slot } from "@radix-ui/react-slot";

type Context = { id: string; name: string; errors: string[] };
const FormFieldContext = createContext<Context>({} as Context);

interface FormFieldProps<S extends object> extends ComponentProps<"div"> {
  name: keyof S;
  errors?: { [K in keyof S]?: string[] };
}

export function FormField<S extends object>({
  className,
  name,
  errors,
  ...props
}: FormFieldProps<S>) {
  const id = useId();

  const fieldErrors = errors ? (errors[name] ?? []) : [];

  return (
    <FormFieldContext value={{ id, name: name as string, errors: fieldErrors }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormFieldContext>
  );
}

export function FormControl(props: ComponentProps<typeof Slot>) {
  const { id, errors } = useContext(FormFieldContext);

  const hasError = errors.length > 0;

  const messages = errors.map((_, index) => `form-message-${id}-${index}`);

  return (
    <Slot
      aria-invalid={hasError}
      aria-describedby={`form-description-${id} ${messages.join(" ")}`}
      {...props}
    />
  );
}

export function FormLabel({
  className,
  ...props
}: ComponentProps<typeof Label>) {
  const { id, errors } = useContext(FormFieldContext);

  return (
    <Label
      htmlFor={id}
      className={cn(className, errors.length > 0 && "text-destructive")}
      {...props}
    />
  );
}

export function FormMessage() {
  const { id, errors } = useContext(FormFieldContext);

  return errors.map((error, index) => (
    <p
      key={error}
      id={`form-message-${id}-${index}`}
      className="text-[0.8rem] font-medium text-destructive"
    >
      {error}
    </p>
  ));
}

export function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { id } = useContext(FormFieldContext);

  return (
    <p
      id={`form-description-${id}`}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
}

"use client";

import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from ".";
import { mergeRefs } from "react-merge-refs";
import { Input, InputProps } from "@nextui-org/input";

export const FormInput = forwardRef<
  HTMLInputElement,
  InputProps & {
    label?: React.ReactNode;
    name: string;
    itemClassName?: string;
    asterisk?: boolean;
    render?: React.ComponentProps<typeof FormField>["render"];
    hint?: React.ReactNode;
  }
>(({ label, name, itemClassName, asterisk, render, hint, ...props }, ref) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={(data) => (
        <FormItem className={itemClassName}>
          {label && (
            <FormLabel>
              {label}
              {asterisk && <span className="text-danger"> *</span>}
            </FormLabel>
          )}
          <FormControl>
            {render ? (
              render(data)
            ) : (
              <Input
                {...data.field}
                value={data.field.value || ""}
                hasError={!!data.fieldState.error}
                name={name}
                ref={mergeRefs([ref, data.field.ref])}
                classNames={{
                  input: "text-base",
                  inputWrapper: "h-10",
                  ...props.classNames,
                }}
                {...props}
              />
            )}
          </FormControl>
          <FormMessage hint={hint} />
        </FormItem>
      )}
    />
  );
});

FormInput.displayName = "FormInput";

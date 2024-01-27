"use client";

import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from ".";
import { mergeRefs } from "react-merge-refs";
import { Textarea, TextAreaProps } from "@nextui-org/input";
import { cn } from "@nextui-org/system";

export const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & {
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
              <Textarea
                {...data.field}
                value={data.field.value || ""}
                hasError={!!data.fieldState.error}
                name={name}
                ref={mergeRefs([ref, data.field.ref])}
                classNames={{
                  input: cn("p-3 px-4 text-base", props.classNames?.input),
                  inputWrapper: cn("p-1", props.classNames?.inputWrapper),
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

FormTextarea.displayName = "FormTextarea";

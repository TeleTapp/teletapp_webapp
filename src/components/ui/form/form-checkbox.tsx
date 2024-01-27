"use client";

import Check from "@/assets/icons/check.svg?react";
import { Checkbox, CheckboxProps } from "@nextui-org/checkbox";
import { cn } from "@nextui-org/system";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from ".";

export const FormCheckbox = forwardRef<
  HTMLLabelElement,
  CheckboxProps & {
    label?: React.ReactNode;
    name: string;
  }
>(({ name, label, children, ...props }, ref) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          {...field}
          isSelected={field.value}
          name={name}
          {...props}
          ref={ref}
          className="-m-0 p-1"
          onValueChange={field.onChange}
          icon={({ isSelected, className, ...props }) => (
            <span
              className={cn(
                "flex p-0.5 w-5 h-5 justify-center items-center rounded bg-default transition",
                isSelected && "bg-primary"
              )}
            >
              <Check
                {...props}
                className={cn(className, isSelected && "opacity-100")}
              />
            </span>
          )}
        >
          {label || children}
        </Checkbox>
      )}
    />
  );
});

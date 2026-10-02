import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva([], {
  variants: {
    variant: {
      solid: ["p-2 rounded-md leading-none text-contrast bg-default"],
      soft: ["p-2 rounded-md leading-none text-default bg-default/10"],
      primary: ["py-1 px-2 rounded-md bg-blue-500 text-white"],
      text: ["text-default"],
      link: ["leading-none text-default underline"],
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});
type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;
export default function Button({
  variant,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(buttonStyles({ variant }), className)}
      {...props}
    />
  );
}

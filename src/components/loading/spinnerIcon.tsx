import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva([], {
  variants: {
    variant: {
      default: ["border-t-default"],
      primary: ["border-t-blue-500"],
    },
    size: {
      default: ["size-6"],
      large: ["size-12"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
type LoadingSpinnerIconProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"div">;
export default function LoadingSpinnerIcon({
  variant,
  size,
  className,
  ...props
}: LoadingSpinnerIconProps) {
  return (
    <div className="w-fit flex flex-col items-center justify-center">
      <div
        {...props}
        className={twMerge(
          "relative bg-transparent border-4 border-transparent rounded-full flex justify-center items-center animate-spin",
          buttonStyles({ variant, size }),
          className
        )}
      ></div>
    </div>
  );
}

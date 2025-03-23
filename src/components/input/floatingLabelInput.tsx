// import { ComponentProps, FC, useRef } from "react";
import { FC, useRef } from "react";
import { twMerge } from "tailwind-merge";
// import { cva, type VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

type FloatingLabelInputProps = {
    type: any;
    text: string;
    inputColor: any;
    labelColor: any;
};

const inputStyles = cva(
    "block w-full text-sm bg-transparent border-b-2 border-neutral-100 py-2.5 px-2 appearance-none peer focus:outline-none focus:ring-0 transition-all",
    {
        variants: {
            inputColor: {
                blue: "focus:border-blue-600 text-gray-900",
                red: "focus:border-red-600 text-gray-900",
                green: "focus:border-green-600 text-gray-900",
                purple: "focus:border-purple-500 text-grey-900",
                // Add more color options as needed
            },
        },
        defaultVariants: {
            inputColor: "green",
        },
    }
);

const labelStyles = cva(
    "absolute bg-contrast text-sm text-default/50 duration-300 transform scale-75 top-10 -z-1 origin-[0] left-1.75 peer-focus:px-1 peer-focus:z-10 peer-focus:-top-2.5 peer-focus:text-blue-600 peer-focus:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3",
    {
        variants: {
            labelColor: {
                blue: "peer-focus:text-blue-600",
                red: "peer-focus:text-red-600",
                green: "peer-focus:text-green-600",
                purple: "peer-focus:text-purple-500",
                // Add more color options for the label
            },
        },
        defaultVariants: {
            labelColor: "green",
        },
    }
);
// type LoadingSpinnerIconProps = VariantProps<typeof buttonStyles> &
//   ComponentProps<"div">;
// type InputProps = VariantProps<typeof inputStyles> & ComponentProps<"input">;
// type LabelProps = VariantProps<typeof labelStyles> & ComponentProps<"label">;
// const FloatingLabelInput: FC<FloatingLabelInputProps> = ({ inputColor }: InputProps, { labelColor }: LabelProps, { type, text }: FloatingLabelInputProps) => {
const FloatingLabelInput: FC<FloatingLabelInputProps> = (
    {
    type,
    text,
    inputColor,
    labelColor,
}

//     {
//     type,
//     text,
//     inputColor,
//     labelColor,
// }:{
//     type:string,
//     text:string,
//     inputColor:InputProps,
//     labelColor:LabelProps
// }

// { inputColor }: InputProps,
// { labelColor }: LabelProps,
// { type, text }: FloatingLabelInputProps

) => {
    const emailRef = useRef<HTMLInputElement>(null);

    return (
        <div className="relative z-0 w-full group">
            <input
                type={type}
                name={text.toLowerCase()}
                placeholder=""
                ref={emailRef}
                className={twMerge(inputStyles({ inputColor }))}
            />
            <label
                htmlFor={text.toLowerCase()}
                className={twMerge(labelStyles({ labelColor }))}
            >
                {text}
            </label>
        </div>
    );
};

export default FloatingLabelInput;

import { InputHTMLAttributes } from "react";

type InputPropsType = {
  label: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, label, ...props }: InputPropsType) => {
  return (
    <div className={className}>
      <label htmlFor={props.id} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type={props.type}
        id={props.id}
        required={props.required}
        {...props}
      />
    </div>
  );
};

export default Input;

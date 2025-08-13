import { type Ref, type SelectHTMLAttributes, useId, forwardRef } from "react";

type SelectProps = {
  classname?: string;
  options: Array<{ value: string; label: string }>;
  label?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;
const Select = (
  { className, options, label, ...rest }: SelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        {...rest}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options.map((option) => {
          return (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default forwardRef(Select);

import { HTMLInputTypeAttribute } from "react";

interface IProps {
  label: string;
  value: string | number;
  id: string;
  handleOnChange: (value: string | number) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
}

const Input = ({
  label,
  value,
  id,
  handleOnChange,
  min = 0,
  max = 1,
  step = 1,
  type = "text",
  placeholder = "",
}: IProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          type={type}
          name={id}
          id={id}
          min={min}
          max={max}
          step={step}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={value}
          onChange={({ target: { value } }) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default Input;

import classNames from "classnames";
import { HTMLInputTypeAttribute, JSXElementConstructor } from "react";

interface IProps {
  label: string;
  value: string | number;
  id: string;
  handleOnChange: (value: string | number) => void;
  icon?: JSXElementConstructor<any>;
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
  icon,
  min = 0,
  max = 1,
  step = 1,
  type = "text",
  placeholder = "",
}: IProps) => {
  const Icon = icon;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <div className="relative mt-2 rounded-md shadow-sm">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          type={type}
          name={id}
          id={id}
          min={min}
          max={max}
          step={step}
          className={classNames(
            "block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-black dark:text-white",
            icon && "pl-10"
          )}
          placeholder={placeholder}
          value={value}
          onChange={({ target: { value } }) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default Input;

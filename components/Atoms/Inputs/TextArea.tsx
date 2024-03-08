interface IProps {
  label: string;
  value: string | number;
  id: string;
  placeholder?: string;
  description?: string;
  rows?: number;
}

const Textarea = ({ label, value, id, description, rows = 3 }: IProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <textarea
          name={id}
          id={id}
          rows={rows}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value}
        />
      </div>
      {description && (
        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default Textarea;

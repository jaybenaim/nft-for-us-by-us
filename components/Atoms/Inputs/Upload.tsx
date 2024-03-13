import { PhotoIcon } from "@heroicons/react/24/outline";

interface IProps {
  id: string;
  label: string;
  placeholder?: string;
  handleOnChange: (files: FileList) => void;
}

const Upload = ({ label, id, handleOnChange }: IProps) => {
  return (
    <div className="col-span-3">
      <label
        htmlFor="upload-label"
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-white">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white px-4 font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
            >
              <span>Upload a file</span>
              <input
                id={id}
                name={id}
                type="file"
                className="sr-only"
                onChange={({ target: { files } }) => handleOnChange(files)}
              />
            </label>
            <p className="pl-2">or drag and drop</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-white">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  icon?: React.ReactNode;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
}
export const InputText = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  icon,
  required,
}: InputTextProps) => {
  return (
    <div className="relative w-full">
      <label className="text-xs font-semibold mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-3 text-gray-400 bg-gray-100 rounded-l-md border-2 border-gray-300 shadow-xs">
          {icon}
        </div>
        <input
          type="text"
          name={name}
          value={value}
          className="outline-none border border-gray-300 rounded-md py-2 pl-12 pr-3 w-full text-xs hover:border-gray-400 focus:border-gray-400 focus:shadow-lg"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

interface IProps {
  name: string;
  id: string;
  label: string;
  value: string | number;
  layout?: 'vertical' | 'horizontal';
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const TextAreaField: React.FC<IProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  layout = 'vertical',
  error,
}) => {
  return (
    <div
      className={
        layout === 'horizontal'
          ? 'px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'
          : ''
      }
    >
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={6}
        cols={50}
        className={
          layout === 'horizontal'
            ? `block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${error ? 'ring-2 ring-inset ring-red-600' : ''}`
            : `px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${error ? 'ring-2 ring-inset ring-red-600' : ''}`
        }
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default TextAreaField;

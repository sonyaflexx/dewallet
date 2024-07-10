'use client'

interface CheckboxProps {
  value?: boolean;
  setValue?: (value: boolean) => void;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ value, setValue, className }) => {
  const handleChange = () => {
    setValue && setValue(!value);
  };

  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="hidden"
        checked={value}
        onChange={handleChange}
      />
      <div className={`relative size-5 border-2 rounded-md border-primary-blue ${value ? 'bg-primary-blue' : ''}`}>
        <svg className={`size-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${value ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.2381L9.8125 17L19 7" stroke="#F7F8F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      </div>
    </label>
  );
};

export default Checkbox;
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ImportTabs = ({ value, setValue }: { value: number; setValue: any }) => {
  const { t } = useTranslation();

  const handleTabClick = (value: number) => {
    setValue(value);
  };

  return (
    <div className="flex mt-4 flex-col w-full">
      <div className="flex w-full rounded-xl items-center justify-between h-[44px] p-1 mb-4 relative bg-secondary-bg">
        <div
          className={`absolute h-full w-1/2 bottom-0 transition-all duration-[400ms] p-1
            ${value === 24 && 'left-0'}
            ${value === 12 && 'left-1/2'}
        `}
        >
          <div className='rounded-xl size-full bg-accent-brand' />
        </div>
        <TabSwitcher
          title={`24 ${t('words24')}`}
          onClick={() => handleTabClick(24)}
        />
        <TabSwitcher
          title={`12 ${t('words12')}`}
          onClick={() => handleTabClick(12)}
        />
      </div>
    </div>
  );
};

const TabSwitcher = ({ title, onClick } : { title: string, onClick: any }) => {
  return (
    <button
      className={`text-placeholder-primary z-10 text-center flex-1 text-sm leading-5 font-semibold`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ImportTabs;

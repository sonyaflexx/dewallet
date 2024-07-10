'use client'

import settingsStore from '@/store/SettingsStore';
import { useState } from 'react';

const versions = ['Wallet V4', 'Wallet V3R1', 'Wallet V3R2']

const VersionSwitch = () => {
  const { version } = settingsStore;
  const [selectedOption, setSelectedOption] = useState(version);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    settingsStore.setVersion(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between w-full p-2 rounded-2xl bg-secondary-bg" onClick={toggleDropdown}>
        <span className='text-sm pl-[10px]'>{selectedOption}</span>
        <div className='size-10 flex items-center justify-center rounded-2xl bg-tertiary-bg'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 10L12 16L6 10" stroke="#F7F8F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[60px] w-full bg-secondary-bg rounded-2xl px-[14px] py-2">
          {versions.map((option, index) => (
            <div
              key={index}
              className={`cursor-pointer text-sm flex items-center justify-between w-full h-[44px] border-b border-b-border last:border-0 py-[10px] ${selectedOption === option && 'text-accent-brand'}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              { selectedOption === option && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12.2381L9.8125 17L19 7" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg> }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionSwitch;
'use client'

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const tokenList = [
  {
    id: 1,
    logoUrl: '	https://v2.delabwallet.com/0068d136b4f5ffc93f0073cf3ef223fd.png',
    name: 'TON',
    price: 4.34,
    change_24h: 0.43,
    amount: 0,
  },
  {
    id: 2,
    logoUrl: 'https://v2.delabwallet.com/d4dc5bc9cbc0d70f98be41d9f234cc67.png',
    name: 'DFC',
    price: 0.97,
    change_24h: 9.25,
    amount: 0,
  },
  {
    id: 3,
    logoUrl: 'https://v2.delabwallet.com/cea435ee35ddd568d2bb56ae5f266276.png',
    name: 'ARBUZ',
    price: 0.33,
    change_24h: -21.89,
    amount: 0,
  },
  {
    id: 4,
    logoUrl: 'https://v2.delabwallet.com/111c157feb06ba4d0020760c01e89756.png',
    name: 'KINGY',
    price: 0.21,
    change_24h: 1.59,
    amount: 0,
  },
  {
    id: 5,
    logoUrl: 'https://v2.delabwallet.com/a99afedca980663059d5e21ce99cfbf3.png',
    name: 'PRIVATE',
    price: 0.005,
    change_24h: -1.88,
    amount: 0,
  },
];

const AssetsList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTokens = tokenList.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col w-full'>
      <div className='bg-tertiary-bg bg-opacity-30 rounded-2xl flex items-center px-[14px] py-[13px] gap-[14px] relative mb-[5px]'>
      <svg className='size-5' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Icon-Set" transform="translate(-256.000000, -1139.000000)" fill="currentColor"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search"> </path> </g> </g> </g></svg>
        <input
            type="text"
            placeholder={t('search')}
            className="bg-tertiary-bg bg-opacity-0 flex-1 text-placeholder-primary text-[15px] leading-none placeholder:text-placeholder-primary outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        { searchTerm.length > 0 && (
            <div onClick={() => setSearchTerm('')} className='absolute right-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 17.4736C7.84342 17.4736 6.75326 17.2523 5.72949 16.8096C4.71126 16.3669 3.81201 15.7554 3.03174 14.9751C2.25146 14.1948 1.63997 13.2956 1.19727 12.2773C0.754557 11.2536 0.533203 10.1634 0.533203 9.00684C0.533203 7.85026 0.754557 6.76286 1.19727 5.74463C1.63997 4.72087 2.2487 3.81885 3.02344 3.03857C3.80371 2.2583 4.70296 1.64681 5.72119 1.2041C6.74495 0.761393 7.83512 0.540039 8.9917 0.540039C10.1483 0.540039 11.2384 0.761393 12.2622 1.2041C13.286 1.64681 14.188 2.2583 14.9683 3.03857C15.7485 3.81885 16.36 4.72087 16.8027 5.74463C17.2454 6.76286 17.4668 7.85026 17.4668 9.00684C17.4668 10.1634 17.2454 11.2536 16.8027 12.2773C16.36 13.2956 15.7485 14.1948 14.9683 14.9751C14.188 15.7554 13.286 16.3669 12.2622 16.8096C11.244 17.2523 10.1566 17.4736 9 17.4736ZM6.06982 12.626C6.26904 12.626 6.43783 12.5568 6.57617 12.4185L8.9917 9.98633L11.4238 12.4185C11.5677 12.5568 11.731 12.626 11.9136 12.626C12.1073 12.626 12.2705 12.5596 12.4033 12.4268C12.5361 12.2884 12.6025 12.1224 12.6025 11.9287C12.6025 11.7461 12.5361 11.5828 12.4033 11.439L9.97119 9.01514L12.4116 6.57471C12.5444 6.43083 12.6108 6.26758 12.6108 6.08496C12.6108 5.89681 12.5444 5.73633 12.4116 5.60352C12.2788 5.4707 12.1183 5.4043 11.9302 5.4043C11.7476 5.4043 11.5898 5.47347 11.457 5.61182L8.9917 8.05225L6.55127 5.62012C6.42952 5.4873 6.26904 5.4209 6.06982 5.4209C5.88167 5.4209 5.72119 5.4873 5.58838 5.62012C5.45557 5.7474 5.38916 5.90788 5.38916 6.10156C5.38916 6.28971 5.45557 6.4502 5.58838 6.58301L8.02051 9.01514L5.58838 11.4473C5.45557 11.5801 5.38916 11.7406 5.38916 11.9287C5.38916 12.1224 5.45557 12.2884 5.58838 12.4268C5.72119 12.5596 5.88167 12.626 6.06982 12.626Z" fill="#aaaaaa" fillOpacity="0.6"></path></svg>
            </div>
        )}
      </div>

      {filteredTokens.map((token) => (
        <div key={token.id} className="flex items-center border-b last:border-0 border-border-dark px-[10px] pt-4 pb-[17px]">
            <div className='flex items-center gap-[10px] w-full'>
                <img src={token.logoUrl} alt={token.name} className="size-9 rounded-full" />
                <div className='flex flex-col'>
                    <span className='text-base'>{token.name}</span>
                    <span className='leading-none text-placeholder-secondary text-[15px]'>${token.price.toLocaleString('ru-RU')} <span className={`text-[13px] ${token.change_24h >= 0 ? 'text-accent-success' : 'text-accent-error'}`}>{token.change_24h >= 0 && '+'}{token.change_24h}%</span></span>
                </div>
                <div className='ml-auto flex flex-col text-right'>
                    <span className='text-placeholder-primary text-[15px]'>{token.amount.toLocaleString('ru-RU')}</span>
                    <span className='leading-none text-placeholder-secondary text-[15px]'>${(token.amount * token.price).toLocaleString('ru-RU')}</span>
                </div>
            </div>
        </div>
      ))}

      {!filteredTokens || filteredTokens.length === 0 && (
        <div className='mt-[10px] text-[21px] text-center'>Not found.</div>
      )}
    </div>
  );
};

export default AssetsList;
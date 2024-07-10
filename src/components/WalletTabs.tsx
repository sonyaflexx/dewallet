'use client'

import { useState } from 'react';
import AssetsList from './AssetsList';
import { useTranslation } from 'react-i18next';



const WalletTabs = () => {
  const { t } = useTranslation();
  const tabsData = [
    { id: 1, title: t('assets'), content: <AssetsList /> },
    { id: 2, title: t('history'), content: (
      <div className='h-[10vh] flex items-center justify-center w-full text-center text-2xl font-medium'>{t('emptyHistory')}</div>
      ) },
      { id: 3, title: t('nft'), content: (
        <div className='h-[10vh] flex items-center justify-center w-full text-center text-2xl font-medium'>{t('emptyNft')}</div>
      )},
    ];
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const handleTabClick = (tabId: number, index: number) => {
    setActiveTab(tabId);
    setIndicatorPosition(index);
  };

  return (
    <div className="flex mt-4 flex-col w-full">
      <div className="flex w-full rounded-xl items-center justify-between h-[44px] p-1 mb-4 relative bg-secondary-bg">
        <div className={`absolute h-full w-1/3 bottom-0 transition-all duration-[400ms] p-1
            ${activeTab === 1 && 'left-0'}
            ${activeTab === 2 && 'left-1/3'}
            ${activeTab === 3 && 'left-2/3'}
        `}>
            <div className='rounded-xl size-full bg-accent-brand' />
        </div>
        {tabsData.map((tab, index) => (
          <TabSwitcher
            key={tab.id}
            tab={tab}
            active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id, index)}
          />
        ))}
      </div>
      <div>
        {tabsData.map((tab) => (
          <TabContent key={tab.id} tab={tab} active={activeTab === tab.id} />
        ))}
      </div>
    </div>
  );
};

const TabSwitcher = ({ tab, active, onClick }: { tab: any; active: boolean; onClick: () => void }) => {
  return (
    <button
      className='text-placeholder-primary z-10 text-center flex-1 text-sm leading-5'
      onClick={onClick}
    >
      {tab.title}
    </button>
  );
};

const TabContent = ({ tab, active }: { tab: any; active: boolean }) => {
  return (
    <div className={`p-4 bg-secondary-bg bg-opacity-40 backdrop-blur-2xl mb-5 rounded-3xl ${active ? 'block' : 'hidden'}`}>
      {tab.content}
    </div>
  );
};

export default WalletTabs;
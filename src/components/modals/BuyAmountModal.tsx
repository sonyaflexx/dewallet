import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import modalStore from '@/store/ModalStore';
import TokenList from '../TokenList';

const BuyAmountModal: React.FC = () => {
    const [value, setValue] = useState<any>({
        amount: 0,
        cardNumber: '',
        email: ''
    });

    const [token, setToken] = useState({
        name: 'TON'
    })

    const handleBack = () => {
        modalStore.closeBuyAmountModal();
        modalStore.openTokenSelectModal(modalStore.tokenSelectModalConfig!);
    }

    const handleSave = () => {
        modalStore.buyAmountModalConfig?.setValue && modalStore.buyAmountModalConfig.setValue(value);
        modalStore.closeBuyAmountModal();
    };

    useEffect(() => {
        if (modalStore.buyAmountModalConfig) {
            setValue(modalStore.buyAmountModalConfig.value);
            setToken(modalStore.buyAmountModalConfig.token as any);
        }
    }, [modalStore.buyAmountModalConfig]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue((prevValue: any) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    return (
        <div className={`fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50 ${modalStore.isBuyAmountModalActive ? 'flex opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-primary-bg rounded-t-[20px] px-5 pt-5 w-full h-[95vh] transition-transform ${modalStore.isBuyAmountModalActive ? '' : 'translate-y-[2000px]'}`}>
                <div className='flex w-full justify-between items-center mb-[15px]'>
                    <button onClick={handleBack} className="text-[16.5px] text-accent-brand p-1 mb-6 stroke-current flex items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none"><path d="M10.5 2L1.5 11L10.5 20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        Back
                    </button>
                    <button onClick={modalStore.closeBuyAmountModal} className="text-[16.5px] text-accent-brand p-1 mb-6 stroke-current flex items-center gap-[10px]">
                        Close
                    </button>
                </div>

                <p className='text-[32px] font-medium mb-6 leading-8 text-placeholder-primary text-center'>Enter amount</p>

                <div className='p-4 rounded-3xl border border-border border-opacity-20 bg-secondary-bg bg-opacity-40 backdrop-blur-2xl flex flex-col w-full'>
                    <div className='flex gap-[6px] mb-3 w-full'>
                        <p className='text-base leading-5 text-placeholder-secondary'>You pay</p>
                        <p className='text-base leading-5 text-placeholder-primary'>~ 0,00 ₽</p>
                    </div>
                    <div className='flex gap-2 items-center max-w-full'>
                        <input
                            type="text"
                            name='amount'
                            placeholder='0'
                            inputMode="decimal"
                            pattern="[0-9]*[.,]?[0-9]*"
                            className={`bg-transparent outline-none text-3xl font-medium leading-8 placeholder:text-accent-error ${(isNaN(parseFloat(value.amount)) || parseFloat(value.amount) < 9) && '!text-accent-error'}`}
                            value={value.amount}
                            onChange={handleChange}
                            style={{ maxWidth: '50%', width: `${value.amount.length * 15 + 23}px` }}
                        />
                        <span className={`flex-1 text-[28px] font-medium text-placeholder-secondary ${(isNaN(parseFloat(value.amount)) || parseFloat(value.amount) < 9) && '!text-accent-error'}`}>{token?.name}</span>
                    </div>
                    <div className='h-px w-full bg-tertiary-bg my-4' />
                    <div className='rounded-[28px] bg-tertiary-bg bg-opacity-30 backdrop-blur-[29px] py-2 px-3 self-start text-sm leading-[18px]'>Available: from 9 TON</div>
                </div>

                <div className='mt-3 p-4 rounded-3xl border border-border border-opacity-20 bg-secondary-bg bg-opacity-40 backdrop-blur-2xl flex flex-col w-full'>
                    <p className='text-base font-medium leading-5 text-placeholder-primary'>Enter card number and email</p>
                    <div className='flex gap-4 items-center mt-3 w-full p-4 bg-tertiary-bg bg-opacity-30 backdrop-blur-2xl rounded-2xl text-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M4.875 5.5C3.97754 5.5 3.25 6.22754 3.25 7.125V16.875C3.25 17.7725 3.97754 18.5 4.875 18.5H19.125C20.0225 18.5 20.75 17.7725 20.75 16.875V7.125C20.75 6.22754 20.0225 5.5 19.125 5.5H4.875ZM1.25 7.125C1.25 5.12297 2.87297 3.5 4.875 3.5H19.125C21.127 3.5 22.75 5.12297 22.75 7.125V16.875C22.75 18.877 21.127 20.5 19.125 20.5H4.875C2.87297 20.5 1.25 18.877 1.25 16.875V7.125Z" fill="#8A97AA"></path><path fillRule="evenodd" clipRule="evenodd" d="M21.75 10H2.25V8H21.75V10ZM5 14.0625C5 13.5102 5.44772 13.0625 6 13.0625H8.25C8.80228 13.0625 9.25 13.5102 9.25 14.0625V15C9.25 15.5523 8.80228 16 8.25 16H6C5.44772 16 5 15.5523 5 15V14.0625Z" fill="#8A97AA"></path></svg>
                        <input
                            type="text"
                            name='cardNumber'
                            placeholder='0000 0000 0000 0000'
                            className='bg-transparent outline-none leading-none mt-[0.8px]'
                            value={value.cardNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-4 items-center mt-3 w-full p-4 bg-tertiary-bg bg-opacity-30 backdrop-blur-2xl rounded-2xl text-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 5L12 14L3 5" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 5H21V18C21 18.2652 20.8946 18.5196 20.7071 18.7071C20.5196 18.8946 20.2652 19 20 19H4C3.73478 19 3.48043 18.8946 3.29289 18.7071C3.10536 18.5196 3 18.2652 3 18V5Z" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.8125 12L3.3125 17.7125" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20.6875 17.7125L14.1875 12" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <input
                            type="email"
                            name='email'
                            placeholder='example@gmail.com'
                            className='bg-transparent outline-none leading-none -mt-px'
                            value={value.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            
                <div className='absolute w-full h-[40%] bg-accent-brand bg-opacity-25 rounded-[600px] blur-[110px] bottom-0' />
            </div>
        </div>
        );
    };
    
    export default observer(BuyAmountModal);

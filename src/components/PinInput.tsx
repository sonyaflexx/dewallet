import { useEffect, useState } from 'react';

interface PinInputProps {
    title: string;
    value: string;
    setValue: (newValue: string) => void;
    handle: () => void;
    status: string;
}

const PinInput: React.FC<PinInputProps> = ({ title, value, setValue, handle, status }) => {
    const [lastActiveIndex, setLastActiveIndex] = useState<number | string | null>(null);

    const handlePinButtonClick = (char: string) => {
        if (char === '<') {
            setValue(value.slice(0, -1));
        } else {
            if (value.length < 4) {
                setValue(value + char);
            }
        }
    };

    useEffect(() => {
        setLastActiveIndex(value.length - 1);
        setTimeout(() => setLastActiveIndex(null), 100);
    }, [value])
    
    useEffect(() => {
        if (status === 'success') {
            setLastActiveIndex('all');
            setTimeout(() => setLastActiveIndex(null), 100);
        }
    }, [status])

    useEffect(() => {
        if (value.length === 4) {
            handle();
        }
    }, [value])

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="flex flex-col flex-1 items-center justify-center gap-6">
                <h2 className="text-[8vw] font-medium">{title}</h2>
                <div className={`flex gap-3 transition-transform duration-100 ${lastActiveIndex === 'all' ? 'scale-110' : ''}`}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className={`size-[7vw] rounded-full bg-placeholder-primary transition-transform duration-100 
                                ${index < value.length ? 'bg-opacity-100' : 'bg-opacity-20'} 
                                ${index === lastActiveIndex ? 'scale-125' : ''} 
                                ${status === 'error' && index < value.length && '!bg-accent-error'}
                                ${status === 'error' && 'shake-horizontal'}
                                ${status === 'success' && index < value.length && '!bg-accent-success'}
                            `}
                        ></div>
                    ))}
                </div>
            </div>
            <div className={`grid grid-cols-3 w-full gap-2 mt-auto ${status !== '' && 'pointer-events-none'}`}>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('1')}>1</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('2')}>2</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('3')}>3</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('4')}>4</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('5')}>5</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('6')}>6</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('7')}>7</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('8')}>8</button>
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('9')}>9</button>
                <div />
                <button className="bg-tertiary-bg bg-opacity-40 rounded-[4vw] py-[4vw] text-[8vw] font-semibold leading-none" onClick={() => handlePinButtonClick('0')}>0</button>
                <button className="flex items-center justify-center" onClick={() => handlePinButtonClick('<')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F7F8F9"><path d="M20.25 3.75H6.42188C6.16324 3.75243 5.90951 3.82088 5.68474 3.94885C5.45997 4.07683 5.2716 4.26008 5.1375 4.48125L0.853126 11.6156C0.783763 11.7318 0.747141 11.8647 0.747141 12C0.747141 12.1353 0.783763 12.2682 0.853126 12.3844L5.1375 19.5187C5.27093 19.7405 5.45914 19.9243 5.68406 20.0523C5.90898 20.1804 6.16306 20.2485 6.42188 20.25H20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM15.5344 13.7156C15.6752 13.8578 15.7542 14.0499 15.7542 14.25C15.7542 14.4501 15.6752 14.6422 15.5344 14.7844C15.3894 14.9204 15.1988 14.9973 15 15C14.8008 14.9992 14.6096 14.922 14.4656 14.7844L12.75 13.0594L11.0344 14.7844C10.8894 14.9204 10.6988 14.9973 10.5 15C10.3008 14.9992 10.1096 14.922 9.96563 14.7844C9.82479 14.6422 9.74578 14.4501 9.74578 14.25C9.74578 14.0499 9.82479 13.8578 9.96563 13.7156L11.6906 12L9.96563 10.2844C9.84603 10.1387 9.78491 9.95366 9.79416 9.76537C9.8034 9.57708 9.88236 9.39896 10.0157 9.26566C10.149 9.13236 10.3271 9.0534 10.5154 9.04416C10.7037 9.03491 10.8887 9.09603 11.0344 9.21563L12.75 10.9406L14.4656 9.21563C14.6113 9.09603 14.7963 9.03491 14.9846 9.04416C15.1729 9.0534 15.351 9.13236 15.4843 9.26566C15.6176 9.39896 15.6966 9.57708 15.7058 9.76537C15.7151 9.95366 15.654 10.1387 15.5344 10.2844L13.8094 12L15.5344 13.7156Z"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default PinInput;
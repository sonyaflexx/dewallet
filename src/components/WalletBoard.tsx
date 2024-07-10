import Button from "./buttons/Button";
import SmallButton from "./buttons/SmallButton";
import QrIcon from "./icons/QrIcon";
import ResetIcon from "./icons/ResetIcon";
import WalletActions from "./WalletActions";
import WalletInfo from "./WalletInfo";

const WalletBoard = () => {
    return (
        <div className="relative w-full bg-secondary-bg rounded-[32px] pt-4 px-3 pb-3 mb-6 flex flex-col items-center">
            <div className="z-10 flex justify-between w-full">
                <Button size="small" color="primary">
                    <QrIcon />
                </Button>
                <WalletInfo />
                <Button size="small" color="quadary">
                    <ResetIcon />
                </Button>
            </div>
            <div className="mt-[13px] mb-6 text-[50px] font-medium">$0.00</div>
            <WalletActions />
            <div className="absolute top-5 w-full h-[94%]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 358 230" fill="none"><path d="M410 38.2976C349.667 10.4643 235.8 -15.2024 263 104.798C297 254.798 195.5 256.298 153.5 224.298C111.5 192.298 112.5 33.9998 -8 109.5" stroke="url(#paint0_linear_1858_5221)" strokeOpacity="0.5" strokeWidth="30"></path><defs><linearGradient id="paint0_linear_1858_5221" x1="201" y1="15" x2="201" y2="333" gradientUnits="userSpaceOnUse"><stop offset="0.15" stopColor="#007AFF"></stop><stop offset="0.843042" stopColor="#2E353D" stopOpacity="0.36"></stop></linearGradient></defs></svg>
            </div>
        </div>
    )
}

export default WalletBoard;
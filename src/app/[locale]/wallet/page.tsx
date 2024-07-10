import CommunityNotification from "@/components/CommunityNotification";
import DeployNotification from "@/components/DeployNotification";
import WalletBoard from "@/components/WalletBoard";
import WalletTabs from "@/components/WalletTabs";

export default function Wallet() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 pt-[10px] pb-20">
            <WalletBoard />
            <DeployNotification />
            <CommunityNotification />
            <WalletTabs />
        </main>
    )
}
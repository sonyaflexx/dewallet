import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
            <Navbar />
        </div>
    );
}
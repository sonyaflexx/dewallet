import AppList from "@/components/AppList";
import { appArray } from "./appArray";

export default function Apps() {
    const combineApps = (appArray: any) => {
        const uniqueApps = new Map();
      
        Object.keys(appArray).forEach(category => {
          appArray[category].forEach((app: any) => {
            uniqueApps.set(app.name, app);
          });
        });
      
        return Array.from(uniqueApps.values());
      };

    const allApps = combineApps(appArray);

    return (
        <main className="flex min-h-screen flex-col items-center px-4 pb-24">
            <AppList title='From DeLab' apps={appArray["From DeLab"]} />
            <AppList title='Utilities' apps={appArray["Utilities"]} />
            <AppList title='CEX' apps={appArray["CEX"]} />
            <AppList title='Exchangers' apps={appArray["Exchangers"]} />
            <AppList title='Defi' apps={appArray["Defi"]} />
            <AppList title='GameFi' apps={appArray["GameFi"]} />
            <AppList title='All Apps' apps={allApps} />
        </main>
    )
}
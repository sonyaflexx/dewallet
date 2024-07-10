import Image from "next/image";

const AppList = ({ title, apps }: { title: string, apps: any }) => {
    return (
        <div className="w-full bg-secondary-bg bg-opacity-40 mb-2 p-4 rounded-3xl">
            <h3 className="text-base font-medium text-placeholder-primary mb-[5px]">{title}</h3>
            <ul>
                {apps.map((app: any, index: number) => (
                    <li key={index} className="flex items-center gap-3 py-[7px] border-b border-b-border-dark last:border-0">
                        <Image src={app.image} width={40} height={40} alt="logo" className="rounded-full" />
                        <div>
                            <p className="text-lg font-medium">{app.name}</p>
                            <p className="text-placeholder-tertiary text-sm">{app.description}</p>
                        </div>
                        <svg className="ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 6L16 12L10 18" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AppList;
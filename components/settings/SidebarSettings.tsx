"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SidebarSettings(){
    const path = usePathname()
    const _paths = path.split('/')
    _paths.push("")
    const routeName = _paths.join("/")

    const url = "/dashboard/settings/profile"

    return (
        <div className={"flex flex-col gap-3 p-2 dark-theme rounded-sm h-full border-none shadow-none text-white select-none"}>
            <Link href={"/dashboard/settings/profile"}>
                <div className={`${((routeName.includes(url)))?"bg-black/90 shadow-lg text-solid-50 dark:bg-content2":"text"} rounded-md p-2.5 flex py-2.5 items-center gap-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
                    <span>Profile</span>
                </div>
            </Link>

        </div>
    )
}
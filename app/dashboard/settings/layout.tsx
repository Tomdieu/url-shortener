
import SidebarSettings from "@/components/settings/SidebarSettings";
import React from "react";

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div className={"flex flex-1 w-full h-full space-x-2"}>
            <div className={"w-1/4 border-r px-2 h-full"}>
                <SidebarSettings/>
            </div>
            <div className={"flex flex-1 w-3/4  h-full"}>
                {children}
            </div>
        </div>
    )
}
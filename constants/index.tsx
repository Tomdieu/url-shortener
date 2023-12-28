import {DashboardIcon, Link2Icon} from "@radix-ui/react-icons";
import {FiLink, FiSettings} from "react-icons/fi";
import {BarChart2, Wallet} from "lucide-react";

export const LINKS = {
    register:'/auth/register',
    login:'/auth/login',
}


export const sidebarDashboardLinks = [
    {
        label:"Dashboard",
        icon:<DashboardIcon className="w-5 h-5" />,
        url:"/dashboard"
    },
    {
        label: "Links",
        icon: <Link2Icon className="w-5 h-5" />,
        url: "/dashboard/links"
    },
    {
        label: "Shorten Link",
        icon: <FiLink className="w-5 h-5" />,
        url: "/dashboard/shorten"
    },{
label: "Analytics",
        icon: <BarChart2 className="w-5 h-5"  />,
        url: "/dashboard/analytics"
    },
    {
        label: "Settings",
        icon:<FiSettings className="w-5 h-5" />,
        url: "/dashboard/settings/profile"
    },
    // {
    //     label:"Pricing",
    //     icon: <Wallet className="w-5 h-5"  />,
    //     url: "/dashboard/pricing"
    // }
]
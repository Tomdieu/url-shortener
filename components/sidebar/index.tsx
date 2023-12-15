"use client";
import { Divider, Spacer, Switch } from "@nextui-org/react";
import {
  BarChartIcon,
  DashboardIcon,
  Link2Icon,
  MoonIcon,
} from "@radix-ui/react-icons";
import {BarChart2, SunIcon, Wallet} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiLink, FiLink2, FiLogOut, FiMenu, FiSettings } from "react-icons/fi";
import { TbBusinessplan } from "react-icons/tb";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";
import {sidebarDashboardLinks} from "@/constants";
import {usePathname} from "next/navigation";
  
const Sidebar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const path = usePathname()
  const _paths = path.split('/')
  _paths.push("")
  const routeName = _paths.join("/")
  return (
    <div className="flex-1 h-full w-full bg-zinc-500 flex gap-0 flex-col dark:bg-[#18181B] dark:text-white dark-theme border-none border-r-1 rounded-none">
      <div className="py-4 shadow-lg dark-theme rounded-none font-poppins border-none px-4 text-medium md:text-2xl lg:text-3xl text-white select-none flex gap-2 w-full items-center justify-between cursor-pointer">
        <div className="flex items-center gap-1 text">
          <h5 className="font-bold hidden sm:block font-poppins">Trix Url</h5>
          <h5 className="font-bold block sm:hidden font-poppins">Trix Url</h5>
        </div>
      </div>
      <div className="flex flex-1 flex-col dark-theme border-none rounded-none">
        <div className="flex flex-col gap-1 p-2 text-white select-none" >

          {sidebarDashboardLinks.map(({url,label,icon})=>{

            return (
                <Link href={url} key={label}>
                  <div className={`${((path === "/dashboard" && url === path) || (url !== "/dashboard" && routeName.includes(url)))?"bg-black/90 shadow-lg dark:bg-content2":"text"} link-style`}>
                    {icon}
                    <span>{label}</span>
                  </div>
                </Link>
            )
          })}
        </div>
        {/*<Divider />*/}
        <Spacer className="flex-1" />
        <div className="flex flex-col gap-1 p-2 text-white select-none">
          <div
            onClick={() => signOut({ redirect: true, callbackUrl: "/auth" })}
            className="flex gap-2 text-sm items-center bg-white/50 p-4 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-content2 dark-theme"
          >
            <FiLogOut className="w-5 h-5" />

            <span>Logout</span>
          </div>
          <Switch
              onChange={()=> theme == "dark"? setTheme('light'): setTheme("dark")}
              startContent={<SunIcon className="w-5 h-5" />} endContent={<MoonIcon className="w-5 h-5" />}
              classNames={{
                base: cn(
                    "inline-flex flex-row-reverse w-full max-w-md hover:bg-content2 items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary bg-white/50  dark:text-white dark-theme",
                ),

              }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm"> Toggle dark mode</p>
            </div>
          </Switch>
          {/*<div className="flex gap-2 items-center justify-between bg-white/50 p-3 rounded-md cursor-pointer">*/}
          {/*  <div className="flex items-center gap-1">*/}
          {/*    {theme !== 'dark' ? <SunIcon className="w-5 h-5"/> : <MoonIcon className="w-5 h-5"/>}*/}

          {/*    <span> {theme?.toLocaleUpperCase()} Mode</span>*/}
          {/*  </div>*/}
          {/*  <Switch startContent={<SunIcon className="w-5 h-5" />} endContent={<MoonIcon className="w-5 h-5" />} defaultSelected color="default" onChange={()=> theme == "dark"? setTheme('light'): setTheme("dark")} />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

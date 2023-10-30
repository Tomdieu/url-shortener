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
  
const Sidebar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <div className="flex-1 h-full w-full bg-zinc-500 flex gap-0 flex-col dark:bg-[#18181B] dark:text-white">
      <div className="py-4  px-4 text-medium md:text-2xl lg:text-3xl text-white select-none flex gap-2 w-full items-center justify-between cursor-pointer">
        <div className="flex items-center gap-1">
          {/* <FiLink2 className="-rotate-45" /> */}
          <h5 className="font-bold hidden sm:block">Trix Url</h5>
          <h5 className="font-bold block sm:hidden">Trix Url</h5>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-1 p-2 text-white select-none" >
          <Link href={"/dashboard"}>
            <div className="text-sm flex gap-2 items-center  bg-white/50 p-3 rounded-md cursor-pointer hover:bg-white/40 active:bg-white/30 dark:hover:bg-content2">
              <DashboardIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link href={"/dashboard/links"}>
            <div className="text-sm flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-content2">
              <Link2Icon className="w-5 h-5" />
              <span>Links</span>
            </div>
          </Link>
          <Link href={"/dashboard/shorten"}>
            <div className="text-sm flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-content2">
              <FiLink className="w-5 h-5" />

              <span>Shorten Link</span>
            </div>
          </Link>
          <Link href={"/dashboard/analytics"}>
            <div className="text-sm flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-content2">
              {/* <BarChartIcon className="w-5 h-5" /> */}
              <BarChart2 className="w-5 h-5" color="#ffffff" />
              <span>Analytics</span>
            </div>
          </Link>
          <Link href={"/dashboard/settings"}>
            <div className="text-sm flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-content2">
              <FiSettings className="w-5 h-5" />

              <span>Settings</span>
            </div>
          </Link>
          <Link href={"/dashboard/pricing"}>
            <div className="text-sm flex gap-2 items-center border-l-small border-transparent hover:border-blue-500 bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-content2">
              {/* <TbBusinessplan className="w-5 h-5" /> */}
              <Wallet className="w-5 h-5" color="#ffffff" />
              <span>Pricing</span>
            </div>
          </Link>
        </div>
        {/*<Divider />*/}
        <Spacer className="flex-1" />
        <div className="flex flex-col gap-1 p-2 text-white select-none">
          <div
            onClick={() => signOut({ redirect: true, callbackUrl: "/auth" })}
            className="flex gap-2 text-sm items-center bg-white/50 p-4 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-content2"
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
                    "data-[selected=true]:border-primary bg-white/50  dark:text-white",
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

"use client";
import { Divider, Spacer, Switch } from "@nextui-org/react";
import {
  BarChartIcon,
  DashboardIcon,
  Link2Icon,
  MoonIcon,
} from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiLink, FiLink2, FiLogOut, FiMenu, FiSettings } from "react-icons/fi";
import { TbBusinessplan } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="flex-1 bg-zinc-500 flex gap-0 flex-col">
      <div className="py-4  px-4 text-medium md:text-2xl lg:text-3xl text-white select-none flex gap-2 w-full items-center justify-between cursor-pointer">
        <div className="flex items-center gap-1">
          {/* <FiLink2 className="-rotate-45" /> */}
          <h5 className="font-bold hidden sm:block">Trix Url</h5>
          <h5 className="font-bold block sm:hidden">T Url</h5>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-1 p-2 text-white select-none">
          <Link href={"/dashboard"}>
            <div className="flex gap-2 items-center  bg-white/50 p-3 rounded-md cursor-pointer hover:bg-white/40 active:bg-white/30">
              <DashboardIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link href="/dashboard/links">
            <div className="flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300">
              <Link2Icon className="w-5 h-5" />
              <span>Links</span>
            </div>
          </Link>
          <Link href="/dashboard/shorten">
            <div className="flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300">
              <FiLink className="w-5 h-5" />

              <span>Shorten Link</span>
            </div>
          </Link>
          <Link href="/dashboard/analytics">
            <div className="flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300">
              <BarChartIcon className="w-5 h-5" />

              <span>Analytics</span>
            </div>
          </Link>
          <Link href="/dashboard/settings">
            <div className="flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300">
              <FiSettings className="w-5 h-5" />

              <span>Settings</span>
            </div>
          </Link>
          <Link href="/dashboard/pricing">
            <div className="flex gap-2 items-center border-l-small border-transparent hover:border-blue-500 bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300">
              <TbBusinessplan className="w-5 h-5" />

              <span>Pricing</span>
            </div>
          </Link>
        </div>
        <Divider />
        <Spacer className="flex-1" />
        <div className="flex flex-col gap-1 p-2 text-white select-none">
          <div
            onClick={() => signOut({ redirect: true, callbackUrl: "/auth" })}
            className="flex gap-2 items-center bg-white/50 p-3 rounded-md cursor-pointer hover:bg-blue-300"
          >
            <FiLogOut className="w-5 h-5" />

            <span>Logout</span>
          </div>
          <div className="flex gap-2 items-center justify-between bg-white/50 p-3 rounded-md cursor-pointer">
            <div className="flex items-center gap-1">
              <MoonIcon className="w-5 h-5" />

              <span> Ligth Mode</span>
            </div>
            <Switch defaultSelected color="default" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

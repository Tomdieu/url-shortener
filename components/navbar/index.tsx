"use client";
import { User } from "@prisma/client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FiMenu, FiSettings, FiLogOut } from "react-icons/fi";
import { Menubar, MenubarContent, MenubarItem, MenubarTrigger } from "../ui/menubar";
import {
  Link1Icon,
  Link2Icon,
} from "@radix-ui/react-icons";

import { signOut } from "next-auth/react";
import { MenubarMenu } from "@radix-ui/react-menubar";
import UserNav from "./user-nav";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "../sidebar";

type NavBarProps = {
  user?: User | null;
};

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <div className="sticky top-0 z-50 bg-white bg-opacity-40 backdrop-blur-md shadow-lg py-2 md:py-3 border-b-1 px-4 w-full z-99">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Sheet>
            <SheetTrigger asChild>

              <Button isIconOnly className="bg-transparent sm:hidden">
                <FiMenu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent   side={'left'} className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl md:text-2xl font-bold cursor-pointer select-none">
            Trix Url
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {user && <UserNav user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

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

import {
  Link1Icon,
  Link2Icon,
} from "@radix-ui/react-icons";

import { signOut } from "next-auth/react";

type NavBarProps = {
  user?: User | null;
};

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <div className="py-2 md:py-3 border-b-1 px-4 static w-full z-99">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Button isIconOnly className="bg-transparent sm:hidden">
            <FiMenu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold cursor-pointer select-none">
            Trix Url
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Dropdown
              showArrow
              classNames={{
                base: "px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
                arrow: "bg-default-200",
              }}
            >
              <DropdownTrigger>
                <div className="rounded gap-1 p-1 flex items-center justify-center cursor-pointer bg-white">
                  {user?.name && (
                    <Avatar
                      showFallback
                      src={user?.image as string}
                      className="text-md p-1 text-white h-10 w-10 bg-white"
                    />
                  )}
                  <svg
                    className="text-blue-500"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
                  </svg>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
              >
                <DropdownSection title="">
                  <DropdownItem key="links" startContent={<Link1Icon />}>
                    Links
                  </DropdownItem>
                  <DropdownItem key="shortend-url" startContent={<Link2Icon />}>
                    Shorten URL
                  </DropdownItem>
                  <DropdownItem key="settings" startContent={<FiSettings />}>
                    Settings
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="">
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    startContent={<FiLogOut />}
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: "/auth" })
                    }
                  >
                    Logout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

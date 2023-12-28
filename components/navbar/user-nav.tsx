"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

import { signOut } from "next-auth/react";


import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {LogOut, Settings, Link2, Link as LinkIcon, Database, Wallet,} from "lucide-react";
import {GiPriceTag} from "react-icons/gi";
import {MdOutlinePriceCheck} from "react-icons/md";

type UserNavProps = {
    user?: User | null;
}

export default function UserNav({ user }: UserNavProps) {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-10 w-10 p-0.5 border">
                        <AvatarImage  src={user?.image as string} alt={user?.name as string} />
                        <AvatarFallback className={"shadow-xl font-poppins text-xl"}>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-black dark:text-white" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/links")} className="flex gap-2">
                        <Link2 size={16} className="text-black dark:text-white"/>
                        Links
                        {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex gap-2" onClick={() => router.push("/dashboard/shorten")}>
                        <LinkIcon size={16} className="text-black dark:text-white" />
                        Shorten URL
                        {/*<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex gap-2" onClick={() => router.push("/dashboard/settings/profile")}>
                        <Settings size={16} className="text-black dark:text-white" />
                        Settings
                        {/*<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
                    </DropdownMenuItem>
                    {/*<DropdownMenuItem className="flex gap-2">*/}
                    {/*    <Wallet size={16} className="text-black dark:text-white"/>*/}
                    {/*    Pricing*/}
                    {/*</DropdownMenuItem>*/}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2" onClick={() =>
                    signOut({ redirect: true, callbackUrl: "/auth" })
                }>
                    <LogOut size={16} className="text-red-400" />
                    Log out
                    {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
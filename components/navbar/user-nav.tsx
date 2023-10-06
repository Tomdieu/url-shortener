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
import { LogOut,Settings,Link2,Link as LinkIcon } from "lucide-react";

type UserNavProps = {
    user?: User | null;
}

export default function UserNav({ user }: UserNavProps) {
    const router = useRouter();


    const navigate = (path: string) => {
        router.push(path)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.image as string} alt={user?.name as string} />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
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
                    <Link asChild href="/dashboard/links">
                        <DropdownMenuItem className="flex gap-2">
                        <Link2 size={16} className="text-black" />
                            Links
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link asChild href="/dashboard/shorten">

                        <DropdownMenuItem  className="flex gap-2">
                        <LinkIcon size={16} className="text-black"  />
                            Shorten URL
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="flex gap-2">
                    <Settings size={16} className="text-black" />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Pricing</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2" onClick={() =>
                    signOut({ redirect: true, callbackUrl: "/auth" })
                }>
                    <LogOut size={16} className="text-red-400" />
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
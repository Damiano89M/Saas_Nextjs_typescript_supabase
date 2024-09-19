"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface UserMenuProps{
    user: User
}

const UserMenu = ({user}: UserMenuProps) => {
    const router = useRouter();

    const logout = async () => {
        const supabaseClient = createClient();
        const { error } = await supabaseClient.auth.signOut();
        
        if(!error) {
            router.refresh();
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Image
                        alt='avtar'
                        src='/avatar.jpg'
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href='courses'>Corsi</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className=" cursor-pointer">Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserMenu

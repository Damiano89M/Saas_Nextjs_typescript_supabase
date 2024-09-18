import { Button } from "@/components/ui/button";
import UserMenù from "./UserMenù";
import  Link  from "next/link";
import { User } from "@supabase/supabase-js";

interface NavbarProps {
  user?: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <>
      <nav>
        <div className="m-auto max-w-7xl">
          <ul className="flex p-8  items-center">
            <li className="flex-1 font-bold text-3xl">Logo</li>
              {
              user ? <UserMenù user={user} />
              :

                <li><Button variant='outline' asChild><Link href='login'>Login</Link></Button></li>
            }
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar

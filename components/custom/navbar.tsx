import React from 'react'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';


export interface NavProps {
    href?: string;
}



export function Navbar({ href = "./"}: NavProps) {
  const { setTheme } = useTheme()

  return (
    <div>
        <div className='bg-blue-950 dark:bg-slate-700 text-white py-2 px-5 flex justify-between font-bold'>
          <div className='flex items-center'>
            <Link href={href}>
              <h4 className='font-bold py-3'>SAFReady</h4>
            </Link>
          </div>
          

          <div className='flex items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'><Avatar>
              <AvatarImage src="/images/my-profile-icon.png" />
              <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">
                Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">
                Logout
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className='mr-4 bg-blue-950 dark:bg-transparent p-0 hover:bg-gray-600'>
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black dark:text-white" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" >
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        
    </div>
   
  )
}

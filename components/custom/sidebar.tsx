
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CheckCircle, FileText, Home, LayoutDashboard, Mail, User } from "lucide-react";
import Link from "next/link"; 
import { useState, useEffect } from "react";
//import { Button } from "../ui/button";

export function SideBar() {
  const [role, setRole] = useState<string | null>(null); // Initialize role state
  //const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setRole(user.role);
      } catch (error) {
        console.error("Error parsing user role from localStorage:", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, []);

  return (
    <div>
      <div className="md:block px-2 h-full">
        <Command className="rounded-none ">
          <div className="hidden md:block">
            <CommandInput placeholder="Type a command or search..." className="active:bg-white" />
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
            {role === "Admin" ? (
              <Link href="/admin-dashboard">
                <CommandItem>
                  <Home className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Admin Dashboard</span>
                </CommandItem>
              </Link>
            ) : (
              <Link href="/dashboard">
                <CommandItem>
                  <Home className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Dashboard</span>
                </CommandItem>
              </Link>
            )}

            {role !== "Admin" && (
              <Link href="/checklist">
                <CommandItem>
                  <LayoutDashboard className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Job Search Checklist</span>
                </CommandItem>
              </Link>
            )}

            {role === "Admin" ? (
              <Link href="/reviewspage">
                <CommandItem>
                  <CheckCircle className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Reviews</span>
                </CommandItem>
              </Link>
            ) : (
              <Link href="/submission">
                <CommandItem>
                  <FileText className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Resume/Portfolio</span>
                </CommandItem>
              </Link>
            )}

            {role === "Admin" ? (
              <Link href="/scheduled-calls">
                <CommandItem>
                  <Mail className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Scheduled Calls</span>
                </CommandItem>
              </Link>
            ) : (
              <Link href="/contact-form">
                <CommandItem>
                  <Mail className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Contact Form</span>
                </CommandItem>
              </Link>
            )}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading={<span className="hidden sm:block">Profile</span>}>
              <Link href="/profile">
                <CommandItem>
                  <User className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Profile</span>
                </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

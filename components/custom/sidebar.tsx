
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CheckCircle, FileText, Home, LayoutDashboard, Mail, Settings, User } from "lucide-react";
import Link from "next/link"; // Import Next.js Link component
import { useState, useEffect } from "react"; // Import useEffect
import { Button } from "../ui/button";

export function SideBar() {
  const [role, setRole] = useState<string | null>(null); // Initialize role state
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Get the user role from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setRole(user.role);
      } catch (error) {
        console.error("Error parsing user role from localStorage:", error);
        setRole(null); // Reset the role on parse error
      }
    } else {
      setRole(null); // No user in localStorage
    }
  }, []);

  return (
    <div>
      {/* Desktop Menu */}
      <div className="md:block px-2 h-full">
        <Command className="rounded-none ">
          <div className="hidden md:block">
            <CommandInput placeholder="Type a command or search..." className="active:bg-white" />
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

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

            <CommandSeparator />
            <CommandGroup heading={<span className="hidden sm:block">Settings</span>}>
              <Link href="/profile">
                <CommandItem>
                  <User className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline-block">Profile</span>
                </CommandItem>
              </Link>

              {role === "Admin" ? (
                <Link href="/admin-settings">
                  <CommandItem>
                    <Settings className="mr-2 w-4 h-4" />
                    <span className="hidden sm:inline-block">Admin Settings</span>
                  </CommandItem>
                </Link>
              ) : (
                <Link href="/settings">
                  <CommandItem>
                    <Settings className="mr-2 w-4 h-4" />
                    <span className="hidden sm:inline-block">Settings</span>
                  </CommandItem>
                </Link>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

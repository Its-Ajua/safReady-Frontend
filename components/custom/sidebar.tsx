"use client"; // Mark this as a client component

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { LayoutDashboard, Newspaper, Folders, CreditCard, Settings, User } from "lucide-react";
import Link from "next/link"; // Import Next.js Link component
import { useState, useEffect } from "react"; // Import useEffect
import { Button } from "../ui/button";

export interface SideProps {
  href?: string;
}

export function SideBar({ href = "./" }: SideProps) {
  const [role, setRole] = useState<string | null>(null); // Initialize role state
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Get the user role from localStorage when the component mounts
  useEffect(() => {
    const storedRole = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).role : null;
    setRole(storedRole);
  }, []);

  return (
    <div>
      {/* Desktop Menu */}
      <div className="hidden md:block px-2">
        <Command className="rounded-none">
          <CommandInput placeholder="Type a command or search..." className="active:bg-white" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {role === "Admin" ? (
              <CommandItem>
                <Link href="/admin-dashboard">Admin Dashboard</Link>
              </CommandItem>
            ) : (
              <CommandItem>
                <Link href="/dashboard">Dashboard</Link>
              </CommandItem>
            )}

            {role !== "Admin" && (
              <CommandItem>
                <Link href="/checklist">Job Search Checklist</Link>
              </CommandItem>
            )}

            {role === "Admin" ? (
              <CommandItem>
                <Link href="/reviews">Reviews</Link>
              </CommandItem>
            ) : (
              <CommandItem>
                <Link href="/submission">Resume/Portfolio Review</Link>
              </CommandItem>
            )}

            {role === "Admin" ? (
              <CommandItem>
                <Link href="/scheduled-calls">Scheduled Calls</Link>
              </CommandItem>
            ) : (
              <CommandItem>
                <Link href="/contact-form">Contact Form</Link>
              </CommandItem>
            )}

            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 w-4 h-4" />
                <Link href="/profile">Profile</Link>
              </CommandItem>

              {role === "Admin" ? (
                <CommandItem>
                  <Settings className="mr-2 w-4 h-4" />
                  <Link href="/admin-settings">Admin Settings</Link>
                </CommandItem>
              ) : (
                <CommandItem>
                  <Settings className="mr-2 w-4 h-4" />
                  <Link href="/settings">Settings</Link>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <Button
          onClick={toggleMenu}
          className="bg-gray-600 text-white px-4 py-2 w-full rounded-md hover:bg-gray-700 transition"
        >
          Menu
        </Button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
            <Command className="rounded-none">
              <CommandInput placeholder="Type a command or search..." className="active:bg-gray-200" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                {role === "Admin" ? (
                  <CommandItem>
                    <Link href="/admin/dashboard">Admin Dashboard</Link>
                  </CommandItem>
                ) : (
                  <CommandItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </CommandItem>
                )}

                {role !== "Admin" && (
                  <CommandItem>
                    <Link href="/checklist">Job Search Checklist</Link>
                  </CommandItem>
                )}

                {role === "Admin" ? (
                  <CommandItem>
                    <Link href="/reviews">Reviews</Link>
                  </CommandItem>
                ) : (
                  <CommandItem>
                    <Link href="/submission">Resume/Portfolio Review</Link>
                  </CommandItem>
                )}

                {role === "Admin" ? (
                  <CommandItem>
                    <Link href="/scheduled-calls">Scheduled Calls</Link>
                  </CommandItem>
                ) : (
                  <CommandItem>
                    <Link href="/contact-form">Contact Form</Link>
                  </CommandItem>
                )}

                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User className="mr-2 w-4 h-4" />
                    <Link href="/profile">Profile</Link>
                  </CommandItem>

                  {role === "Admin" ? (
                    <CommandItem>
                      <Settings className="mr-2 w-4 h-4" />
                      <Link href="/admin/settings">Admin Settings</Link>
                    </CommandItem>
                  ) : (
                    <CommandItem>
                      <Settings className="mr-2 w-4 h-4" />
                      <Link href="/settings">Settings</Link>
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}

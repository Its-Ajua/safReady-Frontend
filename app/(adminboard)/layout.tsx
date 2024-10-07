"use client"

import { Navbar } from "@/components/custom/navbar"
import { SideBar } from "@/components/custom/sidebar"

export default function BoardLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            
            <style global jsx>{`
                body {
                    overflow: hidden;
                }
            `}
            </style>
            <div>
                < Navbar/>
                <div className="h-screen flex overflow-hidden"> 
                    < SideBar/>
                    <div className="h-full basis-full p-5 w-full md:max-w-[1140px] overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
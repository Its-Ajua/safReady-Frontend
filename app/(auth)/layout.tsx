"use client"

import Image from 'next/image'
import React from 'react'
import { Logo } from '@/components/custom/logo'

export default function AuthLayout({children}: {children: React.ReactNode}){
  return (
    <>
      <style global jsx>{`
          body {
            overflow: hidden;
          }
        `}
      </style>
   
    <div className='h-screen flex justify-center items-center overflow-hidden'>
        <div className='h-full basis-1/2 relative justify-center items-center hidden lg:flex'>
            <Image src="/images/ready.jpeg" alt='' fill className='shadow-2xl shadow-blue-500/50 blur-sm object-cover'/>
        </div>

        <div className='h-full basis-full lg:basis-1/2 p-6 lg:px-24 lg:py-16 overflow-auto'>
            < Logo/>
            <div className='mt-8 lg:mt-16 w-max mx-auto'>
                {children}
            </div>
            
        </div>
    </div>
    </>
  ) 
}
 

 


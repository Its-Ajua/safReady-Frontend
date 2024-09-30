import Image from 'next/image'
import React from 'react'

export default function AuthLayout({children}: {children: React.ReactNode}){
  return (
    <div className='h-screen flex justify-center items-center overflow-hidden'>
        <div className='h-full basis-1/2 relative justify-center items-start blur-sm hidden lg:flex'>
            <Image src="/images/ready.jpeg" alt='' fill className='shadow-2xl shadow-blue-500/50 object-cover'/>
        </div>

        <div className='h-full basis-full lg:basis-1/2 '>
            <div className='mt-10 lg:mt-16 w-max mx-auto'>
                {children}
            </div>
            
        </div>
    </div>
  )
}


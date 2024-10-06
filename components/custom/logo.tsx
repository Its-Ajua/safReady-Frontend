import Link from 'next/link';
import React from 'react';



export interface LogoProps {
    href?: string;
}

export function Logo({ href = "./"}: LogoProps) {
  return (
    <div>
        <Link href={href}>
        <div className='items-start'>
            <h4 className='font-bold text-2xl text-primary'>GradGear</h4>
        </div>
        </Link>
    </div>
  )
}
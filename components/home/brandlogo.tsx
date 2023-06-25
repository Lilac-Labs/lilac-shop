"use client"
import Link from "next/link";
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function BrandLogo({logoPath, link, name} :
    {logoPath: string, link: string, name: string}) {
        

return (
    <Link href={link}>
        <Image
              className="mx-2 h-full"
              src={logoPath}
              width={100}
              height={100}
              alt={name}
            />
    </Link>
)
}
"use client"
import Link from "next/link";
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { use, useEffect } from "react";

export default function ProductDemo({pfpPath, shoplink, product1img, product1link, product2img, product2link } : 
    {pfpPath: string, shoplink: string, product1img: string, product1link: string, product2img: string, product2link: string}) {
        

return (
    <div className="
                    w-full">
        <div className="bg-green-500
                        mx-5">
            <img className="object-cover
                            min-w-30
                            min-h-30
                            max-w-64
                            max-h-64
                            rounded-3xl"
                src={pfpPath}
                alt="pfp-image" />
        </div>

        <div className='w-full flex flex-row justify-evenly -mt-6'>
            <Link href={product1link}>
                <Image className="rounded-lg shadow-lg shadow-grew" src={product1img} width={100} height={100} alt="product-1"/>
            </Link>
            
            <Link href={product2link}>
                <Image className="rounded-lg shadow-lg shadow-grew" src={product2img} width={100} height={100} alt="product-2" />
            </Link>
        </div>
        <div className="flex flex-row justify-center">
        <Button className="flex w-3/6 mt-3">
            <Link href={shoplink}>
                <p>Visit shop</p>
            </Link>
        </Button>
        </div>
    </div>
)
}
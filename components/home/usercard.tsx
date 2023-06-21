"use client"
import Link from "next/link";
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { use, useEffect } from "react";

export default function ProductDemo({pfpPath, shoplink, product1img, product1link, product2img, product2link } : 
    {pfpPath: string, shoplink: string, product1img: string, product1link: string, product2img: string, product2link: string}) {
        

return (
    <div className="w-7/24 mx-5">
        <div className="w-full h-14/24">
            <img className="object-cover
                            flex
                            flex-auto
                            w-full
                            max-w-64
                            max-h-64
                            h-full
                            rounded-3xl"
                src={pfpPath}
                alt="pfp-image" />
        </div>


        <div className='w-full flex flex-row justify-evenly -mt-6'>
            <Link href="https://www.bloomingdales.com/shop/product/the-mens-store-at-bloomingdales-cashmere-v-neck-sweater-100-exclusive?ID=3418434&pla_country=US&cm_mmc=Google-PLA-ADC-_-GMM3+-+Mens+-+All+Other+Mens+Categories-_-Mens+Formal+Wear-_-190089875412USA-_-go_cmp-13048465671_adg-123044759238_ad-520733021264_pla-1261067851097_dev-c_ext-_prd-190089875412USA&gad=1&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K3y7_XUdneK8Us4vRJ15GGoNhm4L7n10nhiMYYodCg7DhzQSxC0RD8aAl5fEALw_wcB">
                <Image className="rounded-lg shadow-lg shadow-grew" src={product1img} width={100} height={100} alt="product-1"/>
            </Link>
            
            <Link href="https://www.alanpaine-usa.com/products/wardlow-cashmere-check-scarf-in-pitch-green">
                <Image className="rounded-lg shadow-lg shadow-grew" src="/tk-product-2.png" width={100} height={100} alt="product-2" />
            </Link>
        </div>
        <div className="flex flex-row justify-center">
        <Button className="flex w-3/6 mt-3">
            <Link href="/tonykam">
                <p>Visit shop</p>
            </Link>
        </Button>
        </div>
    </div>
)
}
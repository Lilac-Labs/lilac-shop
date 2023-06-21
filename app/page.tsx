import Card from '@/components/home/card'
import Balancer from 'react-wrap-balancer'
import { DEPLOY_URL } from '@/lib/constants'
import { Github, Twitter } from '@/components/shared/icons'
import WebVitals from '@/components/home/web-vitals'
import ComponentGrid from '@/components/home/component-grid'
import Image from 'next/image'
import type { ImageLoaderProps } from 'next/image';

import { nFormatter } from '@/lib/utils'
import { User } from '@/components/client-component'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    'https://api.github.com/repos/steven-tey/precedent',
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
      // data will revalidate every 60 seconds
      next: { revalidate: 60 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e))

  return (
      <main className="flex flex-col flex-auto">
          <div className="h-full flex flex-auto flex-row justify-center">
            <div className="self-center	z-10 flex-auto flex-col w-full max-w-xl px-5 xl:px-0 items-center">
              <h1
                className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
                style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
              >
                <Balancer> Recommend Products, Earn Commission.</Balancer>
              </h1>
              <p
                className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
                style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
              >
                <Balancer>
                  Unlock hundreds of affiliate programs. Earn commission on every sale. Track analytics for all of your links.  
                </Balancer>
              </p>
              <div
                className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
                style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
              >
                <a
                  className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                  href={DEPLOY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-4 w-4 group-hover:text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L20 20H4L12 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Apply</p>
                </a>
                <a
                  className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                  href="https://github.com/steven-tey/precedent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                  <p>
                    <span className="hidden sm:inline-block">Contact </span> Us{' '}
                    <span className="font-semibold">{nFormatter(stars)}</span>
                  </p>
                </a>
              </div>
            </div>
            <div className="z-10 w-full max-w-xl px-5 xl:px-0 flex-auto items-center	">
              <Image className="flex center w-full rounded-3xl" src="/how-it-works-feature-1.jpg" width={480} height={533} />
            </div>
          </div>

          <div className="bg-rose-200	my-10 h-40 flex flex-auto flex-row justify-center items-center">
            <div>
              <p> Brands our creators work with.</p>
            </div>
          </div>

          <div className="my-10 h-full flex flex-auto flex-row justify-center">
            <div className="w-8/12 flex flex-row justify-evenly	">
              <div>
                <Image className="flex w-full rounded-3xl" src="/judy-pfp.png" width={200} height={200} alt="judy-pfp"/>
                
                <div className='products-container flex flex-row justify-evenly -mt-6'>
                  <Link href="https://www.ssense.com/en-us/women/product/jacquemus/white-le-chiquito-noeud-shoulder-bag/12431041?gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K287HKYt5otACUos_YeUlXN38Ud0eij9_W3N-TrImPoOJsuSgzUW_oaAs8OEALw_wcB">
                    <Image className="rounded-lg shadow-lg shadow-grew" src="/judy-product-1.png" width={100} height={100} alt="judy-product-1"/>
                    {/* <Image className="rounded-lg" src="/judy-brand-1.png" width={100} height={200} alt="judy-brand-1"/> */}
                  </Link>
                  <Link href="https://www.stevemadden.com/products/evita-red-patent?variant=40162499494021&utm_source=google&utm_medium=cpc&utm_campaign=Google%7CPmax%7CMid&utm_content=&utm_term=&_aiid=14917&teng=go&beng=m&deng=c&peng=&ieng=&kieng=&cieng=&cpieng=17612793586&feng=&cleng=Cj0KCQjw1rqkBhCTARIsAAHz7K14yE8yZsEX2RAJRr_s9zfXqQ-_qXV6uM1o1yr2v4V5TOeoVBIdNDAaArcfEALw_wcB&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K14yE8yZsEX2RAJRr_s9zfXqQ-_qXV6uM1o1yr2v4V5TOeoVBIdNDAaArcfEALw_wcB">
                    <Image className="rounded-lg shadow-lg shadow-grew" src="/judy-product-2.png" width={100} height={100} alt="judy-product-2"/>
                  </Link>
                </div>

                <Button className="flex w-full mt-3">
                  <Link href="/judykam">
                    <p>Visit Judy's shop</p>
                  </Link>
                </Button>
              </div>
              <div>
                <Image className="flex w-full rounded-3xl" src="/dt-pfp.png" width={200} height={200} alt="dt-pfp"/>
                
                <div className='products-container flex flex-row justify-evenly -mt-6'>
                  <Link href="https://www.bloomingdales.com/shop/product/michael-kors-leather-racer-jacket?ID=4216474&pla_country=US&cm_mmc=Google-PLA-ADC-_-GMM3+-+Mens+-+All+Other+Mens+Categories-_-Mens+Apparel-_-193600506765USA-_-go_cmp-13048465671_adg-122506160775_ad-520670400844_pla-1257648768862_dev-c_ext-_prd-193600506765USA&gad=1&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K3_xDExh9JDl1m2bnenXmbWWzF2ltkq_B8KeHISvtULPKJXPy5rDKEaAtroEALw_wcB">
                    <Image className="rounded-lg shadow-lg shadow-grew" src="/dt-product-1.png" width={100} height={100} alt="dt-product-1"/>
                    {/* <Image className="rounded-lg" src="/judy-brand-1.png" width={100} height={200} alt="judy-brand-1"/> */}
                  </Link>
                  <Link href="https://www.amazon.com/American-Crew-Fiber-3-Oz/dp/B0007CXWC4/ref=asc_df_B0007CXWC4/?tag=hyprod-20&linkCode=df0&hvadid=312143425159&hvpos=&hvnetw=g&hvrand=11087832050191241799&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9031951&hvtargid=pla-406644557455&psc=1">
                    <Image className="rounded-lg shadow-lg shadow-grew" src="/dt-product-2.png" width={100} height={100} alt="dt-product-2"/>
                  </Link>
                </div>

                <Button className="flex w-full mt-3">
                  <Link href="/judykam">
                    <p>Visit Daniel's shop</p>
                  </Link>
                </Button>
              </div>
              <div>
                <Image className="flex w-full rounded-3xl" src="/tony-pfp.png" width={200} height={200} alt="judy-pfp"/>
                
                <div className='products-container flex flex-row justify-evenly -mt-6'>
                  <Link href="https://www.bloomingdales.com/shop/product/the-mens-store-at-bloomingdales-cashmere-v-neck-sweater-100-exclusive?ID=3418434&pla_country=US&cm_mmc=Google-PLA-ADC-_-GMM3+-+Mens+-+All+Other+Mens+Categories-_-Mens+Formal+Wear-_-190089875412USA-_-go_cmp-13048465671_adg-123044759238_ad-520733021264_pla-1261067851097_dev-c_ext-_prd-190089875412USA&gad=1&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K3y7_XUdneK8Us4vRJ15GGoNhm4L7n10nhiMYYodCg7DhzQSxC0RD8aAl5fEALw_wcB">
                    <Image className="object-cover rounded-lg shadow-lg shadow-grew" src="/tk-product-1.png" width={100} height={100} alt="tony-product-1"/>
                    {/* <Image className="rounded-lg" src="/judy-brand-1.png" width={100} height={200} alt="judy-brand-1"/> */}
                  </Link>
                  <Link href="https://www.alanpaine-usa.com/products/wardlow-cashmere-check-scarf-in-pitch-green">
                    <Image className="rounded-lg shadow-lg shadow-grew" src="/tk-product-2.png" width={100} height={100} alt="tony-product-2"/>
                  </Link>
                </div>

                <Button className="flex w-full mt-3">
                  <Link href="/tonykam">
                    <p>Visit Tony's shop</p>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
      </main>
  )
}
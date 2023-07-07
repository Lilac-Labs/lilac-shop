'use client'

import Card from '@/components/home/card'
import Balancer from 'react-wrap-balancer'
import { DEPLOY_URL } from '@/lib/constants'
import Image from 'next/image'
import type { ImageLoaderProps } from 'next/image' // How to use this?
import { nFormatter } from '@/lib/utils'
import { User } from '@/components/client-component'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductDemo from '@/components/home/usercard'
import useWindowSize from '@/lib/hooks/use-window-size'
import BrandLogo from '@/components/home/brandlogo'
import { useCreatorsApplyModal } from '@/components/layout/creators-apply-modal'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function HomeComponents() {
  const debug = false
  const searchParams = useSearchParams()

  const isApply = searchParams.get('apply')

  const { CreatorsApplyModal, setShowCreatorsApplyModal } =
    useCreatorsApplyModal()

  useEffect(() => {
    if (isApply) {
      setShowCreatorsApplyModal(true)
    }
  }, [isApply])

  return (
    <main
      className={`${debug ? 'bg-blue-500' : ''}
                      flex flex-auto flex-col
                      `}
    >
      <CreatorsApplyModal />
      <div
        className={`${debug ? 'bg-green-500' : ''}
                        mx-5 
                        my-5 flex
                        h-full
                        flex-auto
                        flex-col
                        justify-center
                        sm:flex-col
                        md:flex-col
                        lg:flex-row
                        xl:flex-row`}
      >
        <div
          className={`${debug ? 'bg-yellow-500' : ''}
                          mb-5 h-full
                          w-full
                          max-w-xl
                          self-center
                          `}
        >
          <h1
            className="animate-fade-up
              bg-gradient-to-br from-black to-stone-500 bg-clip-text
              text-center
              font-display
              text-5xl
              font-bold
              tracking-[-0.02em]
              text-transparent
              opacity-0
              drop-shadow-sm
              md:text-7xl
              md:leading-[5rem]"
            style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            <Balancer> Recommend Products, Earn Commission.</Balancer>
          </h1>
          <p
            className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            <Balancer>
              Unlock hundreds of affiliate programs. Earn commission on every
              sale. Track analytics for all of your links.
            </Balancer>
          </p>

          <div
            className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <button
              className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              onClick={() => setShowCreatorsApplyModal(true)}
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
            </button>
          </div>
        </div>

        <div
          className={`${debug ? 'bg-red-500' : ''} 
                          flex
                          h-full w-full
                          max-w-xl
                          items-center
                          justify-center self-center
                          `}
        >
          <Image
            className="
                        w-full w-full
                        max-w-[300px]
                        rounded-3xl
                        sm:max-w-[300px]
                        md:max-w-[500px]
                        lg:max-w-[600px]
                        "
            src="/how-it-works-feature-1.jpg"
            width={480}
            height={533}
            alt="how-it-works"
          />
        </div>
      </div>
      {/* <div className="bg-rose-200">
        <div
          className="mx-5 flex
                          flex-auto flex-row items-center
                          justify-center
                          bg-rose-200
                          text-center"
        >
          <div>
            <p
              className="my-5
                            bg-gradient-to-br from-black to-stone-500 bg-clip-text
                            text-center
                            font-display
                            text-xl
                            font-bold
                            tracking-[-0.02em]
                            drop-shadow-sm
                            md:text-2xl
                            lg:text-3xl
                            "
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              <Balancer>Work with our brand partners. </Balancer>
            </p>
            <div
              className="mb-3
                              flex
                              h-full
                              w-full
                              flex-row
                              justify-center
                              overflow-hidden"
            >
              {brands.map(({ name, logoPath, link }) => (
                <BrandLogo
                  name={name}
                  logoPath={logoPath}
                  link={link}
                  key={link}
                />
              ))}
            </div>
          </div>
        </div>
      </div> */}

      <div
        className={`${debug ? 'bg-green-500' : ''} 
                        mx-5 mt-10
                        flex
                        flex-row
                        justify-center
                        `}
      >
        <div
          className={`${debug ? 'bg-blue-500' : ''} 
                        flex flex-row
                        self-center
                        overflow-auto
                        `}
        >
          {demo.map(
            ({
              pfpPath,
              shoplink,
              product1img,
              product1link,
              product2img,
              product2link,
            }) => (
              <ProductDemo
                pfpPath={pfpPath}
                shoplink={shoplink}
                product1img={product1img}
                product1link={product1link}
                product2img={product2img}
                product2link={product2link}
                key={shoplink}
              />
            ),
          )}
        </div>
      </div>
    </main>
  )
}

const brands = [
  {
    name: 'Nike',
    logoPath: '/brand-logos/brand-logo-1.png',
    link: 'https://www.nike.com/',
  },
  {
    name: 'Uniqlo',
    logoPath: '/brand-logos/brand-logo-2.png',
    link: 'https://www.uniqlo.com/us/en/home/',
  },
  {
    name: 'LuluLemon',
    logoPath: '/brand-logos/brand-logo-3.png',
    link: 'https://shop.lululemon.com/',
  },
  {
    name: 'Victoria Secret',
    logoPath: '/brand-logos/brand-logo-4.png',
    link: 'https://www.victoriassecret.com/',
  },
]

//  Create a list of products for each user
const demo = [
  {
    pfpPath: '/judy-pfp.png',
    shoplink: '/judykam',
    product1img: '/judy-product-1.png',
    product1link:
      'https://www.ssense.com/en-us/women/product/jacquemus/white-le-chiquito-noeud-shoulder-bag/12431041?gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K287HKYt5otACUos_YeUlXN38Ud0eij9_W3N-TrImPoOJsuSgzUW_oaAs8OEALw_wcB',
    product2img: '/judy-product-2.png',
    product2link:
      'https://www.stevemadden.com/products/evita-red-patent?variant=40162499494021&utm_source=google&utm_medium=cpc&utm_campaign=Google%7CPmax%7CMid&utm_content=&utm_term=&_aiid=14917&teng=go&beng=m&deng=c&peng=&ieng=&kieng=&cieng=&cpieng=17612793586&feng=&cleng=Cj0KCQjw1rqkBhCTARIsAAHz7K14yE8yZsEX2RAJRr_s9zfXqQ-_qXV6uM1o1yr2v4V5TOeoVBIdNDAaArcfEALw_wcB&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K14yE8yZsEX2RAJRr_s9zfXqQ-_qXV6uM1o1yr2v4V5TOeoVBIdNDAaArcfEALw_wcB',
  },
  {
    pfpPath: '/danny-pfp.png',
    shoplink: '/daniel',
    product1img: '/dt-product-1.png',
    product1link:
      'https://www.bloomingdales.com/shop/product/michael-kors-leather-racer-jacket?ID=4216474&pla_country=US&cm_mmc=Google-PLA-ADC-_-GMM3+-+Mens+-+All+Other+Mens+Categories-_-Mens+Apparel-_-193600506765USA-_-go_cmp-13048465671_adg-122506160775_ad-520670400844_pla-1257648768862_dev-c_ext-_prd-193600506765USA&gad=1&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K3_xDExh9JDl1m2bnenXmbWWzF2ltkq_B8KeHISvtULPKJXPy5rDKEaAtroEALw_wcB',
    product2img: '/dt-product-2.png',
    product2link:
      'https://www.amazon.com/American-Crew-Fiber-3-Oz/dp/B0007CXWC4/ref=asc_df_B0007CXWC4/?tag=hyprod-20&linkCode=df0&hvadid=312143425159&hvpos=&hvnetw=g&hvrand=11087832050191241799&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9031951&hvtargid=pla-406644557455&psc=1',
  },
  {
    pfpPath: '/tony-pfp.png',
    shoplink: '/tonykam',
    product1img: '/tk-product-1.png',
    product1link:
      'https://www.bloomingdales.com/shop/product/the-mens-store-at-bloomingdales-cashmere-v-neck-sweater-100-exclusive?ID=3418434&pla_country=US&cm_mmc=Google-PLA-ADC-_-GMM3+-+Mens+-+All+Other+Mens+Categories-_-Mens+Formal+Wear-_-190089875412USA-_-go_cmp-13048465671_adg-123044759238_ad-520733021264_pla-1261067851097_dev-c_ext-_prd-190089875412USA&gad=1&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K3y7_XUdneK8Us4vRJ15GGoNhm4L7n10nhiMYYodCg7DhzQSxC0RD8aAl5fEALw_wcB',
    product2img: '/tk-product-2.png',
    product2link:
      'https://www.alanpaine-usa.com/products/wardlow-cashmere-check-scarf-in-pitch-green',
  },
]

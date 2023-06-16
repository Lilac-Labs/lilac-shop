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
                <Balancer>Where elite creators and brands collaborate</Balancer>
              </h1>
              <p
                className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
                style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
              >
                <Balancer>
                  Join the world’s leading brands and content creators to access
                  powerful tools and your dream collaborations on the #1 platform for
                  product promotion on social.
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
                  <p>Apply for waitlist</p>
                </a>
                <a
                  className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                  href="https://github.com/steven-tey/precedent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                  <p>
                    <span className="hidden sm:inline-block">Star on</span> GitHub{' '}
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
                <Image className="flex center w-full rounded-3xl" src="/img-user-deres-236.png" width={200} height={200} />
              </div>
              <div>
                <Image className="flex center w-full rounded-3xl" src="/img-user-deres-238.png" width={200} height={200} />
              </div>
              <div>
                <Image className="flex center w-full rounded-3xl" src="/img-user-deres-303.png" width={200} height={200} />
              </div>
            </div>
          </div>
      </main>
  )
}
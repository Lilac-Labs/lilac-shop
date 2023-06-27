import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { AffiliateLink, Product } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'

export default function SearchExistingProducts({
  collectionId,
  setShowAddNewProductModal,
}: {
  collectionId: string
  setShowAddNewProductModal: Dispatch<SetStateAction<boolean>>
}) {
  const { userInfo } = useUserInfoContext()
  const { collections, setCollections, affiliateLinks, setAffiliateLinks } =
    useAffiliateLinksContext()
  const [affiliateLinksToDisplay, setAffiliateLinksToDisplay] =
    useState<AffiliateLink[]>(affiliateLinks)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const filteredLinks = affiliateLinks.filter((link) => {
      return (
        link.title.toLowerCase() +
        link.description?.toLowerCase() +
        link.brand.name.toLowerCase()
      ).includes(value.toLowerCase())
    })
    setAffiliateLinksToDisplay(filteredLinks)
  }

  return (
    <div className="flex flex-col w-[95%] mx-auto">
      <Input onChange={handleSearch} placeholder="Search" className="mb-5" />
      <div className="grid grid-cols-2 gap-4">
        {affiliateLinksToDisplay.map((link) => {
          return (
            <div
              className="flex flex-col text-left justify-start"
              key={link.id}
            >
              {/* <EditLinkModal /> */}
              <div className="flex flex-row ">
                <Image
                  src={link.image}
                  alt={link.id.toString()}
                  width={150}
                  height={150}
                />

                <button
                  onClick={() => {
                    fetcher(
                      `/api/users/by-uuid/${userInfo.id}/affiliatelinks`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          collectonId: collectionId,
                          image: link.image,
                          title: link.title,
                          description: link.description,
                          brandName: link.brand.name,
                          productLink: link.link?.productLink,
                        } as Product),
                      },
                    )
                      .then((res) => {
                        console.log('Response:', res)
                        setAffiliateLinks([...affiliateLinks, res])
                        setCollections(
                          collections.map((collection) => {
                            if (collection.id === +collectionId) {
                              return {
                                ...collection,
                                affiliateLinks: [
                                  ...collection.affiliateLinks,
                                  res,
                                ],
                              }
                            }
                            return collection
                          }),
                        )
                      })
                      .finally(() => {
                        console.log('Finally')
                        setShowAddNewProductModal(false)
                      })
                  }}
                  className="justify-center flex w-full bg-yelow-500 content-center"
                >
                  <Plus className="ml-2 h-6 w-6 self-center" />
                </button>
              </div>
              <h1 className="">{link.title}</h1>
              {/* <p className="text-grey">{link.brand.name}</p> */}
              <Link
                className="text-grey"
                href={link.link?.productLink || ''}
                target="_blank"
              >
                {link.brand.name}
              </Link>
              <p className="text-grey">{`${link.brand.commission.toFixed(
                0,
              )}% commission`}</p>
              {/* <div className="flex flex-row ">
            <button
              className="mr-5 text-grey hover:text-black"
              onClick={() => {
                setShowEditLinkModal(true)
              }}
            >
              {' '}
              EDIT{' '}
            </button>
            <button
              className="text-grey hover:text-black"
              onClick={() => {
                fetcher(`/api/affiliateLink/${row.original.id}`, {
                  method: 'DELETE',
                }).then(() => setAffiliateLinksUpdated(true))
              }}
            >
              DELETE
            </button>
          </div> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'
import Image from 'next/image'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { AffiliateLink } from '@/lib/types'
import { Link } from 'lucide-react'
import { useEditLinkModal } from '@/components/linksPage/edit-link-modal'
import { fetcher } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { LoadingDots } from '@/components/shared/icons'

export default function LinksList() {
  const { affiliateLinks, affiliateLinkLoading } = useAffiliateLinksContext()

  const maxPage = Math.floor(affiliateLinks.length / 10) + 1

  const [links, setLinks] = useState(affiliateLinks.slice(0, 10))

  const [page, setPage] = useState(1)

  useEffect(() => {
    setLinks(affiliateLinks.slice((page - 1) * 10, (page - 1) * 10 + 10))
  }, [page, affiliateLinks])

  return (
    <>
      {affiliateLinkLoading && (
        <div className="flex justify-center">
          <LoadingDots />
        </div>
      )}
      <div className="flex flex-col  space-y-5 mx-2">
        {links.map((link) => {
          return <LinkDiscription {...link} key={link.id} />
        })}
        {!affiliateLinkLoading && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &lt;
            </Button>
            <p className="mt-2 h-9 w-9 text-center self-center">{page}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === maxPage}
            >
              &gt;
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(maxPage)}
              disabled={page === maxPage}
            >
              {maxPage}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

function LinkDiscription(link: AffiliateLink) {
  const { EditLinkModal, setShowEditLinkModal } = useEditLinkModal(link)
  const { setAffiliateLinks } = useAffiliateLinksContext()

  return (
    <div className="flex flex-col">
      <EditLinkModal />

      <div className="flex flex-row space-x-4">
        <Image src={link.image} alt={link.title} width={120} height={120} />
        <div className="flex flex-col text-left text-sm">
          <p>{link.title}</p>
          <p className="text-grey">{link.brand.name}</p>
          <a
            className="text-grey"
            href={link.link?.productLink}
            target="_blank"
          >
            <p>{link.link?.productLink.slice(0, 30) + '...'}</p>
          </a>
          <p className="text-grey">{`${link.brand.commission.toFixed(
            0,
          )}% commission`}</p>
          <div className="flex flex-row ">
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
                fetcher(`/api/users/by-uuid/-/affiliatelinks/${link.id}`, {
                  method: 'DELETE',
                }).then(() => {
                  setAffiliateLinks((prev) =>
                    prev.filter((l) => l.id !== link.id),
                  )
                })
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between border border-calebPurple rounded-md">
        <div className="self-center">
          <p className="text-left  mx-4">
            {`https://link-m.herokuapp.com/${link.link?.id}`}
          </p>
        </div>

        <Button>Copy</Button>
      </div>
    </div>
  )
}

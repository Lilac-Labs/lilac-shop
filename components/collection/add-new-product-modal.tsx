import Modal from '@/components/shared/modal'
import { signIn } from 'next-auth/react'
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { LoadingDots, Google } from '@/components/shared/icons'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'
import { formSchema } from './create-new-link-component'
import CreateNewLinkComponent from './create-new-link-component'
import { ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { fetcher } from '@/lib/utils'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { Collection, Product } from '@/lib/types'
import SearchExistingProducts from './search-existing-products'

const AddNewProductModal = ({
  showAddNewProductModal,
  setShowAddNewProductModal,
  collectionId,
}: {
  showAddNewProductModal: boolean
  setShowAddNewProductModal: Dispatch<SetStateAction<boolean>>
  collectionId: string
}) => {
  const { userInfo } = useUserInfoContext()
  const { collections, setCollections, affiliateLinks, setAffiliateLinks } =
    useAffiliateLinksContext()
  const [showAddNewProduct, setShowAddNewProduct] = useState(false)
  const [showSearchExistingProduct, setShowSearchExistingProduct] =
    useState(false)

  const addNewProductOnSubmit = (values: z.infer<typeof formSchema>): void => {
    console.log(values as Product)

    fetcher(`/api/users/by-uuid/${userInfo.id}/affiliatelinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectonId: collectionId,
        ...values,
      } as Product),
    })
      .then((res) => {
        console.log('Response:', res)
        setAffiliateLinks([...affiliateLinks, res])
        setCollections(
          collections.map((collection) => {
            if (collection.id === +collectionId) {
              return {
                ...collection,
                affiliateLinks: [...collection.affiliateLinks, res],
              }
            }
            return collection
          }),
        )
      })
      .finally(() => {
        console.log('Finally')
        setShowAddNewProduct(false)
        setShowAddNewProductModal(false)
      })
  }

  return (
    <>
      <Modal
        showModal={showAddNewProductModal}
        setShowModal={setShowAddNewProductModal}
      >
        <div className="max-h-[50%] w-full overflow-y-auto overflow-x-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            {(showAddNewProduct || showSearchExistingProduct) && (
              <button
                onClick={() => {
                  setShowAddNewProduct(false)
                  setShowSearchExistingProduct(false)
                }}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            )}
            <h1 className="font-display text-3xl font-bold">Add New Product</h1>
          </div>
          {showAddNewProduct ? (
            <CreateNewLinkComponent onSubmit={addNewProductOnSubmit} />
          ) : showSearchExistingProduct ? (
            <SearchExistingProducts
              collectionId={collectionId}
              setShowAddNewProductModal={setShowAddNewProductModal}
            />
          ) : (
            <div className="flex flex-row justify-between">
              <Button
                className="flex"
                onClick={() => setShowAddNewProduct(true)}
              >
                Add New Product
              </Button>
              <Button
                className="flex"
                onClick={() => setShowSearchExistingProduct(true)}
              >
                Search Existing Product
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export function useAddNewProductModal(collectionId: string) {
  const [showAddNewProductModal, setShowAddNewProductModal] = useState(false)

  const AddNewProductModalCallback = useCallback(() => {
    return (
      <AddNewProductModal
        showAddNewProductModal={showAddNewProductModal}
        setShowAddNewProductModal={setShowAddNewProductModal}
        collectionId={collectionId}
      />
    )
  }, [showAddNewProductModal, setShowAddNewProductModal])

  return useMemo(
    () => ({
      setShowAddNewProductModal,
      AddNewProductModal: AddNewProductModalCallback,
    }),
    [setShowAddNewProductModal, AddNewProductModalCallback],
  )
}

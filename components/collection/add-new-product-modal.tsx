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

const AddNewProductModal = ({
  showAddNewProductModal,
  setShowAddNewProductModal,
  collectionId,
  collection,
  setCollection,
}: {
  showAddNewProductModal: boolean
  setShowAddNewProductModal: Dispatch<SetStateAction<boolean>>
  collectionId: string
  collection: Collection
  setCollection: Dispatch<SetStateAction<Collection>>
}) => {
  const { userInfo } = useUserInfoContext()
  const [showAddNewProduct, setShowAddNewProduct] = useState(false)
  const [showSearchExistingProduct, setShowSearchExistingProduct] =
    useState(false)

  const addNewProductOnSubmit = (values: z.infer<typeof formSchema>): void => {
    console.log(values as Product)

    fetcher('http://localhost:3000/api/affiliateLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid: userInfo.id,
        collectonId: collectionId,
        ...values,
      } as Product),
    })
      .then((res) => {
        console.log('Response:', res)
        setCollection({
          ...collection,
          affiliateLinks: [...collection.affiliateLinks, res],
        })
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
        <div className="w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-gray-200">
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
            <p>Search</p>
          ) : (
            <div className="flex flex-row justify-between">
              <Button
                className="flex"
                onClick={() => setShowAddNewProduct(true)}
              >
                Add New Product
              </Button>
              <Button className="flex">Search Existing Product</Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export function useAddNewProductModal(
  collectionId: string,
  collection: Collection,
  setCollection: Dispatch<SetStateAction<Collection>>,
) {
  const [showAddNewProductModal, setShowAddNewProductModal] = useState(false)

  const AddNewProductModalCallback = useCallback(() => {
    return (
      <AddNewProductModal
        showAddNewProductModal={showAddNewProductModal}
        setShowAddNewProductModal={setShowAddNewProductModal}
        collectionId={collectionId}
        collection={collection}
        setCollection={setCollection}
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

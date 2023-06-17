import Modal from '@/components/shared/modal'
import { signIn } from 'next-auth/react'
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { LoadingDots, Google } from '@/components/shared/icons'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useCreateNewLinkModal } from '../linksPage/create-new-link-modal'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'

const AddNewALModal = ({
  showAddNewALModal,
  setShowAddNewALModal,
}: {
  showAddNewALModal: boolean
  setShowAddNewALModal: Dispatch<SetStateAction<boolean>>
}) => {
  // declare useCreateNewLinkModal hook
  const { setAffiliateLinksUpdated } = useAffiliateLinksContext()
  const { CreateNewLinkModal, setShowCreateNewLinkModal } =
    useCreateNewLinkModal(setAffiliateLinksUpdated)

  return (
    <>
      <Modal showModal={showAddNewALModal} setShowModal={setShowAddNewALModal}>
        <div className="w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <h1 className="font-display text-3xl font-bold">Add New Product</h1>
            <div className="flex flex-row justify-between">
              <Button
                className="flex"
                onClick={() => setShowCreateNewLinkModal(true)}
              >
                Add New Product
              </Button>
              <Button className="flex">Search Existing Product</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function useAddNewALModal() {
  const [showAddNewALModal, setShowAddNewALModal] = useState(false)

  const AddNewALModalCallback = useCallback(() => {
    return (
      <AddNewALModal
        showAddNewALModal={showAddNewALModal}
        setShowAddNewALModal={setShowAddNewALModal}
      />
    )
  }, [showAddNewALModal, setShowAddNewALModal])

  return useMemo(
    () => ({ setShowAddNewALModal, AddNewALModal: AddNewALModalCallback }),
    [setShowAddNewALModal, AddNewALModalCallback],
  )
}

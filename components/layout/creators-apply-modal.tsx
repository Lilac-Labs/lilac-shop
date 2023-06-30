import Modal from '@/components/shared/modal'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { LoadingDots, Google } from '@/components/shared/icons'
import Image from 'next/image'
import * as Form from '@radix-ui/react-form'
import ApplyForm from './apply-form'

const CreatorsApplyModal = ({
  showCreatorsApplyModal,
  setCreatorsApplyModal,
}: {
  showCreatorsApplyModal: boolean
  setCreatorsApplyModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: '' },
  })

  // Success message
  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      })
    } else {
      setStatus({
        ...status,
        info: { error: true, msg: msg },
      })
    }
    console.log(msg)
  }

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission
    // Get data from form
    const inputs = {
      name: (e.currentTarget.elements[0] as HTMLInputElement).value,
      email: (e.currentTarget.elements[1] as HTMLInputElement).value,
      bio: (e.currentTarget.elements[2] as HTMLInputElement).value,
      links: (e.currentTarget.elements[3] as HTMLInputElement).value,
    }

    // Submit data to formspree API
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/mknaylzb',
      data: inputs,
    })
      // Handle success
      .then((response) => {
        handleServerResponse(
          true,
          'Thank you, your message has been submitted.',
        )
      })
      // Handle error
      .catch((error) => {
        handleServerResponse(false, error.response.data.error)
      })
    // Reset form
    setCreatorsApplyModal(false)
  }

  return (
    <Modal
      showModal={showCreatorsApplyModal}
      setShowModal={setCreatorsApplyModal}
    >
      <div className="md:border-black-200 w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border bg-white md:h-fit h-full">
        <div className="items-left border-back-200 flex flex-col justify-center space-y-3 px-4 py-6 pt-8 text-center md:px-16">
          <h1 className="font-display text-3xl font-bold">
            Apply to join the waitlist!
          </h1>
          <p className="text-sm">
            Fill out the form below. Someone from our team will be in touch
            shortly.
          </p>
          <ApplyForm setCreatorsApplyModal={setCreatorsApplyModal} />
        </div>

        {/* <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h2 className="text-md font-display font-bold">
            Don&apos;t have an account?
          </h2>
          <p className="text-sm">
            If you have an invitation code, click here to create your account,
            otherwise click here to apply for an account.
          </p>
        </div> */}
      </div>
    </Modal>
  )
}

export function useCreatorsApplyModal() {
  const [showCreatorsApplyModal, setShowCreatorsApplyModal] = useState(false)

  const CreatorsApplyModalCallback = useCallback(() => {
    return (
      <CreatorsApplyModal
        showCreatorsApplyModal={showCreatorsApplyModal}
        setCreatorsApplyModal={setShowCreatorsApplyModal}
      />
    )
  }, [showCreatorsApplyModal, setShowCreatorsApplyModal])

  return useMemo(
    () => ({
      setShowCreatorsApplyModal,
      CreatorsApplyModal: CreatorsApplyModalCallback,
    }),
    [setShowCreatorsApplyModal, CreatorsApplyModalCallback],
  )
}

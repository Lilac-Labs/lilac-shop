'use client'

import Modal from '@/components/shared/modal'
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import { LoadingDots, Google } from '@/components/shared/icons'
import Image from 'next/image'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetcher, formatBrandSelect } from '@/lib/utils'
import { Product, Brand } from '@/lib/types'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import CreateNewLinkComponent, {
  formSchema,
} from '../collection/create-new-link-component'

const CreateNewLinkModal = ({
  showCreateNewLinkModal,
  setCreateNewLinkModal,
  setNewLinkAdded,
}: {
  showCreateNewLinkModal: boolean
  setCreateNewLinkModal: Dispatch<SetStateAction<boolean>>
  setNewLinkAdded: Dispatch<SetStateAction<boolean>>
}) => {
  const { userInfo } = useUserInfoContext()

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    console.log(values as Product)

    fetcher('http://localhost:3000/api/affiliateLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid: userInfo.id, ...values } as Product),
    })
      .then((res) => {
        console.log('Response:', res)
      })
      .finally(() => {
        console.log('Finally')
        setNewLinkAdded(true)
        setCreateNewLinkModal(false)
      })
  }

  return (
    <Modal
      showModal={showCreateNewLinkModal}
      setShowModal={setCreateNewLinkModal}
    >
      <div className="w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-gray-200">
        <CreateNewLinkComponent onSubmit={onSubmit} />
      </div>
    </Modal>
  )
}

export function useCreateNewLinkModal(
  setNewLinkAdded: Dispatch<SetStateAction<boolean>>,
) {
  const [showCreateNewLinkModal, setShowCreateNewLinkModal] = useState(false)

  const CreateNewLinkModalCallback = useCallback(() => {
    return (
      <CreateNewLinkModal
        showCreateNewLinkModal={showCreateNewLinkModal}
        setCreateNewLinkModal={setShowCreateNewLinkModal}
        setNewLinkAdded={setNewLinkAdded}
      />
    )
  }, [showCreateNewLinkModal, setShowCreateNewLinkModal])

  return useMemo(
    () => ({
      setShowCreateNewLinkModal,
      CreateNewLinkModal: CreateNewLinkModalCallback,
    }),
    [setShowCreateNewLinkModal, CreateNewLinkModalCallback],
  )
}

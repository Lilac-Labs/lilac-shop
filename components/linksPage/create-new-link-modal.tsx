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
import { fetcher } from '@/lib/utils'
import { Product, Brand } from '@/lib/types'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'

const formSchema = z.object({
  image: z.string().url({ message: 'Please enter a valid URL' }),
  productLink: z.string().url({ message: 'Please enter a valid URL' }),
  title: z.string().min(2, { message: 'Please enter a title' }),
  description: z.string(),
  brandName: z.string().min(1, { message: 'Please select a brand' }),
})

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      productLink: '',
      title: '',
      description: '',
      brandName: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values as Product)
    console.log(`http://localhost:3000/api/affiliateLinks/${userInfo.id}`)
    fetcher(`http://localhost:3000/api/affiliateLinks/${userInfo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
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

  const [brands, setBrands] = useState<Brand[]>([] as Brand[])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetcher(`http://localhost:3000/api/brands`)
      .then((data) => {
        setBrands(data as Brand[])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Modal
      showModal={showCreateNewLinkModal}
      setShowModal={setCreateNewLinkModal}
    >
      <div className="w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-gray-200">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="items-start space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 md:px-16"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Product title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add more details on why you love it!"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Link to the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            TODO: add image upload
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Image url of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.name} value={brand.name}>
                          {brand.name}, {brand.commission}% commission
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* {loading ? (
                    <LoadingDots color="#808080" />
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )} */}

                  <FormDescription>Image url of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
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

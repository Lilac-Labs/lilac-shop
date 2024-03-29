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
import { Product, Brand, AffiliateLink } from '@/lib/types'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'

const formSchema = z.object({
  image: z.string().url({ message: 'Please enter a valid URL' }),
  productLink: z.string().url({ message: 'Please enter a valid URL' }),
  title: z.string().min(2, { message: 'Please enter a title' }),
  description: z.string(),
  brandName: z.string().min(1, { message: 'Please select a brand' }),
})

const EditLinkModal = ({
  showEditLinkModal,
  setEditLinkModal,
  affiliateLink,
}: {
  showEditLinkModal: boolean
  setEditLinkModal: Dispatch<SetStateAction<boolean>>
  affiliateLink: AffiliateLink
}) => {
  const { userInfo } = useUserInfoContext()
  const { setAffiliateLinks } = useAffiliateLinksContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: affiliateLink.image,
      productLink: affiliateLink.link?.productLink,
      title: affiliateLink.title,
      description: affiliateLink.description,
      brandName: formatBrandSelect(affiliateLink.brand),
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values as Product)
    fetcher(
      `/api/users/by-uuid/${userInfo.id}/affiliatelinks/${affiliateLink.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values as Product),
      },
    )
      .then((res) => {
        console.log('Response:', res)
      })
      .finally(() => {
        console.log('Finally')
        setAffiliateLinks((prev) => {
          const index = prev.findIndex((link) => link.id === affiliateLink.id)
          const newLinks = [...prev]
          newLinks[index] = {
            ...newLinks[index],
            ...values,
          }
          return newLinks
        })

        setEditLinkModal(false)
      })
  }

  return (
    <Modal showModal={showEditLinkModal} setShowModal={setEditLinkModal}>
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
                    <Input type="text" {...field} />
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div>
                      <Image
                        alt={`${affiliateLink.title} image`}
                        src={affiliateLink.image}
                        width={150}
                        height={150}
                      />
                      <Input {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Image url of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
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
                        <SelectValue
                          className="text-black"
                          placeholder={affiliateLink.brand.name}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.length === 0 ? (
                        <SelectItem value="loading">Loading...</SelectItem>
                      ) : (
                        brands.map((brand) => (
                          <SelectItem key={brand.name} value={brand.name}>
                            {formatBrandSelect(brand)}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select a brand</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={true} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">SAVE</Button>
          </form>
        </Form>
      </div>
    </Modal>
  )
}

export function useEditLinkModal(affiliateLink: AffiliateLink) {
  const [showEditLinkModal, setShowEditLinkModal] = useState(false)

  const EditLinkModalCallback = useCallback(() => {
    return (
      <EditLinkModal
        showEditLinkModal={showEditLinkModal}
        setEditLinkModal={setShowEditLinkModal}
        affiliateLink={affiliateLink}
      />
    )
  }, [showEditLinkModal, setShowEditLinkModal])

  return useMemo(
    () => ({
      setShowEditLinkModal,
      EditLinkModal: EditLinkModalCallback,
    }),
    [setShowEditLinkModal, EditLinkModalCallback],
  )
}

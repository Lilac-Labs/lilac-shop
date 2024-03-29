// https://github.com/vercel/next.js/discussions/46795
'use client'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import TextareaAutosize from 'react-textarea-autosize'

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
import { useForm } from 'react-hook-form'
import { Collection, UserInfo, UserProfile } from '@/lib/types'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { fetcher } from '@/lib/utils'
import { Edit } from 'lucide-react'
import useAutosizeTextArea from '@/lib/hooks/use-autosize-textarea'
import { Separator } from '@/components/ui/separator'
import useAutosizeInput from '@/lib/hooks/use-autosize-inpu'
import { useAffiliateLinksContext } from '@/lib/context/AffiliateLinksProvider'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'title cannot be empty.',
  }),
  description: z.string(),
})

export function CollectionForm({
  collection,
  isOwner,
}: {
  collection: Collection
  isOwner: boolean
}) {
  const { setCollections } = useAffiliateLinksContext()
  const [readOnly, setReadOnly] = useState<boolean>(true)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: collection.title,
      description:
        collection.description === null ? '' : collection.description,
    },
  })

  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(descriptionRef.current, form.watch('description'))

  const titleRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(titleRef.current, form.watch('title'))

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetcher(
      `/api/users/by-uuid/-/collections/${collection.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(values),
      },
    )
    setCollections((prev) => {
      const index = prev.findIndex((c) => c.id === collection.id)
      prev[index] = {
        ...prev[index],
        title: res.title,
        description: res.description,
      }

      return [...prev]
    })
    setReadOnly(true)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="basis-4/5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 border-none "
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextareaAutosize
                        {...field}
                        className={`${
                          readOnly
                            ? 'border-none focus-visible:ring-transparent'
                            : ''
                        }   w-full resize-none overflow-hidden rounded-md border border-input text-3xl font-bold`}
                        readOnly={readOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextareaAutosize
                        {...field}
                        placeholder="Description here"
                        className={`min-h-fit w-full resize-none overflow-hidden rounded-md border border-input text-sm ${
                          readOnly
                            ? 'border-none focus-visible:ring-transparent'
                            : ''
                        }`}
                        readOnly={readOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!readOnly && isOwner && (
                <div className="mt-10 flex flex-row justify-evenly bg-white text-center">
                  <Button
                    type="submit"
                    className="
                bg-black
                "
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    className="
                    bg-grey
                    "
                    onClick={() => {
                      setReadOnly(true)
                      form.reset()
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
        {isOwner && (
          <button onClick={() => setReadOnly(false)}>
            <Edit className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  )
}

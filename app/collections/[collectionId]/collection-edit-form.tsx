// https://github.com/vercel/next.js/discussions/46795
'use client'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

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

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'title cannot be empty.',
  }),
  description: z.string(),
})

export function CollectionForm({
  collection,
  setCollection,
}: {
  collection: Collection
  setCollection: Dispatch<SetStateAction<Collection>>
}) {
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, form.watch('description'))

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const res = await fetcher(`/api/collection/byId/${collection.id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    })
    setCollection(res)
    setReadOnly(true)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="basis-3/4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 border-none "
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        // make the input uneditable
                        className={`${
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <span className="textarea" role="textbox">
                        <Textarea
                          {...field}
                          ref={textAreaRef}
                          placeholder="Description here"
                          className={`h-auto min-h-fit resize-none overflow-hidden  ${
                            readOnly
                              ? 'border-none focus-visible:ring-transparent'
                              : ''
                          }`}
                          readOnly={readOnly}
                        />
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!readOnly && (
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
        <button onClick={() => setReadOnly(false)}>
          <Edit className="h-6 w-6" />
        </button>
      </div>

      <Separator className="my-4 h-[3px] bg-gray-500" />
    </div>
  )
}

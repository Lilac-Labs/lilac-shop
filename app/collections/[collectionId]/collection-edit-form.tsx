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
  const [editMode, setEditMode] = useState<boolean>(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: collection.title,
      description:
        collection.description === null || collection.description === ''
          ? 'Description here'
          : collection.description,
    },
  })

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, form.watch('description'))

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('save')
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
                      <Input {...field} className="border-none outline-none" />
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
                          className="h-auto min-h-fit resize-none overflow-hidden border-none"
                        />
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <button>
          <Edit className="h-6 w-6" />
        </button>
      </div>
      {editMode && (
        <div className="items-left border-back-200 flex flex-row justify-evenly border-b bg-white text-center">
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
            onClick={() => console.log('cancel')}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}

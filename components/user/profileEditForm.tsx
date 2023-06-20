// https://github.com/vercel/next.js/discussions/46795
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
import { UserInfo, UserProfile } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'
import { fetcher } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name cannot be empty.',
  }),

  bio: z.string().min(1, {
    message: 'Bio cannot be empty.',
  }),

  ig: z.string().min(1, {
    message: 'Instagram cannot be empty.',
  }),

  tiktok: z.string().min(1, {
    message: 'Tiktok cannot be empty.',
  }),
})
export function ProfileForm({
  userProfile,
  setUserProfile,
  onEditClick,
}: {
  userProfile: UserProfile
  setUserProfile: Dispatch<SetStateAction<UserProfile>>
  onEditClick: () => void
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userProfile.firstName + ' ' + userProfile.lastName,
      bio: userProfile.bio,
      ig: userProfile.ig,
      tiktok: userProfile.tk,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const newUserProfile = {
      ...userProfile,
      firstName: values.name.split(' ')[0],
      lastName: values.name.split(' ')[1],
      bio: values.bio,
      ig: values.ig,
      tk: values.tiktok,
    }

    setUserProfile(newUserProfile)
    onEditClick()

    // Make call to accountUpdate API
    await fetcher('http://localhost:3000/api/account-update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserProfile),
    })
      .then((res) => {
        console.log('Response:', res)
      })
      .catch((err) => {
        console.log('Error:', err)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Type your bio here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ig"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tiktok" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktok"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Instagram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            onClick={onEditClick}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

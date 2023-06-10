// https://github.com/vercel/next.js/discussions/46795
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { UserInfo } from "@/lib/types"
 
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty.",
  }),

  bio: z.string().min(1, {
    message: "Bio cannot be empty.",
    }),

})
 
export function ProfileForm({userInfo, onEditClick}: { userInfo: UserInfo; onEditClick: () => void }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        bio: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
      //setUserInfo(...)
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
                    <Input placeholder="Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="items-left border-back-200 flex flex-row justify-evenly border-b bg-white text-center">
                <Button type="submit" className="
                bg-black
                "
                >Save
                </Button>
                <Button type="reset" className="
                    bg-grey
                    "
                    onClick={onEditClick}
                    >Cancel
                </Button>
            </div>
          </form>
        </Form>
    )
  } 
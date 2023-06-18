import { useState, useEffect } from 'react'

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

export const formSchema = z.object({
  image: z.string().url({ message: 'Please enter a valid URL' }),
  productLink: z.string().url({ message: 'Please enter a valid URL' }),
  title: z.string().min(2, { message: 'Please enter a title' }),
  description: z.string(),
  brandName: z.string().min(1, { message: 'Please select a brand' }),
})

export default function CreateNewLinkComponent({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void
}): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image:
        'https://production-shopmyshelf-pins.s3.us-east-2.amazonaws.com/zoom-1080769-1676507417013-LW5DWPS_045720_1',
      productLink:
        'https://shop.lululemon.com/p/womens-leggings/InStill-High-Rise-Tight-25-MD/_/prod10642048?color=54428&skuId=143479160&sz=10',
      title: 'InStill High-Rise Tight 25',
      description: '',
      brandName: 'Everlane',
    },
  })

  //   const onSubmit = (values: z.infer<typeof formSchema>) => {
  //     fetcher('http://localhost:3000/api/affiliateLink', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ uuid: userInfo.id, ...values } as Product),
  //     })
  //       .then((res) => {
  //         console.log('Response:', res)
  //       })
  //       .finally(() => {
  //         console.log('Finally')
  //         setNewLinkAdded(true)
  //         setCreateNewLinkModal(false)
  //       })
  //   }

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.name} value={brand.name}>
                      {formatBrandSelect(brand)}
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
  )
}

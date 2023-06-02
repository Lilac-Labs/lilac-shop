'use client'
import { ReactNode, useEffect, useState, RefObject, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import Balancer from 'react-wrap-balancer'
import * as Form from '@radix-ui/react-form'
import { fetcher } from '@/lib/utils'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function AccountUpdate() {
  
  type MatchProp = Form.ValidityMatcher | AsyncCustomMatcher;
  type AsyncCustomMatcher = (value: string, formData: FormData) => Promise<boolean>;

  const router = useRouter()
  const uuidRef = useRef<HTMLInputElement>(null);

  // State values that don't depend on userInfo don't need to be rehydrated
  const [name, setName] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [storageLink, setStorageLink] = useState<string>('')

  // userInfo is the user's info and userInfoUpdated is a boolean that is used to trigger a re-render
  const { userInfo, setUserInfoUpdated } = useUserInfoContext()

  // State values that depend on userInfo need to be rehydrated.
  const [uniqueid, setUniqueId] = useState('')


  // State values that depend on userInfo need to be rehydrated.
  const [isIdUnique, setIsIdUnique] = useState(true)

  // function to check if id is unique
  const getUUIDNotUnique = () => {
    return !isIdUnique
  }

  // useEffect(() => {
  //   const form =  document.querySelector("form") as HTMLFormElement;
  //   const uuid = document.querySelector("#uuid") as HTMLInputElement;
  //   const uuidError = document.querySelector("#uuid + span.error") as HTMLSpanElement;
  //   console.log("FORM:",form)
  //   console.log("UUID:", uuid)
  // }, [])

  
  // State values that depend on userInfo need to be rehydrated
  useEffect(() => {
    setUniqueId(userInfo.id ? userInfo.id : '')
  }, [userInfo])

  // unique id change handler used to dynamically enforce lowercase
  const handleUniqueIdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUniqueId(e.target.value.toLowerCase())
  }

  // unique id change handler used to dynamically enforce lowercase
  const handleUniqueIdBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const uniqueid = e.target.value;
    const form =  document.querySelector("form") as HTMLFormElement;
    const formdata = new FormData(form);
    const isValid = await validateUniqueId(uniqueid, formdata);
    console.log('isValid:', isValid)
    setIsIdUnique(isValid);
  }

  const validateUniqueId = async (value: string, formData: FormData): Promise<boolean> => {
    const uuid = uuidRef.current as HTMLInputElement;
    console.log('uuid:', uuid)
    const newUniqueId = value
    console.log('newUniqueId:', newUniqueId)
    // Check if it's empty
    if (newUniqueId === "") {
      console.log('empty')
      uuid.setCustomValidity('Invalid object!');
      return false
    }
    // Check if it's the same as the old uniqueId
    if (newUniqueId === userInfo.id) {
      console.log('same')
      uuid.setCustomValidity('');
      return true
    }
    // Check if uniqueId is available
    await fetcher(
      `http://localhost:3000/api/user/byId/${newUniqueId}`,
      { cache: 'no-store' },
    ). then((res) => {
      if (res === null) {
        console.log('available')
        uuid.setCustomValidity('');
        return true
      } else {
        console.log('not available')
        uuid.setCustomValidity('Invalid object!');
        return false
      }
    })
    return false
  }

  // handfilechange is called when a file is selected
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    // Get file from event
    const file = e.target.files?.[0]!
    const filename = encodeURIComponent(file.name)
    const fileType = encodeURIComponent(file.type)

    // Get presigned post from backend
    const GET_URL = `/api/upload-url?file=${filename}&fileType=${fileType}`
    const res = await fetch(GET_URL)
    const { url, fields } = await res.json()

    // Upload file to S3
    const formData = new FormData()
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (upload.ok) {
      console.log('Uploaded successfully!')
      setStorageLink(
        `https://dev-shop-links.s3.us-west-2.amazonaws.com/${filename}`,
      )
    } else {
      console.error('Upload failed.')
    }
    // From upload, get the url of the file in aws.
    // Set state to store url of the file.
  }

  // make async function to handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const uuid = document.querySelector("#uuid") as HTMLInputElement;
    if (!uuid.checkValidity()) {
      console.log('invalid')
      e.preventDefault(); // Prevent form submission if it's invalid
      // Optionally, you can display an error message or perform other actions
      return
    }
    console.log('valid')
    e.preventDefault() // Prevent default form submission
    // Get data from form
    const inputs = {
      email: userInfo.email, // User cannot change for now.
      id: (e.currentTarget.elements[0] as HTMLInputElement).value,
      firstName: (e.currentTarget.elements[1] as HTMLInputElement).value,
      lastName: (e.currentTarget.elements[2] as HTMLInputElement).value,
      bio: (e.currentTarget.elements[3] as HTMLInputElement).value,
      // image is selectedFile if it exists, otherwise it is the current image
      image: storageLink ? storageLink : userInfo.image,
    }
    // Make call to accountUpdate API
    await fetcher('http://localhost:3000/api/accountUpdate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => {
        console.log('Response:', res)
        setUserInfoUpdated(true)
      })
      .catch((err) => {
        console.log('Error:', err)
      })

    // Redirect to profile
    // https://github.com/vercel/next.js/issues/42556
    console.log('Redirecting to:', uniqueid)
    // router.replace(`/${uniqueid}`)
    //window.location.href = `/${uniqueid}`
    // TODO: instead of server side redirect, use client side redirect to avoid unnecessary rerender of entire app.
  }

  return (
    <>
      <div
        className="md:border-black-200 w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border"
        style={{ zIndex: 1 }}
      >
        <div className="items-left border-back-200 flex flex-col justify-center space-y-3 border-b bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h1 className="font-display text-3xl font-bold">
            Update your profile.
          </h1>
          <p className="text-sm">Fields with * are required.</p>
          <Form.Root className="FromRoot" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                // `onSubmit` only triggered if it passes client-side 
                handleFormSubmit(e);
                const data = Object.fromEntries(new FormData(e.currentTarget));
                console.log(data);
                e.preventDefault();
              }}>
            <Form.Field className="FormField" name="unique-username" id="uuid">
              <div className="flex">
                <Form.Label className="FormLabel">Username *</Form.Label>
                <Form.ValidityState>
                {(validity) => (
                  <Form.Control asChild>
                  </Form.Control>
                )}
              </Form.ValidityState>
                <Form.Message className="FormMessage" match="valueMissing">
                  Username cannot be empty.
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid name.
                </Form.Message>
                <Form.Message match={async (value) => {
                  const res = await fetcher('http://localhost:3000/api/uniqueid')
                  return res === null ? true : false
                  }} className="FormMessage">
                  Please Enter a Unique Username.
                </Form.Message>
                <Form.Message match="valid">✅ Valid!</Form.Message>
                {/* TODO: block submit if username is not unique.*/}
                {/* <Form.Message className="FormMessage" match={getUUIDNotUnique}>
                  Username is not unique. Try a new one.
                </Form.Message> */}
                <Form.Message className="FormMessage" match="tooShort">
                  Username is too short.
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                  type="text"
                  style={{ marginBottom: 10 }}
                  required
                  ref={uuidRef}
                  placeholder="Unique Username"
                  value={uniqueid}
                  onChange={handleUniqueIdChange}
                  onBlur={handleUniqueIdBlur}
                  minLength={4}
                />
              </Form.Control>
            </Form.Field>
            <div className="grid grid-flow-col justify-stretch gap-x-4">
              <Form.Field className="FormField" name="first-name">
                <div className="flex rounded">
                  <Form.Label className="FormLabel">First Name *</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your name.
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid name.
                  </Form.Message>
                  <Form.Message match="valid">✅ Valid!</Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                    type="text"
                    style={{ marginBottom: 10 }}
                    required
                    placeholder="First Name"
                    defaultValue={userInfo?.firstName}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="last-name">
                <div className="flex rounded">
                  <Form.Label className="FormLabel">Last Name *</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your name.
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid name.
                  </Form.Message>
                  <Form.Message match="valid">✅ Valid!</Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                    type="text"
                    style={{ marginBottom: 10 }}
                    required
                    placeholder="Last Name"
                    defaultValue={userInfo?.lastName}
                  />
                </Form.Control>
              </Form.Field>
            </div>
            <Form.Field className="FormField" name="bio">
              <div className="flex">
                <Form.Label className="FormLabel">Bio *</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please briefly describe who you are and the types of content
                  you promote regularly on your social channels.
                </Form.Message>
                <Form.Message match="valid">✅ Valid!</Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  className="w-full rounded valid:border-gray-500 invalid:border-red-500"
                  required
                  placeholder="Briefly describe who you are and the types of content you promote regularly on your social channels."
                  defaultValue={userInfo?.bio}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="Instagram">
              <div className="flex">
                <Form.Label className="FormLabel">Instagram @</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please provide links to your social media channels.
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input w-full rounded valid:border-gray-500"
                  type="text"
                  style={{ marginBottom: 10 }}
                  required
                  placeholder="Instagram @"
                  defaultValue=""
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="TikTok">
              <div className="flex">
                <Form.Label className="FormLabel">TikTok @</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please provide links to your social media channels.
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="Input w-full  rounded valid:border-gray-500"
                  type="text"
                  style={{ marginBottom: 10 }}
                  required
                  placeholder="TikTok @"
                  defaultValue=""
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="profile-pic">
              <div className="flex">
                <Form.Label className="FormLabel">Profile Picture</Form.Label>
              </div>
              <Form.Control asChild>
                <input
                  className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                  accept="image/png, image/jpeg"
                  type="file"
                  style={{ marginBottom: 10 }}
                  onChange={handleFileChange}
                  placeholder="Profile Picture"
                  defaultValue=""
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              {/* Redirect after submit */}
              <button className="mx-2 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
                Save
              </button>
            </Form.Submit>
            <button type="reset">reset</button>
          </Form.Root>
        </div>
      </div>
    </>
  )
}

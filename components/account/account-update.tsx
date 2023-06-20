'use client'
import { ReactNode, useEffect, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import { fetcher } from '@/lib/utils'
import { useUserInfoContext } from '@/lib/context/UserInfoProvider'
import { useRouter } from 'next/navigation'

export default function AccountUpdate() {
  const [formLoaded, setFormLoaded] = useState(false)

  // For Validaiton state to disable submit buttom
  const [formValid, setFormValid] = useState(false)

  // Form values as state
  const [enteredUUid, setEnteredUUid] = useState<string>('')
  const [enteredFirstName, setEnteredFirstName] = useState<string>('')
  const [enteredLastName, setEnteredLastName] = useState<string>('')
  const [enteredBio, setEnteredBio] = useState<string>('')

  // Form values as state
  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    console.log('handleFormChange - target id:', e.target.id)
    switch (e.target.id) {
      case 'uuid':
        setEnteredUUid(e.target.value.toLowerCase())
        break
      case 'firstName':
        setEnteredFirstName(e.target.value)
        break
      case 'lastName':
        setEnteredLastName(e.target.value)
        break
      case 'bio':
        setEnteredBio(e.target.value)
        break
      default:
        break
    }
  }

  // Did the user touch this form field? If so, we should validate it.
  const [enteredUUidTouched, setEnteredUUidTouched] = useState<boolean>(false)
  const [enteredFirstNameTouched, setEnteredFirstNameTouched] =
    useState<boolean>(false)
  const [enteredLastNameTouched, setEnteredLastNameTouched] =
    useState<boolean>(false)
  const [enteredBioTouched, setEnteredBioTouched] = useState<boolean>(false)

  // Are the form fields valid?
  const [enteredUUidValid, setEnteredUUidValid] = useState<boolean>(false)
  const [enteredFirstNameValid, setEnteredFirstNameValid] =
    useState<boolean>(false)
  const [enteredLastNameValid, setEnteredLastNameValid] =
    useState<boolean>(false)
  const [enteredBioValid, setEnteredBioValid] = useState<boolean>(false)

  // Form field error message
  const [enteredUUidErrorMsg, setEnteredUUidErrorMsg] = useState<string>('')
  const [enteredFirstNameErrorMsg, setEnteredFirstNameErrorMsg] =
    useState<string>('')
  const [enteredLastNameErrorMsg, setEnteredLastNameErrorMsg] =
    useState<string>('')
  const [enteredBioErrorMsg, setEnteredBioErrorMsg] = useState<string>('')

  // Validation of fields
  const handleFormBlur = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    switch (e.target.id) {
      case 'uuid':
        setEnteredUUidTouched(true)
        setEnteredUUidValid(await isValidUUid(e.target.value))
        break
      case 'firstName':
        setEnteredFirstNameTouched(true)
        setEnteredFirstNameValid(isValidFirstName(e.target.value))
        break
      case 'lastName':
        setEnteredLastNameTouched(true)
        setEnteredLastNameValid(isValidLastName(e.target.value))
        break
      case 'bio':
        setEnteredBioTouched(true)
        setEnteredBioValid(isValidBio(e.target.value))
        break
      default:
        break
    }
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUploading, setImageUploading] = useState<boolean>(false)
  const [enteredImageErrorMsg, setEnteredImageErrorMsg] = useState<string>('')
  const [storageLink, setStorageLink] = useState<string>('')

  useEffect(() => {
    setFormValid(
      enteredUUidValid &&
        enteredFirstNameValid &&
        enteredLastNameValid &&
        enteredBioValid &&
        !imageUploading,
    )
    console.log(
      'useEffect - Form is valid?',
      enteredUUidValid &&
        enteredFirstNameValid &&
        enteredLastNameValid &&
        enteredBioValid &&
        !imageUploading,
    )
  }, [
    enteredUUidValid,
    enteredFirstNameValid,
    enteredLastNameValid,
    enteredBioValid,
    imageUploading,
  ])

  const router = useRouter()
  // userInfo is the user's info and userInfoUpdated is a boolean that is used to trigger a re-render
  const { userInfo, setUserInfoUpdated } = useUserInfoContext()

  // State values that depend on userInfo need to be rehydrated
  useEffect(() => {
    setEnteredUUid(
      userInfo.userProfile?.userName ? userInfo.userProfile?.userName : '',
    )
    setEnteredFirstName(
      userInfo.userProfile?.firstName ? userInfo.userProfile?.firstName : '',
    )
    setEnteredLastName(
      userInfo.userProfile?.lastName ? userInfo.userProfile?.lastName : '',
    )
    setEnteredBio(userInfo.userProfile?.bio ? userInfo.userProfile?.bio : '')
    setFormLoaded(true)

    const validateForm = async () => {
      setEnteredUUidValid(await isValidUUid(userInfo.userProfile?.userName))
      setEnteredFirstNameValid(
        isValidFirstName(userInfo.userProfile?.firstName),
      )
      setEnteredLastNameValid(isValidLastName(userInfo.userProfile?.lastName))
      setEnteredBioValid(isValidBio(userInfo.userProfile?.bio))
    }
    validateForm()
  }, [userInfo])

  // return boolean and string
  const isValidUUid = async (
    newUniqueId: string | undefined,
  ): Promise<boolean> => {
    console.log('new uuid:', newUniqueId)
    // Check if its undefined
    if (newUniqueId === undefined) {
      // hacky way of getting rid of errors from first render before userInfo is hydrated
      return false
    }

    // Check if it's empty
    if (newUniqueId === '') {
      setEnteredUUidErrorMsg('Unique id can not be empty 🚫')
      return false
    }

    if (newUniqueId.length < 3) {
      setEnteredUUidErrorMsg('Usename must be at least 3 characters 🚫')
      return false
    }
    // Check if it's the same as the old uniqueId
    if (newUniqueId === userInfo.userProfile?.userName) {
      setEnteredUUidErrorMsg('✅')
      return true
    }
    // Check if uniqueId is available
    const res = await fetcher(
      `http://localhost:3000/api/users/by-username/${newUniqueId}`,
      { cache: 'no-store' },
    )
    if (res === null) {
      setEnteredUUidErrorMsg('✅')
      return true
    } else {
      setEnteredUUidErrorMsg('Username is already taken 🚫')
      return false
    }
  }

  // return boolean and string
  const isValidFirstName = (firstName: string | undefined): boolean => {
    console.log('new first name:', firstName)
    // Check if its undefined
    if (firstName === undefined) {
      // hacky way of getting rid of errors from first render before userInfo is hydrated
      return false
    }
    // Check if it's empty
    if (firstName === '') {
      setEnteredFirstNameErrorMsg('Please enter a first name 🚫')
      return false
    }
    setEnteredFirstNameErrorMsg('✅')
    return true
  }

  // return boolean and string
  const isValidLastName = (lastName: string | undefined): boolean => {
    console.log('new last name:', lastName)
    // Check if its undefined
    if (lastName === undefined) {
      // hacky way of getting rid of errors from first render before userInfo is hydrated
      return false
    }
    // Check if it's empty
    if (lastName === '') {
      setEnteredLastNameErrorMsg('Please enter a last name 🚫')
      return false
    }
    setEnteredLastNameErrorMsg('✅')
    return true
  }

  // return boolean and string
  const isValidBio = (bio: string | undefined | null): boolean => {
    console.log('new bio:', bio)
    // Check if its undefined
    if (bio === undefined || bio === null) {
      // hacky way of getting rid of errors from first render before userInfo is hydrated
      return false
    }
    // Check if it's empty
    if (bio === '') {
      setEnteredBioErrorMsg('Please enter a bio 🚫')
      return false
    }
    setEnteredBioErrorMsg('✅')
    return true
  }

  // handfilechange is called when a file is selected
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]!

    if (file === undefined) {
      return
    }

    setImageUploading(true) // we are uploading

    const filename = encodeURIComponent(file.name)
    const fileType = encodeURIComponent(file.type)

    // Get presigned post from backend
    const GET_URL = `/api/upload-url?file=${filename}&fileType=${fileType}`
    const res = await fetch(GET_URL)
    const { url, fields } = await res.json()

    setEnteredImageErrorMsg('Image Uploading ⌛')

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
      setStorageLink(
        `https://dev-shop-links.s3.us-west-2.amazonaws.com/${filename}`,
      )
      setEnteredImageErrorMsg('✅')
      console.log('Uploaded successfully!')
    } else {
      setEnteredImageErrorMsg('Upload failed. Please retry.🚫')
      console.error('Upload failed.')
    }

    setImageUploading(false) // we are no longer uploading
  }

  // make async function to handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Check if form is valid
    if (!formValid) {
      console.log('Form is not valid')
      return
    }

    // Get data from form
    const inputs = {
      newUser: userInfo.userProfile === null,
      //email: userInfo.email, // User cannot change for now.
      userName: (e.currentTarget.elements[0] as HTMLInputElement).value,
      firstName: (e.currentTarget.elements[1] as HTMLInputElement).value,
      lastName: (e.currentTarget.elements[2] as HTMLInputElement).value,
      bio: (e.currentTarget.elements[3] as HTMLInputElement).value,
      // image is selectedFile if it exists, otherwise it is the current image
      image: storageLink
        ? storageLink
        : userInfo.userProfile?.image
        ? userInfo.userProfile?.image
        : userInfo.image,
    }
    // Make call to accountUpdate API
    await fetcher(`/api/users/by-uuid/${userInfo.id}/account-update`, {
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
    console.log('Redirecting to:', enteredUUid)
    router.replace(`/${enteredUUid}`)
    // window.location.href = `/${enteredUUid}`
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

          {formLoaded ? (
            <Form.Root className="FromRoot" onSubmit={handleFormSubmit}>
              <Form.Field className="FormField" name="unique-username">
                <div className="flex justify-between">
                  <Form.Label className="FormLabel">Username *</Form.Label>
                  {enteredUUidTouched && (
                    <Form.Message>{enteredUUidErrorMsg}</Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <input
                    className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                    type="text"
                    id="uuid"
                    style={{ marginBottom: 10 }}
                    required
                    placeholder="Unique Username"
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    value={enteredUUid}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="first-name">
                <div className="flex justify-between">
                  <Form.Label className="FormLabel">First Name *</Form.Label>
                  {enteredFirstNameTouched && (
                    <Form.Message>{enteredFirstNameErrorMsg}</Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <input
                    className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                    type="text"
                    style={{ marginBottom: 10 }}
                    id="firstName"
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    value={enteredFirstName}
                    required
                    placeholder="First Name"
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="last-name">
                <div className="flex justify-between">
                  <Form.Label className="FormLabel">Last Name *</Form.Label>
                  {enteredLastNameTouched && (
                    <Form.Message>{enteredLastNameErrorMsg}</Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <input
                    className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                    type="text"
                    style={{ marginBottom: 10 }}
                    required
                    placeholder="Last Name"
                    id="lastName"
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    value={enteredLastName}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="bio">
                <div className="flex justify-between">
                  <Form.Label className="FormLabel">Bio *</Form.Label>
                  {enteredBioTouched && (
                    <Form.Message>{enteredBioErrorMsg}</Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <textarea
                    className="w-full rounded valid:border-gray-500 invalid:border-red-500"
                    required
                    placeholder="Briefly describe who you are and the types of content you promote regularly on your social channels."
                    id="bio"
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    value={enteredBio}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="profile-pic">
                <div className="flex justify-between">
                  <Form.Label className="FormLabel">Profile Picture</Form.Label>
                  {enteredImageErrorMsg && (
                    <Form.Message>{enteredImageErrorMsg}</Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <input
                    className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
                    accept="image/png, image/jpeg"
                    type="file"
                    id="image"
                    style={{ marginBottom: 10 }}
                    onChange={handleFileChange}
                    placeholder="Profile Picture"
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                {formValid ? (
                  <button className="mx-2 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
                    Save
                  </button>
                ) : (
                  <button
                    className="mx-2 rounded-full border border-black bg-grey p-1.5 px-4 text-sm text-white transition-all "
                    disabled
                  >
                    Save
                  </button>
                )}
              </Form.Submit>
            </Form.Root>
          ) : (
            <h1> LOADING.... </h1>
          )}
        </div>
      </div>
    </>
  )
}

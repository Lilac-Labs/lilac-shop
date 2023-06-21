import * as Form from '@radix-ui/react-form'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
export default function ApplyForm({
  setCreatorsApplyModal,
}: {
  setCreatorsApplyModal: Dispatch<SetStateAction<boolean>>
}) {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: '' },
  })

  // Success message
  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      })
    } else {
      setStatus({
        ...status,
        info: { error: true, msg: msg },
      })
    }
    console.log(msg)
  }

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission
    // Get data from form
    const inputs = {
      name: (e.currentTarget.elements[0] as HTMLInputElement).value,
      email: (e.currentTarget.elements[1] as HTMLInputElement).value,
      bio: (e.currentTarget.elements[2] as HTMLInputElement).value,
      links: (e.currentTarget.elements[3] as HTMLInputElement).value,
    }

    // Submit data to formspree API
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/mknaylzb',
      data: inputs,
    })
      // Handle success
      .then((response) => {
        handleServerResponse(
          true,
          'Thank you, your message has been submitted.',
        )
      })
      // Handle error
      .catch((error) => {
        handleServerResponse(false, error.response.data.error)
      })
    // Reset form
    setCreatorsApplyModal(false)
  }

  return (
    <Form.Root className="FromRoot" onSubmit={handleFormSubmit}>
      <Form.Field className="FormField" name="name">
        <div className="flex rounded">
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your name.
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid name.
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
            type="text"
            style={{ marginBottom: 5 }}
            required
            placeholder="Full Name"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="email">
        <div className="flex">
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email.
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email.
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input w-full rounded valid:border-gray-500 invalid:border-red-500"
            type="email"
            style={{ marginBottom: 5 }}
            required
            placeholder="Email Address"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="bio">
        <div className="flex">
          <Form.Message className="FormMessage" match="valueMissing">
            Please briefly describe who you are and the types of content you
            promote regularly on your social channels.
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="w-full rounded valid:border-gray-500 invalid:border-red-500"
            required
            placeholder="Briefly describe who you are and the types of content you promote regularly on your social channels."
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="links">
        <div className="flex">
          <Form.Message className="FormMessage" match="valueMissing">
            Please provide links to your social media channels.
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="w-full rounded valid:border-gray-500 invalid:border-red-500"
            required
            placeholder="Links to your social media channels (Instagram, Youtube, TikTok, etc.)"
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="mx-2 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
          Submit
        </button>
      </Form.Submit>
    </Form.Root>
  )
}

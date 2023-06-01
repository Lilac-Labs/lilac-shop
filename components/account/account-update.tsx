"use client";
import { ReactNode, useEffect, useState, RefObject} from 'react';
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import * as Form from '@radix-ui/react-form';
import { fetcher } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { useUserInfoContext } from "@/lib/context/UserInfoProvider";
import { redirect } from "next/navigation";

export default function AccountUpdate() {
    
    const { userInfo, setUserInfoUpdated } = useUserInfoContext();

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [storageLink, setStorageLink] = useState<string>("");
    
    // handfilechange is called when a file is selected, and sets the selected file to the file that was selected
    // and sets the name to the name of the file. It's async because it calls uploadFile, which is async.
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        // Get file from event
        const file = e.target.files?.[0]!;
        const filename = encodeURIComponent(file.name)
        const fileType = encodeURIComponent(file.type)

        // Get presigned post from backend
        const GET_URL = `/api/upload-url?file=${filename}&fileType=${fileType}`
        const res = await fetch(GET_URL);
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
            setStorageLink(`https://dev-shop-links.s3.us-west-2.amazonaws.com/${filename}`)
          } else {
            console.error('Upload failed.')
        }
        // From upload, get the url of the file in aws.
        // Set state to store url of the file.
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        // Get data from form
        const inputs = {
            email: userInfo.email, // User cannot change for now.
            id: (e.currentTarget.elements[0] as HTMLInputElement).value,
            firstName: (e.currentTarget.elements[1] as HTMLInputElement).value,
            lastName: (e.currentTarget.elements[2] as HTMLInputElement).value,
            bio: (e.currentTarget.elements[3] as HTMLInputElement).value,
            //ig: (e.currentTarget.elements[4] as HTMLInputElement).value,
            //tiktok: (e.currentTarget.elements[5] as HTMLInputElement).value,
            // image is selectedFile if it exists, otherwise it is the current image
            image: storageLink ? storageLink : userInfo.image,
        };
        // Make call to accountUpdate API
        fetcher("http://localhost:3000/api/accountUpdate", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        })
        .then((res) => {
            console.log("Response:", res);
            setUserInfoUpdated(true);  
        }
        )
        .catch((err) => {
            console.log("Error:", err);
        }
        );

        // Redirect to profile page
        redirect(`/${userInfo.id}`)
        };

  return (
    <>
      <div className="w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-black-200" style={{zIndex:1}}>
        <div className="flex flex-col items-left justify-center space-y-3 border-b border-back-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h1 className="font-display text-3xl font-bold">Update your profile.</h1>
          <p className="text-sm">
            Fields with * are required.
          </p>
          <Form.Root className="FromRoot" onSubmit={handleFormSubmit}>        
                <Form.Field className="FormField" name="unique-username">
                  <div className="flex">
                    <Form.Label className="FormLabel">Username *</Form.Label>
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your name.
                      </Form.Message>
                      <Form.Message className="FormMessage" match="typeMismatch">
                          Please provide a valid name.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                        <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="text" style={{ marginBottom: 10 }} required placeholder="Unique Username" defaultValue={userInfo?.id} />
                  </Form.Control>
              </Form.Field>
              <div className="grid grid-flow-col gap-x-4 justify-stretch" >
              <Form.Field className="FormField" name="first-name">
                  <div className="flex rounded">
                  <Form.Label className="FormLabel">First Name *</Form.Label>
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your name.
                      </Form.Message>
                      <Form.Message className="FormMessage" match="typeMismatch">
                          Please provide a valid name.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                        <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="text" style={{ marginBottom: 10 }} required placeholder="First Name" defaultValue={userInfo?.firstName} />
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
                  </div>
                  <Form.Control asChild>
                      <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="text" style={{ marginBottom: 10 }} required placeholder="Last Name" defaultValue={userInfo?.lastName}/>
                  </Form.Control>
              </Form.Field>
              </div>
              <Form.Field className="FormField" name="bio">
                  <div className="flex">
                    <Form.Label className="FormLabel">Bio *</Form.Label>
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please briefly describe who you are and the types of content you promote regularly on your social channels.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                      <textarea className="valid:border-gray-500 invalid:border-red-500 w-full rounded" required placeholder="Briefly describe who you are and the types of content you promote regularly on your social channels." defaultValue={userInfo?.bio}/>
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
                      <input className="Input valid:border-gray-500 w-full rounded" type="text" style={{ marginBottom: 10 }} required placeholder="Instagram @" defaultValue=""/>
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
                      <input className="Input valid:border-gray-500  w-full rounded" type="text" style={{ marginBottom: 10 }} required placeholder="TikTok @" defaultValue=""/>
                  </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="profile-pic">
                  <div className="flex">
                    <Form.Label className="FormLabel">Profile Picture</Form.Label>
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please provide links to your social media channels.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                      <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded"  accept="image/png, image/jpeg" type="file" style={{ marginBottom: 10 }} onChange={handleFileChange} required placeholder="Profile Picture" defaultValue="" />
                  </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                {/* Redirect after submit */}
                  <button className="mx-2 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
                      Save
                  </button>
              </Form.Submit>
          </Form.Root>
        </div>
      </div>
      </>
  );
}
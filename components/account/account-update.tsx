"use client";
import { ReactNode, useEffect, useState } from "react";
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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        // Get data from form
        const inputs = {
          id: (e.currentTarget.elements[0] as HTMLInputElement).value,
          firstName: (e.currentTarget.elements[1] as HTMLInputElement).value,
          lastName: (e.currentTarget.elements[2] as HTMLInputElement).value,
          bio: (e.currentTarget.elements[3] as HTMLInputElement).value,
          email: userInfo.email,
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
                      <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="file" style={{ marginBottom: 10 }}/>
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
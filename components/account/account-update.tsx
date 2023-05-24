"use client";
import { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import * as Form from '@radix-ui/react-form';
import { fetcher } from "@/lib/utils";
import { Session } from "next-auth";

export default function AccountUpdate({session}: {session: Session | null }) {
    
    console.log("Logging Session:", session);
    // Get user email from their session
    let email = session?.user?.email;
    console.log("Email:", email);
    // The API URL.
    const APIurl = `http://localhost:3000/api/user/byEmail/${email}`;
    const [userInfo, setUserInfo] = useState([])

    // The way to ensure useEffect is run only once is to use an empty dependency array.
    useEffect(() => {
        getUserInfo();},
        []);
    
    // Seperate function to fetch user info
    const getUserInfo = async () => {
        const fetchedUserInfo = await fetcher(APIurl, { next: { revalidate: 10 } });
        setUserInfo(fetchedUserInfo);
    }

    // Pass user info struct to AccountUpdate component

    // Print out userInfo
    console.log("User Info:", userInfo);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        // Get data from form
        const inputs = {
          firstName: (e.currentTarget.elements[0] as HTMLInputElement).value,
          lastName: (e.currentTarget.elements[1] as HTMLInputElement).value,
          bio: (e.currentTarget.elements[2] as HTMLInputElement).value,
          email:email
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
        }
        )
        .catch((err) => {
            console.log("Error:", err);
        }
        );
      };

  return (
    <>
      <div className="w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-black-200" style={{zIndex:1}}>
        <div className="flex flex-col items-left justify-center space-y-3 border-b border-back-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h1 className="font-display text-3xl font-bold">Update your profile.</h1>
          <p className="text-sm">
            Fill out the form below. Someone from our team will be in touch shortly.
          </p>
          <Form.Root className="FromRoot" onSubmit={handleFormSubmit}>
              <Form.Field className="FormField" name="first-name">
                  <div className="flex rounded">
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your name.
                      </Form.Message>
                      <Form.Message className="FormMessage" match="typeMismatch">
                          Please provide a valid name.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                      <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="text" style={{ marginBottom: 5 }} required placeholder="First Name"/>
                  </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="last-name">
                  <div className="flex rounded">
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your name.
                      </Form.Message>
                      <Form.Message className="FormMessage" match="typeMismatch">
                          Please provide a valid name.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                      <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="text" style={{ marginBottom: 5 }} required placeholder="Last Name"/>
                  </Form.Control>
              </Form.Field>
              <Form.Field className="FormField" name="bio">
                  <div className="flex">
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please briefly describe who you are and the types of content you promote regularly on your social channels.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                      <textarea className="valid:border-gray-500 invalid:border-red-500 w-full rounded" required placeholder="Briefly describe who you are and the types of content you promote regularly on your social channels." />
                  </Form.Control>
              </Form.Field>
  
              <Form.Submit asChild>
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
import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import * as Form from '@radix-ui/react-form';

const CreatorsApplyModal = ({
  showCreatorsApplyModal,
  setCreatorsApplyModal,
}: {
    showCreatorsApplyModal: boolean;
    setCreatorsApplyModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [applyClicked, setApplyClicked] = useState(false);

  return (
    <Modal showModal={showCreatorsApplyModal} setShowModal={setCreatorsApplyModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border md:border-black-200">
        <div className="flex flex-col items-left justify-center space-y-3 border-b border-back-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h1 className="font-display text-3xl font-bold">Apply to join the waitlist!</h1>
          <p className="text-sm">
            Fill out the form below. Someone from our team will be in touch shortly.
          </p>
          {
              // Form with fields for name, email, two input boxes
          }
          <Form.Root className="FromRoot">
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
                      <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="text" style={{ marginBottom: 5 }} required placeholder="Full Name"/>
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
                      <input className="Input valid:border-gray-500 invalid:border-red-500 w-full rounded" type="email" style={{ marginBottom: 5 }} required placeholder="Email Address"/>
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
              <Form.Field className="FormField" name="links">
                  <div className="flex">
                      <Form.Message className="FormMessage" match="valueMissing">
                          Please provide links to your social media channels.
                      </Form.Message>
                  </div>
                  <Form.Control asChild>
                      <textarea className="valid:border-gray-500 invalid:border-red-500 w-full rounded" required placeholder="Links to your social media channels (Instagram, Youtube, TikTok, etc.)"/>
                  </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                  <button className="mx-2 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
                      Submit
                  </button>
              </Form.Submit>
          </Form.Root>
        </div>

        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h2 className="text-md font-display font-bold">
            Don&apos;t have an account?
          </h2>
          <p className="text-sm">If you have an invitation code, click here to create your account, otherwise click here to apply for an account.</p>
        </div>
      </div>
    </Modal>
  );
};

export function useCreatorsApplyModal() {
  const [showCreatorsApplyModal, setShowCreatorsApplyModal] = useState(false);

  const CreatorsApplyModalCallback = useCallback(() => {
    return (
      <CreatorsApplyModal
        showCreatorsApplyModal={showCreatorsApplyModal}
        setCreatorsApplyModal={setShowCreatorsApplyModal}
      />
    );
  }, [showCreatorsApplyModal, setShowCreatorsApplyModal]);

  return useMemo(
    () => ({ setShowCreatorsApplyModal, CreatorsApplyModal: CreatorsApplyModalCallback }),
    [setShowCreatorsApplyModal, CreatorsApplyModalCallback],
  );
}

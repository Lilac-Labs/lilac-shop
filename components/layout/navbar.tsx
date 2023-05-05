"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import { useCreatorsApplyModal } from "./creators-apply-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { CreatorsApplyModal, setShowCreatorsApplyModal } = useCreatorsApplyModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <CreatorsApplyModal/>
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>shop my</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              // add log in button here
              <div>
                <button
                  className="mx-2 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign In
                </button>
                <button 
                  className="mx-2 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowCreatorsApplyModal(true)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

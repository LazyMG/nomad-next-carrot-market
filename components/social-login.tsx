import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { LiaGithub } from "react-icons/lia";

const SocialLogin = () => {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 justify-center items-center gap-3"
          href="/github/start"
        >
          <LiaGithub className="size-6" />
          <span>Continue with Github</span>
        </Link>
        <Link
          className="primary-btn flex h-10 justify-center items-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
};

export default SocialLogin;

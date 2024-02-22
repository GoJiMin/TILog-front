"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import SignInButton from "./ui/SignInButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callBackUrl: string;
};

export default function SignIn({ providers, callBackUrl }: Props) {
  return (
    <section className='mt-6 flex flex-col gap-[18px] bg-neutral-100 p-8 rounded-md'>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className='grid'>
          <SignInButton
            type={provider.name}
            text={`Sign in with ${provider.name}`}
            onClick={() => signIn(provider.id, { callBackUrl })}
          />
        </div>
      ))}
    </section>
  );
}

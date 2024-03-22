import SignIn from "@/app/components/SignIn";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { authOptions } from "@/app/lib/auth";

type Props = {
  searchParams: {
    callBackUrl: string;
  };
};

export const metadata: Metadata = {
  title: "로그인",
  description: "간편 로그인을 통해 시작해보세요!",
};

export default async function SignPage({
  searchParams: { callBackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex flex-col items-center justify-center mt-28'>
      <article>
        <h2 className='text-3xl font-semibold'>
          로그인해 오늘의 배움을 공유해보세요!
        </h2>
      </article>
      <SignIn providers={providers} callBackUrl={callBackUrl ?? "/"} />
    </section>
  );
}

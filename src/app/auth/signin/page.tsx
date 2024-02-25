import SignIn from "@/app/components/SignIn";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    callBackUrl: string;
  };
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

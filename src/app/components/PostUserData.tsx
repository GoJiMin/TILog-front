import { parseDate } from "../utils/date";

type Props = {
  userid: string;
  createdAt: string;
  description: string;
};

export default function PostUserData({
  userid,
  createdAt,
  description,
}: Props) {
  return (
    <section className='w-full -translate-y-1'>
      <article className='w-full flex justify-between'>
        <p className='font-bold'>{userid}</p>
        <time className='text-neutral-500 text-sm'>{parseDate(createdAt)}</time>
      </article>
      <p className='mb-2'>{description}</p>
    </section>
  );
}

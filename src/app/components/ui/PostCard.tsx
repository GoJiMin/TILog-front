import { SimplePost } from "@/app/model/post";
import Image from "next/image";
import Avatar from "./Avatar";
import { BookMarkIcon, CommentIcon, HeartIcon } from "./icons";
import { parseDate } from "@/app/utils/date";

type Props = {
  post: SimplePost;
};

export default function PostCard({ post }: Props) {
  const {
    userid,
    profileimage,
    image,
    description,
    likes,
    comments,
    createdAt,
  } = post;

  return (
    <article className='flex border-b border-neutral-300 pb-4'>
      <Avatar image={profileimage} size={"small"} />
      <section className='px-1 ml-2.5 -translate-y-0.5'>
        <article className=' flex justify-between'>
          <p className='font-bold'>{userid}</p>
          <time className='text-neutral-500 text-sm'>
            {parseDate(createdAt)}
          </time>
        </article>
        <p className='mb-2'>{description}</p>
        <Image
          className='rounded-lg object-cover aspect-square border border-gray-200'
          src={image}
          alt={`photo by ${userid}`}
          width={600}
          height={500}
        />
        <article className='flex justify-between items-center mt-3'>
          <section className='flex gap-[10px] items-center'>
            <HeartIcon size='small' />
            <CommentIcon />
          </section>
          <BookMarkIcon />
        </article>
        <article className='mt-2 flex gap-[15px]'>
          {likes && likes > 0 && (
            <p className='text-neutral-500'>좋아요 {likes}개</p>
          )}
          {comments && comments > 0 && (
            <p className='text-neutral-500'>답글 {comments}개</p>
          )}
        </article>
      </section>
    </article>
  );
}

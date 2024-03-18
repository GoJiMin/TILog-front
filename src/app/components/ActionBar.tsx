import { BookMarkIcon, CommentIcon, HeartIcon } from "./ui/icons";

type Props = {
  likes: number;
  comments: number;
};

export default function ActionBar({ likes, comments }: Props) {
  return (
    <section>
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
  );
}

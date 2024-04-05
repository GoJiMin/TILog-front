import { useState } from "react";
import {
  BookMarkFillIcon,
  BookMarkIcon,
  CommentIcon,
  HeartFillIcon,
  HeartIcon,
} from "./ui/icons";
import ToggleButton from "./ui/ToggleButton";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

type Props = {
  postId: string;
  likes: string[];
  comments: number;
};

export default function ActionBar({ postId, likes, comments }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.id) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { mutate } = useSWRConfig();

  const handleLike = (like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: postId, like }),
    }).then(() => mutate("/api/posts"));
  };

  return (
    <section>
      <article className='flex justify-between items-center mt-3'>
        <section className='flex gap-[10px] items-center'>
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            onIcon={<HeartFillIcon size='small' />}
            offIcon={<HeartIcon size='small' />}
          />
          <CommentIcon />
        </section>
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookMarkFillIcon />}
          offIcon={<BookMarkIcon />}
        />
      </article>
      <article className='mt-2 flex gap-[15px]'>
        {likes && likes.length > 0 && (
          <p className='text-neutral-500'>좋아요 {likes.length}개</p>
        )}
        {comments && comments > 0 && (
          <p className='text-neutral-500'>답글 {comments}개</p>
        )}
      </article>
    </section>
  );
}

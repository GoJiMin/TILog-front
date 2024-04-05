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
import { usePosts } from "../utils/hooks/posts";
import { SimplePost } from "../model/post";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const { likes, comments } = post;
  const { setLike } = usePosts();
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.id) : false;

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.id, like);
    }
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

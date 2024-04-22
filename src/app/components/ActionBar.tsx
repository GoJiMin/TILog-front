import {
  BookMarkFillIcon,
  BookMarkIcon,
  CommentIcon,
  HeartFillIcon,
  HeartIcon,
} from "./ui/icons";
import ToggleButton from "./ui/ToggleButton";
import { usePosts } from "../utils/hooks/posts";
import { SimplePost } from "../model/post";
import useProfile from "../utils/hooks/profile";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, comments } = post;
  const { user, setBookmark } = useProfile();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.id) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.id, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(post.id, bookmark);
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
          onToggle={handleBookmark}
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

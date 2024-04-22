import useSWR from "swr";
import { Post, SimplePost } from "../model/post";
import Image from "next/image";
import UserCard from "./ui/UserCard";
import { parseDate } from "../utils/date";
import Avatar from "./ui/Avatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import PostUserData from "./PostUserData";
import useDetailPost from "../utils/hooks/post";
import useProfile from "../utils/hooks/profile";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userid, profileimage, image, description, createdAt, name } =
    post;
  const { user } = useProfile();
  const { post: data, submitComment } = useDetailPost(id);
  const comments = data?.comments;

  const handleSubmitComment = (comment: string, createdAt: string) => {
    user &&
      submitComment({
        userid: user.userid,
        profileimage: user.profileimage,
        comment,
        createdAt,
      });
  };

  return (
    <section className='flex w-full h-full'>
      <article className='relative basis-3/5'>
        <Image
          src={image}
          alt={`photo by ${userid}`}
          priority
          fill
          sizes='650px'
        />
      </article>
      <article className='basis-2/5 p-5 flex flex-col'>
        <section className='flex justify-between'>
          <UserCard user={{ id, userid, name, profileimage }} />
          <time className='text-neutral-500 text-sm'>
            {parseDate(createdAt)}
          </time>
        </section>
        <section className='border-b border-neutral-300 pb-2 mb-2'>
          <p>{description}</p>
          <ActionBar post={post} />
        </section>
        <ul className='h-full overflow-y-auto'>
          {comments &&
            comments.map(
              (
                {
                  userid: commentUserId,
                  profileimage: commentUserImage,
                  comment,
                  createdAt: commentCreatedAt,
                },
                index
              ) => (
                <li className='flex w-full mb-[10px] gap-[10px]' key={index}>
                  <Avatar image={commentUserImage} size={"small"} />
                  <PostUserData
                    userid={commentUserId}
                    createdAt={commentCreatedAt}
                    description={comment}
                  />
                </li>
              )
            )}
        </ul>
        <CommentForm onSubmitComment={handleSubmitComment} />
      </article>
    </section>
  );
}

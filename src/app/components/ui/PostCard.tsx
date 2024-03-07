import { SimplePost } from "@/app/model/post";
import Image from "next/image";
import Avatar from "./Avatar";
import { BookMarkIcon, CommentIcon, HeartIcon } from "./icons";

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
    <section>
      <Avatar image={profileimage} size={"small"} />
      <article>
        <div>
          <p>{userid}</p>
          <time>{createdAt}</time>
        </div>
        <p>{description}</p>
        <Image
          src={image}
          alt={`photo by ${userid}`}
          width={500}
          height={500}
        />
        <article>
          <div>
            <HeartIcon />
            <CommentIcon />
          </div>
          <BookMarkIcon />
        </article>
        <article>
          {likes && likes > 0 && <p>좋아요 {likes}개</p>}
          {comments && comments > 0 && <p>답글 {comments}개</p>}
        </article>
      </article>
    </section>
  );
}

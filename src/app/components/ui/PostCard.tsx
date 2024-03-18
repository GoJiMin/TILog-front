"use client";

import { SimplePost } from "@/app/model/post";
import Image from "next/image";
import Avatar from "./Avatar";

import { parseDate } from "@/app/utils/date";
import { useState } from "react";
import Modal from "./Modal";
import PostDetail from "../PostDetail";
import ActionBar from "../ActionBar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const {
    userid,
    profileimage,
    image,
    description,
    likes,
    comments,
    createdAt,
  } = post;

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

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
          priority={priority}
          onClick={handleOpen}
        />
        <ActionBar likes={likes} comments={comments} />
        {openModal && (
          <Modal onClose={handleClose}>
            <PostDetail post={post} />
          </Modal>
        )}
      </section>
    </article>
  );
}

"use client";

import { SimplePost } from "@/app/model/post";
import Image from "next/image";
import Avatar from "./Avatar";
import { useState } from "react";
import Modal from "./Modal";
import PostDetail from "../PostDetail";
import ActionBar from "../ActionBar";
import PostUserData from "../PostUserData";
import PostModal from "./PostModal";
import { useModal } from "@/app/utils/hooks/useModal";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const {
    id,
    userid,
    profileimage,
    image,
    description,
    likes,
    comments,
    createdAt,
  } = post;

  const { openModal, handleModalOpen, handleModalClose } = useModal();

  return (
    <article className='flex border-b border-neutral-300 pb-4'>
      <Avatar image={profileimage} size={"small"} />
      <section className='px-1 ml-2.5 '>
        <PostUserData
          userid={userid}
          createdAt={createdAt}
          description={description}
        />
        <Image
          className='rounded-lg object-cover aspect-square border border-gray-200'
          src={image}
          alt={`photo by ${userid}`}
          width={600}
          height={500}
          priority={priority}
          onClick={handleModalOpen}
        />
        <ActionBar likes={likes} comments={comments} postId={id} />
        {openModal && (
          <Modal onClose={handleModalClose}>
            <PostModal>
              <PostDetail post={post} />
            </PostModal>
          </Modal>
        )}
      </section>
    </article>
  );
}
